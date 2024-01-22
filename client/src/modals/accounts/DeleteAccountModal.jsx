import React from 'react';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
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

const DeleteAccountModal = ({ isModalOpen, handleClose, selectedAccount, refreshData }) => {
    return (
        <React.Fragment>
            <Modal
                open={isModalOpen}
                onClose={handleClose}
            >
                <Box sx={modalStyle}>
                    <Typography>Delete?</Typography>
                    <Box>
                        <Box>
                            <Button>Cancel</Button>
                        </Box>
                        <Box>
                            <Button>Delete</Button>
                        </Box>
                    </Box>
                </Box>
            </Modal>
        </React.Fragment>
    )
}

export default DeleteAccountModal;