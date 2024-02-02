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
import Collapse from '@mui/material/Collapse';
import KeyboardArrowDown from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUp from '@mui/icons-material/KeyboardArrowUp';

const PaymentTable = ({ accounts }) => {
    const [calendar, setCalendar] = useState([]);
    const [isOpen, setIsOpen] = useState({});

    function getCalendar() {
        let calendarData = [];
        for (let i = 1; i <= 31; i++) {
            calendarData[i] = {
                id: i,
                amount: 0,
                rows: [],
            };
        }

        for (const account of Object.values(accounts)) {
            calendarData[account.paymentDay]['amount'] += account.minimumMonthlyPayment;
            calendarData[account.paymentDay]['rows'].push({
                account: account.name,
                member: account.memberName,
                amount: account.minimumMonthlyPayment,
            });
        }

        setCalendar(calendarData);
    }

    const formatMoney = (amount) => {
        return '$' + String(Number.parseFloat(amount).toFixed(2));
    }

    const toggleRows = (day) => {
        setIsOpen((previous) => ({
            ...previous,
            [day]: !(previous[day]),
        }));
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
                                <React.Fragment key={day.id}>
                                    <TableRow key={day.id}>
                                        <TableCell size='small'>
                                            {(day.rows.length != 0) && (
                                                <IconButton size='small' onClick={() => toggleRows(day.id)}>
                                                    {isOpen[day.id] ? <KeyboardArrowUp /> : <KeyboardArrowDown />}
                                                </IconButton>
                                            )}
                                        </TableCell>
                                        <TableCell size='small' align='center'>{day.id}</TableCell>
                                        <TableCell size='small' align='center'>{formatMoney(day.amount)}</TableCell>
                                    </TableRow>
                                    <TableRow key={'individual-info' + day.id}>
                                        <TableCell sx={{ paddingBottom: 0, paddingTop: 0}} colSpan={3}>
                                            <Collapse in={isOpen[day.id]}>
                                                <Table>
                                                    <TableHead>
                                                        <TableRow key={'nested-table-header' + day.id}>
                                                            <TableCell size='small'>Accounts</TableCell>
                                                            <TableCell size='small'>Members</TableCell>
                                                            <TableCell size='small'>Amount</TableCell>
                                                        </TableRow>
                                                    </TableHead>
                                                    <TableBody>
                                                        {day['rows'].map((row) => (
                                                            <TableRow key={row.account+row.member}>
                                                                <TableCell size='small'>{row.account}</TableCell>
                                                                <TableCell size='small'>{row.member}</TableCell>
                                                                <TableCell size='small'>{formatMoney(row.amount)}</TableCell>
                                                            </TableRow>
                                                        ))}
                                                    </TableBody>
                                                </Table>
                                            </Collapse>
                                        </TableCell>
                                    </TableRow>
                                </React.Fragment>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Box>
        </React.Fragment>
    )
}

export default PaymentTable;