import React from 'react';
import { useState } from 'react';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { REACT_APP_DEV_URL } from '../../../config.js';

const NewMemberModal = ({ isModalOpen, handleClose, refreshData }) => {
    const [memberName, setMemberName] = useState('');
    const [isMemberNameError, setIsMemberNameError] = useState(false);
    const [isSubmitDisabled, setIsSubmitDisabled] = useState(true);

    const onChangeMemberName = (event) => {
        const regex = /^[a-z A-Z]{0,20}$/;
        const name = event.target.value;
        setMemberName(name);
        setIsMemberNameError(!name.match(regex) ? true : false);
        setIsSubmitDisabled((!name.match(regex) || name.length == 0) ? true : false);
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        const name = event.target[0].value;
        if (name) {
            const data = { name: name };
            postMemberData(REACT_APP_DEV_URL + 'member', data);
        }
        onClose();
    }

    async function postMemberData(url, data) {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });
        const member = await response.json();
        console.log(member);
        refreshData();
    }

    const onClose = () => {
        setMemberName('');
        setIsMemberNameError(false);
        setIsSubmitDisabled(true);

        handleClose();
    }

    return (
        <React.Fragment>
            <Modal open={isModalOpen} onClose={onClose}>
                <Box className={'modal-style'}>
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
                                helperText={isMemberNameError ? 'Max 20 characters. Alpha only.' : ''}
                            />
                        </Box>
                        <Button type='submit' disabled={isSubmitDisabled}>
                            Submit
                        </Button>
                    </form>
                </Box>
            </Modal>
        </React.Fragment>
    )
}

export default NewMemberModal;