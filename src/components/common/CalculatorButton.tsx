import katex from 'katex';
import { styled } from '@mui/material';
import Grid from '@mui/material/Grid';
import { KEYPAD_BUTTON_CLASS } from '../../config/selectors';
import { Button } from '../../config/constants';

const BUTTON_FONT_SIZE = '2.3rem';

const StyledGrid = styled(Grid)(({ theme }) => ({
  '& .katex': { fontFamily: theme.typography.fontFamily },

  '& button': {
    width: '100%',
    height: '100%',
    background: theme.palette.primary.main,
    fontSize: BUTTON_FONT_SIZE,
    border: 'none',
    padding: theme.spacing(1, 0),

    // override katex default styles with app theme
    '& > span': {
      fontSize: BUTTON_FONT_SIZE,
      color: `${theme.palette.secondary.main} !important`,

      // message style (infinite, error...)
      '& .mathnormal': {
        fontFamily: theme.typography.fontFamily,
        fontStyle: 'normal',
      },
    },
  },
}));

interface Props {
  xs?: number;
  button: Button;
  onClick: (value: Button) => void;
}

const CalculatorButton = ({ button, xs = 3, onClick }: Props): JSX.Element => {
  const { name, text, katex: katexString, mathjs } = button;
  return (
    <StyledGrid item xs={xs}>
      <button
        data-cy={name}
        type="button"
        className={KEYPAD_BUTTON_CLASS}
        name={name}
        data-text={text}
        data-katex={katexString}
        data-mathjs={mathjs}
        aria-label="calc-button"
        onClick={() => onClick({ name, text, katex: katexString, mathjs })}
        /* eslint-disable-next-line react/no-danger */
        dangerouslySetInnerHTML={{
          __html: katex.renderToString(text, {
            throwOnError: false,
          }),
        }}
      />
    </StyledGrid>
  );
};

export default CalculatorButton;
