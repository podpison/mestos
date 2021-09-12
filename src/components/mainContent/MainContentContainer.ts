import { connect } from "react-redux";
import { addGalleryCard, deleteGalleryCard, updateAvatar, updateIsLiked, updatePersonalInformation } from "../../redux/mainContentReducer";
import { AppState } from "../../redux/store";
import MainContent from "./MainContent";

let mapStateToProps = (state: AppState) => {
    return {
        galleryCards: state.mainContent.galleryCards,
        personalInformation: state.mainContent.personalInformation,
        avatar: state.mainContent.avatar,
        isAuthorized: state.login.isAuthorized
    }
}

let MainContentContainer = connect(mapStateToProps, {deleteGalleryCard, updateAvatar, updateIsLiked, addGalleryCard, updatePersonalInformation})(MainContent);

export default MainContentContainer;