import React, { Component } from 'react';
import PropTypes from 'prop-types';
import katex from 'katex';
import { withStyles } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import { KEYPAD_BUTTON_CLASS } from '../../constants/selectors';
import { BUTTONS } from '../../constants/constants';

const styles = (theme) => ({
  buttonWrapper: {
    '& .katex': { fontFamily: theme.typography.fontFamily },

    '& button': {
      width: '100%',
      height: '100%',
      background: theme.palette.primary.main,
      fontSize: '2.3rem',
      border: 'none',
      padding: theme.spacing(1, 0),

      // override katex katex default styles with app theme
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
    }).isRequired,
    onClick: PropTypes.func.isRequired,
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

  renderButton = ({ name, text, katex: katexString, mathjs }) => {
    const { classes } = this.props;

    return (
      <Grid key={name} item xs={3} className={classes.buttonWrapper}>
        <button
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
    return BUTTONS.map((button) => this.renderButton(button));
  }
}

export default withStyles(styles, { withTheme: true })(KeyPad);
