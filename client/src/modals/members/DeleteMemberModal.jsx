import React from 'react';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

import { REACT_APP_DEV_URL } from '../../../config.js';

const DeleteMemberModal = ({ isModalOpen, handleClose, member, refreshData }) => {

    const handleDelete = () => {
        const data = {
            name: member,
        }
        deleteMember(REACT_APP_DEV_URL + `member/${member}`, data);
        handleClose();
    }

    async function deleteMember(url, data) {
        await fetch(url, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        }).then((response) => {
            return response.json();
        }).then(() => {
            refreshData();
        });
    }

    return (
        <React.Fragment>
            <Modal open={isModalOpen} onClose={handleClose}>
                <Box className={'modal-style'}>
                    <Box sx={{ marginBottom: '5px' }}>
                        <Typography variant='h5' component='h2' color='black'>Confirm Deletion</Typography>
                        <Typography variant='subtitle' color='grey'>This will delete the member's accounts.</Typography>
                    </Box>
                    <Box display='grid' gridTemplateColumns={'repeat(2, 1fr)'} gridTemplateRows={'1fr'} columnGap={2} rowGap={2} padding={2}>
                        <Box sx={{ gridColumn: 1 }}>
                            <Button onClick={handleClose}>Cancel</Button>
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

export default DeleteMemberModal;