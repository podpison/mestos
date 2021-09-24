import { Button, Grid, Modal, TextField, Checkbox } from '@material-ui/core';
import { useState } from 'react';
import { LoginErrors } from '../../redux/loginReducer';
import c from './modals.module.css';

type Props = {
    signUp: (nameAndLastName: string, profession: string, email: string, password: string, isGetEmailVerefication: boolean) => void;
    closeModal: () => void
    errors: LoginErrors
    clearErrors: () => void
}

let RegistrationModal = ({signUp, closeModal, errors, clearErrors}: Props) => {
    let [nameAndLastName, setNameAndLastName] = useState('');
    let [isNameAndLastNameError, setIsNameAndLastNameError] = useState(false);
    let [profession, setProfession] = useState('');
    let [isProfessionError, setIsProfessionError] = useState(false);
    // these errors come here from an errors object because they are from firebase
    let [email, setEmail] = useState('');
    let [password, setPassword] = useState('');

    let [isGetEmailVerefication, setIsGetEmailVerefication] = useState(false);

    let saveData = () => {
        nameAndLastName.length === 0 ? setIsNameAndLastNameError(true) : setIsNameAndLastNameError(false);
        profession.length === 0 ? setIsProfessionError(true) : setIsProfessionError(false);
        (nameAndLastName.length && profession.length !== 0) && signUp(nameAndLastName, profession, email, password, isGetEmailVerefication);
        errors.email.length === 0 && errors.password.length === 0 && onCloseModal();
    };

    let onCloseModal = () => {
        closeModal();
        clearErrors()
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
                    <TextField
                    error={isNameAndLastNameError}
                    fullWidth={true}
                    label='name and last name'
                    value={nameAndLastName}
                    onChange={(e) => setNameAndLastName(e.target.value)} 
                    />
                </Grid>
                <Grid item>
                    <TextField
                    error={isProfessionError}
                    fullWidth={true}
                    label='profession'
                    value={profession}
                    onChange={(e) => setProfession(e.target.value)}
                    />
                </Grid>
                <Grid item>
                    <TextField
                    error={errors.email.length !== 0}
                    helperText={errors.email}
                    fullWidth={true}
                    type='email'
                    label='email'
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    />
                </Grid>
                <Grid item>
                    <TextField
                    error={errors.password.length !== 0}
                    helperText={errors.password}
                    fullWidth={true}
                    type='password'
                    label='password'
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    />
                </Grid>
                <Grid item>
                    <div className={c.emailVerefication}>  
                        <Checkbox className={c.emailVereficationCheckbox} onClick={() => setIsGetEmailVerefication(!isGetEmailVerefication)} checked={isGetEmailVerefication} />
                        <p>Подтвердить почту</p>
                    </div>
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

export default RegistrationModal;