import React, { useState, useEffect } from "react";
import "./MontarProduto.css";
import ProdutoFetch from "../../axios/config";
import InputImagem from "../InputImagem/InputImagem";
import AdicionarProduto from "../AdicionarProduto/AdicionarProduto";
import FiltroEBarraDePesquisa from "../FiltrosEBarradePesquisa/FiltroEBarraDePesquisa";
import Paginacao from "../pagination/paginacao";

function MontarProduto({ posts, TipoBotao}) {
  const [editavel, setEditavel] = useState(false);
  const [limparImagem, SetLimparImagem] = useState(false);
  const [produtoEditavelId, setProdutoEditavelId] = useState(false);
  const [Produtos, setProdutos] = useState(posts);
  const [imagem, setImagem] = useState(null);
  const [pagina, setpagina] = useState(0);
  const [PaginaAtual, SetPaginaAtual] = useState(0);

  const handleEditarClick = async (produtoId, TornarOutroEditavel) => {
    for (var i = 0; i < 6; i++) {
      //atualizando os itens pra ordenar do jeito que já estava
      if (
        document.getElementById(`subEscolha${i}`).style.backgroundColor ===
        "var(--CorEscuraSelect)"
      ) {
        document.getElementById(`subEscolha${i}`).click();
      }
    }
    if (TornarOutroEditavel) {
      setEditavel(true);
    } else {
      setEditavel(!editavel);
    }
    setProdutoEditavelId(produtoId);
  };
  useEffect(() => {
    const currentItems = posts.slice(PaginaAtual, PaginaAtual + 9);
    setProdutos(currentItems);
  }, [posts]);

  useEffect(()=>{
    const currentItems = posts.slice(PaginaAtual, PaginaAtual+9); //paginação feita aqui
    setProdutos(currentItems);
  },[pagina])
  return (
    <>
      <div className="ListagemProdutos">
        {Produtos.length === 0 ? (
          <AdicionarProduto
            limparImagem={limparImagem}
            SetLimparImagem={SetLimparImagem}
            setProdutos={setProdutos}
          />
        ) : (
          <div className="ProdutosECriarProduto">
            {TipoBotao ? (
              <AdicionarProduto
                limparImagem={limparImagem}
                SetLimparImagem={SetLimparImagem}
                setProdutos={setProdutos}
              />
            ) : Produtos.length === 0 && ~TipoBotao ? (
              <span class="loader"></span>
            ) : (
              <></>
            )}
            {Produtos.map((produto) => (
              <div className="produto" key={produto.id}>
                <div
                  className="TodasInformacoesDoProduto"
                  id={`TodasInformacoesDoProduto${produto.id}`}
                >
                  <div className="img" id={`img${produto.id}`}>
                    {TipoBotao ? (
                      editavel && produto.id === produtoEditavelId ? (
                        <InputImagem
                          Background={produto.imagem}
                          ColocarImputImagem={setImagem}
                          id={produto.id}
                        />
                      ) : (
                        <img
                          src={produto.imagem}
                          id={`imgInput${produto.id}`}
                        />
                      )
                    ) : (
                      <img src={produto.imagem} id={`imgInput${produto.id}`} />
                    )}
                  </div>

                  <p class="Informacoes">
                    <span
                      className="tituloProduto"
                      id={`tituloProduto${produto.id}`}
                      contentEditable={
                        editavel && produtoEditavelId === produto.id
                      }
                      style={{
                        color:
                          editavel && produto.id === produtoEditavelId
                            ? "gray"
                            : "black",
                      }}
                    >
                      {produto.nomeProduto}
                    </span>
                    {TipoBotao === 1 ? (
                      <select
                        class="CategoriaDoProdutoInput"
                        id={`CategoriaDoProdutoInput${produto.id}`}
                        name="itens"
                        style={{
                          color:
                            editavel && produto.id === produtoEditavelId
                              ? "gray"
                              : "black",
                          pointerEvents:
                            editavel && produto.id === produtoEditavelId
                              ? "all"
                              : "none",
                        }}
                      >
                        <option value="Lanche">Lanche</option>
                        <option value="Sobremesa">Sobremesa</option>
                        <option value="Sorvete">Sorvete</option>
                        <option value="Açai">Açai</option>
                        <option value="Açai">Almoço</option>
                        <option value={produto.categoria} selected disabled>
                          {produto.categoria}
                        </option>
                      </select>
                    ) : (
                      <div />
                    )}

                    <span
                      className="precoProduto"
                      id={`precoProduto${produto.id}`}
                      contentEditable={
                        editavel && produtoEditavelId === produto.id
                      }
                      style={{
                        color:
                          editavel && produto.id === produtoEditavelId
                            ? "gray"
                            : "black",
                      }}
                    >
                      {TipoBotao ? (
                        <></>
                      ) : (
                        <spam
                          className="SimboloReal"
                          id={`SimboloReal${produto.id}`}
                        >
                          R${" "}
                        </spam>
                      )}
                      {produto.preco}
                    </span>
                    <span
                      className="descricaoProduto"
                      id={`descricaoProduto${produto.id}`}
                      contentEditable={
                        editavel && produtoEditavelId === produto.id
                      }
                      style={{
                        color:
                          editavel && produto.id === produtoEditavelId
                            ? "gray"
                            : "black",
                      }}
                    >
                      {produto.descricao}
                    </span>

                    {TipoBotao === 1 ? (
                      <span className="BtnProduto">
                        <a
                          className="EditarBtn"
                          id={`EditarBtn${produto.id}`}
                          onClick={() =>
                            editavel && produtoEditavelId === produto.id
                              ? handleEditarClick(produto.id)
                              : handleEditarClick(produto.id, true)
                          }
                          style={{
                            backgroundColor:
                              editavel && produto.id === produtoEditavelId
                                ? "var(--CorEscura)"
                                : "gray",
                          }}
                        >
                          <i class="bx bxs-edit-alt"></i>
                        </a>
                        <a
                          className="LixoBtn"
                          onClick={() => {
                            document.getElementById(
                              `TodasInformacoesDoProduto${produto.id}`
                            ).style.display = "none";
                            document.getElementById(
                              `ConfirmacaoDeExclusaoDeProduto${produto.id}`
                            ).style.display = "flex";
                          }}
                        >
                          <i class="bx bxs-trash"></i>
                        </a>
                        <a
                          className="SalvarBtn"
                          onClick={async () => {
                            if (editavel) {
                              let imagemAtualizada;
                              if (imagem) {
                                imagemAtualizada = imagem;
                              } else {
                                imagemAtualizada = produto.imagem;
                              }

                              setImagem(null);

                              let NomeProduto = document.getElementById(
                                `tituloProduto${produto.id}`
                              ).innerHTML;
                              let Categoria = document.getElementById(
                                `CategoriaDoProdutoInput${produto.id}`
                              ).value;
                              let Descricao = document.getElementById(
                                `descricaoProduto${produto.id}`
                              ).innerHTML;
                              let preco = document.getElementById(
                                `precoProduto${produto.id}`
                              ).innerHTML;

                              const NovoProduto = {
                                NomeProduto,
                                Categoria,
                                imagem: imagemAtualizada,
                                Descricao,
                                preco,
                                id: produto.id,
                              };

                              await ProdutoFetch.post(
                                `/Alterar/${produto.id}`,
                                NovoProduto
                              );
                              handleEditarClick(produto.id);
                            }
                          }}
                        >
                          <i class="bx bxs-save"></i>
                        </a>
                        <a
                          className="DuplicarBtn"
                          onClick={async () => {
                            let NomeProduto = document.getElementById(
                              `tituloProduto${produto.id}`
                            ).innerHTML;
                            let Categoria = document.getElementById(
                              `CategoriaDoProdutoInput${produto.id}`
                            ).value;
                            let Descricao = document.getElementById(
                              `descricaoProduto${produto.id}`
                            ).innerHTML;
                            let preco = document.getElementById(
                              `precoProduto${produto.id}`
                            ).innerHTML;
                            const imagemAtualizada = produto.imagem;
                            const NovoProduto = {
                              NomeProduto,
                              Categoria,
                              imagem: imagemAtualizada,
                              Descricao,
                              preco,
                            };
                            await ProdutoFetch.post(`/Gravar`, NovoProduto);
                            for (var i = 0; i < 6; i++) {
                              //atualizando os itens pra ordenar do jeito que já estava
                              if (
                                document.getElementById(`subEscolha${i}`).style
                                  .backgroundColor === "var(--CorEscuraSelect)"
                              ) {
                                document
                                  .getElementById(`subEscolha${i}`)
                                  .click();
                              }
                            }
                          }}
                          style={{ backgroundColor: "var(--botaoDuplicar)" }}
                        >
                          <i class="bx bxs-duplicate"></i>
                        </a>
                      </span>
                    ) : (
                      <span className="BtnProdutoCliente">
                        <a>
                          <i className="bx bx-cart-download"></i>
                        </a>
                        <a className="InfoProduto">Info</a>
                      </span>
                    )}
                  </p>
                </div>

                <div
                  className="ConfirmacaoDeExclusaoDeProduto"
                  id={`ConfirmacaoDeExclusaoDeProduto${produto.id}`}
                >
                  <h1>Tem Certeza que deseja Excluir Este Produto?</h1>
                  <div className="SimOuNaoBtn">
                    <a
                      className="ExcluirSimBTN"
                      onClick={async () => {
                        await ProdutoFetch.post(`/Deletar/${produto.id}`);
                        //Atualizando a lista de produtos
                        for (var i = 0; i < 6; i++) {
                          //atualizando os itens pra ordenar do jeito que já estava
                          if (
                            document.getElementById(`subEscolha${i}`).style
                              .backgroundColor === "var(--CorEscuraSelect)"
                          ) {
                            document.getElementById(`subEscolha${i}`).click();
                          }
                        }
                      }}
                    >
                      Sim
                    </a>
                    <a
                      className="ExcluirNaoBTN"
                      onClick={() => {
                        document.getElementById(
                          `TodasInformacoesDoProduto${produto.id}`
                        ).style.display = "block";
                        document.getElementById(
                          `ConfirmacaoDeExclusaoDeProduto${produto.id}`
                        ).style.display = "none";
                      }}
                    >
                      não
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      <Paginacao
        setPagina={setpagina}
        posts={posts}
        SetPaginaAtual={SetPaginaAtual}
      />
    </>
  );
}

export default MontarProduto;
