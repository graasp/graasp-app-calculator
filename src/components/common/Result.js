import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import Typography from '@material-ui/core/Typography';
import katex from 'katex';
import { withStyles } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import { RESULT_TEXT_NAME } from '../../constants/selectors';

const styles = (theme) => ({
  result: {
    border: `1px solid ${theme.palette.primary.main}`,
    wordBreak: 'break-all',
    minHeight: '4rem',
    padding: theme.spacing(0, 1),
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
  },
});

const Result = ({ result, classes }) => {
  const html = katex.renderToString(result, {
    throwOnError: false,
  });

  // hide curvy parenthesis
  const parsedHtml = _.replace(html, /[{}]/g, '');

  return (
    <Grid item xs={12}>
      <Typography
        data-cy={RESULT_TEXT_NAME}
        align="right"
        className={classes.result}
        variant="h3"
        dangerouslySetInnerHTML={{
          __html: parsedHtml,
        }}
      />
    </Grid>
  );
};

Result.propTypes = {
  result: PropTypes.string.isRequired,
  classes: PropTypes.shape({
    result: PropTypes.string.isRequired,
  }).isRequired,
};

export default withStyles(styles, { withTheme: true })(Result);
