import React, { useEffect, useState } from "react";
import Header from "../../components/header";
import Table from "../../components/table";
import { DivHeader, Main } from "./styles";
import SearchInput from "../../components/search";
import useCarsService from "../../service/useCarsService/index.js";

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
    key: "precoLocacao",
    label: "Preco Locação",
  },
  {
    key: "acao",
    label: "Ação",
  },
];

const Home = () => {
  const carsService = useCarsService();
  const [search, setSearch] = useState("");
  const [data, setData] = useState([]);
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

  const handleEditedData = (item) => {
    const index = tableData.findIndex((element) => element.id === item.id);
    tableData[index] = item;
    data[index] = item;
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
          <h1>Painel de Aluguel</h1>
          <SearchInput
            width={"400px"}
            handleChange={(evt) => setSearch(evt.target.value)}
            value={search}
          />
        </DivHeader>

        <Table
          columns={columns}
          data={tableData}
          noResults={"Nenhum dado encontrado"}
          page={"home"}
          handleEditedData={handleEditedData}
        />
      </Main>
    </>
  );
};

export default Home;
