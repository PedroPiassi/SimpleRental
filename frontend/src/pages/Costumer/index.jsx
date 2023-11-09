import React, { useEffect, useState } from "react";
import Header from "../../components/header";
import useCostumersService from "../../service/useCostumerService";
import { ButtonStyled, DivHeader, Main } from "./styles";
import Table from "../../components/table";
import { IoMdAddCircleOutline } from "react-icons/io";
import SearchInput from "../../components/search";
import ModalCostumer from "../../components/modals/ModalCostumer";

const columns = [
  {
    key: "nome",
    label: "Nome",
  },
  {
    key: "email",
    label: "E-mail",
  },
  {
    key: "telefone",
    label: "Telefone",
  },
  {
    key: "CPF",
    label: "CPF",
  },
  {
    key: "acao",
    label: "Ação",
  },
];

const Costumers = () => {
  const costumersService = useCostumersService();
  const [search, setSearch] = useState("");
  const [data, setData] = useState([]);
  const [Modal, setModal] = useState(false);
  const [tableData, setTableData] = useState([]);

  const fetchData = async () => {
    try {
      const response = await costumersService.fetchCostumers();
      setData(response.data);
      setTableData(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const filterData = () => {
    if (search) {
      const lowerCaseSearch = search.toLowerCase();
      const filteredData = data.filter((customer) =>
        Object.values(customer).some((value) =>
          String(value).toLowerCase().includes(lowerCaseSearch)
        )
      );
      setTableData(filteredData);
    } else {
      setTableData(data);
    }
  };

  const handleDeletedData = (id) => {
    setTableData((elements) => elements.filter((element) => element.id !== id));
    setData((elements) => elements.filter((element) => element.id !== id));
  };

  const handleEditedData = (item) => {
    const index = tableData.findIndex((element) => element.id === item.id);
    tableData[index] = item;
    data[index] = item;
  };

  const handleClickModal = () => {
    setModal(true);
  };

  const handleCloseModal = () => {
    setModal(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    filterData();
  }, [search]);

  return (
    <>
      <Header />

      <Main>
        <DivHeader>
          <h1>Painel de Clientes</h1>

          <div>
            <ButtonStyled
              variant="contained"
              startIcon={<IoMdAddCircleOutline />}
              onClick={handleClickModal}
              color="success"
            >
              Cliente
            </ButtonStyled>
            <SearchInput
              width={"400px"}
              handleChange={(evt) => setSearch(evt.target.value)}
              value={search}
            />
          </div>
        </DivHeader>

        <Table
          columns={columns}
          data={tableData}
          noResults={"Nenhum dado encontrado"}
          page={"costumer"}
          handleClickModal={handleClickModal}
          handleDeletedData={handleDeletedData}
          handleEditedData={handleEditedData}
        />
      </Main>

      <ModalCostumer
        handleClose={handleCloseModal}
        open={Modal}
        buttonText={"Cadastrar"}
        title={"Cadastrar"}
        fetchData={fetchData}
      />
    </>
  );
};

export default Costumers;
