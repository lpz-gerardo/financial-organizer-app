import React from 'react';
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
                    </Table>
                </TableContainer>
            </Box>
        </React.Fragment>
    )
}

export default PaymentTable;