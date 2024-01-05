import React, { useState } from 'react'
import InputImagem from '../InputImagem/InputImagem';
import ProdutoFetch from '../../axios/config';
import "./AdicionarProduto.css";



function AdicionarProduto({
  limparImagem,
  SetLimparImagem,
  setProdutos,
}) 
{
const [imagemAdd, setImagemAdd] = useState(null);
  return (
    <div className="produto">
      <div className="AdicionarProdutoBTN">
        <i
          class="bx bx-plus-circle"
          onClick={() => {
            document.querySelector(
              ".TodasInformacoesDoProduto.add"
            ).style.opacity = "1";
            document.querySelector(
              ".TodasInformacoesDoProduto.add"
            ).style.pointerEvents = "all";
            document.querySelector(".AdicionarProdutoBTN").style.opacity = "0";
            document.querySelector(".AdicionarProdutoBTN").style.pointerEvents =
              "none";
          }}
        ></i>
      </div>
      <div className="TodasInformacoesDoProduto add">
        <div className="img">
          <InputImagem
            id="Add"
            limparImagem={limparImagem}
            setlimparImagem={SetLimparImagem}
            ColocarImputImagem={setImagemAdd}
          />
        </div>

        <p className="Informacoes">
          <input
            className="tituloProduto New"
            type="text"
            placeholder="Nome do Produto"
          />
          <select className="CategoriaDoProdutoInput New">
            <option value="" selected disabled>
              Categoria
            </option>
            <option value="Lanche">Lanche</option>
            <option value="Sobremesa">Sobremesa</option>
            <option value="Sorvete">Sorvete</option>
            <option value="Açai">Açai</option>
            <option value="Açai">Almoço</option>
          </select>
          <input className="precoProduto New" placeholder="Preço" />
          <input className="descricaoProduto New" placeholder="Descrição" />

          <span className="BtnProduto">
            <a
              className="SalvarBtn"
              onClick={async () => {
                let NomeProduto =
                  document.querySelector(`.tituloProduto.New`).value;
                let Categoria = document.querySelector(
                  `.CategoriaDoProdutoInput.New`
                ).value;
                let Descricao = document.querySelector(
                  `.descricaoProduto.New`
                ).value;
                let preco = document.querySelector(`.precoProduto.New`).value;
                const NovoProduto = {
                  NomeProduto,
                  Categoria,
                  imagem: imagemAdd,
                  Descricao,
                  preco,
                };
                setImagemAdd(null);
                console.log(NovoProduto);
                await ProdutoFetch.post(`/Gravar`, NovoProduto);
                document.querySelector(".Limpar").click();
                document.querySelector(".VoltarBtn").click();
                const response = await ProdutoFetch.get(`/BuscarTodos`);
                setProdutos(response.data);
              }}
            >
              <i className="bx bxs-save"></i>
            </a>
            <a
              className="Limpar"
              onClick={() => {
                document.querySelector(".tituloProduto").value = "";
                document.querySelector(".precoProduto").value = "";
                document.querySelector(".descricaoProduto").value = "";
                document.querySelector(".CategoriaDoProdutoInput").value = "";
                SetLimparImagem(true);
              }}
            >
              <i class="bx bx-brush-alt"></i>
            </a>
            <a
              className="VoltarBtn"
              onClick={() => {
                document.querySelector(
                  ".TodasInformacoesDoProduto.add"
                ).style.opacity = "0";
                document.querySelector(
                  ".TodasInformacoesDoProduto.add"
                ).style.pointerEvents = "none";
                document.querySelector(".AdicionarProdutoBTN").style.opacity =
                  "1";
                document.querySelector(
                  ".AdicionarProdutoBTN"
                ).style.pointerEvents = "all";
              }}
            >
              <i class="bx bxs-chevrons-left"></i>
            </a>
          </span>
        </p>
      </div>
    </div>
  );
}

export default AdicionarProduto