import Grid from '@mui/material/Grid';
import { withTranslation } from 'react-i18next';
import SettingsIcon from '@mui/icons-material/Settings';
import Fab from '@mui/material/Fab';
import PropTypes from 'prop-types';
import Calculator from '../../common/Calculator';
import Settings from './Settings';

export const TeacherView = ({ t }) => (
  <>
    <Grid container spacing={10}>
      <Grid item xs={12}>
        <Calculator />
      </Grid>
    </Grid>
    <Settings />
    {/* <Fab
      color="primary"
      aria-label={t('Settings')}
      sx={{
        margin: 1,
        position: 'fixed',
        bottom: 2,
        right: 2,
      }}
      onClick={dispatchOpenSettings}
    > 
      <SettingsIcon />
    </Fab>
    */}
  </>
);

TeacherView.propTypes = {
  t: PropTypes.func.isRequired,
};

export default withTranslation()(TeacherView);
