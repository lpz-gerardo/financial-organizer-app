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

const EditMemberModal = ({ isModalOpen, handleClose, member, refreshData }) => {
    const [memberName, setMemberName] = useState('');
    const [isMemberNameError, setIsMemberNameError] = useState(false);

    const onChangeMemberName = (name) => {
        setMemberName(name);
        const regex = /^[a-z A-Z]{0,20}$/;
        setIsMemberNameError(!name.match(regex) ? true : false);
    }

    return (
        <React.Fragment>
            <Modal open={isModalOpen} onClose={handleClose}>
                <Box sx={modalStyle}>
                    <Typography variant='h6' component='h2' color='black'>
                        Edit Member Name
                    </Typography>
                    <form>
                        <Box>
                            <TextField
                                type='input'
                                variant='outlined'
                                color='primary'
                                label='Name'
                                value={memberName}
                                error={isMemberNameError}
                                onChange={(e) => onChangeMemberName(e.target.value)}
                                helperText={isMemberNameError ? 'Max 20 characters. Alpha only' : ''}
                            />
                        </Box>
                        <Button>
                            Submit
                        </Button>
                    </form>
                </Box>
            </Modal>
        </React.Fragment>
    )
}

export default EditMemberModal;