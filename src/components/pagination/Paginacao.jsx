import React from "react";
import "./Paginacao.css";

function Paginacao({ setPagina, posts, SetPaginaAtual }) {
  const totalDePaginas = Math.ceil(posts.length / 9);
  const pagesArray = Array.from(//criando array pra poder usar o map pra criar o tanto certo de botões de paginação
    { length: totalDePaginas },
    (_, index) => index + 1
  );
  return (
    <>
      <div className="btnPaginacao">
        {pagesArray.map((pageNumber) => (
          <a
            key={pageNumber}
            onClick={() => {
              setPagina(pageNumber);
              SetPaginaAtual((pageNumber-1)*9);
              window.scrollTo({
                top:200,
                behavior:"smooth"
              })
            }}
          >
            {pageNumber}
          </a>
        ))}
      </div>
    </>
  );
}

export default Paginacao;
