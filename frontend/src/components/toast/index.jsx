import { forwardRef } from "react";
import { Alert, Snackbar } from "@mui/material";

const ToastAlert = forwardRef(function Toast(props, ref) {
  return <Alert elevation={6} ref={ref} variant="filled" {...props} />;
});

const Toast = ({ open, severity, message, onClose, duration = 3000 }) => {
  return (
    <Snackbar open={open} autoHideDuration={duration} onClose={onClose}>
      <ToastAlert onClose={onClose} severity={severity}>
        {message}
      </ToastAlert>
    </Snackbar>
  );
};

export default Toast;
