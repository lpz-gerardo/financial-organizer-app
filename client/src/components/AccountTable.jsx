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

import NewAccountModal from '../modals/accounts/NewAccountModal';

const AccountTable = ({ accounts, members, refreshData }) => {
    const [isTableEmpty, setIsTableEmpty] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const toggleNewAccountModal = () => setIsModalOpen(!isModalOpen);

    const formatMoney = (amount) => {
        return '$' + String(Number.parseFloat(amount).toFixed(2));
    }

    const formatPercent = (percent) => {
        return String(Number.parseFloat(percent).toFixed(2) + '%');
    }

    const calculateStartingDebtTotal = () => {
        let startingDebtTotal = 0;
        if (!accounts) {
            return startingDebtTotal;
        }

        startingDebtTotal = getTotal('startingDebt');

        return formatMoney(startingDebtTotal);
    }

    const calculateRemainingDebtTotal = () => {
        let remainingDebtTotal = 0;
        if (!accounts) {
            return remainingDebtTotal;
        }

        remainingDebtTotal = getTotal('remainingDebt');

        return formatMoney(remainingDebtTotal);
    }

    const calculateMonthlyPaymentTotal = () => {
        let monthlyPaymentTotal = 0;
        if (!accounts) {
            return monthlyPaymentTotal;
        }

        monthlyPaymentTotal = getTotal('minimumMonthlyPayment');

        return formatMoney(monthlyPaymentTotal);
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
                        <TableBody>
                            {accounts.map((account) => (
                                <TableRow key={account._id}>
                                    <TableCell>{account.name}</TableCell>
                                    <TableCell>{account.memberName}</TableCell>
                                    <TableCell>{formatMoney(account.startingDebt)}</TableCell>
                                    <TableCell>{formatMoney(account.remainingDebt)}</TableCell>
                                    <TableCell>{formatMoney(account.minimumMonthlyPayment)}</TableCell>
                                    <TableCell>{formatPercent(account.annualPercentRate)}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                        <TableFooter>
                            <TableRow>
                                <TableCell><Typography>Total</Typography></TableCell>
                                <TableCell><Typography>-</Typography></TableCell>
                                <TableCell><Typography>{calculateStartingDebtTotal()}</Typography></TableCell>
                                <TableCell><Typography>{calculateRemainingDebtTotal()}</Typography></TableCell>
                                <TableCell><Typography>{calculateMonthlyPaymentTotal()}</Typography></TableCell>
                                <TableCell><Typography>{calculateAnnualPercentRateAverage()}</Typography></TableCell>
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
        </React.Fragment>
    )
}

export default AccountTable;