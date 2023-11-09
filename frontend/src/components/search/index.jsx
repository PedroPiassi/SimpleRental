import React from "react";

import PropTypes from "prop-types";

import SearchIcon from "@mui/icons-material/Search";
import IconButton from "@mui/material/IconButton";

import { Container, CInputAdornment } from "./styles";

const SearchInput = ({
  id,
  handleChange,
  value,
  handleBlur,
  handleClick,
  bgcolor,
  width,
}) => {
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  return (
    <Container
      value={value || ""}
      variant="outlined"
      placeholder="Buscar"
      onChange={(e) => handleChange(e)}
      onBlur={handleBlur}
      bgcolor={bgcolor}
      id={id}
      size="small"
      name={id}
      InputProps={{
        startAdornment: (
          <CInputAdornment position="start" size={30}>
            <IconButton
              onClick={handleClick}
              onMouseDown={handleMouseDownPassword}
              edge="start"
            >
              <SearchIcon />
            </IconButton>
          </CInputAdornment>
        ),
      }}
      style={{ backgroundColor: "white", width: `${width}` }}
    />
  );
};

SearchInput.propTypes = {
  handleChange: PropTypes.func,
  handleBlur: PropTypes.func,
  handleClick: PropTypes.func,
  value: PropTypes.any,
  error: PropTypes.string,
  bgcolor: PropTypes.string,
  id: PropTypes.string,
  width: PropTypes.string,
};

export default SearchInput;
