import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { removeCredentials } from '../slices/authSlice';
import { useLogoutMutation } from '../slices/usersApiSlice';
import FlexStyle from './FlexStyle';

import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import LogoutOutlined from '@mui/icons-material/LogoutOutlined';
import MenuItem from '@mui/material/MenuItem';
import { useTheme } from '@mui/material';
import { Menu as MenuIcon } from '@mui/icons-material';

const NavBar = () => {
	const [anchorEl, setAnchorEl] = useState(null);
	const isOpen = Boolean(anchorEl);

	const theme = useTheme();
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const [logout] = useLogoutMutation();
	const { userInfo } = useSelector((state) => state.auth);

	const handleOpenMenu = (e) => setAnchorEl(e.currentTarget);
	const handleCloseMenu = () => setAnchorEl(null);

	const handleNavigateHome = () => navigate('/');

	const handleLogout = async () => {
		try {
			await logout().unwrap();
			dispatch(removeCredentials());
			navigate('/');
		} catch (err) {
			toast.error(err.error);
		}
	};

	return (
		<AppBar sx={{ bgcolor: theme.palette.neutral.dark}}>
			<Toolbar sx={{ justifyContent: 'space-between'}}>
				<FlexStyle>
					<IconButton>
						<MenuIcon sx={{ color: theme.palette.neutral.light}}/>
					</IconButton>
				<FlexStyle>
					<Button onClick={handleNavigateHome}>
						<Typography color={theme.palette.primary} fontFamily={theme.typography.h2}>Fin View</Typography>
					</Button>
				</FlexStyle>
				</FlexStyle>

				{userInfo && (
				<FlexStyle gap={"1.5rem"}>
					<IconButton onClick={handleOpenMenu}>
						<Avatar
							sx={{
								bgcolor: theme.palette.primary.main,
								color: theme.palette.neutral.dark}}
						>
							<Typography fontFamily={theme.typography.h3}>
							{userInfo.username[0].toUpperCase()}
							</Typography>
						</Avatar>
					</IconButton>
					<Menu
						anchorEl={anchorEl}
						open={isOpen}
						onClose={handleCloseMenu}
						anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
					>
						<MenuItem onClick={handleLogout}>
							<LogoutOutlined />
							Logout
						</MenuItem>
					</Menu>
				</FlexStyle>
				)}
			</Toolbar>
		</AppBar>
	)
}

export default NavBar;