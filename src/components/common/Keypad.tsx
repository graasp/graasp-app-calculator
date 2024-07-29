import { styled } from '@mui/material';
import Grid from '@mui/material/Grid';

import {
  BUTTONS,
  KatexButton,
  SCIENTIFIC_BUTTONS,
} from '../../config/constants';
import CalculatorButton from './CalculatorButton';

const StyledGrid = styled(Grid)(({ theme }) => ({
  marginRight: theme.spacing(1),
  [theme.breakpoints.down('xs')]: {
    marginRight: theme.spacing(-1),
    marginBottom: theme.spacing(1),
  },
}));

interface Props {
  onClick: (value: KatexButton) => void;
  scientificMode: boolean;
}
const Keypad = ({ onClick, scientificMode }: Props): JSX.Element => (
  <>
    {scientificMode && (
      <StyledGrid container sm={6} spacing={2}>
        {SCIENTIFIC_BUTTONS.map((button) => (
          <CalculatorButton
            key={button.name}
            button={button}
            onClick={onClick}
          />
        ))}
      </StyledGrid>
    )}
    <Grid container sm={scientificMode ? 6 : 12} spacing={2}>
      {BUTTONS.map((button) => (
        <CalculatorButton key={button.name} button={button} onClick={onClick} />
      ))}
    </Grid>
  </>
);

export default Keypad;
