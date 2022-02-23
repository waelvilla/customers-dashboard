import React from 'react';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle
} from '@mui/material';

export default function Modal({
  open,
  onDismiss,
  title,
  body,
  primaryButtonText,
  primaryButtonAction,
  secondaryButtonText,
  secondaryButtonAction
}: {
  title: string;
  body?: string;
  open: boolean;
  onDismiss: () => void;
  primaryButtonText?: string;
  primaryButtonAction?: () => void;
  secondaryButtonText?: string;
  secondaryButtonAction?: () => void;
}) {
  return (
    <Dialog
      open={open}
      fullWidth
      onClose={onDismiss}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description">
      <DialogTitle id="alert-dialog-title">{title}</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">{body}</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={secondaryButtonAction}>{secondaryButtonText}</Button>
        <Button onClick={primaryButtonAction} autoFocus>
          {primaryButtonText}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
