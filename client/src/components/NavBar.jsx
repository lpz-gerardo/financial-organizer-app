import React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

const NavBar = () => {
    return (
        <Box marginBottom={'25px'}>
            <AppBar>
                <Box  display={'grid'} gridTemplateColumns={'repeat(8, 1fr)'} alignItems={'center'} sx={{ height: '40px'}}>
                    <Box gridColumn={1}>
                        <Typography>Home</Typography>
                    </Box>
                </Box>
            </AppBar>
        </Box>

    )
}

export default NavBar;