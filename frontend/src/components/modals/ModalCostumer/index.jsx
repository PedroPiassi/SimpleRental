import React, { useEffect, useState } from "react";
import BaseModal from "../BaseModal";
import { Button, Grid, TextField } from "@mui/material";
import { Formik, useFormik } from "formik";
import * as Yup from "yup";
import useCostumerService from "../../../service/useCostumerService";
import { DivActions, Form } from "./styles";
import Toast from "../../toast";
import MaskedTextField from "../../MaskedTextField";

const ModalCostumer = ({
  handleClose,
  open,
  title,
  buttonText,
  costumer,
  fetchData,
  handleEditedData,
}) => {
  const constumerService = useCostumerService();
  const [disableCPF, setDisableCPF] = useState(false);
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

  const handleConfirm = () => {
    formik.resetForm();
    handleClose();
  };

  const costumerValidation = Yup.object().shape({
    nome: Yup.string().required("O nome é obrigatório"),
    email: Yup.string().required("O e-mail é obrigatório"),
    telefone: Yup.string().required("O telefone é obrigatório"),
    CPF: Yup.string().required("O CPF é obrigatório"),
  });

  const initialValues = {
    nome: "",
    email: "",
    telefone: "",
    CPF: "",
  };

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: costumerValidation,
    onSubmit: () => {
      if (costumer) {
        constumerService
          .updateCostumer(costumer.id, formik.values)
          .then((resp) => {
            setToast({
              open: true,
              message: "Cliente atualizado com sucesso!",
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
        constumerService
          .createCostumer(formik.values)
          .then((resp) => {
            setToast({
              open: true,
              message: "Cliente cadastrado com sucesso!",
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
    if (costumer) {
      formik.setFieldValue("nome", costumer.nome);
      formik.setFieldValue("email", costumer.email);
      formik.setFieldValue("telefone", costumer.telefone);
      formik.setFieldValue("CPF", costumer.CPF);

      setDisableCPF(true);
    }
  }, [costumer]);

  return (
    <>
      <BaseModal handleClose={handleClose} open={open} title={title}>
        <Grid container spacing={2} textAlign={"center"}>
          <Grid item xs={12}>
            <Form onSubmit={formik.handleSubmit}>
              <Grid container rowSpacing={0} columnSpacing={2}>
                <Grid item xs={6} display={"flex"}>
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
                    label="E-mail"
                    variant="outlined"
                    fullWidth
                    size={"small"}
                    placeholder="E-mail"
                    type={"email"}
                    required
                    value={formik.values.email}
                    onChange={formik.handleChange("email")}
                    helperText={formik.touched.email && formik.errors.email}
                    error={formik.touched.email && Boolean(formik.errors.email)}
                  />
                </Grid>
                <Grid item xs={6} display={"flex"}>
                  <MaskedTextField
                    id="outlined-basic"
                    label="Telefone"
                    variant="outlined"
                    fullWidth
                    size="small"
                    value={formik.values.telefone}
                    onChange={formik.handleChange("telefone")}
                    helperText={
                      formik.touched.telefone && formik.errors.telefone
                    }
                    error={
                      formik.touched.telefone && Boolean(formik.errors.telefone)
                    }
                    placeholder="+55 (XX) XXXXX-XXXX"
                    mask={"+55 (99) 99999-9999"}
                    required
                  />
                </Grid>
                <Grid item xs={6} display={"flex"}>
                  <MaskedTextField
                    id="outlined-basic"
                    label="CPF"
                    variant="outlined"
                    fullWidth
                    size="small"
                    disabled={disableCPF}
                    value={formik.values.CPF}
                    onChange={formik.handleChange("CPF")}
                    helperText={formik.touched.CPF && formik.errors.CPF}
                    error={formik.touched.CPF && Boolean(formik.errors.CPF)}
                    mask={"999.999.999-99"}
                    placeholder="XXX.XXX.XXX-XX"
                    required
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

export default ModalCostumer;
