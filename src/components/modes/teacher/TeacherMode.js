import PropTypes from 'prop-types';
import TeacherView from './TeacherView';
import { DEFAULT_VIEW, DASHBOARD_VIEW } from '../../../config/views';
import Loader from '../../common/Loader';

const TeacherMode = () => {
  const { view, activity } = this.props;
  if (activity) {
    return <Loader />;
  }
  switch (view) {
    case DASHBOARD_VIEW:
    case DEFAULT_VIEW:
    default:
      return <TeacherView />;
  }
};

TeacherMode.propTypes = {
  view: PropTypes.string,
  activity: PropTypes.bool,
};

TeacherMode.defaultProps = {
  view: 'normal',
  activity: false,
};

export default TeacherMode;
