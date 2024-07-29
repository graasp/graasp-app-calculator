import Grid from '@mui/material/Grid';

import Calculator from '../../common/Calculator';
import Settings from './Settings';

export const TeacherView = (): JSX.Element => (
  <>
    <Grid container spacing={10}>
      <Grid item xs={12}>
        <Calculator />
      </Grid>
    </Grid>
    <Settings />
  </>
);

export default TeacherView;
