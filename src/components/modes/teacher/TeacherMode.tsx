import Loader from 'components/common/Loader';
import TeacherView from './TeacherView';
import { DEFAULT_VIEW, DASHBOARD_VIEW } from '../../../config/views';

type Props = {
  view: string;
  activity: boolean;
};

const TeacherMode = ({ view, activity }: Props): JSX.Element => {
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

export default TeacherMode;
