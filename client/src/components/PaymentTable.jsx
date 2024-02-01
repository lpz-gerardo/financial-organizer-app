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

const PaymentTable = () => {
    const [calendar, setCalendar] = useState([]);

    function getCalendar() {
        let calendar = [];
        for (let i = 1; i <= 31; i++) {
            calendar[i] = {
                id: i,
                amount: 0,
            };
        }

        setCalendar(calendar);
    }

    useEffect(() => {
        getCalendar();
    }, [])

    return (
        <React.Fragment>
            <Box sx={{ maxWidth: '100%', maxHeight: '900px' }}>
                <TableContainer component={Paper}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell align='center' colSpan={2}>
                                    <Typography variant='h4'>Payments</Typography>
                                </TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell size='small' align='center'><Typography variant='body1'>Day</Typography></TableCell>
                                <TableCell size='small' align='center'><Typography variant='body1'>Amount</Typography></TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {calendar.map((day) => (
                                <TableRow key={day.id}>
                                    <TableCell size='small' align='center'>{day.id}</TableCell>
                                    <TableCell size='small' align='center'>$0.00</TableCell>
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