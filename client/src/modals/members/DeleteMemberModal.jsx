import React from 'react';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

const DeleteMemberModal = () => {
    return (
        <React.Fragment>
            <Modal>
                <Box>
                    <Typography>Do you want to Delete?</Typography>
                </Box>
                <Box>
                    <Box>
                        <Button>Cancel</Button>
                    </Box>
                    <Box>
                        <Button>Delete</Button>
                    </Box>
                </Box>
            </Modal>
        </React.Fragment>
    )
}

export default DeleteMemberModal;