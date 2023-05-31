import Grid from '@mui/material/Grid';
import SettingsIcon from '@mui/icons-material/Settings';
import Fab from '@mui/material/Fab';
import Calculator from '../../common/Calculator';
import Settings from './Settings';

export const TeacherView = () => {
  return (
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
};

export default TeacherView;
