// import c from './mainContent.module.css';
import { GalleryCardType, PersonalInformationType } from '../../redux/mainContentReducer';
import Gallery from './gallery/Gallery';
import PersonalInformation from './personInformation/PersonInformation';

type Props = {
    galleryCards: Array<GalleryCardType>
    personalInformation: PersonalInformationType
    isAuthorized: boolean
    avatar: string
    updatePersonalInformation: (nameAndLastName: string, profession: string) => void
    addGalleryCard: (img: File, name: string) => void
    updateIsLiked: (isLiked: boolean, name: string) => void
    updateAvatar: (newAvatar: File) => void
    deleteGalleryCard: (name: string, img: string) => void
}

let MainContent = ({deleteGalleryCard, updateAvatar, galleryCards, isAuthorized, avatar, addGalleryCard, updateIsLiked, personalInformation, updatePersonalInformation}: Props) => {
    return <div>
        <PersonalInformation avatar={avatar} updateAvatar={updateAvatar} updatePersonalInformation={updatePersonalInformation} isAuthorized={isAuthorized} personalInformation={personalInformation} addGalleryCard={addGalleryCard} />
        <Gallery deleteGalleryCard={deleteGalleryCard} updateIsLiked={updateIsLiked} galleryCards={galleryCards} />
    </div>
};

export default MainContent;