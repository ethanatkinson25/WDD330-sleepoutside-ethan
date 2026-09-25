import { getParam, loadHeaderFooter } from "./utils.mjs";
import ExternalServices from "./ExternalServices.mjs";
import ProductDetails from "./ProductDetails.js";

loadHeaderFooter();

const category = getParam("category") || "tents";
const dataSource = new ExternalServices(category);
const productID = getParam("product");

const product = new ProductDetails(productID, dataSource);
product.init();