import React from "react";
import { ButtonStyled, Div, ImgStyled, ToolbarStyled } from "./styles";
import { AppBar } from "@mui/material";
import { FaHome } from "react-icons/fa";
import { AiFillCar } from "react-icons/ai";
import { BsFillPeopleFill } from "react-icons/bs";
import LogoCar from "../../assets/images/logo.png";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <AppBar position="static">
      <ToolbarStyled>
        <ImgStyled src={LogoCar} alt="Car Logo" />
        <Div>
          <ButtonStyled
            startIcon={<FaHome />}
            component={Link}
            to="/"
            sx={{
              marginRight: "2rem",
              fontSize: "1.2rem",
            }}
          >
            Home
          </ButtonStyled>
          <ButtonStyled
            startIcon={<AiFillCar />}
            component={Link}
            to="/automoveis"
            sx={{ marginRight: "2rem", fontSize: "1.2rem" }}
          >
            Automóveis
          </ButtonStyled>
          <ButtonStyled
            startIcon={<BsFillPeopleFill />}
            component={Link}
            to="/clientes"
            sx={{ fontSize: "1.2rem" }}
          >
            Clientes
          </ButtonStyled>
        </Div>
      </ToolbarStyled>
    </AppBar>
  );
};

export default Header;
