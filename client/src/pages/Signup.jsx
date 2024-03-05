import React from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import { REACT_APP_DEV_URL } from '../../config.js';

const Signup = () => {
    const [userInputs, setUserInputs] = useState({
        username: '',
        password: '',
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
    const { username, password } = userInputs;
    const { usernameErrors, passwordErrors } = inputErrors;
    const { minimumLength, minimumDigits, minimumLowercase, minimumUppercase } = passwordRequirements;
    const navigate = useNavigate();
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
    }

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

    const isSubmitDisabled = () => {
        return (!username || usernameErrors) || (!password || passwordErrors);
    }

    return(
        <Container className={'container-signup'}>
            <Box className={'box-signup'}>
                <Typography variant='h4' color={'black'}>Signup</Typography>
                <form onSubmit={handleSubmit}>
                    <Box className={'box-signup-fields'}>
                       <TextField
                            required
                            type='input'
                            color='primary'
                            variant='outlined'
                            name='username'
                            label='username'
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
                            label='password'
                            value={password}
                            error={passwordErrors}
                            onChange={e => handleOnInputChange('password', e.target.value)}
                       />
                    </Box>
                    {password ? (
                        <Box className={'box-signup-requirements'}>
                            <Typography color={'black'}>Password Requirements</Typography>
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
                    ): <Box></Box>}
                    <Box className={'box-signup-fields'}>
                        <Button variant={'contained'} type='submit' disabled={isSubmitDisabled()}>Submit</Button>
                    </Box>
                </form>
                <Box className={'box-signup-fields'}>
                    <Typography variant='subtitle' color={'gray'}>Already have an account?</Typography>
                </Box>
            </Box>
        </Container>
    );
}

export default Signup;