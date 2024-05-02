import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import {
	useGetMembersQuery,
	useAddMemberMutation,
	useUpdateMemberMutation,
	useDeleteMemberMutation,
} from '../slices/membersApiSlice.js';
import { useTheme } from '@mui/material';
import { toast } from 'react-toastify';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { AddCircleOutline } from '@mui/icons-material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/DeleteOutlined';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Close';

import {
	GridRowModes,
	DataGrid,
	GridToolbarContainer,
	GridActionsCellItem,
	GridRowEditStopReasons,
} from '@mui/x-data-grid';

import Hero from '../components/Hero.jsx';

function GridToolbar(props) {
	const { members, setMembers, setMemberModes } = props;
	const theme = useTheme();

	const handleClick = () => {
		const id = members.length + 1;
		console.log('handleClick - id: ', id);
		setMembers((prevMembers) => [...prevMembers, { id, name: '', debt: 0, monthlyPayment: 0, isNew: true }]);
		setMemberModes((prevModes) => ({
			...prevModes,
			[id]: { mode: GridRowModes.Edit, fieldToFocus: 'name' },
		}));
	};

	return (
		<Box
			sx={{
				'& .MuiBox-root': {
					border: 'none',
				},
				'& .MuiDataGrid-toolbarContainer': {
					backgroundColor: theme.palette.grey[0],
					borderTopLeftRadius: '1.5rem',
					borderTopRightRadius: '1.5rem',
				},
				'& .MuiButton-text': {
					color: theme.palette.secondary.dark,
					margin: "0.5rem 0.5rem",
				},
			}}
		>
			<GridToolbarContainer>
				<Button onClick={handleClick} startIcon={<AddCircleOutline />}>Add member</Button>
			</GridToolbarContainer>
		</Box>
	);
};

const Home = () => {
	const [members, setMembers] = useState([]);
	const [memberModes, setMemberModes] = useState({});

	const { userInfo } = useSelector((state) => state.auth);

	const { data, isLoading, isSuccess } = useGetMembersQuery();
	const [addMember] = useAddMemberMutation();
	const [updateMember] = useUpdateMemberMutation();
	const [deleteMember] = useDeleteMemberMutation();

	const theme = useTheme();

	useEffect(() => {
		if (isSuccess) {
			setMembers([
				...data.data
			]);
		}
	}, [isSuccess]);

	const handleRowEditStop = (params, event) => {
		if (params.reason === GridRowEditStopReasons.rowFocusOut) {
			event.defaultMuiPrevented = true;
		}
	};

	const handleEditClick = (id) => () => {
		setMemberModes({ ...memberModes, [id]: { mode: GridRowModes.Edit, fieldToFocus: 'name' } });
	};

	const handleSaveClick = (id) => () => {
		setMemberModes({ ...memberModes, [id]: { mode: GridRowModes.View } });
	};

	const handleDeleteClick = (id) => () => {
		setMembers(members.filter((member) => member._id !== id));
		const memberToDelete = { memberId: id, userId: userInfo._id};
		handleDeleteMember(memberToDelete);
	};

	const handleCancelClick = (id) => () => {
		setMemberModes({ ...memberModes, [id]: { mode: GridRowModes.View, ignoreModifications: true }});

		const editedRow = members.find((member) => member.id === id);
		if (editedRow?.isNew) {
			setMembers(members.filter((member) => member.id !== id));
		}
	};

	const processRowUpdate = async (row) => {
		try {
			if (row?.isNew) {
				const newRow = { ...row, isNew: false };
				const newMemberData = { userId: userInfo._id, name: newRow.name };
				const res = await handleSaveMember(newMemberData)
				setMembers(members.map((member) => (member.id === row.id ? res : member)));

				return newRow;
			} else {
				const updateMember = { memberId: row._id, userId: row.userId, newName: row.name };
				const res = await handleUpdateMember(updateMember);
				setMembers(members.map((member) => (member._id === res._id ? res : member)));

				return row;
			}
		} catch (error) {
			toast.error('Error processing update: ', error);
		}
	};

	const handleSaveMember = async (member) => {
		try {
			const res = await addMember(member);
			toast.success('New Member Added');

			return res.data;
		} catch (error) {
			toast.error('Error saving member: ', error);
		}
	};

	const handleUpdateMember = async (member) => {
		try {
			const res = await updateMember(member);
			toast.success('Member Updated!');

			return res.data.member;
		} catch (error) {
			toast.error('Error updating member: ', error);
		}
	};

	const handleDeleteMember = async (member) => {
		try {
			deleteMember(member);
		} catch (error) {
			toast.error('Error deleting member: ', error);
		}
	};

	const handleMemberModesModelChange = (newMemberModes) => {
		setMemberModes(newMemberModes);
	};

	const cols = [
		{ field: 'name', headerName: 'Name', flex: 1, editable: true },
		{ field: 'debt', headerName: 'Debt', flex: 1 },
		{ field: 'monthlyPayment', headerName: 'Payments', flex: 1 },
		{
			field: 'actions',
			type: 'actions',
			headerName: 'Actions',
			flex: 1,
			cellClassName: 'actions',
			getActions: ({ id }) => {
				const isInEditMode = memberModes[id]?.mode === GridRowModes.Edit;

				if (isInEditMode) {
					return [
						<GridActionsCellItem
							icon={<SaveIcon />}
							label="Save"
							onClick={handleSaveClick(id)}
							sx={{
								color: theme.palette.primary.main,
							}}
						/>,
						<GridActionsCellItem
							icon={<CancelIcon />}
							label="Cancel"
							onClick={handleCancelClick(id)}
						/>,
					];
				}

				return [
					<GridActionsCellItem
						icon={<EditIcon />}
						label="Edit"
						onClick={handleEditClick(id)}
						sx={{
							color: theme.palette.primary.main,
						}}
					/>,
					<GridActionsCellItem
						icon={<DeleteIcon />}
						label="Delete"
						onClick={handleDeleteClick(id)}
						sx={{
							color: theme.palette.primary.main,
						}}
					/>,
				];
			},
		},
	];

	return (
		<>
			{(userInfo) ? (
				<>
					<Box className={'box-home-wrapper'}>
						<Box className={'home-wrapper'}>
							<Box className={'member-table'}
								sx={{
									'& .MuiDataGrid-root': {
										border: 'none',
										borderRadius: '1.5rem',
										backgroundColor: theme.palette.grey[0],
									},
									'& .MuiInputBase-root': {
											border: 'none',
											fontFamily: theme.typography.subtitle,
									},
									'& .MuiInputBase-input': {
											border: 'none',
											padding: '10px',
											fontFamily: theme.typography.subtitle,
									},
									'& .MuiDataGrid-columnHeader': {
											backgroundColor: theme.palette.grey[0],
									},
									'& .MuiDataGrid-columnHeaderTitle': {
											fontFamily: theme.typography.h4,
									},
									'& .MuiDataGrid-cell': {
											border: 'none',
											backgroundColor: theme.palette.grey[0],
											fontFamily: theme.typography.subtitle,
									},
									'& .MuiDataGrid-footerContainer': {
											borderBottomRightRadius: '1.5rem',
											borderBottomLeftRadius: '1.5rem',
											backgroundColor: theme.palette.grey[0],
									},
								}}
							>
							{(!isLoading) && (
								<DataGrid
									autoHeight
									columns={cols}
									rows={members.map((item, index) => ({ id: (item._id ? item._id : index+1), ...item}))}
									editMode='row'
									rowModesModel={memberModes}
									onRowEditStop={handleRowEditStop}
									onRowModesModelChange={handleMemberModesModelChange}
									processRowUpdate={processRowUpdate}
									onProcessRowUpdateError={(error) => console.log(error)}
									slots={{
										toolbar: GridToolbar,
									}}
									slotProps={{
										toolbar: { members, setMembers, setMemberModes }
									}}
								/>
							)}
							</Box>
							<Box className={'account-table'}> </Box>
							<Box className={'payment-table'}></Box>
						</Box>
					</Box>
				</>
			) : (
				<>
					<Hero />
				</>
			)}
		</>
	);
};

export default Home;