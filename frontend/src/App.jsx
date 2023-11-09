import { Route, Routes } from "react-router-dom";
import Home from "./pages/home";
import Cars from "./pages/Cars";
import Costumers from "./pages/Costumer";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/automoveis" element={<Cars />} />
      <Route path="/clientes" element={<Costumers />} />
    </Routes>
  );
};

export default App;
