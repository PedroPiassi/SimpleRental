import React, { useState } from "react";
import PropTypes from "prop-types";
import {
  TableContainer,
  Table as MUITable,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Skeleton,
  Paper,
} from "@mui/material";
import { ButtonStyled } from "./styles";
import { STATUS } from "../constants/status";
import useCarsService from "../../service/useCarsService";
import useCostumerService from "../../service/useCostumerService";

import ModalCar from "../modals/modalCar";
import ModalCostumer from "../modals/ModalCostumer";
import ModalRent from "../modals/ModalRent";
import Toast from "../toast";

const Table = ({
  columns,
  data,
  loading,
  noResults,
  page,
  handleClickModal = null,
  handleDeletedData = null,
  handleEditedData,
}) => {
  const carService = useCarsService();
  const constumerService = useCostumerService();

  const [modalCar, setModalCar] = useState(false);
  const [modalCostumer, setModalCostumer] = useState(false);
  const [modalRent, setModalRent] = useState(false);

  const [selectedCar, setSelectedCar] = useState(null);
  const [selectedCostumer, setSelectedCostumer] = useState(null);

  const [toast, setToast] = useState({
    open: false,
    message: "",
    severity: "warning",
  });

  const handleCloseToast = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setToast({
      open: false,
      message: "",
      severity: "",
    });
  };

  const handleCarEdit = (car) => {
    setSelectedCar(car);
    setModalCar(true);
  };

  const handleCarDelete = (Idcar) => {
    carService
      .deleteCar(Idcar)
      .then((resp) => {
        setToast({
          open: true,
          message: "Carro deletado com sucesso!",
          severity: "success",
        });
        handleDeletedData(Idcar);
      })
      .catch((error) => {
        setToast({
          open: true,
          message: error.response.data.message,
          severity: "error",
        });
      });
  };

  const handleClientEdit = (costumer) => {
    setSelectedCostumer(costumer);
    setModalCostumer(true);
  };

  const handleClientDelete = (idCostumer) => {
    constumerService
      .deleteCostumer(idCostumer)
      .then((resp) => {
        setToast({
          open: true,
          message: "Cliente deletado com sucesso!",
          severity: "success",
        });
        handleDeletedData(idCostumer);
      })
      .catch((error) => {
        setToast({
          open: true,
          message: error.response.data.message,
          severity: "error",
        });
      });
  };

  const handleAlugar = (car) => {
    setSelectedCar(car);
    setModalRent(true);
  };

  const handleDesalugar = (car) => {
    const data = { automovelId: car.id };
    carService
      .unleaseCar(data)
      .then((resp) => {
        setToast({
          open: true,
          message: "Carro devolvido com sucesso!",
          severity: "success",
        });
        handleEditedData(resp.data);
      })
      .catch((error) => {
        setToast({
          open: true,
          message: error.response.data.message,
          severity: "error",
        });
      });
  };

  const handleCloseModal = () => {
    setModalCar(false);
    setModalCostumer(false);
    setModalRent(false);
  };

  return (
    <TableContainer component={Paper} sx={{ marginBottom: "44px" }}>
      <MUITable
        sx={{ minWidth: 650, borderBottom: "1px solid #e0e0e0" }}
        aria-label="simple table"
      >
        <TableHead>
          <TableRow>
            {columns.map((row, index) => (
              <TableCell
                key={`column-${index}`}
                variant={"head"}
                sx={{
                  backgroundColor: "#EBEFED",
                  fontSize: "14px",
                  whiteSpace: "nowrap",
                  fontWeight: "bold",
                  color: "#fff",
                  padding: "2px 16px",
                  justifyContent: "center",
                  boxSizing: "border-box",
                  borderLeft: "0.5px solid #c1c1c1",
                  borderRight: "0.5px solid #F0F1F3",
                  backgroundColor: "#000",
                }}
              >
                {row.label}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {data &&
            data.length > 0 &&
            data.map((row, index) => (
              <TableRow
                key={`row-${index}`}
                sx={{
                  "&:last-child td, &:last-child th": { border: 0 },
                }}
              >
                {columns.map((column, index) => (
                  <TableCell
                    key={`column-${index}`}
                    variant={"body"}
                    sx={{
                      alignItems: "center",
                      justifyContent: "flex-start",
                      cursor:
                        typeof handleClickModal !== "undefined" &&
                        (column.clickable === undefined || column.clickable)
                          ? "pointer"
                          : "default",
                    }}
                  >
                    {loading ? (
                      <Skeleton
                        animation={"wave"}
                        width={100}
                        height={column.skeletonHeight ?? 16}
                      />
                    ) : (
                      <>
                        {column.key === "acao" ? (
                          <>
                            {page === "car" && (
                              <>
                                <ButtonStyled
                                  status={4}
                                  sx={{
                                    width: "40px !important",
                                    height: "30px",
                                    marginRight: "0.5rem",
                                  }}
                                  onClick={() => handleCarEdit(row)}
                                >
                                  {STATUS[4]}
                                </ButtonStyled>
                                <ButtonStyled
                                  status={3}
                                  sx={{
                                    width: "40px !important",
                                    height: "30px",
                                  }}
                                  onClick={() => handleCarDelete(row.id)}
                                >
                                  {STATUS[3]}
                                </ButtonStyled>
                              </>
                            )}
                            {page === "costumer" && (
                              <>
                                <ButtonStyled
                                  status={4}
                                  sx={{
                                    width: "40px !important",
                                    height: "30px",
                                    marginRight: "0.5rem",
                                  }}
                                  onClick={() => handleClientEdit(row)}
                                >
                                  {STATUS[4]}
                                </ButtonStyled>
                                <ButtonStyled
                                  status={3}
                                  sx={{
                                    width: "40px !important",
                                    height: "30px",
                                  }}
                                  onClick={() => handleClientDelete(row.id)}
                                >
                                  {STATUS[3]}
                                </ButtonStyled>
                              </>
                            )}
                            {page === "home" && (
                              <>
                                <ButtonStyled
                                  status={row.alugado ? true : false}
                                  sx={{
                                    height: "30px",
                                    marginRight: "0.5rem",
                                  }}
                                  onClick={() =>
                                    row.alugado
                                      ? handleDesalugar(row)
                                      : handleAlugar(row)
                                  }
                                >
                                  {row.alugado ? STATUS[true] : STATUS[false]}
                                </ButtonStyled>
                              </>
                            )}
                          </>
                        ) : (
                          <>
                            {column.key
                              ? typeof column.render === "undefined"
                                ? typeof row[column.key] === "number" && column.key !== 'ano'
                                  ? row[column.key].toLocaleString()
                                  : row[column.key]
                                : column.render(row[column.key], row)
                              : typeof column.render !== "undefined" &&
                                column.render(null, row)}
                          </>
                        )}
                      </>
                    )}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          {data && data.length === 0 && noResults && (
            <TableRow>
              <TableCell colSpan={columns.length} sx={{ textAlign: "center" }}>
                {loading ? (
                  <Skeleton animation={"wave"} height={16} />
                ) : (
                  <>{noResults}</>
                )}
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </MUITable>

      <ModalCar
        handleClose={handleCloseModal}
        open={modalCar}
        buttonText={"Atualizar"}
        title={"Atualizar"}
        car={selectedCar}
        handleEditedData={handleEditedData}
      />

      <ModalCostumer
        handleClose={handleCloseModal}
        open={modalCostumer}
        buttonText={"Atualizar"}
        title={"Atualizar"}
        costumer={selectedCostumer}
        handleEditedData={handleEditedData}
      />

      <ModalRent
        handleClose={handleCloseModal}
        open={modalRent}
        buttonText={"Alugar"}
        title={"Aluguel"}
        car={selectedCar}
        handleEditedData={handleEditedData}
      />

      <Toast
        open={toast.open}
        message={toast.message}
        severity={toast.severity}
        onClose={handleCloseToast}
      />
    </TableContainer>
  );
};

Table.propTypes = {
  data: PropTypes.array,
  columns: PropTypes.arrayOf(
    PropTypes.shape({
      key: PropTypes.any,
      label: PropTypes.string.isRequired,
    })
  ),
  loading: PropTypes.bool,
  noResults: PropTypes.string,
  page: PropTypes.string,
  handleClickModal: PropTypes.func,
};

export default Table;
