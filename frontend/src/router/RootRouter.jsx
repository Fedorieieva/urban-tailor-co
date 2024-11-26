import React from "react";
import {Routes, Route, Navigate} from 'react-router-dom';
import {useSelector} from 'react-redux';
import {selectAuthUserToken} from '../store/selectors/index.js';
import AuthPage from "../pages/AuthPage.jsx";
import UserAccount from "../pages/UserAccount.jsx";
import EditAccount from "../pages/EditAccount.jsx";
import Home from "../pages/Home.jsx";
import EditUserPassword from "../pages/EditUserPassword.jsx";

const ProtectedRoute = ({children}) => {
    const isUser = Boolean(useSelector(selectAuthUserToken));
    return isUser ? children : <Navigate to="/"/>;
};

const RootRouter = () => {
    const isUser = Boolean(useSelector(selectAuthUserToken));

    return (
        <>
            <Routes>
                <Route path="/" element={<AuthPage />} />

                <Route
                    path="/home"
                    element={
                        <ProtectedRoute>
                            <Home />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/profile"
                    element={
                        <ProtectedRoute>
                            <UserAccount />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/profile/:userId"
                    element={
                        <ProtectedRoute>
                            <UserAccount />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/profile/edit"
                    element={
                        <ProtectedRoute>
                            <EditAccount />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/profile/edit/password"
                    element={
                        <ProtectedRoute>
                            <EditUserPassword />
                        </ProtectedRoute>
                    }
                />
            </Routes>
        </>
    );
};

export default RootRouter;
