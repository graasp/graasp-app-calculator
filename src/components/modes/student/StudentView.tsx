import Grid from '@mui/material/Grid';

import Calculator from '../../common/Calculator';

export const StudentView = (): JSX.Element => (
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

export default StudentView;
