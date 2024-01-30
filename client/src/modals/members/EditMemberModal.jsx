import React from 'react';
import { useState } from 'react';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

import { REACT_APP_DEV_URL } from '../../../config.js';

const EditMemberModal = ({ isModalOpen, handleClose, member, refreshData }) => {
    const [memberName, setMemberName] = useState('');
    const [isMemberNameError, setIsMemberNameError] = useState(false);
    const [isButtonDisabled, setIsButtonDisabled] = useState(true);

    const onChangeMemberName = (name) => {
        setMemberName(name);
        const regex = /^[a-z A-Z]{0,20}$/;
        setIsMemberNameError(!name.match(regex) ? true : false);
        setIsButtonDisabled((!name.match(regex) || name.length == 0) ? true : false);
    }

    const onCloseModal = () => {
        setMemberName('');
        setIsMemberNameError(false);
        setIsButtonDisabled(true);
        handleClose();
    }

    const handleEditSubmit = (event) => {
        event.preventDefault();
        const data = {
            currentName: member,
            newName: memberName,
        }
        if (memberName != '' && memberName != member) {
            updateMemberName(REACT_APP_DEV_URL + `member/${member}`, data);
        }
        onCloseModal();
    }

    async function updateMemberName(url, data) {
        const response = await fetch(url, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });
        const member = await response.json();
        console.log(member);
        refreshData();
    }

    return (
        <React.Fragment>
            <Modal open={isModalOpen} onClose={onCloseModal}>
                <Box className={'modal-style'}>
                    <Typography variant='h6' component='h2' color='black'>
                        Edit Member Name
                    </Typography>
                    <form onSubmit={handleEditSubmit}>
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
                        <Button type='submit' disabled={isButtonDisabled}>
                            Submit
                        </Button>
                    </form>
                </Box>
            </Modal>
        </React.Fragment>
    )
}

export default EditMemberModal;