import React from 'react';
import { Close } from '@mui/icons-material';
import { Box, Dialog, DialogProps } from '@mui/material';

interface IDialogWithClose extends DialogProps {
  onClose: (open: boolean) => void;
  open: boolean;
}
const DialogWithClose: React.FC<IDialogWithClose> = ({ onClose, children, ...props }) => {

  return (
    <Dialog onClose={onClose} {...props}>
      <Box
        display="flex"
        width="100%"
        justifyContent="flex-end"
        paddingRight={2}
        paddingTop={2}
        marginBottom={-1.5}
      >
        <Close
          sx={{ cursor: 'pointer' }}
          onClick={() => onClose(false)}
        />
      </Box>
      {children}
    </Dialog>
  );
};

export default DialogWithClose;
