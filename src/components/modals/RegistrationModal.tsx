import { Button, Grid, Modal, TextField } from '@material-ui/core';
import { useState } from 'react';
import c from './modals.module.css';

type Props = {
    signUp: (nameAndLastName: string, profession: string, email: string, password: string) => void;
    closeModal: () => void;
}

let RegistrationModal = ({signUp, closeModal}: Props) => {

    let [nameAndLastName, setNameAndLastName] = useState('');
    let [profession, setProfession] = useState('');
    let [email, setEmail] = useState('');
    let [password, setPassword] = useState('');

    let saveData = () => {
        signUp(nameAndLastName, profession, email, password);
        closeModal()
    };

    let onCloseModal = () => {
        closeModal();
        setNameAndLastName('');
        setProfession('');
        setEmail('');
        setPassword('');
    };

    return <Modal className={c.modalContainer} onClose={onCloseModal} open={true} >
        <Grid className={c.gridContainer} container direction='column' justifyContent='center' alignItems='center'>
            <div className={c.modal}>
                <Grid item>
                    <h2 className={c.sign}>sign up</h2>
                </Grid>
                <Grid item>
                    <TextField fullWidth={true} label='name and last name' value={nameAndLastName} onChange={(e) => setNameAndLastName(e.target.value)} />
                </Grid>
                <Grid item>
                    <TextField fullWidth={true} label='profession' value={profession} onChange={(e) => setProfession(e.target.value)} />
                </Grid>
                <Grid item>
                    <TextField fullWidth={true} label='email' value={email} onChange={(e) => setEmail(e.target.value)} />
                </Grid>
                <Grid item>
                    <TextField fullWidth={true} label='password' type='password' value={password} onChange={(e) => setPassword(e.target.value)} />
                </Grid>
                <Grid className={c.buttonContainer} item>
                    <Button fullWidth={true} className={c.saveButton} onClick={saveData} variant='contained'>Сохранить</Button>
                </Grid>
            </div>
        </Grid>
    </Modal>
}

export default RegistrationModal;