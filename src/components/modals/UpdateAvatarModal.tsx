import { Button, Grid, Modal } from '@material-ui/core';
import { ChangeEvent, useState } from 'react';
import c from './modals.module.css';

type Props = {
    closeModal: () => void
    updateAvatar: (newAvatar: File) => void
}

let UpdateAvatarModal = ({closeModal, updateAvatar}: Props) => {

    let [avatar, setAvatar] = useState<File>({} as File);

    let saveData = () => {
        updateAvatar(avatar);
        closeModal();
    };

    let onInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files !== null) {
            setAvatar(e.target.files[0]);
        };
    };

    let onCloseModal = () => {
        setAvatar({} as File);
        closeModal();
    };

    return <Modal className={c.modalContainer} onClose={onCloseModal} open={true} >
        <Grid className={c.gridContainer} container direction='column' justifyContent='center' alignItems='center'>
            <div className={c.modal}>
                <Grid item>
                    <h2 className={c.sign}>Choose new avatar</h2>
                </Grid>
                <Grid item>
                    <Button fullWidth={true} component='label' variant='contained'>Choose new avatar <input type='file' onChange={onInputChange} hidden /></Button>
                    <div>{avatar.name}</div>
                </Grid>
                <Grid className={c.buttonContainer} item>
                    <Button fullWidth={true} className={c.saveButton} onClick={saveData} variant='contained'>Сохранить</Button>
                </Grid>
            </div>
        </Grid>
    </Modal>
}

export default UpdateAvatarModal;