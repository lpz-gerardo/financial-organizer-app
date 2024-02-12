import React from 'react';
import { useState, useEffect } from 'react';
import Box from '@mui/material/Box';

import { REACT_APP_DEV_URL } from '../../config.js';
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
            <Box className={'box-home-wrapper'}>
                <Box className={'grid-box-wrapper'}>
                    <Box className={'grid-box-member-table'}>
                        <MemberTable
                            members={members}
                            refreshData={getData}
                        />
                    </Box>
                    <Box className={'grid-box-account-table'}>
                        <AccountTable
                            accounts={accounts}
                            members={members}
                            refreshData={getData}
                        />
                    </Box>
                    <Box className={'grid-box-payment-table'}>
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