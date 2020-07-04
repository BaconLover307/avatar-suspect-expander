import { createMuiTheme } from '@material-ui/core/styles';

const theme = createMuiTheme({
  palette: {
    white: {
        main: '#FBFDF9',
    },
    primary: {
        light: '#EFF7D3',
        main: '#A7B99E',
        dark: '#535A3B',
    },
    secondary: {
        main: '#37777B',
        dark: '#3B585A',
    },
  },
  typography: {
      fontFamily: ["Poppins","Herculanum"]
  }

});

export default theme;