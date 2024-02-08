import React from 'react';
import { useState } from 'react';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import { REACT_APP_DEV_URL } from '../../../config.js';

const NewAccountModal = ({ isModalOpen, handleClose, members, refreshData }) => {
    const [newAccountForm, setNewAccountForm] = useState({
        'accountType': '',
        'accountName': '',
        'memberName': '',
        'creditLimit': '',
        'debt': '',
        'monthlyPayment': '',
        'annualPercentRate': '',
        'paymentDay': '',
        'remainingPayments': '',
        'lengthOfLoan': '',
    });
    const [newAccountFormErrors, setNewAccountFormErrors] = useState({
        'accountTypeError': false,
        'accountNameError': false,
        'memberNameError': false,
        'creditLimitError': false,
        'debtError': false,
        'monthlyPaymentError': false,
        'annualPercentRateError': false,
        'paymentDayError': false,
        'remainingPaymentsError': false,
        'lengthOfLoanError': false,
    });

    const handleModalClose = () => {
        setNewAccountForm({
            ...newAccountForm,
            'accountType': '',
            'accountName': '',
            'memberName': '',
            'creditLimit': '',
            'debt': '',
            'monthlyPayment': '',
            'annualPercentRate': '',
            'paymentDay': '',
            'remainingPayments': '',
            'lengthOfLoan': '',
        });
        setNewAccountFormErrors({
            ...newAccountFormErrors,
            'accountTypeError': false,
            'accountNameError': false,
            'memberNameError': false,
            'creditLimitError': false,
            'debtError': false,
            'monthlyPaymentError': false,
            'annualPercentRateError': false,
            'paymentDayError': false,
            'remainingPaymentsError': false,
            'lengthOfLoanError': false,
        });
        handleClose();
    }

    const handleFormFieldChange = (prop, value) => {
        setNewAccountForm({
            ...newAccountForm,
            [prop]: value,
        });
        handleValidation(prop, value);
    }

    const handleValidation = (prop, value) => {
        switch (prop) {
            case 'accountName':
                isAccountNameValid(value);
                break;
            case 'creditLimit':
                isCreditLimitValid(value);
                break;
            case 'debt':
                isDebtValueValid(value);
                break;
            case 'monthlyPayment':
                isMonthlyPaymentValid(value);
                break;
            case 'annualPercentRate':
                isAnnualPercentRateValid(value);
                break;
            case 'remainingPayments':
                isRemainingPaymentsValid(value);
                break;
        }
    }

    const isAccountNameValid = (accountName) => {
        const regex = /^[a-zA-Z -]{0,25}$/;
        handleErrorMessage(regex, 'accountNameError', accountName);
    }

    const isCreditLimitValid = (creditLimit) => {
        const regex = /^[0-9]{0,7}$/;
        handleErrorMessage(regex, 'creditLimitError', creditLimit)
    }

    const isDebtValueValid = (debt) => {
        const regex = /^[0-9]{0,7}((?:[.]([0-9]{1,2})){0,1})$/;
        handleErrorMessage(regex, 'debtError', debt);
    }

    const isMonthlyPaymentValid = (monthlyPayment) => {
        const regex = /^[0-9]{0,7}((?:[.]([0-9]{1,2})){0,1})$/;
        handleErrorMessage(regex, 'monthlyPaymentError', monthlyPayment);
    }

    const isAnnualPercentRateValid = (annualPercentRate) => {
        const regex = /^[0-9]{0,3}((?:[.]([0-9]{1,2})){0,1})$/;
        handleErrorMessage(regex, 'annualPercentRateError', annualPercentRate);
    }

    const isRemainingPaymentsValid = (remainingPayments) => {
        const regex = /^[0-9]{0,3}$/;
        handleErrorMessage(regex, 'remainingPaymentsError', remainingPayments);
    }

    const handleErrorMessage = (regexPattern, prop, value) => {
        setNewAccountFormErrors({
            ...newAccountFormErrors,
            [prop]: (!value.match(regexPattern)) ? true : false,
        });
    }

    const handleSubmit = (event) => {
        event.preventDefault();

        const data = {
            'accountType': newAccountForm.accountType,
            'accountName': newAccountForm.accountName,
            'memberName': newAccountForm.memberName,
            'creditLimit': newAccountForm.creditLimit,
            'debt': newAccountForm.debt,
            'monthlyPayment': newAccountForm.monthlyPayment,
            'annualPercentRate': newAccountForm.annualPercentRate,
            'paymentDay': newAccountForm.paymentDay,
            'remainingPayments': newAccountForm.remainingPayments ?? '',
            'lengthOfLoan': newAccountForm.lengthOfLoan ?? '',
        };

        postAccountData(REACT_APP_DEV_URL + 'account', data);
        handleModalClose();
    }

    async function postAccountData(url, data) {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });
        const account = await response.json();
        console.log(account);
        refreshData();
    }

    const isSubmitDisabled = () => {
        return (
            !newAccountForm.memberName || !newAccountForm.paymentDay || !newAccountForm.accountType
            || (!newAccountForm.accountName || newAccountFormErrors.accountNameError)
            || (!newAccountForm.creditLimit || newAccountFormErrors.creditLimitError)
            || (!newAccountForm.debt || newAccountFormErrors.debtError)
            || (!newAccountForm.monthlyPayment || newAccountFormErrors.monthlyPaymentError)
            || (!newAccountForm.annualPercentRate || newAccountFormErrors.annualPercentRateError)
        )
    }

    return (
        <React.Fragment>
            <Modal open={isModalOpen} onClose={handleModalClose}>
                <Box className={'modal-style'}>
                    <Typography variant='h5' color={'black'}>Add New Account</Typography>
                    <form onSubmit={handleSubmit}>
                        <Box sx={{ marginTop: 3, marginBottom: 3, maxWidth: 235}}>
                            <FormControl fullWidth>
                                <InputLabel>Account Type</InputLabel>
                                <Select
                                    required
                                    color='primary'
                                    variant='outlined'
                                    id='accountType'
                                    name='accountType'
                                    label='Account Type'
                                    value={newAccountForm.accountType}
                                    onChange={e => handleFormFieldChange('accountType', e.target.value)}
                                >
                                    <MenuItem value={'Credit'}>Credit</MenuItem>
                                    <MenuItem value={'Loan'}>Loan</MenuItem>
                                </Select>
                            </FormControl>
                        </Box>
                        {(newAccountForm.accountType == 'Credit') && (
                            <Box>
                                <Box sx={{ marginTop: 3, marginBottom: 3}}>
                                    <TextField
                                        required
                                        type='input'
                                        color='primary'
                                        variant='outlined'
                                        name='accountName'
                                        label='Account Name'
                                        value={newAccountForm.accountName}
                                        error={newAccountFormErrors.accountNameError}
                                        onChange={e => handleFormFieldChange('accountName', e.target.value)}
                                        helperText={newAccountFormErrors.accountNameError ? 'Max 25 characters. [A-Z -]' : ''}
                                    />
                                </Box>
                                    <Box sx={{ marginTop: 3, marginBottom: 3, maxWidth: 235}}>
                                        <FormControl fullWidth>
                                            <InputLabel required>Member</InputLabel>
                                            <Select
                                                required
                                                color='primary'
                                                variant='outlined'
                                                id='memberName'
                                                name='memberName'
                                                label='Member'
                                                value={newAccountForm.memberName}
                                                onChange={e => handleFormFieldChange('memberName', e.target.value)}
                                            >
                                                {members.map((member) => (
                                                    <MenuItem key={member.name} value={member.name}>
                                                        {member.name}
                                                    </MenuItem>
                                                ))}
                                            </Select>
                                        </FormControl>
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
                                        error={newAccountFormErrors.creditLimitError}
                                        onChange={e => handleFormFieldChange('creditLimit', e.target.value)}
                                        helperText={newAccountFormErrors.creditLimitError ? 'Max 7 numbers. [0-9]' : ''}
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
                                        error={newAccountFormErrors.debtError}
                                        onChange={e => handleFormFieldChange('debt', e.target.value)}
                                        helperText={newAccountFormErrors.debtError ? 'Max 9 numbers with decimal. [0-9]' : ''}
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
                                        error={newAccountFormErrors.monthlyPaymentError}
                                        onChange={e => handleFormFieldChange('monthlyPayment', e.target.value)}
                                        helperText={newAccountFormErrors.monthlyPaymentError ? 'Max 9 numbers with decimal. [0-9]' : ''}
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
                                        error={newAccountFormErrors.annualPercentRateError}
                                        onChange={e => handleFormFieldChange('annualPercentRate', e.target.value)}
                                        helperText={newAccountFormErrors.annualPercentRateError ? 'Max 5 numbers with decimal. [0-9]' : ''}
                                    />
                                </Box>
                                <Box sx={{ marginTop: 3, marginBottom: 3, maxWidth: 235}}>
                                    <FormControl fullWidth>
                                        <InputLabel>Payment Day</InputLabel>
                                        <Select
                                            required
                                            id='paymentDay'
                                            color='primary'
                                            variant='outlined'
                                            name='paymentDay'
                                            label='Payment Day'
                                            value={newAccountForm.paymentDay}
                                            onChange={e => handleFormFieldChange('paymentDay', e.target.value)}
                                        >
                                            {[...Array(31).keys()].map((item) => (
                                                <MenuItem key={'paymentDay'+`${item+1}`} value={item+1}>{item+1}</MenuItem>
                                            ))}
                                        </Select>
                                    </FormControl>
                                </Box>
                                <Box sx={{ marginTop: 3, marginBottom: 3}}>
                                    <TextField
                                        required
                                        type='input'
                                        color='primary'
                                        variant='outlined'
                                        name='remainingPayments'
                                        label='Remaining Payments'
                                        value={newAccountForm.remainingPayments}
                                        error={newAccountFormErrors.remainingPaymentsError}
                                        onChange={e => handleFormFieldChange('remainingPayments', e.target.value)}
                                        helperText={newAccountFormErrors.remainingPaymentsError ? 'Max 3 numbers. [0-9]' : ''}
                                    />
                                </Box>
                                 <Box sx={{ marginTop: 3, marginBottom: 3}}>
                                    <TextField
                                        required
                                        type='input'
                                        color='primary'
                                        variant='outlined'
                                        name='lengthOfLoan'
                                        label='Length of Loan'
                                        value={newAccountForm.lengthOfLoan}
                                        error={newAccountFormErrors.lengthOfLoanError}
                                        onChange={e => handleFormFieldChange('lengthOfLoan', e.target.value)}
                                        helperText={newAccountFormErrors.lengthOfLoanError ? 'Max 3 numbers. [0-9]' : ''}
                                    />
                                </Box>
                                <Button type='submit' disabled={isSubmitDisabled()}>
                                    Submit
                                </Button>
                            </Box>
                        )}
                   </form>
                </Box>
            </Modal>
        </React.Fragment>
    )
}

export default NewAccountModal;