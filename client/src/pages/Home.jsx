import React from 'react';
import { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import TableContainer from '@mui/material/TableContainer';
import Table from '@mui/material/Table';
import TableHead from '@mui/material/TableHead';
import TableBody from '@mui/material/TableBody';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';

import MemberTable from '../components/MemberTable';

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

const Home = () => {
    const [isMemberTableEmpty, setIsMemberTableEmpty] = useState(true);
    const [isMemberModalOpen, setIsMemberModalOpen] = useState(false);
    const [members, setMembers] = useState([]);
    const [accounts, setAccounts] = useState([]);
    const [isAddAccountDisabled, setIsAccountDisabled] = useState(true);
    const [isAccountTableEmpty, setIsAccountTableEmpty] = useState(true);
    const [isAccountModalOpen, setIsAccountModalOpen] = useState(false);

    const handleAddAccountSubmit = (event) => {
        event.preventDefault();
    }

    const handleOpenAccountModal = () => {
        setIsAccountModalOpen(true);
    }

    const handleCloseAccountModal = () => {
        setIsAccountModalOpen(!isAccountModalOpen);
    }

    const handleOpenMemberModal = () => {
        setIsMemberModalOpen(!isMemberModalOpen);
    }
 
    const handleCloseMemberModal = () => {
        setIsMemberModalOpen(!isMemberModalOpen);
    }

    const handleAddMemberSubmit = (event) => {
       event.preventDefault();
       const name = event.target[0].value;
       console.log(name);
       if (name == '') {
            console.log('Empty name field');
       } else {
            setMembers([
                ...members,
                name
            ]);
            setIsMemberTableEmpty(false);
       }
       handleCloseMemberModal();
    }

   useEffect(() => {
    if (members.length !== 0) {
        setIsAccountDisabled(false);
    } else {
        setIsAccountDisabled(true);
    }
   }, [members]) 

    return(
        <React.Fragment>
            <Box sx={{ width: '100%', height: '800px', justifySelf: 'center' }}>
                <Box display={'grid'} gridTemplateColumns={'repeat(5, 1fr)'} gridTemplateRows={'repeat(2, 1fr)'} columnGap={2} rowGap={2} padding={2}>
                    <Box sx={{ gridColumnStart: 2, gridColumnEnd: 4, gridRowStart: 1, gridRowEnd: 1}}>
                        {isMemberTableEmpty ?
                            <MemberTable />
                        : 
                            <TableContainer component={Paper}>
                                <Table>
                                    <TableHead>
                                        <TableRow>
                                            <TableCell align='center' colSpan={4}>
                                                <Typography variant='h4'>Member Table</Typography>
                                            </TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell align='center'><Typography>Name</Typography></TableCell>
                                            <TableCell align='center'><Typography>Debt</Typography></TableCell>
                                            <TableCell align='center'><Typography>Monthly Payment</Typography></TableCell>
                                            <TableCell align='center'>
                                                <Button onClick={handleOpenMemberModal}>
                                                    <Typography variant='body1'>Add Member</Typography>
                                                </Button>
                                            </TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {members.map((member) => (
                                            <TableRow
                                                key={member}
                                                sx={{ '&:last-child td, &:last-child th': { border: 0} }}>
                                                    <TableCell align='center'>{member}</TableCell>
                                                    <TableCell align='center'><Typography>$0.00</Typography></TableCell>
                                                    <TableCell align='center'><Typography>$0.00</Typography></TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        }
                    </Box>
                    <Box sx={{ gridColumnStart: 2, gridColumnEnd: 4, gridRowStart: 2, gridRowEnd: 2 }}>
                        {isAccountTableEmpty ?
                            <TableContainer component={Paper}>
                                <Table>
                                    <TableHead>
                                        <TableRow>
                                            <TableCell align='center'>
                                                <Typography variant='h4'>Account Table</Typography>
                                            </TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        <TableRow>
                                            <TableCell align='center'>
                                                <Button disabled={isAddAccountDisabled} onClick={handleOpenAccountModal}>
                                                    <Typography variant='body1'>Add Account</Typography>
                                                </Button>
                                            </TableCell>
                                        </TableRow>
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        :
                            <TableContainer component={Paper}>
                                <Table>
                                    <TableHead>
                                        <TableRow>
                                            <TableCell align='center' colSpan={7}>
                                                <Typography variant='h4'>Account Priority Table</Typography>
                                            </TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell><Typography>Account</Typography></TableCell>
                                            <TableCell><Typography>Member</Typography></TableCell>
                                            <TableCell><Typography>Starting Debt</Typography></TableCell>
                                            <TableCell><Typography>Remaining Debt</Typography></TableCell>
                                            <TableCell><Typography>Monthly Payment</Typography></TableCell>
                                            <TableCell><Typography>APR</Typography></TableCell>
                                            <TableCell align='center'>
                                                <Button>
                                                    <Typography variant='body1'>Add Account</Typography>
                                                </Button>
                                            </TableCell>
                                        </TableRow>
                                    </TableHead>
                                </Table>
                            </TableContainer>
                        }
                    </Box>
                    <Box sx={{ gridColumnStart: 4, gridColumnEnd: 5, gridRowStart: 1, gridRowEnd: 2 }}>
                        <Box sx={{ maxWidth: '100%', maxHeight: '900px' }}>
                            <TableContainer component={Paper}>
                                <Table>
                                    <TableHead>
                                        <TableRow>
                                            <TableCell align={'center'} colSpan={2}>
                                                <Typography variant='h4'>Payment Calendar</Typography>
                                            </TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell size='small' align='center'><Typography variant='body1'>Day</Typography></TableCell>
                                            <TableCell size='small' align='center'><Typography variant='body1'>Amount</Typography></TableCell>
                                        </TableRow>
                                    </TableHead>
                                </Table>
                            </TableContainer>
                        </Box>
                        
                    </Box>
                </Box>
            </Box>
            <Modal open={isMemberModalOpen} onClose={handleCloseMemberModal}>
                <Box sx={modalStyle}>
                    <Typography variant='h5' color={'black'}>Add New Member</Typography>
                    <form onSubmit={handleAddMemberSubmit}>
                        <Box sx={{ marginTop: 3, marginBottom: 3}}>
                            <TextField type='input' label='Name'></TextField>
                        </Box>
                        <Button type='submit'>
                            Submit
                        </Button>
                    </form>
                </Box>
            </Modal>
            <Modal open={isAccountModalOpen} onClose={handleCloseAccountModal}>
                <Box sx={modalStyle}>
                    <Typography variant='h5' color={'black'}>Add New Account</Typography>
                    <form onSubmit={handleAddAccountSubmit}>
                        <Box sx={{ marginTop: 3, marginBottom: 3}}>
                            <TextField type='input' label='Account Name'></TextField>
                        </Box>
                        <Box sx={{ marginTop: 3, marginBottom: 3}}>
                            <TextField type='input' label='Member'></TextField>
                        </Box>
                        <Box sx={{ marginTop: 3, marginBottom: 3}}>
                            <TextField type='input' label='Starting Debt'></TextField>
                        </Box>
                        <Box sx={{ marginTop: 3, marginBottom: 3}}>
                            <TextField type='input' label='Remaining Debt'></TextField>
                        </Box>
                        <Box sx={{ marginTop: 3, marginBottom: 3}}>
                            <TextField type='input' label='Monthly Payment'></TextField>
                        </Box>
                        <Box sx={{ marginTop: 3, marginBottom: 3}}>
                            <TextField type='input' label='APR'></TextField>
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

export default Home;