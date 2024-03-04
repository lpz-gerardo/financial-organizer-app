import React from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { REACT_APP_DEV_URL } from '../../config.js';

const Signup = () => {
    const [userInputs, setUserInputs] = useState({
        username: '',
        password: '',
    });
    const { username, password } = userInputs;
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
        postSignup(REACT_APP_DEV_URL + 'signup', credentials);
    }

    const postSignup = async (url, credentials) => {
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
                console.log("Failed.");
            }
        } catch (error) {
            console.log(error);
        }

        setUserInputs({
            ...userInputs,
            username: "",
            password: "",
        });
    }

    return(
        <Container sx={{ display: 'grid', justifyContent: 'center', }}>
            <Box sx={{ backgroundColor: 'white', padding: '50px', top: '50%', left: '50%', position: 'absolute' }}>
                <Typography variant='h4' color={'black'}>Signup</Typography>
                <form onSubmit={handleSubmit}>
                    <Box marginTop={'15px'}>
                       <TextField
                            required
                            type='input'
                            color='primary'
                            variant='outlined'
                            name='username'
                            label='username'
                            value={username}
                            onChange={e => handleOnInputChange('username', e.target.value)}
                       />
                    </Box>
                    <Box marginTop={'15px'}>
                       <TextField
                            required
                            type='password'
                            color='primary'
                            variant='outlined'
                            name='password'
                            label='password'
                            value={password}
                            onChange={e => handleOnInputChange('password', e.target.value)}

                       />
                    </Box>
                    <Box marginTop={'10px'}>
                        <Button type='submit'>Submit</Button>
                    </Box>
                </form>
                <Box marginTop={'15px'}>
                    <Typography variant='subtitle' color={'gray'}>Already have an account?</Typography>
                </Box>
            </Box>
        </Container>
    );
}

export default Signup;