import React from 'react';
import { useState } from 'react';
import TableContainer from '@mui/material/TableContainer';
import Table from '@mui/material/Table';
import TableHead from '@mui/material/TableHead';
import TableBody from '@mui/material/TableBody';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

import NewAccountModal from '../modals/accounts/NewAccountModal';

const AccountTable = ({ accounts }) => {
    const [isTableEmpty, setIsTableEmpty] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const toggleNewAccountModal = () => setIsModalOpen(!isModalOpen);

    return (
        <React.Fragment>
            {isTableEmpty ?
                <TableContainer component={Paper}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell align='center'>
                                    <Typography variant='h4'>Account Table</Typography>
                                </TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            <TableRow>
                                <TableCell align='center'>
                                    <Button onClick={toggleNewAccountModal}>
                                        <Typography variant='body1'>Add Account</Typography>
                                    </Button>
                                </TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </TableContainer>
            :
                <TableContainer component={Paper}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell align='center' colSpan={7}>
                                    <Typography variant='h4'>Account Priority Table</Typography>
                                </TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell><Typography>Account</Typography></TableCell>
                                <TableCell><Typography>Member</Typography></TableCell>
                                <TableCell><Typography>Starting Debt</Typography></TableCell>
                                <TableCell><Typography>Remaining Debt</Typography></TableCell>
                                <TableCell><Typography>Monthly Payment</Typography></TableCell>
                                <TableCell><Typography>APR</Typography></TableCell>
                                <TableCell align='center'>
                                    <Button onClick={toggleNewAccountModal}>
                                        <Typography variant='body1'>Add Account</Typography>
                                    </Button>
                                </TableCell>
                            </TableRow>
                        </TableHead>
                    </Table>
                </TableContainer>
            }
            <NewAccountModal
                isModalOpen={isModalOpen}
                handleClose={toggleNewAccountModal}
            />
        </React.Fragment>
    )
}

export default AccountTable;