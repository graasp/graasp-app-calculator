import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import StudentView from './StudentView';
import { DEFAULT_VIEW, FEEDBACK_VIEW } from '../../../config/views';
import Loader from '../../common/Loader';

// eslint-disable-next-line react/prefer-stateless-function
class StudentMode extends Component {
  static propTypes = {
    view: PropTypes.string,
    activity: PropTypes.number,
  };

  static defaultProps = {
    view: 'normal',
    activity: 0,
  };

  render() {
    const { view, activity } = this.props;
    if (activity) {
      return <Loader />;
    }
    switch (view) {
      case FEEDBACK_VIEW:
      case DEFAULT_VIEW:
      default:
        return <StudentView />;
    }
  }
}
const mapStateToProps = ({ appInstanceResources }) => {
  return {
    activity: appInstanceResources.activity.length,
  };
};

const ConnectedComponent = connect(mapStateToProps)(StudentMode);

export default ConnectedComponent;
