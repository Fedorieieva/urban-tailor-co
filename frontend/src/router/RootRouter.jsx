import React from "react";
import PropTypes from "prop-types";
import {Routes, Route, Navigate} from 'react-router-dom';
import {useSelector} from 'react-redux';
import {selectAuthUserToken, selectUser} from '../store/selectors/index.js';
import AuthPage from "../pages/AuthPage.jsx";
import EditAccount from "../pages/EditAccount.jsx";
import Home from "../pages/Home.jsx";
import Appointments from "@/pages/Appointments.jsx";
import CreateUserPage from "@/pages/CreateUserPage.jsx";
import AllUsersPage from "@/pages/AllUsersPage.jsx";
import TailorAppointments from "@/pages/TailorAppointments.jsx";
import TailorPortfolioPage from "@/pages/TailorPortfolioPage.jsx";
import Tailors from "@/pages/Tailors.jsx";
import NotFound from "@/pages/NotFound.jsx";

const ProtectedRoute = ({children}) => {
    const isUser = Boolean(useSelector(selectAuthUserToken));
    return isUser ? children : <Navigate to="/"/>;
};

ProtectedRoute.propTypes = {
    children: PropTypes.node.isRequired,
};

const AdminProtectedRoute = ({children}) => {
    const user = useSelector(selectUser);
    const isAdmin = user?.userType === "admin";
    return isAdmin ? children : <Navigate to="/"/>;
};

AdminProtectedRoute.propTypes = {
    children: PropTypes.node.isRequired,
};

const TailorProtectedRoute = ({children}) => {
    const user = useSelector(selectUser);
    const isAdmin = user?.userType === "tailor";
    return isAdmin ? children : <Navigate to="/"/>;
};

TailorProtectedRoute.propTypes = {
    children: PropTypes.node.isRequired,
};

const RootRouter = () => {
    return (
        <Routes>
            <Route path="/" element={<Home/>}/>
            <Route path='/sign-in' element={<AuthPage/>}/>

            <Route
                path="/appointments"
                element={
                    <ProtectedRoute>
                        <Appointments/>
                    </ProtectedRoute>
                }
            />

            <Route
                path="/tailors"
                element={
                    <ProtectedRoute>
                        <Tailors/>
                    </ProtectedRoute>
                }
            />

            <Route
                path="/create-user"
                element={
                    <AdminProtectedRoute>
                        <CreateUserPage/>
                    </AdminProtectedRoute>
                }
            />

            <Route
                path="/all-users"
                element={
                    <AdminProtectedRoute>
                        <AllUsersPage/>
                    </AdminProtectedRoute>
                }
            />

            <Route
                path="/tailor-appointments"
                element={
                    <TailorProtectedRoute>
                        <TailorAppointments/>
                    </TailorProtectedRoute>
                }
            />

            <Route
                path="/tailor-portfolio"
                element={
                    <TailorProtectedRoute>
                        <TailorPortfolioPage/>
                    </TailorProtectedRoute>
                }
            />

            <Route
                path="/settings"
                element={
                    <ProtectedRoute>
                        <EditAccount/>
                    </ProtectedRoute>
                }
            />

            <Route path="*" element={<NotFound/>}/>
        </Routes>
    );
};

export default RootRouter;
