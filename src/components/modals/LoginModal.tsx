import { Button, Grid, Modal, TextField } from '@material-ui/core';
import { useState } from 'react';
import c from './modals.module.css';

type Props = {
    signIn: (email: string, password: string) => void;
    closeModal: () => void;
}

let LoginModal = ({signIn, closeModal}: Props) => {

    let [email, setEmail] = useState('');
    let [password, setPassword] = useState('');

    let saveData = () => {
        signIn(email, password);
        closeModal();
    };

    let onCloseModal = () => {
        closeModal();
        setEmail('');
        setPassword('');
    };

    return <Modal className={c.modalContainer} onClose={onCloseModal} open={true} >
        <Grid className={c.gridContainer} container direction='column' justifyContent='center' alignItems='center'>
            <div className={c.modal}>
                <Grid item>
                    <h2 className={c.sign}>sign in</h2>
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

export default LoginModal;