import { styled } from '@mui/material';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';

import katex from 'katex';

import { RESULT_TEXT_NAME } from '../../config/selectors';

const StyledTypography = styled(Typography)(({ theme }) => ({
  border: `1px solid ${theme.palette.primary.main}`,
  wordBreak: 'break-all',
  minHeight: '4rem',
  padding: 1,
  overflowX: 'auto',

  // override katex default styles with app theme
  '& > span': {
    color: 'black !important',
    fontFamily: theme.typography.fontFamily,
    fontSize: '3.3rem',

    // message style (infinite, error...)
    '& .mathnormal': {
      fontFamily: theme.typography.fontFamily,
      fontStyle: 'normal',
    },
  },
}));

interface Props {
  result: string;
}

const Result = ({ result }: Props): JSX.Element => {
  const html = katex.renderToString(result, {
    throwOnError: false,
  });

  // hide curvy parenthesis
  const parsedHtml = html.replace(/[{}]/g, '');

  return (
    <Grid
      item
      xs={12}
      sx={{
        marginRight: 2,
        paddingTop: 1,
        paddingBottom: 2,
        paddingLeft: '0 !important',
      }}
    >
      <StyledTypography
        data-cy={RESULT_TEXT_NAME}
        align="right"
        variant="h3"
        dangerouslySetInnerHTML={{
          __html: parsedHtml,
        }}
      />
    </Grid>
  );
};

export default Result;
