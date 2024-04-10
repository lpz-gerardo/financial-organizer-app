export const themeSettings = () => {
  return {
    palette: {
      primary: {
        main: '#FFB300',
        light: '#FFE082',
        dark: '#FF8F00',
      },
      secondary: {
        main: '#03A9F4',
        light: '#18FFFF',
        dark: '#01579B',
      },
      neutral: {
        main: '#78909C',
        light: '#CFD8DC',
        dark: '#263238',
      },
      grey: {
        0: '#ffffff',
        50: '#f0f0f0',
        100: '#e0e0e0',
        200: '#c2c2c2',
        300: '#a3a3a3',
        400: '#858585',
        500: '#666666',
        600: '#525252',
        700: '#3d3d3d',
        800: '#292929',
        900: '#141414',
        1000: '#000000',
      },
      background: {
        default: '#CFD8DC',
        alt: '#263238'
      },
    },
    typography: {
      fontFamily: ['Lato', 'Inter', 'sans-serif'].join(','),
      fontSize: 12,
      h1: {
        fontFamily: ['Lato', 'Inter', 'sans-serif'].join(','),
        fontSize: 40,
      },
      h2: {
        fontFamily: ['Lato', 'Inter', 'sans-serif'].join(','),
        fontSize: 32,
      },
      h3: {
        fontFamily: ['Lato', 'Inter', 'sans-serif'].join(','),
        fontSize: 24,
      },
      h4: {
        fontFamily: ['Lato', 'Inter', 'sans-serif'].join(','),
        fontSize: 20,
      },
      h5: {
        fontFamily: ['Lato', 'Inter', 'sans-serif'].join(','),
        fontSize: 16,
      },
      h6: {
        fontFamily: ['Lato', 'Inter', 'sans-serif'].join(','),
        fontSize: 14,
      },
      subtitle: {
        fontFamily: ['Lato', 'Inter', 'sans-serif'].join(','),
        fontSize: 14,
        fontWeight: 400,
      }
    }
  }
}