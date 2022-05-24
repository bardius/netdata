import { createTheme } from '@material-ui/core/styles';
import { green, grey } from '@material-ui/core/colors';

const BASE_THEME = createTheme({
  palette: {
    primary: green,
    secondary: grey
  }
});

export default BASE_THEME;
