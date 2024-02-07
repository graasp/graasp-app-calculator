import PropTypes from 'prop-types';
import AppBar from '@mui/material/AppBar';
import Typography from '@mui/material/Typography';
import Toolbar from '@mui/material/Toolbar';
import { withTranslation } from 'react-i18next';
import { ReactComponent as Logo } from '../../resources/logo.svg';

const Header = ({ t }) => {
  return (
    <header>
      <AppBar position="static">
        <Toolbar>
          <Logo />
          <Typography variant="h6" color="inherit">
            {t('Calculator')}
          </Typography>
        </Toolbar>
      </AppBar>
    </header>
  );
};
Header.propTypes = {
  t: PropTypes.func.isRequired,
};
const TranslatedComponent = withTranslation()(Header);

export default TranslatedComponent;
