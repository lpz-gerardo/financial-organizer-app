import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { removeCredentials } from '../slices/authSlice';
import { useLogoutMutation } from '../slices/usersApiSlice';

import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

const NavBar = () => {
    const { userInfo } = useSelector((state) => state.auth);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [logout] = useLogoutMutation();

    const goToHomPage = () => {
        navigate('/');
    };

    const handleLogout = async () => {
        try {
            await logout().unwrap();
            dispatch(removeCredentials());
            navigate('/');
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <Box marginBottom={'25px'}>
            <AppBar>
                <Box  display={'grid'} gridTemplateColumns={'repeat(8, 1fr)'} alignItems={'center'} sx={{ height: '40px'}}>
                    <Box gridColumn={1}>
                        <Button onClick={ goToHomPage }>
                            <Typography color={'white'}>Fin View</Typography>
                        </Button>
                    </Box>
                    {userInfo && (
                        <Box gridColumn={8}>
                            <Button onClick={ handleLogout }>
                                <Typography color={'white'}>Logout</Typography>
                            </Button>
                        </Box>
                    )}
                </Box>
            </AppBar>
        </Box>

    )
}

export default NavBar;