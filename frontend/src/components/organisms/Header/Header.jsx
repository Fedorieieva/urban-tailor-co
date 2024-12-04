import React, {useEffect, useRef, useState} from "react";
import style from './style.module.scss';
import SocialMedia from "@/components/molecules/SocialMedia/SocialMedia.jsx";
import Phone from '../../../../public/images/icons/phone.svg?react';
import Letter from '../../../../public/images/icons/letter.svg?react';
import Typography from "@/shared/ui/Typography/Tupography.jsx";
import Button from "@/components/atoms/Button/Button.jsx";
import Logo from "@/components/molecules/Logo/Logo.jsx";
import cn from 'classnames';
import PropTypes from "prop-types";
import {useLocation} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {selectAuthUserToken, selectUser} from "@/store/selectors/index.js";
import {actionClearUserData} from "@/store/reducers/auth.reducer.js";
import RoundIcon from "@/components/atoms/RoundIcon/RoundIcon.jsx";
import UserHeader from "@/components/molecules/UserHeader/UserHeader.jsx";

const Header = ({className}) => {
    const location = useLocation();
    const isSignInPage = location.pathname === '/sign-in';
    const dispatch = useDispatch();
    const userToken = useSelector(selectAuthUserToken);
    const user = useSelector(selectUser);
    const [panel, setPanel] = useState(false);
    const panelRef = useRef();

    const handleLogOut = () => {
        dispatch(actionClearUserData())
    }

    const handleClickOutside = (event) => {
        if (panelRef.current && !panelRef.current.contains(event.target)) {
            setPanel(false);
        }
    }

    useEffect(() => {
        if (panel) {
            document.addEventListener('mousedown', handleClickOutside);
        } else {
            document.removeEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        }
    }, [panel]);

    return (
        <header className={cn(style.header, className)}>
            <div className={style.contact}>
                <SocialMedia/>

                <div className={style.contactInfo}>
                    <div className={style.contacts}>
                        <Phone/>
                        <Typography variant='text-xxs'>021-3456-789</Typography>
                    </div>
                    <div className={style.contacts}>
                        <Letter/>
                        <Typography variant='text-xxs'>urbantc@gmail.com</Typography>
                    </div>
                </div>
            </div>

            <div className={style.headerNav}>
                <Logo/>

                {!isSignInPage && (
                    <>
                        <nav className={style.nav}>
                            <Button to='/' variant='transparent'>Home</Button>

                            {userToken && user.userType === 'user' && <Button to='/appointments' variant='transparent'>Appointments</Button>}

                            {userToken && user.userType === 'admin' && (
                                <>
                                    <Button to='/create-user' variant='transparent'>Create User</Button>
                                    <Button to='/all-users' variant='transparent'>Users</Button>
                                </>
                            )}

                            {userToken && user.userType === 'tailor' && (
                                <>
                                    <Button to='/tailor-appointments' variant='transparent'>Appointments</Button>
                                </>
                            )}
                        </nav>

                        {userToken ? (
                            <div className={style.managingUser} ref={panelRef}>
                                <Button variant='transparent' onClick={() => setPanel(!panel)}>
                                    <UserHeader userAvatar={user.userAvatar} username={user.username}/>
                                </Button>

                                {panel && (
                                    <div className={style.userPanel}>
                                        <Button variant='transparent' to='/settings'>
                                            <Typography colored>Settings</Typography>
                                        </Button>
                                        <Button variant='transparent' onClick={handleLogOut}>
                                            <Typography colored>Log Out</Typography>
                                        </Button>
                                    </div>
                                )}
                            </div>
                        ) : (
                            <Button variant='secondary' to='/sign-in'>
                                Sign In
                            </Button>
                        )}
                    </>
                )}
            </div>
        </header>
    );
};

Header.propTypes = {
    className: PropTypes.string
}

export default Header;