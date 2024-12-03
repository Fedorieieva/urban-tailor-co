import React, {useState} from "react";
import Header from "@/components/organisms/Header/Header.jsx";
import Search from "@/components/molecules/Search/Search.jsx";
import style from './style.module.scss';
import Container from "@/components/atoms/Container/Container.jsx";
import Button from "@/components/atoms/Button/Button.jsx";
import cn from 'classnames';

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

            {tab === 'customer' && <Search role='user'/>}
            {tab === 'tailor' && <Search role='tailor'/>}
        </Container>
    );
};

export default AllUsersPage