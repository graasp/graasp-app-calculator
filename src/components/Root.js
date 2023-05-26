import { I18nextProvider } from 'react-i18next';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { ToastContainer } from 'react-toastify';
import grey from '@mui/material/colors/grey';
import 'react-toastify/dist/ReactToastify.css';
import i18nConfig from '../config/i18n';
import App from './App';

const theme = createTheme({
  palette: {
    primary: {
      main: '#5050d2',
    },
    secondary: { main: '#ffffff' },
    default: grey,
    background: {
      paper: '#fff',
    },
  },
  typography: {
    useNextVariants: true,
    fontFamily: 'Helvetica, sans-serif',
    fontSize: 13,
  },
  spacing: 4,
});

const Root = () => (
  <ThemeProvider theme={theme}>
    <I18nextProvider i18n={i18nConfig}>
      <App />
      <ToastContainer />
    </I18nextProvider>
  </ThemeProvider>
);

export default Root;
