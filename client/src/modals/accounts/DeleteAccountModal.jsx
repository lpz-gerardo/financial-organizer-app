import React from 'react';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
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

const DeleteAccountModal = ({ isModalOpen, handleClose, selectedAccount, refreshData }) => {

    const handleDelete = () => {
        const id = selectedAccount;
        deleteAccount(REACT_APP_DEV_URL + `account/${id}`);
    }

    async function deleteAccount(url) {
        await fetch(url, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'appplication/json',
            },
        }).then((response) => {
            return response.json();
        }).then(() => {
            refreshData();
            handleClose();
        });
    }

    return (
        <React.Fragment>
            <Modal
                open={isModalOpen}
                onClose={handleClose}
            >
                <Box sx={modalStyle}>
                    <Typography variant='h6' component='h2' color='black'>Delete this account?</Typography>
                    <Box display={'grid'} gridTemplateColumns={'repeat(2, 1fr)'} gridTemplateRows={'1fr'} columnGap={2} rowGap={2} padding={2}>
                        <Box sx={{ gridColumn: 1 }}>
                            <Button variant='contained' onClick={handleClose}>Cancel</Button>
                        </Box>
                        <Box sx={{ gridColumn: 2 }}>
                            <Button variant='contained' color='error' onClick={() => handleDelete()}>Delete</Button>
                        </Box>
                    </Box>
                </Box>
            </Modal>
        </React.Fragment>
    )
}

export default DeleteAccountModal;