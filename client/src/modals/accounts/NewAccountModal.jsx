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

const NewAccountModal = ({ isModalOpen, handleClose }) => {
    return (
        <React.Fragment>
            <Modal open={isModalOpen} onClose={handleClose}>
                <Box sx={modalStyle}>
                    <Typography variant='h5' color={'black'}>Add New Account</Typography>
                    <form >
                        <Box sx={{ marginTop: 3, marginBottom: 3}}>
                            <TextField type='input' label='Account Name'></TextField>
                        </Box>
                        <Box sx={{ marginTop: 3, marginBottom: 3}}>
                            <TextField type='input' label='Member'></TextField>
                        </Box>
                        <Box sx={{ marginTop: 3, marginBottom: 3}}>
                            <TextField type='input' label='Credit Limit'></TextField>
                        </Box>
                        <Box sx={{ marginTop: 3, marginBottom: 3}}>
                            <TextField type='input' label='Debt'></TextField>
                        </Box>
                        <Box sx={{ marginTop: 3, marginBottom: 3}}>
                            <TextField type='input' label='Monthly Payment'></TextField>
                        </Box>
                        <Box sx={{ marginTop: 3, marginBottom: 3}}>
                            <TextField type='input' label='Annual Percent Rate'></TextField>
                        </Box>
                        <Box sx={{ marginTop: 3, marginBottom: 3}}>
                            <TextField type='input' label='Payment Day'></TextField>
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