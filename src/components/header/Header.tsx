import { Button } from '@material-ui/core';
import { useState } from 'react';
import RegistrationModal from '../modals/RegistrationModal';
import LoginModal from '../modals/LoginModal';
import c from './header.module.css';

type Props = {
    isAuthorized: boolean
    signUp: (nameAndLastName: string, profession: string, email: string, password: string) => void;
    signIn: (email: string, password: string) => void;
    logOut: () => void;
}

let Header = ({isAuthorized, signUp, signIn, logOut}: Props) => {

    let [isRegistrationModalOpen, setIsRegistrationModalOpen] = useState(false);
    let closeRegistrationModal = () => setIsRegistrationModalOpen(false);

    let [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
    let closeLoginModal = () => setIsLoginModalOpen(false);

    return (
        <header>
            {isRegistrationModalOpen && <RegistrationModal signUp={signUp} closeModal={closeRegistrationModal} />}
            {isLoginModalOpen && <LoginModal signIn={signIn} closeModal={closeLoginModal} />}
                <div className={c.header}>
                    <div className={c.logo}>
                        <h2 className={c.mestos}>Mestos</h2>
                        <p className={c.russia}>Russia</p>
                    </div>
                    <div>
                        {isAuthorized ? <p className={c.logOut} onClick={logOut}>log out</p> : 
                            <div className={c.buttons}>
                                <Button className={c.button} onClick={() => setIsRegistrationModalOpen(true)}>Log up</Button>
                                <Button className={c.button} onClick={() => setIsLoginModalOpen(true)}>Log in</Button>
                            </div>
                        }
                    </div>
                </div>
            <hr />
        </header>
    )
};

export default Header;
