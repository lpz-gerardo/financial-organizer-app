import React from 'react';
import { useState } from 'react';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

import { REACT_APP_DEV_URL } from '../../../config.js';

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

const EditAccountModal = ({ isModalOpen, handleClose, selectedAccount, refreshData }) => {
    const [editAccountDetails, setEditAccountDetails] = useState({
        'remainingDebt': '',
        'monthlyPayment': '',
        'annualPercentRate': '',
    });
    const [editAccountDetailErrors, setEditAccountDetailErrors] = useState({
        'remainingDebtError': false,
        'monthlyPaymentError': false,
        'annualPercentRateError': false,
    });

    const handleInputChanges = (prop, value) => {
        setEditAccountDetails({
            ...editAccountDetails,
            [prop]: value,
        });
        handleValidation(prop, value);
    }

    const handleValidation = (prop, value) => {
        switch (prop) {
            case 'remainingDebt':
                isRemainingDebtInputValid(value);
                break;
            case 'monthlyPayment':
                isMonthlyPaymentInputValid(value);
                break;
            case 'annualPercentRate':
                isAnnualPercentRateInputValid(value);
                break;
        }
    }

    const isRemainingDebtInputValid = (input) => {
        const regex = /^[0-9]{0,7}((?:[.]([0-9]{1,2})){0,1})$/;
        handelInputErrors('remainingDebtError', input, regex);
    }

    const isMonthlyPaymentInputValid = (input) => {
        const regex = /^[0-9]{0,7}((?:[.]([0-9]{1,2})){0,1})$/;
        handelInputErrors('monthlyPaymentError', input, regex);
    }

    const isAnnualPercentRateInputValid = (input) => {
        const regex = /^[0-9]{0,3}((?:[.]([0-9]{1,2})){0,1})$/;
        handelInputErrors('annualPercentRateError', input, regex);
    }

    const handelInputErrors = (prop, value, regex) => {
        setEditAccountDetailErrors({
            ...editAccountDetailErrors,
            [prop]: (!value.match(regex)) ? true : false,
        });
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        const data = {
            'remainingDebt': editAccountDetails.remainingDebt,
            'monthlyPayment': editAccountDetails.monthlyPayment,
            'annualPercentRate': editAccountDetails.annualPercentRate,
        };
        updateAccount(REACT_APP_DEV_URL + `account/${selectedAccount.id}`, data);
        refreshData();
        handleCloseModal();
    }

    async function updateAccount(url, data) {
        const response = await fetch(url, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });
        const account = await response.json();
        console.log(account);
    }

    const handleCloseModal = () => {
        setEditAccountDetails({
            ...editAccountDetails,
            'remainingDebt': '',
            'monthlyPayment': '',
            'annualPercentRate': '',
        });
        setEditAccountDetailErrors({
            ...editAccountDetailErrors,
            'remainingDebtError': false,
            'monthlyPaymentError': false,
            'annualPercentRateError': false,
        });

        handleClose();
    }

    return (
        <React.Fragment>
            <Modal open={isModalOpen} onClose={handleCloseModal}>
                <Box sx={modalStyle}>
                    <Typography variant='h6' component='h2' color='black'>Edit "{selectedAccount.name}" Account</Typography>
                    <form onSubmit={handleSubmit}>
                        <Box sx={{ marginBottom: '15px', marginTop: '15px' }}>
                            <TextField
                                type='text'
                                color='primary'
                                variant='outlined'
                                name='editAccountDebt'
                                label='Remaining Debt'
                                value={editAccountDetails.remainingDebt}
                                error={editAccountDetailErrors.remainingDebtError}
                                onChange={e => handleInputChanges('remainingDebt', e.target.value)}
                                helperText={editAccountDetailErrors.remainingDebtError ? 'Max 9 numbers with decimal. [0-9]' : ''}
                            />
                            <Box sx={{ marginLeft: '10px', marginTop: '5px'}}>
                                <Typography color={'grey'} variant='italic'> Current Value: ${selectedAccount.debt}</Typography>
                            </Box>
                        </Box>
                        <Box sx={{ marginBottom: '15px' }}>
                            <TextField
                                type='text'
                                color='primary'
                                variant='outlined'
                                name='editAccountMonthlyPayment'
                                label='Monthly Payment'
                                value={editAccountDetails.monthlyPayment}
                                error={editAccountDetailErrors.monthlyPaymentError}
                                onChange={e => handleInputChanges('monthlyPayment', e.target.value)}
                                helperText={editAccountDetailErrors.monthlyPaymentError ? 'Max 9 numbers with decimal. [0-9]' : ''}
                            />
                            <Box sx={{ marginLeft: '10px', marginTop: '5px'}}>
                                <Typography color={'grey'} variant='italic'> Current Value: ${selectedAccount.monthlyPayment}</Typography>
                            </Box>
                        </Box>
                        <Box>
                            <TextField
                                type='text'
                                color='primary'
                                variant='outlined'
                                name='editAccountAnnualPercentRate'
                                label='Annual Percent Rate'
                                value={editAccountDetails.annualPercentRate}
                                error={editAccountDetailErrors.annualPercentRateError}
                                onChange={e => handleInputChanges('annualPercentRate', e.target.value)}
                                helperText={editAccountDetailErrors.annualPercentRateError ? 'Max 5 numbers with decimal. [0-9]' : ''}
                            />
                            <Box sx={{ marginLeft: '10px', marginTop: '5px'}}>
                                <Typography color={'grey'} variant='italic'> Current Value: {selectedAccount.annualPercentRate}%</Typography>
                            </Box>
                        </Box>
                        <Box sx={{ marginTop: '15px'}}>
                            <Button type='submit' variant='contained'>Submit</Button>
                        </Box>
                    </form>
                </Box>
            </Modal>
        </React.Fragment>
    )
}

export default EditAccountModal;