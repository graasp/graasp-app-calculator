import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import Switch from '@mui/material/Switch';
import FormControlLabel from '@mui/material/FormControlLabel';
import { useTranslation } from 'react-i18next';
import { Box, styled } from '@mui/material';
import { Loader } from '@graasp/ui';

const StyledBox = styled(Box)(({ theme }) => ({
  position: 'absolute',
  width: theme.spacing(100),
  backgroundColor: theme.palette.background.paper,
  boxShadow: theme.shadows[5],
  padding: theme.spacing(4),
  outline: 'none',
  top: '50%',
  left: '50%',
  transform: `translate(-50%, -50%)`,
}));

type Props = {
  settings?: { headerVisible?: boolean };
  activity?: boolean;
  open?: boolean;
};

const Settings = ({
  settings = {},
  activity,
  open = false,
}: Props): JSX.Element => {
  const { t } = useTranslation();

  const renderModalContent = (): JSX.Element => {
    const { headerVisible } = settings;

    if (activity) {
      return <Loader />;
    }

    const switchControl = (
      <Switch
        color="primary"
        checked={headerVisible}
        value="headerVisibility"
      />
    );

    return (
      <FormControlLabel
        control={switchControl}
        label={t('Show Header to Students')}
      />
    );
  };

  return (
    <div>
      <Modal
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
        open={open}
      >
        <StyledBox>
          <Typography variant="h5" id="modal-title">
            {t('Settings')}
          </Typography>
          {renderModalContent()}
        </StyledBox>
      </Modal>
    </div>
  );
};

export default Settings;
