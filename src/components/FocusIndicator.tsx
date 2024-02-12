import { Grid, Typography } from '@mui/material';
import { ENABLED_COLOR, DISABLED_COLOR } from 'config/constants';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import InfoIcon from '@mui/icons-material/Info';

const FocusIndicator = ({
  isFocused,
  setIsFocused,
  standalone,
}: {
  isFocused: boolean;
  setIsFocused: (val: boolean) => void;
  standalone?: boolean;
}): JSX.Element => {
  const { t } = useTranslation();

  const text = isFocused
    ? t('The keyboard is enabled')
    : t('The keyboard is disabled');
  const focusColor = isFocused ? ENABLED_COLOR : DISABLED_COLOR;

  useEffect(() => {
    const handleFocus = (): void => {
      setIsFocused(true);
    };
    if (standalone) {
      setIsFocused(true);
    }
    // handle keyboard only when the iframe is focused
    else {
      window.addEventListener('focus', handleFocus);
    }
    return () => {
      document.removeEventListener('focus', handleFocus, true);
    };
  }, [standalone, setIsFocused]);
  return (
    <>
      <Grid item xs={1}>
        <InfoIcon style={{ color: focusColor }} />
      </Grid>
      <Grid item xs={11}>
        <Typography
          align="left"
          style={{ color: focusColor }}
          sx={{ fontSize: '1rem' }}
          variant="h6"
        >
          {text}
        </Typography>
      </Grid>
    </>
  );
};

export default FocusIndicator;
