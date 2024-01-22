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

const EditAccountModal = () => {
    return (
        <React.Fragment>
            <Modal>
                <Box sx={modalStyle}>
                    <Typography>Edit Account</Typography>
                    <Box>
                        <TextField></TextField>
                    </Box>
                    <Box>
                        <TextField></TextField>
                    </Box>
                    <Box>
                        <TextField></TextField>
                    </Box>
                    <Box>
                        <Button>Submit</Button>
                    </Box>
                </Box>
            </Modal>
        </React.Fragment>
    )
}

export default EditAccountModal;