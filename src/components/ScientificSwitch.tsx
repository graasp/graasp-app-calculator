import { Switch, Grid, FormControlLabel } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { SCIENTIFIC_MODE_SWITCH_NAME } from '../config/selectors';

interface Props {
  scientificMode: boolean;
  setScientificMode: (val: boolean) => void;
}
const ScientificSwitch = ({
  scientificMode,
  setScientificMode,
}: Props): JSX.Element => {
  const { t } = useTranslation();

  const control = (
    <Switch
      data-cy={SCIENTIFIC_MODE_SWITCH_NAME}
      color="primary"
      checked={scientificMode}
      onChange={() => setScientificMode(!scientificMode)}
      name={t('Scientific Mode')}
    />
  );
  return (
    <Grid item xs={12}>
      <FormControlLabel control={control} label={t('Scientific Mode')} />
    </Grid>
  );
};

export default ScientificSwitch;
