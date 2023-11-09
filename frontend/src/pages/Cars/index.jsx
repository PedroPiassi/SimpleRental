import React, { useEffect, useState } from "react";
import Header from "../../components/header";
import { ButtonStyled, DivHeader, Main } from "./styles";
import SearchInput from "../../components/search";
import Table from "../../components/table";
import useCarsService from "../../service/useCarsService";
import { IoMdAddCircleOutline } from "react-icons/io";
import ModalCar from "../../components/modals/modalCar";

const columns = [
  {
    key: "nome",
    label: "Nome",
  },
  {
    key: "marca",
    label: "Marca",
  },
  {
    key: "ano",
    label: "Ano",
  },
  {
    key: "kmRodados",
    label: "km Rodados",
  },
  {
    key: "placa",
    label: "Placa",
  },
  {
    key: "valor",
    label: "Valor",
  },
  {
    key: "precoLocacao",
    label: "Preco Locação",
  },
  {
    key: "acao",
    label: "Ação",
  },
];

const Cars = () => {
  const carsService = useCarsService();
  const [search, setSearch] = useState("");
  const [data, setData] = useState([]);
  const [carModal, setCarModal] = useState(false);
  const [tableData, setTableData] = useState([]);

  const fetchData = async () => {
    try {
      const response = await carsService.fetchCars();
      setData(response.data);
      setTableData(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const filterData = () => {
    if (search) {
      const lowerCaseSearch = search.toLowerCase();
      const filteredData = data.filter((car) =>
        Object.values(car).some((value) =>
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
    setCarModal(true);
  };

  const handleCloseModal = () => {
    setCarModal(false);
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
          <h1>Painel de Automóveis</h1>

          <div>
            <ButtonStyled
              variant="contained"
              startIcon={<IoMdAddCircleOutline />}
              onClick={handleClickModal}
              color="success"
            >
              Automóvel
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
          page={"car"}
          handleClickModal={handleClickModal}
          handleDeletedData={handleDeletedData}
          handleEditedData={handleEditedData}
        />
      </Main>

      <ModalCar
        handleClose={handleCloseModal}
        open={carModal}
        buttonText={"Cadastrar"}
        title={"Cadastrar"}
        fetchData={fetchData}
      />
    </>
  );
};

export default Cars;
