import { loginAPI, userAPI } from "../api/api";
import { mainContentActions } from "./mainContentReducer";
import { ActionsType, BaseThunkType } from "./store";
import { FirebaseError } from '@firebase/util';

let initialState = {
    isAuthorized: false,
    errors: {
        email: '',
        password: ''
    }
};

export type LoginErrors = typeof initialState.errors;

type InitialState = typeof initialState;
type Actions = ActionsType<typeof loginActions>;

export let loginReducer = (state = initialState, action: Actions): InitialState => {
    switch (action.type) {
        case 'login/setIsAuthorized':
            return { ...state, isAuthorized: action.boolean };
        case 'login/setError':
            let errorCode = action.error.code;
            if (errorCode.includes('email' || 'auth')) {
                return {...state, errors: {...state.errors, email: action.error.message}};
            } else if (errorCode.includes('password')) {
                // the problem is in the password and email error must be clered
                return {...state, errors: {...state.errors, email: '', password: action.error.message}}
            };
            return {...state};
        case 'login/clearErrors':
            return {...state, errors: {email: '', password: ''}};
        default:
            return { ...state };
    }
}

export let loginActions = {
    setIsAuthorized: (boolean: boolean) => ({ type: 'login/setIsAuthorized', boolean } as const),
    setError: (error: FirebaseError) => ({ type: 'login/setError', error } as const),
    clearErrors: () => ({ type: 'login/clearErrors' } as const)
};

type Thunk = BaseThunkType<Actions | ReturnType<typeof mainContentActions.setPersonalInformation> | ReturnType<typeof mainContentActions.setGalleryCard> | ReturnType<typeof mainContentActions.setLogOut> | ReturnType<typeof mainContentActions.updateAvatar>>;

export let initializeUser = (): Thunk => async (dispatch) => {
    let userId = await userAPI.initializeUser();
    if (userId) {
        let userInformation = await userAPI.getUser(userId);
        if (userInformation) {
            dispatch(mainContentActions.setPersonalInformation(userInformation.nameAndLastName, userInformation.profession));
            dispatch(mainContentActions.updateAvatar(userInformation.avatar));
            dispatch(mainContentActions.setGalleryCard(userInformation.galleryCards));
            dispatch(loginActions.setIsAuthorized(true));
        };
    };
};

export let signUp = (nameAndLastName: string, profession: string, email: string, password: string, isGetEmailVerefication: boolean): Thunk => async (dispatch) => {
    let response = await loginAPI.signUp(email, password);
    if (typeof response === 'string') {
        await userAPI.setUser(nameAndLastName, profession, response);
        dispatch(loginActions.clearErrors());
        dispatch(mainContentActions.setPersonalInformation(nameAndLastName, profession));
        dispatch(loginActions.setIsAuthorized(true));
        if (isGetEmailVerefication) await loginAPI.emailVerefication();
    } else if (response !== 'undefined') {
        dispatch(loginActions.setError(response));
    };
};

export let signIn = (email: string, password: string): Thunk => async (dispatch) => {
    let response = await loginAPI.signIn(email, password);
    if (typeof response === 'string') {
        let userInformation = await userAPI.getUser(response);
        if (userInformation !== undefined) {
            dispatch(loginActions.clearErrors());
            dispatch(mainContentActions.setPersonalInformation(userInformation.nameAndLastName, userInformation.profession));
            dispatch(mainContentActions.updateAvatar(userInformation.avatar));
            dispatch(mainContentActions.setGalleryCard(userInformation.galleryCards));
            dispatch(loginActions.setIsAuthorized(true));
        };
    } else if (typeof response !== 'undefined') {
        dispatch(loginActions.setError(response));
    };
};

export let logOut = (): Thunk => async (dispatch) => {
    await loginAPI.logOut();
    dispatch(loginActions.setIsAuthorized(false));
    dispatch(mainContentActions.setLogOut());
};