import { createMuiTheme } from '@material-ui/core/styles';

const theme = createMuiTheme({
  palette: {
    // black: {
    //     main: '#1C1D19',
    //     dark: '#000000'
    // },
    white: {
        main: '#FBFDF9',
    //     light: '#F1F8EC'
    },
    // grey: {
    //     main: '#4D4D4D',
    //     light: '#7E7E7E',
    // },
    primary: {
        light: '#EFF7D3',
        main: '#A7B99E',
        dark: '#535A3B',
        // dark2: '#3E3728',
        // light2: '#CEDCC3',
    },
    secondary: {
        main: '#37777B',
        dark: '#3B585A',
    },
    // fire: {main:  '#742B2B'},
    // earth: {main: '#365437'},
    // water: {main: '#384775'},
    // air: {main: '#6795A1'},
    // neutral: {main:  '#848484'},

  },
  typography: {
      fontFamily: ["Poppins","Herculanum"]
  }

});

export default theme;