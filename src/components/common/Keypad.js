import React, { Component } from 'react';
import PropTypes from 'prop-types';
import katex from 'katex';
import { withStyles } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import { KEYPAD_BUTTON_CLASS } from '../../constants/selectors';
import { BUTTONS, SCIENTIFIC_BUTTONS } from '../../constants/constants';

const BUTTON_FONT_SIZE = '2.3rem'
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
})

const styles = (theme) => ({
  buttonWrapper: buildButtonWrapperStyles(theme, BUTTON_FONT_SIZE),
  scientificWrapper: {
    marginRight: theme.spacing(1),
    [theme.breakpoints.down('xs')]: {
      marginRight: theme.spacing(-1),
      marginBottom: theme.spacing(1),
    },
    ...buildButtonWrapperStyles(theme, '1.9rem')
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
            sm={6}
            spacing={2}
            className={classes.scientificWrapper}
          >
            {SCIENTIFIC_BUTTONS.map((button) => this.renderButton(button, 3))}
          </Grid>
        )}
        <Grid container sm={scientificMode ? 6 : 12} spacing={2}>
          {BUTTONS.map((button) => this.renderButton(button, 3))}
        </Grid>
      </>
    );
  }
}

export default withStyles(styles, { withTheme: true })(KeyPad);
