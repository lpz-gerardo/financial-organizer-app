import { Button, Box, Typography } from '@mui/material';
import { useTheme } from '@mui/material';
import FlexStyle from './FlexStyle';

const Hero = () => {
	const theme = useTheme();

  return (
    <>
    <Box className={'box-main-hero'}>

      <FlexStyle sx={{
        justifyContent: 'center',
        boxSizing: 'border-box',
      }}>
        <Box
          className={'box-hero'}
          sx={{
            borderColor: theme.palette.primary.dark,
            bgcolor: theme.palette.grey[0],
          }}
        >
          <Box m={'4rem'}>
            <Typography
              variant='h1'
              fontWeight={'bold'}
              color={theme.palette.primary.dark}
            >
              FIN VIEW
            </Typography>
            <Box sx={{ m: '1rem'}}>
              <Typography variant='h5'>
              Simplify the way you view your personal finance
              </Typography>
            </Box>

          </Box>
          <Box display={'inline-flex'}>
            <Box m={'1rem'}>
              <Button href='/login' variant='contained' sx={{ bgcolor: theme.palette.primary.main, m: '1rem' }}>
                <Typography>
                  Log in
                </Typography>
              </Button>
            </Box>
            <Box m={'1rem'}>
              <Button href='/signup' variant='contained' sx={{ bgcolor: theme.palette.primary.main, m: '1rem' }}>
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