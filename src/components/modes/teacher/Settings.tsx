import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import Switch from '@mui/material/Switch';
import FormControlLabel from '@mui/material/FormControlLabel';
import { useTranslation } from 'react-i18next';
import { Box, styled } from '@mui/material';
import { Loader } from '@graasp/ui';

const getModalStyle = () => {
  const top = 50;
  const left = 50;
  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
};

const StyledBox = styled(Box)(({ theme }) => ({
  position: 'absolute',
  width: theme.spacing(100),
  backgroundColor: theme.palette.background.paper,
  boxShadow: theme.shadows[5],
  padding: theme.spacing(4),
  outline: 'none',
}));

type Props = {
  settings?: { headerVisible?: boolean };
  activity?: boolean;
  open?: boolean;
};

const Settings = ({ settings = {}, activity, open = false }: Props) => {
  const { t } = useTranslation();

  const saveSettings = () => {
    // TODO: fix header visibility
    // const { settings, dispatchPatchAppInstance } = this.props;
    // const newSettings = {
    //   ...settings,
    //   ...settingsToChange,
    // };
    // dispatchPatchAppInstance({
    //   data: newSettings,
    // });
  };

  const handleChangeHeaderVisibility = () => {
    // const { headerVisible } = settings;
    // const settingsToChange = {
    //   headerVisible: !headerVisible,
    // };
    // saveSettings(settingsToChange);
  };

  const handleClose = () => {
    // TODO: fix header visibility
    // const { dispatchCloseSettings } = this.props;
    // dispatchCloseSettings();
  };

  const renderModalContent = () => {
    const { headerVisible } = settings;

    if (activity) {
      return <Loader />;
    }

    const switchControl = (
      <Switch
        color="primary"
        checked={headerVisible}
        onChange={handleChangeHeaderVisibility}
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
        onClose={handleClose}
      >
        <StyledBox style={getModalStyle()}>
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
