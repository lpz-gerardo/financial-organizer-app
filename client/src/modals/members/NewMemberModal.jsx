import React from 'react';
import { useState } from 'react';
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

const NewMemberModal = ({ isModalOpen, handleClose }) => {
    const [memberName, setMemberName] = useState('');
    const [isMemberNameError, setIsMemberNameError] = useState(false);

    const onChangeMemberName = (event) => {
        const regex = /^[a-z A-Z]{0,20}$/;
        const name = event.target.value;
        setMemberName(name);
        setIsMemberNameError(!name.match(regex) ? true : false);
    }
    const handleSubmit = (event) => {
        event.preventDefault();
    }

    return (
        <React.Fragment>
            <Modal open={isModalOpen} onClose={handleClose}>
                <Box sx={modalStyle}>
                    <Typography variant='h5' color={'black'}>Add New Member</Typography>
                    <form onSubmit={handleSubmit}>
                        <Box sx={{ marginTop: 3, marginBottom: 3}}>
                            <TextField
                                type='input'
                                label='Name'
                                color='primary'
                                variant='outlined'
                                value={memberName}
                                error={isMemberNameError}
                                onChange={(event) => onChangeMemberName(event)}
                            />
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

export default NewMemberModal;