import CircularProgress from '@mui/material/CircularProgress';
import Grid from '@mui/material/Grid';

const Loader = (): JSX.Element => (
  <Grid container spacing={0}>
    <Grid item xs={12}>
      <CircularProgress />
    </Grid>
  </Grid>
);

export default Loader;
