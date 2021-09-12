import { loginAPI, userAPI } from "../api/api";
import { mainContentActions } from "./mainContentReducer";
import { ActionsType, BaseThunkType } from "./store";

let initialState = {
    isAuthorized: false
};

type InitialState = typeof initialState;
type Actions = ActionsType<typeof loginActions>;

export let loginReducer = (state = initialState, action: Actions): InitialState => {
    switch (action.type) {
        case 'login/setIsAuthorized':
            return { ...state, isAuthorized: action.boolean };
        default:
            return { ...state };
    }
}

export let loginActions = {
    setIsAuthorized: (boolean: boolean) => ({ type: 'login/setIsAuthorized', boolean } as const),
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

export let signUp = (nameAndLastName: string, profession: string, email: string, password: string): Thunk => async (dispatch) => {
    let userId = await loginAPI.signUp(email, password);
    await userAPI.setUser(nameAndLastName, profession, userId);
    dispatch(mainContentActions.setPersonalInformation(nameAndLastName, profession));
    dispatch(loginActions.setIsAuthorized(true));
};

export let signIn = (email: string, password: string): Thunk => async (dispatch) => {
    let userCredential = await loginAPI.signIn(email, password);
    if (userCredential.user !== null) {
        let userInformation = await userAPI.getUser(userCredential.user.uid);
        if (userInformation !== undefined) {
            dispatch(mainContentActions.setPersonalInformation(userInformation.nameAndLastName, userInformation.profession));
            dispatch(mainContentActions.updateAvatar(userInformation.avatar));
            dispatch(mainContentActions.setGalleryCard(userInformation.galleryCards));
            dispatch(loginActions.setIsAuthorized(true));
        };
    };
};

export let logOut = (): Thunk => async (dispatch) => {
    await loginAPI.logOut();
    dispatch(loginActions.setIsAuthorized(false));
    dispatch(mainContentActions.setLogOut());
};