import React from "react";

import PropTypes from "prop-types";

import { Close } from "@mui/icons-material";
import { Dialog, DialogContent, DialogTitle } from "@mui/material";
import IconButton from "../../IconButton";

import { ModalActions } from "./styles";

const BaseModal = ({
  title,
  open,
  withActions,
  children,
  handleClose,
  maxWidth,
  noPadding,
  maxHeight,
  mdSize,
  backgroundColor,
}) => {
  return (
    <Dialog
      fullWidth
      onClose={handleClose}
      aria-labelledby="customized-dialog-title"
      open={open}
      BackdropProps={{
        style: { backgroundColor: backgroundColor || "transparent" },
      }}
      PaperProps={{
        sx: { width: { xs: "95%", sm: "80%", md: mdSize || "45%" } },
      }}
      maxWidth={maxWidth || null}
    >
      <DialogTitle
        onClose={handleClose}
        sx={{
          color: "#2e7d32",
          fontWeight: "bold",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <h3>{title}</h3>
        <IconButton
          variant={"transparent"}
          icon={<Close />}
          onClick={handleClose}
        />
      </DialogTitle>
      <DialogContent
        dividers
        style={{ position: "relative", padding: noPadding ? 0 : "16px" }}
      >
        <>{children}</>
      </DialogContent>
      {React.isValidElement(withActions) && (
        <ModalActions>{withActions}</ModalActions>
      )}
    </Dialog>
  );
};
export default BaseModal;

BaseModal.propTypes = {
  title: PropTypes.string.isRequired,
  open: PropTypes.bool.isRequired,
  withActions: PropTypes.element,
  children: PropTypes.node.isRequired,
  maxWidth: PropTypes.oneOf(["xs", "sm", "md"]),
  handleClose: PropTypes.func.isRequired,
  noPadding: PropTypes.bool,
  maxHeight: PropTypes.string,
};
