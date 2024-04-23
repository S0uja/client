import { createTheme } from '@mui/material/styles';


const theme = createTheme({
  breakpoints: {
    values: {
      es: 0,
      xs: 200,
      s: 450,
      sm: 600,
      md: 800,
      lg: 1024,
      xl: 1200,
      xxl: 1400,
    },
  },
  palette: {
    primary: {
      light: 'rgb(120, 120, 120)',
      main: 'rgb(64, 64, 64)',
      dark: 'rgb(64, 64, 64)',
      contrastText: '#fff',
    },
    secondary: {
      light: 'rgb(64, 64, 64)',
      main: 'rgb(64, 64, 64)',
      dark: 'rgb(64, 64, 64)',
      contrastText: 'rgb(64, 64, 64)',
    },
  },
});

export default theme