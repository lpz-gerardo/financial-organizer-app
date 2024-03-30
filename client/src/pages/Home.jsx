import React from 'react';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setCredentials } from '../slices/authSlice.js';

import Box from '@mui/material/Box';

import Hero from '../components/Hero.jsx';
import MemberTable from '../components/MemberTable';
import AccountTable from '../components/AccountTable.jsx';
import PaymentTable from '../components/PaymentTable.jsx';

const Home = () => {
    const [name, setName] = useState('');
    const [members, setMembers] = useState([]);
    const [accounts, setAccounts] = useState([]);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { userInfo } = useSelector((state) => state.auth);

    const getData = () => {
        getMemberData();
        getAccountData();
    }

    return (
        <>
        {userInfo ? (
            <>
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
            </>
        ) : (
            <>
                <Hero />
            </>
        )}
        </>
    );
};

export default Home;