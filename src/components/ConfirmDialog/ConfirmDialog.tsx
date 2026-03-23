import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

interface ConfirmDialogProps {
    open: boolean;
    handleClose: () => void;
    handleConfirm: () => void;
    title: string;
    description?: string;
    confirmText: string;
    cancelText: string;
}

const ConfirmDialog = ({open, handleClose, handleConfirm, title, description, confirmText, cancelText}: ConfirmDialogProps) => {
  return (
    <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {title}
        </DialogTitle>
        {!!description &&
        (<DialogContent>
            <DialogContentText id="alert-dialog-description">
            {description}
            </DialogContentText>
        </DialogContent>)}
        <DialogActions>
          <Button onClick={handleClose}>{cancelText}</Button>
          <Button onClick={handleConfirm} autoFocus>
            {confirmText}
          </Button>
        </DialogActions>
      </Dialog>
  );
}

export default ConfirmDialog;