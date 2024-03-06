import React from 'react';
import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { REACT_APP_DEV_URL } from '../../config.js';

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
    const navigate = useNavigate();
    const handleOnInputChange = (prop, value) => {
        setUserInputs({
            ...userInputs,
            [prop]: value,
        });
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        const credentials = {
            'username': username,
            'password': password,
        };
        postLogin(REACT_APP_DEV_URL + 'login', credentials);
    }

    const postLogin = async (url, credentials) => {
        try {
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(credentials),
            });
            const { success } = await response.json();
            if (success) {
                navigate("/");
            } else {
                setInputError({
                    ...inputError,
                    'usernameError': true,
                    'passwordError': true,
                });
            }
        } catch (error) {
            console.log(error);
        }
    }

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
        <Container className={'container-login'}>
            <Box className={'box-login'}>
                <Typography color={'black'} variant='h4'>Login</Typography>
                <form onSubmit={handleSubmit}>
                    <Box className={'box-login-fields'}>
                        <TextField
                            required
                            type='input'
                            color='primary'
                            variant='outlined'
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
                    <Box className={'box-login-fields'}>
                        <Button type='submit'>Login</Button>
                    </Box>
                </form>
            <Box sx={{ marginTop: '10px' }}>
                <Typography variant='subtitle' color={'black'}>Don't have an account? </Typography><Link to={'/signup'}>Signup</Link>
            </Box>
            </Box>
        </Container>
    )
}

export default Login;