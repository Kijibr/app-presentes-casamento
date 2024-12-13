import Snackbar, { SnackbarOrigin } from '@mui/material/Snackbar';

import MuiAlert, { AlertColor, AlertProps } from '@mui/material/Alert';
import { Stack } from '@mui/material';
import { forwardRef } from 'react';

type Alert = {
  message: string;
  severity?: AlertColor;
  active: boolean;
  handleClose: () => void;
}

const alertState: SnackbarOrigin = {
  vertical: 'top',
  horizontal: 'center',
};
export default function Toast({ message, severity, active, handleClose }: Alert) {
  const { vertical, horizontal } = alertState;

  const Alert = forwardRef<HTMLDivElement, AlertProps>(function Alert(
    props,
    ref,
  ) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });

  return (
    <>
      <Stack>
        <Snackbar
          anchorOrigin={{ vertical, horizontal }}
          key={vertical + horizontal}
          open={active}
          autoHideDuration={5000}
          onClose={handleClose}
        >
          <Alert
            onClose={handleClose}
            severity={severity}
            variant='standard'
            sx={{
              width: '100%',
              alignItems: 'center'
            }}
          >
            <p style={{  }}>
              {message}
            </p>
          </Alert>
        </Snackbar>
      </Stack>
    </>
  );
}
