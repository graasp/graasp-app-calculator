import CircularProgress from '@mui/material/CircularProgress';
import Grid from '@mui/material/Grid';
import PropTypes from 'prop-types';

const Loader = () => (
  <Grid container spacing={0}>
    <Grid item xs={12}>
      <CircularProgress />
    </Grid>
  </Grid>
);

Loader.propTypes = {
  classes: PropTypes.shape({ root: PropTypes.string }).isRequired,
};

export default Loader;
