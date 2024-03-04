import React from 'react';
import { useState } from 'react';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

const Signup = () => {
    const [userInputs, setUserInputs] = useState({
        username: '',
        password: '',
    });
    const { username, password } = userInputs;
    return(
        <Container sx={{ display: 'grid', justifyContent: 'center', }}>
            <Box sx={{ backgroundColor: 'white', padding: '50px', top: '50%', left: '50%', position: 'absolute' }}>
                <Typography variant='h4' color={'black'}>Signup</Typography>
                <form>
                    <Box marginTop={'15px'}>
                       <TextField
                            required
                            type='input'
                            color='primary'
                            variant='outlined'
                            name='username'
                            label='username'
                            value={username}
                       />
                    </Box>
                    <Box marginTop={'15px'}>
                       <TextField
                            required
                            type='input'
                            color='primary'
                            variant='outlined'
                            name='password'
                            label='password'
                            value={password}
                       />
                    </Box>
                    <Box marginTop={'10px'}>
                        <Button>Submit</Button>
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