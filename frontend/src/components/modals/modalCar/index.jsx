import React, { useEffect, useState } from "react";
import BaseModal from "../BaseModal";
import { Button, Grid, TextField } from "@mui/material";
import { DivActions, Form } from "./styles";
import { Formik, useFormik } from "formik";
import * as Yup from "yup";
import useCarsService from "../../../service/useCarsService";
import Toast from "../../toast";
import { NumericFormat } from "react-number-format";

const ModalCar = ({
  handleClose,
  open,
  title,
  buttonText,
  car,
  fetchData,
  handleEditedData,
}) => {
  const carService = useCarsService();
  const [disablePlaca, setDisablePlaca] = useState(false);
  const [toast, setToast] = useState({
    open: false,
    message: "",
    severity: "warning",
  });
  const anoAtual = new Date().getFullYear();

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

  const handleConfirm = () => {
    formik.resetForm();
    handleClose();
  };

  const carValidation = Yup.object().shape({
    nome: Yup.string().required("O nome é obrigatório"),
    marca: Yup.string().required("A marca é obrigatório"),
    ano: Yup.number()
      .required("Campo obrigatório")
      .integer("O ano deve ser um número inteiro")
      .test(
        "valid-length",
        "O ano deve ter exatamente 4 dígitos",
        (value) => value.toString().length === 4
      )
      .test(
        "max-year",
        "O ano não pode ser maior que o ano atual",
        (value) => value <= anoAtual
      ),
    kmRodados: Yup.number().required("O Km é obrigatório"),
    placa: Yup.string()
      .required("A placa é obrigatório")
      .min(7, "A placa tem que ter exatamente 7 caracteres")
      .max(7, "A placa tem que ter exatamente 7 caracteres"),
    valor: Yup.number().required("O valor é obrigatório"),
    precoLocacao: Yup.number().required("O preço para locação é obrigatório"),
  });

  const handleBlurYear = (formik) => (event) => {
    const { value } = event.target;
    let newValue = parseInt(value, 10);

    if (isNaN(newValue)) {
      // Caso o valor digitado não seja um número válido, defina-o como 1900
      newValue = 1900;
    } else {
      // Limita o valor aos intervalos permitidos (1900 a 2100)
      newValue = Math.max(1900, Math.min(2100, newValue));
    }

    formik.setFieldValue("ano", newValue.toString());
  };

  const initialValues = {
    nome: "",
    marca: "",
    ano: null,
    kmRodados: null,
    placa: "",
    valor: null,
    precoLocacao: null,
  };

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: carValidation,
    onSubmit: () => {
      if (car) {
        carService
          .updateCar(car.id, formik.values)
          .then((resp) => {
            setToast({
              open: true,
              message: "Carro atualizado com sucesso!",
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
      } else {
        carService
          .createCar(formik.values)
          .then((resp) => {
            setToast({
              open: true,
              message: "Carro cadastrado com sucesso!",
              severity: "success",
            });
            fetchData();
            handleConfirm();
          })
          .catch((error) => {
            setToast({
              open: true,
              message: error.response.data.message,
              severity: "error",
            });
          });
      }
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

      setDisablePlaca(true);
    }
  }, [car]);

  return (
    <>
      <BaseModal handleClose={handleClose} open={open} title={title}>
        <Grid container spacing={2} textAlign={"center"}>
          <Grid item xs={12}>
            <Form onSubmit={formik.handleSubmit}>
              <Grid container rowSpacing={0} columnSpacing={2}>
                <Grid item xs={12} display={"flex"}>
                  <TextField
                    id="outlined-basic"
                    label="Nome"
                    variant="outlined"
                    fullWidth
                    size={"small"}
                    placeholder="Nome"
                    required
                    value={formik.values.nome}
                    onChange={formik.handleChange("nome")}
                    helperText={formik.touched.nome && formik.errors.nome}
                    error={formik.touched.nome && Boolean(formik.errors.nome)}
                  />
                </Grid>
                <Grid item xs={6} display={"flex"}>
                  <TextField
                    id="outlined-basic"
                    label="Marca"
                    variant="outlined"
                    fullWidth
                    size={"small"}
                    placeholder="Marca"
                    required
                    value={formik.values.marca}
                    onChange={formik.handleChange("marca")}
                    helperText={formik.touched.marca && formik.errors.marca}
                    error={formik.touched.marca && Boolean(formik.errors.marca)}
                  />
                </Grid>
                <Grid item xs={6} display={"flex"}>
                  <TextField
                    label="Ano"
                    size={"small"}
                    placeholder="0000"
                    required
                    type="number"
                    fullWidth
                    inputProps={{
                      min: 1900,
                      max: anoAtual,
                      inputMode: "numeric",
                    }}
                    value={formik.values.ano || ""} // Garante que o valor seja uma string
                    onChange={formik.handleChange("ano")} // Usa diretamente formik.handleChange
                    onBlur={handleBlurYear(formik)}
                    helperText={formik.touched.ano && formik.errors.ano}
                    error={formik.touched.ano && Boolean(formik.errors.ano)}
                  />
                </Grid>
                <Grid item xs={6} display={"flex"}>
                  <NumericFormat
                    customInput={TextField}
                    id="outlined-basic"
                    label="Km Rodados"
                    variant="outlined"
                    fullWidth
                    size={"small"}
                    placeholder="Quilometragem"
                    required
                    thousandSeparator="."
                    decimalSeparator=","
                    allowNegative={false}
                    value={formik.values.kmRodados}
                    onChange={(values) => {
                      formik.setFieldValue(
                        "kmRodados",
                        values.target.value.replaceAll(".", "")
                      );
                    }}
                    isAllowed={(values) => {
                      const { floatValue, formattedValue } = values;
                      return formattedValue === "" || floatValue <= 1000000000;
                    }}
                    helperText={
                      formik.touched.kmRodados && formik.errors.kmRodados
                    }
                    error={
                      formik.touched.kmRodados &&
                      Boolean(formik.errors.kmRodados)
                    }
                  />
                </Grid>
                <Grid item xs={6} display={"flex"}>
                  <TextField
                    id="outlined-basic"
                    label="Placa"
                    variant="outlined"
                    fullWidth
                    size={"small"}
                    placeholder="Placa"
                    required
                    disabled={disablePlaca}
                    value={formik.values.placa}
                    onChange={(event) => {
                      const { value } = event.target;
                      formik.setFieldValue("placa", value.substr(0, 7));
                    }}
                    helperText={formik.touched.placa && formik.errors.placa}
                    error={formik.touched.placa && Boolean(formik.errors.placa)}
                  />
                </Grid>
                <Grid item xs={6} display={"flex"}>
                  <NumericFormat
                    customInput={TextField}
                    id="outlined-basic"
                    label="Valor"
                    variant="outlined"
                    fullWidth
                    size={"small"}
                    placeholder="Valor"
                    required
                    thousandSeparator="."
                    decimalSeparator=","
                    allowNegative={false}
                    value={formik.values.valor}
                    onChange={(values) => {
                      formik.setFieldValue(
                        "valor",
                        values.target.value.replaceAll(".", "")
                      );
                    }}
                    isAllowed={(values) => {
                      const { floatValue, formattedValue } = values;
                      return formattedValue === "" || floatValue <= 1000000000;
                    }}
                    helperText={formik.touched.valor && formik.errors.valor}
                    error={formik.touched.valor && Boolean(formik.errors.valor)}
                  />
                </Grid>
                <Grid item xs={6} display={"flex"}>
                  <NumericFormat
                    customInput={TextField}
                    id="outlined-basic"
                    label="Preço de locação"
                    variant="outlined"
                    fullWidth
                    size={"small"}
                    placeholder="Preço de locação"
                    required
                    thousandSeparator="."
                    decimalSeparator=","
                    allowNegative={false}
                    value={formik.values.precoLocacao}
                    onChange={(values) => {
                      formik.setFieldValue(
                        "precoLocacao",
                        values.target.value.replaceAll(".", "")
                      );
                    }}
                    isAllowed={(values) => {
                      const { floatValue, formattedValue } = values;
                      return formattedValue === "" || floatValue <= 1000000000;
                    }}
                    helperText={
                      formik.touched.precoLocacao && formik.errors.precoLocacao
                    }
                    error={
                      formik.touched.precoLocacao &&
                      Boolean(formik.errors.precoLocacao)
                    }
                  />
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

export default ModalCar;
