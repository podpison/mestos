import { Modal, TextField, Button, Grid } from "@material-ui/core";
import { useState } from "react";
import { PersonalInformationType } from "../../redux/mainContentReducer";
import c from './modals.module.css';

type Props = {
    personalInformation: PersonalInformationType
    updatePersonalInformation: (nameAndLastName: string, profession: string) => void
    closeModal: () => void
};

let PersonalInformationWindow = ({ closeModal, updatePersonalInformation, personalInformation }: Props) => {

    let [nameAndLastName, setNameAndLastName] = useState(personalInformation.nameAndLastName);
    let [profession, setProfession] = useState(personalInformation.profession);

    let onSaveButtonClick = (nameAndLastName: string, profession: string) => {
        updatePersonalInformation(nameAndLastName, profession);
        closeModal();
    };

    let onCloseModal = () => {
        closeModal();
        setNameAndLastName('');
        setProfession('');
    }

    return <div>
        <Modal className={`${c.modalContainer} ${c.personalInformationModal}`} onClose={onCloseModal} open={true} >
            <Grid className={c.gridContainer} container direction='column' justifyContent='center' alignItems='center'>
                <div className={c.modal}>
                    <Grid item>
                        <h2 className={`${c.sign} ${c.personalInformationSign}`}>Редактировать профиль</h2>
                    </Grid>
                    <Grid item>
                        <TextField fullWidth={true} label='name and last name' value={nameAndLastName} onChange={(e) => setNameAndLastName(e.target.value)} />
                    </Grid>
                    <Grid item>
                        <TextField fullWidth={true} label='profession' value={profession} onChange={(e) => setProfession(e.target.value)} />
                    </Grid>
                    <Grid className={c.buttonContainer} item>
                        <Button fullWidth={true} className={c.saveButton} onClick={() => onSaveButtonClick(nameAndLastName, profession)} variant='contained'>Сохранить</Button>
                    </Grid>
                </div>
            </Grid>
        </Modal>
    </div>
};

export default PersonalInformationWindow;