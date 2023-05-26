import { withTranslation } from 'react-i18next';
import Grid from '@mui/material/Grid';
import Calculator from '../../common/Calculator';

export const StudentView = () => (
  <Grid container spacing={10}>
    <Grid
      item
      xs={12}
      sx={{
        textAlign: 'center',
        margin: 1,
      }}
    >
      <Calculator />
    </Grid>
  </Grid>
);

export default withTranslation()(StudentView);
