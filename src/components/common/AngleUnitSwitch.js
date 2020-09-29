import React from 'react';
import { withStyles } from '@material-ui/core';
import PropTypes from 'prop-types';
import Switch from '@material-ui/core/Switch';
import Grid from '@material-ui/core/Grid';
import { withTranslation } from 'react-i18next';
import { ANGLE_UNITS } from '../../constants/constants';
import { ANGLE_UNIT_SWITCH_NAME } from '../../constants/selectors';

const styles = (theme) => ({
  switchBase: {
    color: theme.palette.primary.main,
    '&$checked': {
      color: theme.palette.primary.main,
    },
  },
  angleUnitWrapper: {
    marginRight: theme.spacing(3),
  },
  label: {
    fontSize: '0.9rem',
  },
});

const AngleUnitSwitch = (props) => {
  const { angleUnit, setAngleUnit, classes, t } = props;

  const onChange = () => {
    const newAngleUnit =
      angleUnit === ANGLE_UNITS.DEG ? ANGLE_UNITS.RAD : ANGLE_UNITS.DEG;
    setAngleUnit(newAngleUnit);
  };

  return (
    <Grid
      container
      className={classes.angleUnitWrapper}
      align="right"
      justify="flex-end"
      alignItems="center"
      spacing={1}
    >
      <Grid item className={classes.label}>
        {t('Radian')}
      </Grid>
      <Grid item>
        <Switch
          data-cy={ANGLE_UNIT_SWITCH_NAME}
          classes={{
            switchBase: classes.switchBase,
          }}
          color="primary"
          checked={angleUnit === ANGLE_UNITS.DEG}
          onChange={onChange}
        />
      </Grid>
      <Grid item className={classes.label}>
        {t('Degree')}
      </Grid>
    </Grid>
  );
};

AngleUnitSwitch.propTypes = {
  angleUnit: PropTypes.oneOf(Object.values(ANGLE_UNITS)).isRequired,
  setAngleUnit: PropTypes.func.isRequired,
  classes: PropTypes.shape({
    switchBase: PropTypes.string.isRequired,
    angleUnitWrapper: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
  }).isRequired,
  t: PropTypes.func.isRequired,
};

const StyledComponent = withStyles(styles, { withTheme: true })(
  AngleUnitSwitch,
);
export default withTranslation()(StyledComponent);
