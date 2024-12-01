import React from "react";
import {Routes, Route, Navigate} from 'react-router-dom';
import {useSelector} from 'react-redux';
import {selectAuthUserToken} from '../store/selectors/index.js';
import AuthPage from "../pages/AuthPage.jsx";
import UserAccount from "../pages/UserAccount.jsx";
import EditAccount from "../pages/EditAccount.jsx";
import Home from "../pages/Home.jsx";
import Appointments from "@/pages/Appointments.jsx";

const ProtectedRoute = ({children}) => {
    const isUser = Boolean(useSelector(selectAuthUserToken));
    return isUser ? children : <Navigate to="/"/>;
};

const RootRouter = () => {
    const isUser = Boolean(useSelector(selectAuthUserToken));

    return (
        <>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path='/sign-in' element={<AuthPage />} />

                <Route
                    path="/appointments"
                    element={
                        <ProtectedRoute>
                            <Appointments />
                        </ProtectedRoute>
                    }
                />

                {/*<Route*/}
                {/*    path="/profile"*/}
                {/*    element={*/}
                {/*        <ProtectedRoute>*/}
                {/*            <UserAccount />*/}
                {/*        </ProtectedRoute>*/}
                {/*    }*/}
                {/*/>*/}

                {/*<Route*/}
                {/*    path="/profile/:userId"*/}
                {/*    element={*/}
                {/*        <ProtectedRoute>*/}
                {/*            <UserAccount />*/}
                {/*        </ProtectedRoute>*/}
                {/*    }*/}
                {/*/>*/}

                <Route
                    path="/settings"
                    element={
                        <ProtectedRoute>
                            <EditAccount />
                        </ProtectedRoute>
                    }
                />
            </Routes>
        </>
    );
};

export default RootRouter;
