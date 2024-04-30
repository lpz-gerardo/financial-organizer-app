import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useLoginMutation } from '../slices/usersApiSlice.js';
import { setCredentials } from '../slices/authSlice.js';
import { useTheme, useMediaQuery } from '@mui/material';
import { toast } from 'react-toastify';

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import LoginIcon from '@mui/icons-material/Login';

const Login = () => {
  const [userInputs, setUserInputs] = useState({
    username: '',
    password: '',
  });
  const [inputError, setInputError] = useState({
    usernameError: false,
    passwordError: false,
  });
  const { username, password } = userInputs;
  const { usernameError, passwordError } = inputError;

  const theme = useTheme();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const isMobileScreen = useMediaQuery('(min-width: 600px)');
  const [login, { isLoading }] = useLoginMutation();
  const { userInfo } = useSelector((state) => state.auth);

  const handleOnInputChange = (prop, value) => {
    setUserInputs({
      ...userInputs,
      [prop]: value,
    });
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const res = await login({ username, password }).unwrap();
      dispatch(setCredentials({...res}));
      navigate('/');
    } catch (err) {
      toast.error(err.error);
    }
  }

  useEffect(() => {
    if (userInfo) {
      navigate('/');
    }
  }, [navigate, userInfo]);

  useEffect(() => {
    if (username == '') {
      setInputError({
        ...inputError,
        'usernameError': false,
      });
    }
    if (password == '') {
      setInputError({
        ...inputError,
        'passwordError': false,
      });
    }
  }, [username, password])

  return (
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
      <Box
        sx={{
          padding: '1rem',
        }}
      >
        <Typography color={theme.palette.grey[1000]} variant='h2'>Log In</Typography>
        <form onSubmit={handleSubmit}>
          <Box className={'box-login-fields'}>
            <TextField
              required
              type='input'
              color='primary'
              variant='outlined'
              autoComplete='off'
              name='username'
              label='username'
              value={username}
              error={usernameError}
              onChange={e => handleOnInputChange('username', e.target.value)}
            />
          </Box>
          <Box className={'box-login-fields'}>
            <TextField
              required
              type='password'
              color='primary'
              variant='outlined'
              name='password'
              label='password'
              value={password}
              error={passwordError}
              onChange={e => handleOnInputChange('password', e.target.value)}
            />
          </Box>

          {isLoading && <CircularProgress />}

          <Box className={'box-login-fields'}>
            <Button type='submit' variant='contained' sx={{ bgcolor: theme.palette.secondary.main }}>LOG IN <LoginIcon /></Button>
          </Box>
        </form>
        <Box sx={{ m: '1.5rem' }}>
          <Typography variant='subtitle' color={'black'}>Don't have an account? </Typography><Link to={'/signup'}>Signup</Link>
        </Box>
      </Box>
    </Box>

  )
}

export default Login;