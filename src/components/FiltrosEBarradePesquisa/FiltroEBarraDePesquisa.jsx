import "./FiltroEBarraDePesquisa.css";
import ProdutoFetch from "../../axios/config";
import { useState, useEffect } from "react";

const filtrarBusca = async (
  filtro,
  filtrar,
  SetExisteProduto,
  filtroAZ,
  SetProdutosAtualmenteFiltrados,
  
) => {
  let Produtos;
  if (filtro == "") {
    const response = await ProdutoFetch.get("/BuscarTodos");
    const data = await response.data;

    if (filtroAZ) {
      Produtos = [...data].sort((a, b) =>
        a.nomeProduto.localeCompare(b.nomeProduto)
      );
    } else {
      Produtos = data;
    }
    SetProdutosAtualmenteFiltrados(false);
    
    filtrar(Produtos);
  } else {
    const response = await ProdutoFetch.get("/BuscarTodos");
    const data = await response.data;
    if (filtroAZ) {
      Produtos = [...data].sort((a, b) =>
        a.nomeProduto.localeCompare(b.nomeProduto)
      );
    } else {
      const response2 = await ProdutoFetch.get("/BuscarTodos");
      const data2 = await response2.data;
      Produtos = data2;
    }
    for (let i = 0; i < Produtos.length; i++) {
      if (data[i].categoria === filtro) {
        SetExisteProduto(true);
      } else {
        SetExisteProduto(false);
      }
    }
    const produtoFiltrados = Produtos.filter(
      (produto) => produto.categoria == filtro
    );
    SetProdutosAtualmenteFiltrados(produtoFiltrados);
    
    filtrar(produtoFiltrados);
  }
};

const selecionarCategoria = (id) => {
  for (var i = 0; i < 6; i++) {
    document.getElementById(`subEscolha${i}`).style.backgroundColor =
      "var(--CorEscura)";
  }
  document.getElementById(`subEscolha${id}`).style.backgroundColor =
    "var(--CorEscuraSelect)";
};

function FiltroEBarraDePesquisa({
  filtrar,
  SetExisteProduto,
}) {
  const [filtroAZ, setfiltroAZ] = useState(false);
  const [ProdutosAtualmenteFiltrados, setProdutosAtualmenteFiltrados] =
    useState(false);
  const [filtroCategAtual, setfiltroCategAtual] = useState([]);


  return (
    <div className="filtroebarra">
      <div className="InputPesquisaGroup">
        <input
          type="text"
          className="BarraDePesquisa"
          placeholder="Procure um produto"
        />
        <i
          className="bx bx-search-alt"
          onClick={async () => {
            const BarraDePesquisa = document.querySelector(".BarraDePesquisa");
            const termoBusca = BarraDePesquisa.value.toLowerCase();
            const response = await ProdutoFetch.get("/BuscarTodos");
            const data = (await response).data;
            const produtosFiltrados = data.filter((produto) =>
              produto.nomeProduto.toLowerCase().includes(termoBusca)
            );
            if (produtosFiltrados.length < 1) SetExisteProduto(false);

            filtrar(produtosFiltrados);
          }}
        ></i>
      </div>

      <div className="ordenador">
        <li>
          <a className="listCategoriaP" id="listCategoriaP">
            Preço
          </a>
          <div className="subCategorias">
            <a id="subEscolhap0" onclick="listarComFiltroPreco('subEscolhap0')">
              Mais Barato
            </a>
            <a id="subEscolhap1" onclick="listarComFiltroPreco('subEscolhap1')">
              Mais Caro
            </a>
          </div>
        </li>
        <li>
          <a className="listCategoriaC" id="listCategoriaC">
            Categoria<i className="bx bx-chevron-down"></i>
          </a>
          <div className="subCategorias">
            <a
              id="subEscolha0"
              onClick={() => {
                filtrarBusca(
                  "Sorvete",
                  filtrar,
                  SetExisteProduto,
                  filtroAZ,
                  setProdutosAtualmenteFiltrados,
                  
                );
                selecionarCategoria(0);
                setfiltroCategAtual("Sorvete");
              }}
            >
              Sorvete
            </a>
            <a
              id="subEscolha1"
              onClick={() => {
                filtrarBusca(
                  "Almoço",
                  filtrar,
                  SetExisteProduto,
                  filtroAZ,
                  setProdutosAtualmenteFiltrados,
                  
                );
                selecionarCategoria(1);
                setfiltroCategAtual("Almoço");
              }}
            >
              Almoço
            </a>
            <a
              id="subEscolha2"
              onClick={() => {
                filtrarBusca(
                  "Lanche",
                  filtrar,
                  SetExisteProduto,
                  filtroAZ,
                  setProdutosAtualmenteFiltrados,
                  
                );
                selecionarCategoria(2);
                setfiltroCategAtual("Lanche");
              }}
            >
              Lanche
            </a>
            <a
              id="subEscolha3"
              onClick={() => {
                filtrarBusca(
                  "Sobremesa",
                  filtrar,
                  SetExisteProduto,
                  filtroAZ,
                  setProdutosAtualmenteFiltrados,
                  
                );
                selecionarCategoria(3);
                setfiltroCategAtual("Sobremesa");
              }}
            >
              Sobremesa
            </a>
            <a
              id="subEscolha4"
              onClick={() => {
                filtrarBusca(
                  "Açai",
                  filtrar,
                  SetExisteProduto,
                  filtroAZ,
                  setProdutosAtualmenteFiltrados,
                  
                );
                selecionarCategoria(4);
                setfiltroCategAtual("Açai");
              }}
            >
              Açai
            </a>
            <a
              id="subEscolha5"
              onClick={() => {
                filtrarBusca(
                  "",
                  filtrar,
                  SetExisteProduto,
                  filtroAZ,
                  setProdutosAtualmenteFiltrados,
                  
                );

                selecionarCategoria(5);
                setfiltroCategAtual(null);
              }}
              style={{ backgroundColor: "var(--CorEscuraSelect)" }}
            >
              Todos
            </a>
          </div>
        </li>
        <li>
          <a
            onClick={async () => {
              let data;
              let dadosOrdenados;
              if (ProdutosAtualmenteFiltrados) {
                if (filtroAZ) {
                  const response = await ProdutoFetch.get("/BuscarTodos");
                  data = await response.data;
                  const produtoFiltrados = data.filter(
                    (produto) => produto.categoria == filtroCategAtual
                  );
                  data = produtoFiltrados;
                  dadosOrdenados = data;
                } else {
                  const response = await ProdutoFetch.get("/BuscarTodos");
                  data = await response.data;
                  const produtoFiltrados = data.filter(
                    (produto) => produto.categoria == filtroCategAtual
                  );
                  data = produtoFiltrados;
                  dadosOrdenados = [...data].sort((a, b) =>
                    a.nomeProduto.localeCompare(b.nomeProduto)
                  );
                }
              } else {
                const response = await ProdutoFetch.get("/BuscarTodos");
                data = await response.data;
                dadosOrdenados = [...data].sort((a, b) =>
                  a.nomeProduto.localeCompare(b.nomeProduto)
                );
              }
              (dadosOrdenados);
              filtrar(dadosOrdenados);
              const botaoAZ = document.getElementById("botaoAZ");
              if (filtroAZ == false) {
                botaoAZ.style.backgroundColor = "var(--CorEscura)";
                setfiltroAZ(!filtroAZ);
              } else {
                (data);
                filtrar(data);
                setfiltroAZ(!filtroAZ);
                botaoAZ.style.backgroundColor = "var(--CorPrincipalRosa)";
              }
            }}
            id="botaoAZ"
          >
            A-Z
          </a>
        </li>
      </div>
    </div>
  );
}

export default FiltroEBarraDePesquisa;
