import { Button, Box, Typography } from '@mui/material';
import { useTheme } from '@mui/material';

const Hero = () => {
	const theme = useTheme();

  return (
    <>
      <Box
        sx={{
          m: '1.5rem 2.5rem',
          border: '2px solid',
          bgcolor: theme.palette.neutral.dark,
          width: '400px',
          height: '400px',
          borderRadius: '0.55rem',
        }}
      >
        <Box m={'5rem'}>
          <Typography
            fontFamily={theme.typography.h1}
            color={theme.palette.neutral.light}
          >
            FIN VIEW
          </Typography>
        </Box>
      <Box display={'inline-flex'}>
        <Box m={'1rem'}>
          <Button href='/login' variant='outlined'>
            <Typography>
              Login
            </Typography>
          </Button>
        </Box>
        <Box m={'1rem'}>
          <Button href='/signup' variant='outlined'>
            <Typography>
              Sign up
            </Typography>
          </Button>
        </Box>
      </Box>
      </Box>
    </>
  );
};

export default Hero;