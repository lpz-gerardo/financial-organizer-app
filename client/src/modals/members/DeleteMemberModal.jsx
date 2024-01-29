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

const DeleteMemberModal = ({ isModalOpen, handleClose, member, refreshData }) => {
    return (
        <React.Fragment>
            <Modal open={isModalOpen} onClose={handleClose}>
                <Box sx={modalStyle}>
                    <Box sx={{ marginBottom: '5px' }}>
                        <Typography variant='h5' component='h2' color='black'>Confirm Deletion</Typography>
                        <Typography variant='subtitle' color='grey'>Are you sure you want to delete?</Typography>
                    </Box>
                    <Box display='grid' gridTemplateColumns={'repeat(2, 1fr)'} gridTemplateRows={'1fr'} columnGap={2} rowGap={2} padding={2}>
                        <Box sx={{ gridColumn: 1 }}>
                            <Button>Cancel</Button>
                        </Box>
                        <Box sx={{ gridColumn: 2 }}>
                            <Button variant='contained' color='error' >Delete</Button>
                        </Box>
                    </Box>
                </Box>
            </Modal>
        </React.Fragment>
    )
}

export default DeleteMemberModal;