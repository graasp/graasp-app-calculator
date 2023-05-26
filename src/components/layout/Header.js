import { Component } from 'react';
import PropTypes from 'prop-types';
import AppBar from '@mui/material/AppBar';
import Typography from '@mui/material/Typography';
import Toolbar from '@mui/material/Toolbar';
import { withTranslation } from 'react-i18next';
import { ReactComponent as Logo } from '../../resources/logo.svg';

class Header extends Component {
  static propTypes = {
    t: PropTypes.func.isRequired,
  };

  render() {
    const { t } = this.props;
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
  }
}

const TranslatedComponent = withTranslation()(Header);

export default TranslatedComponent;
