import React, { useState } from "react";
import useCarsService from "../../../service/useCarsService";
import useCostumerService from "../../../service/useCostumerService";
import BaseModal from "../BaseModal";
import {
  Button,
  FormControl,
  FormHelperText,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { Formik, useFormik } from "formik";
import { DivActions, Form } from "./styles";
import { useEffect } from "react";

import Toast from "../../toast";

const ModalRent = ({
  handleClose,
  open,
  title,
  buttonText,
  car,
  handleEditedData,
}) => {
  const carService = useCarsService();
  const constumerService = useCostumerService();
  const [costumer, setCostumer] = useState("");
  const [data, setData] = useState([]);
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

  const fetchData = async () => {
    try {
      const response = await constumerService.fetchCostumers();
      setData(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = (event) => {
    setCostumer(event.target.value);
  };

  const handleConfirm = () => {
    formik.resetForm();
    handleClose();
  };

  const initialValues = {
    nome: "",
    marca: "",
    ano: null,
    kmRodados: null,
    placa: "",
    valor: null,
    precoLocacao: null,
    costumerId: null,
  };

  const formik = useFormik({
    initialValues: initialValues,
    onSubmit: () => {
      const data = {
        automovelId: car.id,
        clienteId: formik.values.costumerId,
      };
      carService
        .rentCar(data)
        .then((resp) => {
          setCostumer("");
          setToast({
            open: true,
            message: "Carro alugado com sucesso!",
            severity: "success",
          });
          handleEditedData(resp.data);
          handleConfirm();
        })
        .catch((error) => {
          setToast({
            open: true,
            message: error.response.data.message,
            severity: "error",
          });
        });
    },
  });

  useEffect(() => {
    if (car) {
      formik.setFieldValue("nome", car.nome);
      formik.setFieldValue("marca", car.marca);
      formik.setFieldValue("ano", car.ano);
      formik.setFieldValue("kmRodados", car.kmRodados);
      formik.setFieldValue("placa", car.placa);
      formik.setFieldValue("valor", car.valor);
      formik.setFieldValue("precoLocacao", car.precoLocacao);
    }
  }, [car]);

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      {/* <TextField id="outlined-basic" label="Outlined" variant="outlined" /> */}
      <BaseModal handleClose={handleClose} open={open} title={title}>
        <Grid container spacing={2} textAlign={"center"}>
          <Grid item xs={12}>
            <Form onSubmit={formik.handleSubmit}>
              <Grid container rowSpacing={0} columnSpacing={2}>
                <Grid item xs={12} display={"flex"} alignItems={"center"}>
                  <TextField
                    id="outlined-basic"
                    label="Nome"
                    variant="outlined"
                    fullWidth
                    size={"small"}
                    placeholder="Nome"
                    disabled
                    value={formik.values.nome}
                  />
                </Grid>
                <Grid item xs={8} display={"flex"} alignItems={"center"}>
                  <TextField
                    id="outlined-basic"
                    label="Preço Locação"
                    variant="outlined"
                    fullWidth
                    size={"small"}
                    type={"number"}
                    placeholder="Valor"
                    disabled
                    value={formik.values.precoLocacao?.toLocaleString()}
                  />
                </Grid>

                <Grid item xs={4} display={"flex"} alignItems={"center"}>
                  <FormControl sx={{ minWidth: "100%" }}>
                    <InputLabel id="demo-simple-select-helper-label">
                      Cliente
                    </InputLabel>
                    <Select
                      labelId="demo-simple-select-helper-label"
                      id="demo-simple-select-helper"
                      value={(formik.values.costumerId = costumer)}
                      label="costumer"
                      required
                      onChange={handleChange}
                    >
                      {data.map((costumer) => (
                        <MenuItem key={costumer.id} value={costumer.id}>
                          {costumer.nome}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>
              </Grid>
            </Form>

            <DivActions>
              <Button
                variant={"outlined"}
                color="error"
                onClick={handleConfirm}
              >
                <b>Cancelar</b>
              </Button>
              <Button
                variant={"contained"}
                color="success"
                onClick={formik.handleSubmit}
              >
                <b>{buttonText}</b>
              </Button>
            </DivActions>
          </Grid>
        </Grid>
      </BaseModal>

      <Toast
        open={toast.open}
        message={toast.message}
        severity={toast.severity}
        onClose={handleCloseToast}
      />
    </>
  );
};

export default ModalRent;
