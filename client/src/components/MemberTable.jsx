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

import NewMemberModal from '../modals/members/NewMemberModal';

const MemberTable = ({ members, handleUpdateMembers }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isMemberTableEmpty, setIsMemberTableEmpty] = useState(true);

    const toggleNewMemberModal = () => setIsModalOpen(!isModalOpen);

    useEffect(() => {
        if (members.length !== 0) {
            setIsMemberTableEmpty(false);
        } else {
            setIsMemberTableEmpty(true);
        }
    }, [members])

    return (
        <React.Fragment>
            {isMemberTableEmpty ?
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell align='center'>
                                <Typography variant='h4'>Member Table</Typography>
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        <TableRow>
                            <TableCell align='center'>
                                <Button onClick={toggleNewMemberModal}>
                                    <Typography variant='body1'>Add Member</Typography>
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
                            <TableCell align='center' colSpan={4}>
                                <Typography variant='h4'>Member Table</Typography>
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell align='center'><Typography>Name</Typography></TableCell>
                            <TableCell align='center'><Typography>Debt</Typography></TableCell>
                            <TableCell align='center'><Typography>Monthly Payment</Typography></TableCell>
                            <TableCell align='center'>
                                <Button onClick={toggleNewMemberModal}>
                                    <Typography variant='body1'>Add Member</Typography>
                                </Button>
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {members.map((member) => (
                            <TableRow
                                key={member.name}
                                sx={{ '&:last-child td, &:last-child th': { border: 0} }}>
                                    <TableCell align='center'>{member.name}</TableCell>
                                    <TableCell align='center'><Typography>$0.00</Typography></TableCell>
                                    <TableCell align='center'><Typography>$0.00</Typography></TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            }
            <NewMemberModal
                isModalOpen={isModalOpen}
                handleClose={toggleNewMemberModal}
                handleUpdateMembers={handleUpdateMembers}
            />
        </React.Fragment>
    )
}

export default MemberTable;