import React from 'react'
import './App.scss'
import RootRouter from "./router/RootRouter.jsx";
import Footer from "@/components/organisms/Footer/Footer.jsx";

function App() {
    return (
        <>
            <RootRouter/>
            <Footer/>
        </>
    )
}

export default App
