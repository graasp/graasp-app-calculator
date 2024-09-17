import { Loader } from '@graasp/ui';

import { DASHBOARD_VIEW, DEFAULT_VIEW } from '../../../config/views';
import TeacherView from './TeacherView';

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
