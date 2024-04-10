import { Button, Box, Typography } from '@mui/material';
import { useTheme } from '@mui/material';
import FlexStyle from './FlexStyle';

const Hero = () => {
	const theme = useTheme();

  return (
    <>
    <Box sx={{ display: 'block', width: '100%' }}>

      <FlexStyle sx={{ 
        justifyContent: 'center',
        boxSizing: 'border-box',
      }}>
        <Box
          sx={{
            m: '1.5rem 2.5rem',
            border: '1px solid',
            borderColor: theme.palette.primary.dark,
            bgcolor: theme.palette.grey[50],
            width: '400px',
            height: '400px',
            borderRadius: '0.55rem',
          }}
        >
          <Box m={'5rem'}>
            <Typography
              fontFamily={theme.typography.h1}
              fontWeight={'bold'}
              color={theme.palette.primary.dark}
            >
              FIN VIEW
            </Typography>
          </Box>
          <Box display={'inline-flex'}>
            <Box m={'1rem'}>
              <Button href='/login' variant='contained' sx={{ bgcolor: theme.palette.primary.main }}>
                <Typography>
                  Login
                </Typography>
              </Button>
            </Box>
            <Box m={'1rem'}>
              <Button href='/signup' variant='contained' sx={{ bgcolor: theme.palette.primary.main }}>
                <Typography>
                  Sign up
                </Typography>
              </Button>
            </Box>
          </Box>
        </Box>
      </FlexStyle>
    </Box>

    </>
  );
};

export default Hero;