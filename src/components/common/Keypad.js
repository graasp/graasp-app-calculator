import katex from 'katex';
import PropTypes from 'prop-types';
import { styled, useTheme } from '@mui/material';
import Grid from '@mui/material/Grid';
import { KEYPAD_BUTTON_CLASS } from '../../constants/selectors';
import { BUTTONS, SCIENTIFIC_BUTTONS } from '../../config/constants';

const BUTTON_FONT_SIZE = '2.3rem';
const buildButtonWrapperStyles = (theme, fontSize) => ({
  '& .katex': { fontFamily: theme.typography.fontFamily },

  '& button': {
    width: '100%',
    height: '100%',
    background: theme.palette.primary.main,
    fontSize,
    border: 'none',
    padding: theme.spacing(1, 0),

    // override katex default styles with app theme
    '& > span': {
      fontSize,
      color: `${theme.palette.secondary.main} !important`,

      // message style (infinite, error...)
      '& .mathnormal': {
        fontFamily: theme.typography.fontFamily,
        fontStyle: 'normal',
      },
    },
  },
});

const StyledGrid = styled(Grid)(({ theme }) => ({
  marginRight: theme.spacing(1),
  [theme.breakpoints.down('xs')]: {
    marginRight: theme.spacing(-1),
    marginBottom: theme.spacing(1),
  },
  ...buildButtonWrapperStyles(theme, '1.9rem'),
}));

const Keypad = ({ onClick, scientificMode }) => {
  const theme = useTheme();

  const handleOnClick = (e) => {
    // the event target might be a child of the button
    const {
      name,
      dataset: { text, katex: katexString, mathjs },
    } = e.target.closest(`.${KEYPAD_BUTTON_CLASS}`);
    onClick({ name, text, katex: katexString, mathjs });
  };

  const renderButton = ({ name, text, katex: katexString, mathjs }, xs) => {
    return (
      <Grid
        key={name}
        item
        xs={xs}
        sx={buildButtonWrapperStyles(theme, BUTTON_FONT_SIZE)}
      >
        <button
          data-cy={name}
          type="button"
          label={`button ${name}`}
          className={KEYPAD_BUTTON_CLASS}
          name={name}
          data-text={text}
          data-katex={katexString}
          data-mathjs={mathjs}
          onClick={handleOnClick}
          dangerouslySetInnerHTML={{
            __html: katex.renderToString(text, {
              throwOnError: false,
            }),
          }}
        />
      </Grid>
    );
  };

  return (
    <>
      {scientificMode && (
        <StyledGrid container sm={6} spacing={2}>
          {SCIENTIFIC_BUTTONS.map((button) => renderButton(button, 3))}
        </StyledGrid>
      )}
      <Grid container sm={scientificMode ? 6 : 12} spacing={2}>
        {BUTTONS.map((button) => renderButton(button, 3))}
      </Grid>
    </>
  );
};

Keypad.propTypes = {
  onClick: PropTypes.func.isRequired,
  scientificMode: PropTypes.bool.isRequired,
};

export default Keypad;
