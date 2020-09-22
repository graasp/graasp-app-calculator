import React from 'react';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import { withTranslation } from 'react-i18next';
import SettingsIcon from '@material-ui/icons/Settings';
import Fab from '@material-ui/core/Fab';
import PropTypes from 'prop-types';
import Calculator from '../../common/Calculator';
import { openSettings } from '../../../actions';
import Settings from './Settings';

const styles = (theme) => ({
  main: {
    textAlign: 'center',
    margin: theme.spacing(),
  },
  message: {
    padding: theme.spacing(),
    backgroundColor: theme.status.danger.background[500],
    color: theme.status.danger.color,
    marginBottom: theme.spacing(2),
  },
  fab: {
    margin: theme.spacing(),
    position: 'fixed',
    bottom: theme.spacing(2),
    right: theme.spacing(2),
  },
});

export const TeacherView = ({ classes, t, dispatchOpenSettings }) => (
  <>
    <Grid container spacing={10}>
      <Grid item xs={12} className={classes.main}>
        <Calculator />
      </Grid>
    </Grid>
    <Settings />
    <Fab
      color="primary"
      aria-label={t('Settings')}
      className={classes.fab}
      onClick={dispatchOpenSettings}
    >
      <SettingsIcon />
    </Fab>
  </>
);

TeacherView.propTypes = {
  t: PropTypes.func.isRequired,
  dispatchOpenSettings: PropTypes.func.isRequired,
  classes: PropTypes.shape({
    main: PropTypes.string,
    message: PropTypes.string,
    fab: PropTypes.string,
  }).isRequired,
};

// allow this component to dispatch a post
// request to create an app instance resource
const mapDispatchToProps = {
  // dispatchPostAppInstanceResource: postAppInstanceResource,
  // dispatchPatchAppInstanceResource: patchAppInstanceResource,
  // dispatchDeleteAppInstanceResource: deleteAppInstanceResource,
  dispatchOpenSettings: openSettings,
};

const ConnectedComponent = connect(null, mapDispatchToProps)(TeacherView);

const StyledComponent = withStyles(styles)(ConnectedComponent);

export default withTranslation()(StyledComponent);
