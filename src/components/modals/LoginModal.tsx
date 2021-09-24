import { Button, Grid, Modal, TextField } from '@material-ui/core';
import { useState } from 'react';
import { LoginErrors } from '../../redux/loginReducer';
import c from './modals.module.css';

type Props = {
    signIn: (email: string, password: string) => void
    closeModal: () => void
    errors: LoginErrors
    clearErrors: () => void
}

let LoginModal = ({signIn, closeModal, errors, clearErrors}: Props) => {

    let [email, setEmail] = useState('');
    let [password, setPassword] = useState('');

    let saveData = () => {
        signIn(email, password);
        errors.email.length === 0 && errors.password.length === 0 && onCloseModal();
    };

    let onCloseModal = () => {
        closeModal();
        clearErrors()
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
                    <TextField
                    error={errors.email.length !== 0}
                    helperText={errors.email}
                    fullWidth={true}
                    label='email'
                    type='email'
                    value={email}
                    onChange={(e) => setEmail(e.target.value)} />
                </Grid>
                <Grid item>
                    <TextField
                    error={errors.password.length !== 0}
                    helperText={errors.password}
                    fullWidth={true}
                    label='password'
                    type='password'
                    value={password} 
                    onChange={(e) => setPassword(e.target.value)} />
                </Grid>
                <Grid className={c.buttonContainer} item>
                    <Button
                    fullWidth={true}
                    className={c.saveButton}
                    onClick={saveData}
                    variant='contained'>Сохранить</Button>
                </Grid>
            </div>
        </Grid>
    </Modal>
}

export default LoginModal;