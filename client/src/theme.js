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
    }
  }
}