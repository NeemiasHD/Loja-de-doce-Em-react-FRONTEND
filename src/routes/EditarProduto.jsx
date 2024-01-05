import FiltroEBarraDePesquisa from "../components/FiltrosEBarradePesquisa/FiltroEBarraDePesquisa";
import MontarProduto from "../components/MontarProduto/MontarProduto";
import { useOutletContext } from "react-router-dom";
import ProdutoFetch from "../axios/config";
import { useState, useEffect } from "react";

const EditarProduto = () => {
  const { tipodeFiltro, existeProduto, DataRenderAtual } =
    useOutletContext();

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
        setPosts(response.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  // Chama a função de fetchData sempre que o valor de name mudar
  useEffect(() => {
    fetchData();
  }, [tipodeFiltro]);

  return (
    <div className="HomeMain">
      {tipodeFiltro.length == 0 ? (
        <div>
          {existeProduto ? (
            <MontarProduto
              posts={posts}
              DataRenderAtual={DataRenderAtual}
              TipoBotao={1}
            />
          ) : (
            <div>
              <p className="MensagemDeProdutoNaoEncontrado">
                Crie produtos com essa categoria...
              </p>
            </div>
          )}
        </div>
      ) : (
        <MontarProduto
          posts={posts}
          DataRenderAtual={DataRenderAtual}
          TipoBotao={1}
        />
      )}
    </div>
  );
};

export default EditarProduto;
