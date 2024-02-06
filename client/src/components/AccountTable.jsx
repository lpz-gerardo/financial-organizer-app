import React from 'react';
import { useState, useEffect } from 'react';
import TableContainer from '@mui/material/TableContainer';
import Table from '@mui/material/Table';
import TableHead from '@mui/material/TableHead';
import TableBody from '@mui/material/TableBody';
import TableFooter from '@mui/material/TableFooter';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Chip from '@mui/material/Chip';
import Edit from '@mui/icons-material/Edit';
import Delete from '@mui/icons-material/Delete';

import NewAccountModal from '../modals/accounts/NewAccountModal';
import EditAccountModal from '../modals/accounts/EditAccountModal';
import DeleteAccountModal from '../modals/accounts/DeleteAccountModal';

import { formatMoney, formatPercent } from '../util/formatter';

const AccountTable = ({ accounts, members, refreshData }) => {
    const [isTableEmpty, setIsTableEmpty] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [selectedAccount, setSelectedAccount] = useState('');

    const toggleNewAccountModal = () => setIsModalOpen(!isModalOpen);
    const toggleEditAccountModal = () => setIsEditModalOpen(!isEditModalOpen);
    const toggleDeleteModal = () => setIsDeleteModalOpen(!isDeleteModalOpen);

    const handleEditClick = (account) => {
        setSelectedAccount(account);
        toggleEditAccountModal();
    }

    const handleDeleteAccountClick = (accountId) => {
        setSelectedAccount(accountId);
        toggleDeleteModal();
    }

    const calculateTotal = (column) => {
        let total = 0;
        if (!accounts) {
            return total;
        }

        total = getTotal(column);
        return formatMoney(total);
    }

    const calculateAnnualPercentRateAverage = () => {
        let annualPercentRateAverage = 0;
        if (!accounts) {
            return annualPercentRateAverage;
        }

        annualPercentRateAverage = (getTotal('annualPercentRate') / accounts.length);

        return formatPercent(annualPercentRateAverage);
    }

    const getTotal = (column) => {
        let sum = 0;
        for (const key of Object.keys(accounts)) {
            for (const [k, v] of Object.entries(accounts[key])) {
                if (k == column) {
                    sum += v;
                }
            }
        }

        return sum;
    }

    useEffect(() => {
        if (accounts.length !== 0) {
            setIsTableEmpty(false);
        } else {
            setIsTableEmpty(true);
        }
    }, [accounts]);

    return (
        <React.Fragment>
            {isTableEmpty ?
                <TableContainer component={Paper}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell align='center'>
                                    <Typography variant='h4'>Accounts</Typography>
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
                                    <Typography variant='h4'>Accounts</Typography>
                                </TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell align='center'><Typography variant='body1'>Account</Typography></TableCell>
                                <TableCell align='center'><Typography variant='body1'>Member</Typography></TableCell>
                                <TableCell align='center'><Typography variant='body1'>Starting Debt</Typography></TableCell>
                                <TableCell align='center'><Typography variant='body1'>Remaining Debt</Typography></TableCell>
                                <TableCell align='center'><Typography variant='body1'>Monthly Payment</Typography></TableCell>
                                <TableCell align='center'><Typography variant='body1'>APR</Typography></TableCell>
                                <TableCell align='center'>
                                    <Button onClick={toggleNewAccountModal}>
                                        <Typography variant='button'>Add Account</Typography>
                                    </Button>
                                </TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {accounts.map((account) => (
                                <TableRow key={account._id}>
                                    <TableCell align='center'>{account.name}</TableCell>
                                    <TableCell align='center'>{account.memberName}</TableCell>
                                    <TableCell align='center'>{formatMoney(account.startingDebt)}</TableCell>
                                    <TableCell align='center'>{formatMoney(account.remainingDebt)}</TableCell>
                                    <TableCell align='center'>{formatMoney(account.minimumMonthlyPayment)}</TableCell>
                                    <TableCell align='center'>{formatPercent(account.annualPercentRate)}</TableCell>
                                    <TableCell align='center'>
                                        <Chip icon={<Edit />} color={'info'} label={'Edit'} sx={{ margin: 1 }} onClick={() => handleEditClick({
                                            id: account._id,
                                            name: account.name,
                                            debt: account.remainingDebt,
                                            monthlyPayment: account.minimumMonthlyPayment,
                                            annualPercentRate: account.annualPercentRate,
                                        })}></Chip>
                                        <Chip icon={<Delete />} color={'error'} label={'Delete'} sx={{ margin: 1 }} onClick={() => handleDeleteAccountClick(account._id)}></Chip>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                        <TableFooter>
                            <TableRow>
                                <TableCell align='center'><Typography>Total</Typography></TableCell>
                                <TableCell align='center'><Typography>-</Typography></TableCell>
                                <TableCell align='center'><Typography>{calculateTotal('startingDebt')}</Typography></TableCell>
                                <TableCell align='center'><Typography>{calculateTotal('remainingDebt')}</Typography></TableCell>
                                <TableCell align='center'><Typography>{calculateTotal('minimumMonthlyPayment')}</Typography></TableCell>
                                <TableCell align='center'><Typography>{calculateAnnualPercentRateAverage()}</Typography></TableCell>
                            </TableRow>
                        </TableFooter>
                    </Table>
                </TableContainer>
            }
            <NewAccountModal
                isModalOpen={isModalOpen}
                handleClose={toggleNewAccountModal}
                members={members}
                refreshData={refreshData}
            />
            <EditAccountModal
                isModalOpen={isEditModalOpen}
                handleClose={toggleEditAccountModal}
                selectedAccount={selectedAccount}
                refreshData={refreshData}
            />
            <DeleteAccountModal
                isModalOpen={isDeleteModalOpen}
                handleClose={toggleDeleteModal}
                selectedAccount={selectedAccount}
                refreshData={refreshData}
            />
        </React.Fragment>
    )
}

export default AccountTable;