import React from 'react';
import { useState, useEffect } from 'react';
import TableContainer from '@mui/material/TableContainer';
import Table from '@mui/material/Table';
import TableHead from '@mui/material/TableHead';
import TableBody from '@mui/material/TableBody';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Chip from '@mui/material/Chip';

import NewMemberModal from '../modals/members/NewMemberModal';
import EditMemberModal from '../modals/members/EditMemberModal';
import DeleteMemberModal from '../modals/members/DeleteMemberModal';

const MemberTable = ({ members, refreshData }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [isMemberTableEmpty, setIsMemberTableEmpty] = useState(true);
    const [selectedMember, setSelectedMember] = useState('');

    const toggleNewMemberModal = () => setIsModalOpen(!isModalOpen);
    const toggleEditMemberModal = () => setIsEditModalOpen(!isEditModalOpen);
    const toggleDeleteMemberModal = () => setIsDeleteModalOpen(!isDeleteModalOpen);

    const handleEditMember = (name) => {
        setSelectedMember(name);
        toggleEditMemberModal();
    }

    const handleDeleteMember = (name) => {
        setSelectedMember(name);
        toggleDeleteMemberModal();
    }

    const formatMoney = (amount) => {
        return '$' + String(Number.parseFloat(amount).toFixed(2));
    }

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
                            <TableRow key={member.name}>
                                <TableCell align='center'>{member.name}</TableCell>
                                <TableCell align='center'>{formatMoney(member.debt)}</TableCell>
                                <TableCell align='center'>{formatMoney(member.monthlyPayment)}</TableCell>
                                <TableCell align='center'>
                                    <Chip label={'Edit'} onClick={() => handleEditMember(member.name)}></Chip>
                                    <Chip label={'Delete'} onClick={() => handleDeleteMember(member.name)}></Chip>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            }
            <NewMemberModal
                isModalOpen={isModalOpen}
                handleClose={toggleNewMemberModal}
                refreshData={refreshData}
            />
            <EditMemberModal
                isModalOpen={isEditModalOpen}
                handleClose={toggleEditMemberModal}
                member={selectedMember}
                refreshData={refreshData}
            />
            <DeleteMemberModal
                isModalOpen={isDeleteModalOpen}
                handleClose={toggleDeleteMemberModal}
                member={selectedMember}
                refreshData={refreshData}
            />
        </React.Fragment>
    )
}

export default MemberTable;