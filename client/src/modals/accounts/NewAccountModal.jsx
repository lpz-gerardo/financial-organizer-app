import React from 'react';
import { useState } from 'react';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

const modalStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 350,
    bgcolor: '#edf0f5',
    boxShadow: 24,
    padding: 8,
}

const NewAccountModal = ({ isModalOpen, handleClose }) => {
    const [newAccountForm, setNewAccountForm] = useState({
        'accountName': '',
        'memberName': '',
        'creditLimit': '',
        'debt': '',
        'monthlyPayment': '',
        'annualPercentRate': '',
        'paymentDay': '',
    });

    return (
        <React.Fragment>
            <Modal open={isModalOpen} onClose={handleClose}>
                <Box sx={modalStyle}>
                    <Typography variant='h5' color={'black'}>Add New Account</Typography>
                    <form >
                        <Box sx={{ marginTop: 3, marginBottom: 3}}>
                            <TextField
                                required
                                type='input'
                                color='primary'
                                variant='outlined'
                                name='accountName'
                                label='Account Name'
                                value={newAccountForm.accountName}
                            />
                        </Box>
                        <Box sx={{ marginTop: 3, marginBottom: 3}}>
                            <TextField
                                required
                                type='input'
                                color='primary'
                                variant='outlined'
                                name='memberName'
                                label='Member'
                                value={newAccountForm.memberName}
                            />
                        </Box>
                        <Box sx={{ marginTop: 3, marginBottom: 3}}>
                            <TextField
                                required
                                type='input'
                                color='primary'
                                variant='outlined'
                                name='creditLimit'
                                label='Credit Limit'
                                value={newAccountForm.creditLimit}
                            />
                        </Box>
                        <Box sx={{ marginTop: 3, marginBottom: 3}}>
                            <TextField
                                required
                                type='input'
                                color='primary'
                                variant='outlined'
                                name='debt'
                                label='Debt'
                                value={newAccountForm.debt}
                            />
                        </Box>
                        <Box sx={{ marginTop: 3, marginBottom: 3}}>
                            <TextField
                                required
                                type='input'
                                color='primary'
                                variant='outlined'
                                name='monthlyPayment'
                                label='Monthly Payment'
                                value={newAccountForm.monthlyPayment}
                            />
                        </Box>
                        <Box sx={{ marginTop: 3, marginBottom: 3}}>
                            <TextField
                                required
                                type='input'
                                color='primary'
                                variant='outlined'
                                name='annualPercentRate'
                                label='Annual Percent Rate'
                                value={newAccountForm.annualPercentRate}
                            />
                        </Box>
                        <Box sx={{ marginTop: 3, marginBottom: 3}}>
                            <TextField
                                required
                                type='input'
                                color='primary'
                                variant='outlined'
                                name='paymentDay'
                                label='Payment Day'
                                value={newAccountForm.paymentDay}
                            />
                        </Box>
                        <Button type='submit'>
                            Submit
                        </Button>
                    </form>
                </Box>
            </Modal>
        </React.Fragment>
    )
}

export default NewAccountModal;