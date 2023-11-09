import React from "react";
import InputMask from "react-input-mask";

import PropTypes from "prop-types";

import { TextField } from "@mui/material";

const MaskedTextField = ({
  mask,
  label,
  placeholder,
  name,
  value,
  onChange,
  onBlur,
  error,
  helperText,
  required,
  disabled = false,
  InputProps,
}) => {
  return (
    <InputMask
      onChange={onChange}
      onBlur={onBlur}
      value={value}
      mask={mask}
      maskChar={""}
      disabled={disabled}
    >
      {() => (
        <TextField
          fullWidth
          name={name}
          size={"small"}
          label={label}
          placeholder={placeholder}
          error={error}
          helperText={helperText}
          required={required}
          disabled={disabled}
          InputProps={InputProps}
        />
      )}
    </InputMask>
  );
};

export default MaskedTextField;
MaskedTextField.propTypes = {
  mask: PropTypes.string.isRequired,
  name: PropTypes.string,
  value: PropTypes.string,
  onChange: PropTypes.func,
  onBlur: PropTypes.func,
  error: PropTypes.bool,
  helperText: PropTypes.string,
  label: PropTypes.string,
  placeholder: PropTypes.string,
  required: PropTypes.bool,
  disabled: PropTypes.bool,
  InputProps: PropTypes.object,
};
