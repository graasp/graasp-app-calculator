import { useTranslation } from 'react-i18next';

import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';

import { ReactComponent as Logo } from '../../resources/logo.svg';

const Header = (): JSX.Element => {
  const { t } = useTranslation();

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

export default Header;
