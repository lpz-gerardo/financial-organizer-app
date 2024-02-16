import React from 'react';
import { useState, useEffect } from 'react';
import Box from '@mui/material/Box';

import { REACT_APP_DEV_URL } from '../../config.js';
import NavBar from '../components/NavBar.jsx';
import MemberTable from '../components/MemberTable';
import AccountTable from '../components/AccountTable.jsx';
import PaymentTable from '../components/PaymentTable.jsx';

const Home = () => {
    const [members, setMembers] = useState([]);
    const [accounts, setAccounts] = useState([]);

    async function getMemberData() {
        fetch(REACT_APP_DEV_URL + 'member', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        }).then((response) => {
            return response.json();
        }).then((data) => {
            setMembers(data.data);
        });
    }

    async function getAccountData() {
        fetch(REACT_APP_DEV_URL + 'account', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        }).then((response) => {
            return response.json();
        }).then((data) => {
            setAccounts(data.data);
        });
    }

    const getData = () => {
        getMemberData();
        getAccountData();
    }

    useEffect(() => {
        getData();
    }, []);

    return(
        <React.Fragment>
            <NavBar />
            <Box className={'box-home-wrapper'}>
                <Box className={'home-wrapper'}>
                    <Box className={'member-table'}>
                        <MemberTable
                            members={members}
                            refreshData={getData}
                        />
                    </Box>
                    <Box className={'account-table'}>
                        <AccountTable
                            accounts={accounts}
                            members={members}
                            refreshData={getData}
                        />
                    </Box>
                    <Box className={'payment-table'}>
                        <PaymentTable
                            accounts={accounts}
                        />
                    </Box>
                </Box>
            </Box>
        </React.Fragment>
    )
}

export default Home;