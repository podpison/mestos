import { Avatar, Button } from '@material-ui/core';
import editButton from './../../../assets/img/editButton.svg';
import addButton from './../../../assets/img/addButton.png';
import c from './personalInformation.module.css';
import { PersonalInformationType } from '../../../redux/mainContentReducer';
import PersonalInformationModal from '../../modals/PersonalInformationModal';
import { useState } from 'react';
import AddGalleryCardModal from '../../modals/AddGalleryCardModal';
import UpdateAvatarModal from '../../modals/UpdateAvatarModal';

type Props = {
    personalInformation: PersonalInformationType
    isAuthorized: boolean
    avatar: string
    updatePersonalInformation: (nameAndLastName: string, profession: string) => void
    addGalleryCard: (img: File, name: string) => void
    updateAvatar: (newAvatar: File) => void
}

let PersonalInformation = ({avatar, updateAvatar, addGalleryCard, updatePersonalInformation, personalInformation, isAuthorized}: Props) => {

    let [isPersonalInformationModalOpen, setIsPersonalInformationModalOpen] = useState(false);
    let closePersonalInformationModal = () => setIsPersonalInformationModalOpen(false);
    
    let [isAddGalleryCardModalOpen, setIsAddGalleryCardModalOpen] = useState(false);
    let closeAddGalleryCardModal = () => setIsAddGalleryCardModalOpen(false);

    let [isUpdateAvatarOpen, setIsUpdateAvatarOpen] = useState(false);
    let closeUpdateAvatarModal = () => setIsUpdateAvatarOpen(false);
    
    return <div className={c.personalInformationContainer}>
        {isPersonalInformationModalOpen && <PersonalInformationModal updatePersonalInformation={updatePersonalInformation} personalInformation={personalInformation} closeModal={closePersonalInformationModal} />}
        {isAddGalleryCardModalOpen && <AddGalleryCardModal addGalleryCard={addGalleryCard} closeModal={closeAddGalleryCardModal} />}
        {isUpdateAvatarOpen && <UpdateAvatarModal closeModal={closeUpdateAvatarModal} updateAvatar={updateAvatar} />}
        <Button className={c.avatarContainer} disabled={!isAuthorized}>
            <Avatar onClick={() => setIsUpdateAvatarOpen(true)} className={c.avatar} src={avatar} />
        </Button>
        <div className={c.mainInformationAndAddButtonContainer}>
        <div className={c.mainInformation}>
            <div className={c.nameContainer}>
                <p className={c.name}>{personalInformation.nameAndLastName}</p>
                <Button className={c.button} disabled={!isAuthorized}>
                    <img onClick={() => setIsPersonalInformationModalOpen(true)} className={c.editButton} src={editButton} alt='edit button' />
                </Button>
            </div>
            <p className={c.profession}>{personalInformation.profession}</p>
        </div>
        <div className={c.addButtonContainer}>
            <Button className={c.addGalleryCardContainer} disabled={!isAuthorized}>
                <img className={c.addGalleryCard} onClick={() => setIsAddGalleryCardModalOpen(true)} src={addButton} alt='add button' />
            </Button>
        </div>
        </div>
    </div>
}

export default PersonalInformation;