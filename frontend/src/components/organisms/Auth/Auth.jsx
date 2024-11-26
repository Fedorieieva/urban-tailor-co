import React, {useState} from "react";
import LoginForm from "../../molecules/AuthForms/LoginForm.jsx";
import SignUpForm from "../../molecules/AuthForms/SignUpForm.jsx";
import cn from 'classnames';
import style from './style.module.scss';
import Button from "../../atoms/Button/Button.jsx";

const Auth = () => {
    const [activeTab, setActiveTab] = useState('login');

    return (
        <div className={cn(style.authWrapper, activeTab === "login" ? style.loginBg : style.signupBg)}>
            <div className={style.authTabWrapper}>
                <Button
                    className={cn(style.authTab, activeTab === 'login' ? style.authTabLogin : '')}
                    onClick={() => setActiveTab('login')}
                >
                    Log in
                </Button>
                <Button
                    className={cn(style.authTab, activeTab === 'signup' ? style.authTabSignUp : '')}
                    onClick={() => setActiveTab('signup')}
                >
                    Sign Up
                </Button>
            </div>

            <div className={style.authForm}>
                {activeTab === 'login' && <LoginForm/>}
                {activeTab === 'signup' && <SignUpForm/>}
            </div>
        </div>
    );
};

export default Auth