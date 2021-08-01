import { createMuiTheme } from '@material-ui/core/styles';

const theme = createMuiTheme({
    palette: {
        primary: {
            main: '#d49a89',
            light:'#f7d1ba'
        },
        secondary: {
            main: '#838383',
            light: '#ad9d9d'
        },
        textSecondary: {
            main: '#6e7582'
        },
    },
    shape: {
        borderRadius: 0,
      },
      typography: {
        fontSize: 12,
      },
}); 

export default theme;