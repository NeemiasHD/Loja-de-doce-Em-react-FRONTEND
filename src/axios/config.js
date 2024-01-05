import axios from "axios";

const ProdutoFetch = axios.create({
  baseURL: "https://localhost:7083/Produtos/",
  headers: {
    "Content-Type": "application/json",
  }, 
});
export default ProdutoFetch;
