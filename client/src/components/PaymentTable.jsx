import React from 'react';
import { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import TableContainer from '@mui/material/TableContainer';
import Table from '@mui/material/Table';
import TableHead from '@mui/material/TableHead';
import TableBody from '@mui/material/TableBody';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';

const PaymentTable = ({ accounts }) => {
    const [calendar, setCalendar] = useState([]);

    function getCalendar() {
        let calendar = [];
        for (let i = 1; i <= 31; i++) {
            calendar[i] = {
                id: i,
                amount: 0,
            };
        }

        for (const account of Object.values(accounts)) {
            calendar[account.paymentDay]['amount'] += account.minimumMonthlyPayment;
        }

        setCalendar(calendar);
    }

    const formatMoney = (amount) => {
        return '$' + String(Number.parseFloat(amount).toFixed(2));
    }

    useEffect(() => {
        getCalendar();
    }, [accounts])

    return (
        <React.Fragment>
            <Box sx={{ maxWidth: '100%', maxHeight: '900px' }}>
                <TableContainer component={Paper}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell align='center' colSpan={3}>
                                    <Typography variant='h4'>Payments</Typography>
                                </TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell size='small'></TableCell>
                                <TableCell size='small' align='center'><Typography variant='body1'>Day</Typography></TableCell>
                                <TableCell size='small' align='center'><Typography variant='body1'>Amount</Typography></TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {calendar.map((day) => (
                                <TableRow key={day.id}>
                                    <TableCell size='small' ><IconButton size='small'></IconButton></TableCell>
                                    <TableCell size='small' align='center'>{day.id}</TableCell>
                                    <TableCell size='small' align='center'>{formatMoney(day.amount)}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Box>
        </React.Fragment>
    )
}

export default PaymentTable;