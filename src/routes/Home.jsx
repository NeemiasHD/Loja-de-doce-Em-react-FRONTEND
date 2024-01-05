import ProdutoFetch from "../axios/config";
import { useState, useEffect } from "react";

import MontarProduto from "../components/MontarProduto/MontarProduto";
import "./Home.css";
import FiltroEBarraDePesquisa from "../components/FiltrosEBarradePesquisa/FiltroEBarraDePesquisa";
import EditarProduto from "./EditarProduto";
import { useOutletContext } from "react-router-dom";

const Home = () => {
  const { tipodeFiltro, existeProduto } = useOutletContext();

  useEffect(() => {
    // mostrando a barra de pesquisa
    const ocultarFiltroEBarra = async () => {
      const filtroebarra = document.querySelector(".filtroebarra");
      if (filtroebarra) {
        filtroebarra.style.display = "block";
      }
    };

    ocultarFiltroEBarra();
  }, []);

  const [posts, setPosts] = useState([]);

  const fetchData = async () => {
    try {
      if (tipodeFiltro.length > 0) {
        // Se name tiver algum valor, use-o como posts diretamente
        setPosts(tipodeFiltro);
      } else {
        // Caso contrário, faça a requisição para /BuscarTodos

        const response = await ProdutoFetch.get("/BuscarTodos");
        const data = response.data;
        setPosts(data);
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchData();
  }, [tipodeFiltro]);

  return (
    <div className="HomeMain">
      {tipodeFiltro.length == 0 ? (
        <div>
          {existeProduto ? (
            <div className="Carregamento">
              <span class="loader" style={{ margin: "0px" }}></span>
              <p>Carregando...</p>
            </div>
          ) : (
            <div>
              <p className="MensagemDeProdutoNaoEncontrado">
                Produto não encontrado...
              </p>
            </div>
          )}
        </div>
      ) : (
        <MontarProduto posts={posts} />
      )}
    </div>
  );
};

export default Home;
