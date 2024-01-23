import React from 'react';
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

const EditAccountModal = ({ isModalOpen, handleClose, selectedAccount, refreshData }) => {
    return (
        <React.Fragment>
            <Modal open={isModalOpen} onClose={handleClose}>
                <Box sx={modalStyle}>
                    <Typography variant='h6' component='h2' color='black'>Edit "{selectedAccount.name}" Account</Typography>
                    <Box sx={{ marginBottom: '15px', marginTop: '15px' }}>
                        <TextField
                            type='text'
                            color='primary'
                            variant='outlined'
                            name='editAccountDebt'
                            label='Remaining Debt'
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
                        />
                    </Box>
                    <Box sx={{ marginLeft: '10px', marginTop: '5px'}}>
                        <Typography color={'grey'} variant='italic'> Current Value: {selectedAccount.annualPercentRate}%</Typography>
                    </Box>
                    <Box sx={{ marginTop: '15px'}}>
                        <Button variant='contained'>Submit</Button>
                    </Box>
                </Box>
            </Modal>
        </React.Fragment>
    )
}

export default EditAccountModal;