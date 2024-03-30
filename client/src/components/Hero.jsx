import { Container, Button, Box } from '@mui/material';

const Hero = () => {
    return (
        <>
        <h1>Fin View</h1>
        <Container>
            <Box>
                <Button href='/login'>
                    Login
                </Button>
            </Box>
            <Box>
                <Button href='/signup'>
                    Sign up
                </Button>
            </Box>
        </Container>
        </>
    );
};

export default Hero;