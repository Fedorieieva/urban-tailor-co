import React, {useState} from "react";
import Header from "@/components/organisms/Header/Header.jsx";
import Search from "@/components/molecules/Search/Search.jsx";
import style from './style.module.scss';
import Container from "@/components/atoms/Container/Container.jsx";
import Button from "@/components/atoms/Button/Button.jsx";
import cn from 'classnames';
import SectionTitle from "@/components/molecules/SectionTitle/SectionTitle.jsx";

const AllUsersPage = () => {
    const [tab, setTab] = useState('customer')

    return (
        <Container dark className={style.usersPage}>
            <Header/>

            <div className={style.tabs}>
                <Button
                    variant='transparent'
                    onClick={() => setTab('customer')}
                    className={cn({[style.tabsActive] : tab === 'customer'})}
                >
                    customer users
                </Button>
                <Button
                    variant='transparent'
                    onClick={() => setTab('tailor')}
                    className={cn({[style.tabsActive] : tab === 'tailor'})}
                >
                    tailor users
                </Button>
            </div>

            {tab === 'customer' && (
                <>
                    <SectionTitle mainTitle='view customer appointment history'/>
                    <Search role='user'/>
                </>
            )}
            {tab === 'tailor' && (
                <>
                    <SectionTitle mainTitle='view tailor appointments'/>
                    <Search role='tailor'/>
                </>
            )}
        </Container>
    );
};

export default AllUsersPage