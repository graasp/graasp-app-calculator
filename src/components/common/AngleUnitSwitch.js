import PropTypes from 'prop-types';
import Switch from '@mui/material/Switch';
import Grid from '@mui/material/Grid';
import { withTranslation } from 'react-i18next';
import { ANGLE_UNITS } from '../../config/constants';
import { ANGLE_UNIT_SWITCH_NAME } from '../../config/selectors';

const AngleUnitSwitch = (props) => {
  const { angleUnit, setAngleUnit, t } = props;

  const onChange = () => {
    const newAngleUnit =
      angleUnit === ANGLE_UNITS.DEG ? ANGLE_UNITS.RAD : ANGLE_UNITS.DEG;
    setAngleUnit(newAngleUnit);
  };

  return (
    <Grid
      container
      sx={{ marginRight: 1 }}
      align="right"
      justify="flex-end"
      alignItems="center"
      spacing={1}
      justifyContent="right"
    >
      <Grid item>{t('Radian')}</Grid>
      <Grid item>
        <Switch
          data-cy={ANGLE_UNIT_SWITCH_NAME}
          color="primary"
          checked={angleUnit === ANGLE_UNITS.DEG}
          onChange={onChange}
        />
      </Grid>
      <Grid item>{t('Degree')}</Grid>
    </Grid>
  );
};

AngleUnitSwitch.propTypes = {
  angleUnit: PropTypes.oneOf(Object.values(ANGLE_UNITS)).isRequired,
  setAngleUnit: PropTypes.func.isRequired,
  t: PropTypes.func.isRequired,
};

export default withTranslation()(AngleUnitSwitch);
