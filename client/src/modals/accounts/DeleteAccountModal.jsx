import React from 'react';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

import { REACT_APP_DEV_URL } from '../../../config.js';

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
                <Box className={'modal-style'}>
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