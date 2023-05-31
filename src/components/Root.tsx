import { I18nextProvider } from 'react-i18next';
import { ThemeProvider } from '@mui/material/styles';
import { ToastContainer } from 'react-toastify';
import { theme } from '@graasp/ui';
import 'react-toastify/dist/ReactToastify.css';
import i18nConfig from '../config/i18n';
import App from './App';

const Root = () => (
  <ThemeProvider theme={theme}>
    <I18nextProvider i18n={i18nConfig}>
      <App />
      <ToastContainer />
    </I18nextProvider>
  </ThemeProvider>
);

export default Root;
