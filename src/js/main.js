import ProductData from "./ProductData.mjs";
import ProductsList from "./ProductsList.mjs";

const productData = new ProductData("products");
const productList = new ProductsList(
  "products",
  productData,
  document.getElementById("product-list"),
);
