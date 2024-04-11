import { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useRegisterMutation } from '../slices/usersApiSlice.js';
import { setCredentials } from '../slices/authSlice.js';
import { toast } from 'react-toastify';
import { useTheme, useMediaQuery } from '@mui/material';

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import CircularProgress from '@mui/material/CircularProgress';
import LoginIcon from '@mui/icons-material/Login';

const Signup = () => {
    const [userInputs, setUserInputs] = useState({
        username: '',
        password: '',
        confirmPassword: '',
    });
    const [inputErrors, setInputErrors] = useState({
        usernameErrors: false,
        passwordErrors: false,
    });
    const [passwordRequirements, setPasswordRequirements] = useState({
        minimumLength: false,
        minimumDigits: false,
        minimumLowercase: false,
        minimumUppercase: false,
    });
    const { username, password, confirmPassword } = userInputs;
    const { usernameErrors, passwordErrors, confirmPasswordErrors } = inputErrors;
    const { minimumLength, minimumDigits, minimumLowercase, minimumUppercase } = passwordRequirements;

    const theme = useTheme();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const isMobileScreen = useMediaQuery('(min-width: 600px)');

    const [register, { isLoading }] = useRegisterMutation();
    const { userInfo } = useSelector((state) => state.auth);

    const handleOnInputChange = (prop, value) => {
        setUserInputs({
            ...userInputs,
            [prop]: value,
        });
        handleInputValidation(prop, value);
    }

    const handleInputValidation = (prop, value) => {
        switch (prop) {
            case "username":
                isUsernameValid(value);
                break;
            case "password":
                isPasswordValid(value);
                break;
        }
    };

    const isUsernameValid = (value) => {
        const regex = /^[a-zA-Z0-9]{4,24}$/;
        handleErrorMessage(regex, 'usernameErrors', value);
    }

    const isPasswordValid = (value) => {
        const regex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
        handlePasswordRequirements(value);
        handleErrorMessage(regex, 'passwordErrors', value);
    }

    const handlePasswordRequirements = (value) => {
        const isMinimumLength = value.match(/^.{8,}$/);
        const isMinimumDigits = value.match(/^(?=.*\d).{1,}$/);
        const isMinimumLowercase = value.match(/^(?=.*[a-z]).{1,}$/);
        const isMinimumUppercase = value.match(/^(?=.*[A-Z]).{1,}$/);

        setPasswordRequirements({
            ...passwordRequirements,
            'minimumLength': isMinimumLength ? true : false,
            'minimumDigits': isMinimumDigits ? true : false,
            'minimumLowercase': isMinimumLowercase ? true : false,
            'minimumUppercase': isMinimumUppercase ? true : false,
        });
    }

    const handleErrorMessage = (regexPattern, prop, value) => {
        setInputErrors({
            ...inputErrors,
            [prop]: (!value.match(regexPattern)) ? true : false,
        });
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        const credentials = {
            'username': username,
            'password': password,
        };

        if (confirmPassword !== password) {
            toast.error('Passwords do not match');
        } else {
            try {
                const response = await register({ username, password }).unwrap();
                dispatch(setCredentials({ ...response }));
                navigate('/');
            } catch (err) {
                console.log(err);
            }
        }
    }

    const isSubmitDisabled = () => {
        return (!username || usernameErrors) || (!password || passwordErrors) || (!confirmPassword);
    }

    useEffect(() => {
        if (userInfo) {
            navigate('/');
        }
    }, [navigate, userInfo]);

    return(
        <Box
            sx={{
            display: 'inline-block',
            boxSizing: 'border-box',
            m: '2rem 2.5rem',
            border: '1px solid',
            borderColor: theme.palette.primary.main,
            bgcolor: theme.palette.grey[0],
            borderRadius: '1.5rem',
            width: !isMobileScreen ? '300px' : '400px',
            p: '2rem',
      }}
        >
            <Box >
                <Typography variant='h2'>Sign Up</Typography>
                <form onSubmit={handleSubmit}>
                    <Box className={'box-signup-fields'}>
                       <TextField
                            required
                            type='input'
                            color='primary'
                            variant='outlined'
                            autoComplete='off'
                            name='username'
                            label='Username'
                            value={username}
                            error={usernameErrors}
                            onChange={e => handleOnInputChange('username', e.target.value)}
                            helperText={usernameErrors ? 'Alphanumeric only. Max 24 length.': ''}
                       />
                    </Box>
                    <Box className={'box-signup-fields'}>
                       <TextField
                            required
                            type='password'
                            color='primary'
                            variant='outlined'
                            name='password'
                            label='Password'
                            value={password}
                            error={passwordErrors}
                            onChange={e => handleOnInputChange('password', e.target.value)}
                       />
                    </Box>
                    <Box className={'box-signup-fields'}>
                       <TextField
                            required
                            type='password'
                            color='primary'
                            variant='outlined'
                            name='confirmPassword'
                            label='Confirm password'
                            value={confirmPassword}
                            onChange={e => handleOnInputChange('confirmPassword', e.target.value)}
                       />
                    </Box>

                    {password && (
                        <Box sx={{ m: '1rem' }}>
                            <Typography variant='subtitle'>Password Requirements</Typography>
                            <List>
                                <ListItem>
                                    <Typography color={minimumLength ? 'green' : 'red'}>Minimum 8 characters</Typography>
                                </ListItem>
                                <ListItem>
                                    <Typography color={minimumDigits ? 'green' : 'red'}>Minimum 1 digit</Typography>
                                </ListItem>
                                <ListItem>
                                    <Typography color={minimumLowercase ? 'green' : 'red'}>Minimum 1 lowercase</Typography>
                                </ListItem>
                                <ListItem>
                                    <Typography color={minimumUppercase ? 'green' : 'red'}>Minimum 1 uppercase</Typography>
                                </ListItem>
                            </List>
                        </Box>
                    )}

                    {isLoading && <CircularProgress />}

                    <Box className={'box-signup-fields'}>
                        <Button variant={'contained'} type='submit' disabled={isSubmitDisabled()}>SIGN UP <LoginIcon /></Button>
                    </Box>
                </form>
                <Box className={'box-signup-fields'}>
                    <Typography variant='subtitle'>Already have an account? </Typography><Link to={'/login'}>Login</Link>
                </Box>
            </Box>
        </Box>

    );
}

export default Signup;