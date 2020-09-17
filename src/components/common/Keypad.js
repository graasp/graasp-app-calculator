import React, { Component } from 'react';
import PropTypes from 'prop-types';
import katex from 'katex';
import { withStyles } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import { KEYPAD_BUTTON_CLASS } from '../../constants/selectors';
import { BUTTONS, SCIENTIFIC_BUTTONS } from '../../constants/constants';

const styles = (theme) => ({
  scientificWrapper: {
    marginRight: theme.spacing(1),
  },
  buttonWrapper: {
    '& .katex': { fontFamily: theme.typography.fontFamily },

    '& button': {
      width: '100%',
      height: '100%',
      background: theme.palette.primary.main,
      fontSize: '2.3rem',
      border: 'none',
      padding: theme.spacing(1, 0),

      // override katex default styles with app theme
      '& > span': {
        fontSize: '2.3rem',
        color: `${theme.palette.secondary.main} !important`,

        // message style (infinite, error...)
        '& .mathnormal': {
          fontFamily: theme.typography.fontFamily,
          fontStyle: 'normal',
        },
      },
    },
  },
});

class KeyPad extends Component {
  static propTypes = {
    classes: PropTypes.shape({
      buttonWrapper: PropTypes.string.isRequired,
      scientificWrapper: PropTypes.string.isRequired,
    }).isRequired,
    onClick: PropTypes.func.isRequired,
    scientificMode: PropTypes.bool.isRequired,
  };

  handleOnClick = (e) => {
    const { onClick } = this.props;
    // the event target might be a child of the button
    const {
      name,
      dataset: { text, katex: katexString, mathjs },
    } = e.target.closest(`.${KEYPAD_BUTTON_CLASS}`);
    onClick({ name, text, katex: katexString, mathjs });
  };

  renderButton = ({ name, text, katex: katexString, mathjs }, xs) => {
    const { classes } = this.props;

    return (
      <Grid key={name} item xs={xs} className={classes.buttonWrapper}>
        <button
          data-cy={name}
          type="button"
          label={`button ${name}`}
          className={KEYPAD_BUTTON_CLASS}
          name={name}
          data-text={text}
          data-katex={katexString}
          data-mathjs={mathjs}
          onClick={this.handleOnClick}
          dangerouslySetInnerHTML={{
            __html: katex.renderToString(text, {
              throwOnError: false,
            }),
          }}
        />
      </Grid>
    );
  };

  render() {
    const { scientificMode, classes } = this.props;

    return (
      <>
        {scientificMode && (
          <Grid
            container
            xs={6}
            spacing={2}
            className={classes.scientificWrapper}
          >
            {SCIENTIFIC_BUTTONS.map((button) => this.renderButton(button, 4))}
          </Grid>
        )}
        <Grid container xs={scientificMode ? 6 : 12} spacing={2}>
          {BUTTONS.map((button) => this.renderButton(button, 3))}
        </Grid>
      </>
    );
  }
}

export default withStyles(styles, { withTheme: true })(KeyPad);
