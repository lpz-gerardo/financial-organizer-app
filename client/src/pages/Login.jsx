import React from 'react';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

const Login = () => {
    return (
        <Container className={'container-login'}>
            <Box className={'box-login'}>
                <Typography color={'black'} variant='h4'>Login</Typography>
                <Box className={'box-login-fields'}>
                    <TextField
                        required
                        type='input'
                        color='primary'
                        variant='outlined'
                        name='username'
                        label='username'
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
                    />
                </Box>
                <Box className={'box-login-fields'}>
                    <Button>Login</Button>
                </Box>
            </Box>
        </Container>
    )
}

export default Login;