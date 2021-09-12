import { galleryCardsAPI, personalInformationAPI } from "../api/api";
import { ActionsType, BaseThunkType } from "./store";

export type GalleryCardType = {
    name: string
    src: string
    isLiked: boolean
    id?: number
}

export type PersonalInformationType = {
    nameAndLastName: string
    profession: string
}

let initialState = {
    galleryCards: [] as Array<GalleryCardType>,
    personalInformation: {
        nameAndLastName: 'You are not authorized',
        profession: 'Here will be your profession',
    } as PersonalInformationType,
    avatar: ''
};

type InitialState = typeof initialState;
type Actions = ActionsType<typeof mainContentActions>;

export let mainContentReducer = (state = initialState, action: Actions): InitialState => {
    switch (action.type) {
        case 'mainContent/setGalleryCard':
            return {
                ...state,
                galleryCards: [...state.galleryCards, ...action.card]
            };
        case 'mainContent/setNewGalleryCards':
            return {
                ...state,
                galleryCards: [...action.cards]
            };
        case 'mainContent/setPersonalInformation':
            return {
                ...state,
                personalInformation: {
                    nameAndLastName: action.nameAndLastName,
                    profession: action.profession
                }
            };
        case 'mainContent/setLogOut':
            return {
                ...state,
                galleryCards: [],
                personalInformation: {
                    nameAndLastName: 'You are not authorized',
                    profession: 'Here will be your profession'
                },
                avatar: ''
            };
        case 'mainContent/updateAvatar':
            return {
                ...state,
                avatar: action.newAvatar
            }
        default:
            return { ...state };
    }
}

export let mainContentActions = {
    setGalleryCard: (card: Array<GalleryCardType>) => ({ type: 'mainContent/setGalleryCard', card } as const),
    setNewGalleryCards: (cards: Array<GalleryCardType>) => ({type: 'mainContent/setNewGalleryCards', cards} as const),
    setPersonalInformation: (nameAndLastName: string, profession: string) => ({ type: 'mainContent/setPersonalInformation', nameAndLastName, profession }) as const,
    setLogOut: () => ({ type: 'mainContent/setLogOut' } as const),
    updateAvatar: (newAvatar: string) => ({ type: 'mainContent/updateAvatar', newAvatar} as const)
};

type Thunk = BaseThunkType<Actions>;

export let addGalleryCard = (img: File, name: string): Thunk => async (dispatch) => {
    let imgUrl = await galleryCardsAPI.setGalleryCard(img, name);
    dispatch(mainContentActions.setGalleryCard([{ src: imgUrl, name, isLiked: false }]));
};

export let updatePersonalInformation = (nameAndLastName: string, profession: string): Thunk => async (dispatch) => {
    await personalInformationAPI.updatePersonalInformation(nameAndLastName, profession);
    dispatch(mainContentActions.setPersonalInformation(nameAndLastName, profession));
};

export let updateIsLiked = (isLiked: boolean, name: string): Thunk => async (dispatch) => {
    let newGalleryCards = await galleryCardsAPI.updateIsLiked(isLiked, name);
    dispatch(mainContentActions.setNewGalleryCards(newGalleryCards));
};

export let updateAvatar = (newAvatar: File): Thunk => async (dispatch) => {
    let avatarUrl = await personalInformationAPI.updateAvatar(newAvatar);
    dispatch(mainContentActions.updateAvatar(avatarUrl));
};

export let deleteGalleryCard = (name: string, img: string): Thunk => async (dispatch) => {
    let newGalleryCards = await galleryCardsAPI.deleteGalleryCard(name, img);
    dispatch(mainContentActions.setNewGalleryCards(newGalleryCards));
};