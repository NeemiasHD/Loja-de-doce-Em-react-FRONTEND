import React, { useState, useEffect } from "react";
import "./App.css";
import Navbar from "./components/Navbar";
import { Outlet } from "react-router-dom";
import FiltroEBarraDePesquisa from "./components/FiltrosEBarradePesquisa/FiltroEBarraDePesquisa";
import ProdutoFetch from "./axios/config";
import Rodape from "./components/rodape/rodape";


const App = () => {
  const [tipodeFiltro, setTipodeFiltro] = useState([]);
  const [existeProduto, SetExisteProduto] = useState(true);
  const [DataRenderAtual, SetDataRenderAtual] = useState([]);
  const [pagina, setpagina] = useState(1); //depois mudar pra paginação

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await ProdutoFetch.get(
          `/BuscarTodos`
        );
        const data = response.data;
        setTipodeFiltro(data);
      } catch (error) {
        console.error("Erro ao buscar dados:", error);
      }
    };

    fetchData();
  }, []); // O array vazio assegura que o efeito só é executado uma vez, sem dependências.

  return (
    <div className="App">
      <Navbar />

      <img className="DoceriaInicio" src="src/img/doceriaBemVindo.png" />
      <FiltroEBarraDePesquisa
        filtrar={setTipodeFiltro}
        SetExisteProduto={SetExisteProduto}
        SetDataRenderAtual={SetDataRenderAtual}
        DataRenderAtual={DataRenderAtual}
      />
      <div className="container">
        <Outlet
          context={{
            tipodeFiltro,
            existeProduto,
          }}
        />
      </div>
      <Rodape />
    </div>
  );
};

export default App;
