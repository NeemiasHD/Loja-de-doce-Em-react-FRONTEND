import { useEffect } from "react";
import "./imputImagem.css";


function recortarImagemQuadrada(imagem, larguraDesejada) {
  var canvas = document.createElement("canvas");

  var ctx = canvas.getContext("2d");

  var tamanho = Math.min(imagem.width, imagem.height);

  canvas.width = larguraDesejada;
  canvas.height = larguraDesejada;

  var offsetX = (imagem.width - tamanho) / 2;
  var offsetY = (imagem.height - tamanho) / 2;

  ctx.drawImage(
    imagem,
    offsetX,
    offsetY,
    tamanho,
    tamanho,
    0,
    0,
    larguraDesejada,
    larguraDesejada
  );

  var imagemRecortada = new Image();
  imagemRecortada.src = canvas.toDataURL("image/png");

  return imagemRecortada;
}

function InputImagem({ ColocarImputImagem, Background, id, limparImagem,setlimparImagem }) {

  useEffect(() => {
    if (limparImagem) {
      document.getElementById(`ImagemPreview${id}`).src = "";
      document.getElementById(`btnAdd${id}`).style.display = "flex";
      document.getElementById(`ImagemInput${id}`).value="";
      setlimparImagem(false);
    }
  }, [limparImagem]);

  return (
    <>
      <input
        type="file"
        id={`ImagemInput${id}`}
        accept="image/*"
        style={{ display: "none" }}
        onChange={(e) => {
          const file = e.target.files[0];
          if (file) {
            const reader = new FileReader();
            reader.onload = function (e) {
              const imagemOriginal = new Image();
              imagemOriginal.src = e.target.result;
              imagemOriginal.onload = function () {
                // Agora, dentro desta função de retorno, você pode recortar a imagem e definir a visualização
                let imagemRecortada = recortarImagemQuadrada(
                  imagemOriginal,
                  300
                ).src;
                document.getElementById(`ImagemPreview${id}`).src =
                  imagemRecortada;

                document.getElementById(`btnAdd${id}`).style.display = "none";
                document.getElementById(`ImagemPreview${id}`).style.filter =
                  "blur(0px)";
                ("none");
                ColocarImputImagem(imagemRecortada);
              };
            };
            reader.readAsDataURL(file);
          }
        }}
      />
      <label htmlFor={`ImagemInput${id}`} className="ImagemInput">
        <i
          class="bx bx-image-add"
          id={`btnAdd${id}`}
          style={{ color: Background ? "white" : "black" }}
        ></i>
        {Background ? (
          <img
            src={Background}
            className="ImagemPreview"
            id={`ImagemPreview${id}`}
          />
        ) : (
          <img src="" className="ImagemPreview" id={`ImagemPreview${id}`} />
        )}
      </label>
    </>
  );
}

export default InputImagem;
