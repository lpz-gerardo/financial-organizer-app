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
            <Box sx={{ width: '100%', height: '800px', justifySelf: 'center' }}>
                <Box display={'grid'} gridTemplateColumns={'repeat(5, 1fr)'} gridTemplateRows={'repeat(3, 1fr)'} columnGap={2} rowGap={2} padding={2}>
                    <Box sx={{ gridColumnStart: 2, gridColumnEnd: 4, gridRowStart: 1, gridRowEnd: 1}}>
                        <MemberTable
                            members={members}
                            refreshData={getData}
                        />
                    </Box>
                    <Box sx={{ gridColumnStart: 2, gridColumnEnd: 4, gridRowStart: 2, gridRowEnd: 2 }}>
                        <AccountTable
                            accounts={accounts}
                            members={members}
                            refreshData={getData}
                        />
                    </Box>
                    <Box sx={{ gridColumnStart: 4, gridColumnEnd: 5, gridRowStart: 1, gridRowEnd: 3 }}>
                        <PaymentTable />
                    </Box>
                </Box>
            </Box>
        </React.Fragment>
    )
}

export default Home;