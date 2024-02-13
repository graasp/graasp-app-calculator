import Switch from '@mui/material/Switch';
import Grid from '@mui/material/Grid';
import { useTranslation } from 'react-i18next';
import { ValueOf } from 'types/math';
import { ANGLE_UNITS } from '../../config/constants';
import { ANGLE_UNIT_SWITCH_NAME } from '../../config/selectors';

type AngleUnitType = ValueOf<typeof ANGLE_UNITS>;

interface Props {
  angleUnit: AngleUnitType;
  setAngleUnit: (value: AngleUnitType) => void;
}
const AngleUnitSwitch = ({ angleUnit, setAngleUnit }: Props): JSX.Element => {
  const { t } = useTranslation();
  const onChange = (): void => {
    const val =
      angleUnit === ANGLE_UNITS.DEG ? ANGLE_UNITS.RAD : ANGLE_UNITS.DEG;
    setAngleUnit(val);
  };

  return (
    <Grid
      container
      sx={{ marginRight: 1 }}
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

export default AngleUnitSwitch;
