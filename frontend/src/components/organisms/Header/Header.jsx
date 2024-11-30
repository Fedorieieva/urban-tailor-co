import React from "react";
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
import {selectAuthUserToken} from "@/store/selectors/index.js";
import {actionClearUserData} from "@/store/reducers/auth.reducer.js";

const Header = ({className}) => {
    const location = useLocation();
    const isSignInPage = location.pathname === '/sign-in';
    const dispatch = useDispatch();
    const userToken = useSelector(selectAuthUserToken);

    const handleLogOut = () => {
        dispatch(actionClearUserData())
    }

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
                            <Button to='/'>Home</Button>

                            {userToken && <Button to='/appointments'>Appointments</Button>}
                        </nav>

                        {userToken ? (
                            <Button variant='secondary' onClick={handleLogOut}>
                                Log Out
                            </Button>
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