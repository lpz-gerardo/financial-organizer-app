import React from 'react';
import { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import TableContainer from '@mui/material/TableContainer';
import Table from '@mui/material/Table';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';

import { REACT_APP_DEV_URL } from '../../config.js';
import MemberTable from '../components/MemberTable';
import AccountTable from '../components/AccountTable.jsx';


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
        getAccountData();
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

    useEffect(() => {
        getMemberData();
    }, []);

    return(
        <React.Fragment>
            <Box sx={{ width: '100%', height: '800px', justifySelf: 'center' }}>
                <Box display={'grid'} gridTemplateColumns={'repeat(5, 1fr)'} gridTemplateRows={'repeat(2, 1fr)'} columnGap={2} rowGap={2} padding={2}>
                    <Box sx={{ gridColumnStart: 2, gridColumnEnd: 4, gridRowStart: 1, gridRowEnd: 1}}>
                        <MemberTable
                            members={members}
                            handleUpdateMembers={getMemberData}
                        />
                    </Box>
                    <Box sx={{ gridColumnStart: 2, gridColumnEnd: 4, gridRowStart: 2, gridRowEnd: 2 }}>
                        <AccountTable
                            accounts={accounts}
                        />
                    </Box>
                    <Box sx={{ gridColumnStart: 4, gridColumnEnd: 5, gridRowStart: 1, gridRowEnd: 2 }}>
                        <Box sx={{ maxWidth: '100%', maxHeight: '900px' }}>
                            <TableContainer component={Paper}>
                                <Table>
                                    <TableHead>
                                        <TableRow>
                                            <TableCell align={'center'} colSpan={2}>
                                                <Typography variant='h4'>Payment Calendar</Typography>
                                            </TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell size='small' align='center'><Typography variant='body1'>Day</Typography></TableCell>
                                            <TableCell size='small' align='center'><Typography variant='body1'>Amount</Typography></TableCell>
                                        </TableRow>
                                    </TableHead>
                                </Table>
                            </TableContainer>
                        </Box>
                        
                    </Box>
                </Box>
            </Box>
        </React.Fragment>
    )
}

export default Home;