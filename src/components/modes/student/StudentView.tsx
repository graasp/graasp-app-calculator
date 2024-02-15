import Grid from '@mui/material/Grid';
import Calculator from '../../common/Calculator';
import { hooks } from '../../../config/queryClient';

export const StudentView = (): JSX.Element => {
  const { data } = hooks.useAppData();

  return (
    <Grid container spacing={10}>
      <Grid
        item
        xs={12}
        sx={{
          textAlign: 'center',
          margin: 1,
        }}
      >
        <Calculator />
      </Grid>
    </Grid>
  );
};

export default StudentView;
