import { renderListWithTemplate } from "./utils.mjs";
import { loadHeaderFooter } from "./utils.mjs";

loadHeaderFooter();

const pagePaths = {
  "880RR": "product_pages/marmot-ajax-3.html",
  "985RF": "product_pages/northface-talus-4.html",
  "985PR": "product_pages/northface-alpine-3.html",
  "344YJ": "product_pages/cedar-ridge-rimrock-2.html",
};

// Builds the HTML markup for a single product card.
function productCardTemplate(product, category) {
  const imageUrl = product.Images?.PrimaryMedium || product.Image || "";
  const brandName = product.Brand?.Name || "";
  const productPage = pagePaths[product.Id];
  const href = productPage
    ? `${productPage}?product=${product.Id}&category=${category}`
    : "#";

  return `
    <li class="product-card">
      <a href="${href}">
        <img src="${imageUrl}" alt="${product.NameWithoutBrand}">
        <h3 class="card__brand">${brandName}</h3>
        <h2 class="card__name">${product.NameWithoutBrand}</h2>
        <p class="product-card__price">$${product.FinalPrice}</p>
      </a>
    </li>
    `;
}

export default class ProductList {
  // Stores the category, data source, and target container for the list.
  constructor(category, dataSource, listElement, searchQuery = "") {
    this.category = category;
    this.dataSource = dataSource;
    this.listElement = listElement;
    this.searchQuery = searchQuery;
  }

  // Fetches product data and renders the page title and product list.
  async init() {
    const list = this.searchQuery
      ? await this.dataSource.searchProducts(this.searchQuery)
      : await this.dataSource.getData(this.category);
    this.renderList(list);

    const title = document.querySelector(".products h2");
    if (title) {
      if (this.searchQuery) {
        title.textContent = `Search Results: ${this.searchQuery}`;
      } else {
        const formattedCategory = this.category
          ? this.category.charAt(0).toUpperCase() + this.category.slice(1)
          : "Products";
        title.textContent = `Top Products: ${formattedCategory}`;
      }
    }
  }

  // Renders the products returned by the API, while still linking known product pages when available.
  renderList(list) {
    const products = Array.isArray(list) ? list : [];
    renderListWithTemplate(
      (product) => productCardTemplate(product, this.category || "tents"),
      this.listElement,
      products,
    );
  }
}