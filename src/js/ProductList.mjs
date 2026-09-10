import { renderListWithTemplate } from "./utils.mjs";

const pagePaths = {
  "880RR": "product_pages/marmot-ajax-3.html?product=880RR",
  "985RF": "product_pages/northface-talus-4.html?product=985RF",
  "985PR": "product_pages/northface-alpine-3.html?product=985PR",
  "344YJ": "product_pages/cedar-ridge-rimrock-2.html?product=344YJ",
};

function productCardTemplate(product) {
  return `
    <li class="product-card">
      <a href="${pagePaths[product.Id]}">
        <img src="${product.Image}" alt="${product.NameWithoutBrand}">
        <h3 class="card__brand">${product.Brand.Name}</h3>
        <h2 class="card__name">${product.NameWithoutBrand}</h2>
        <p class="product-card__price">$${product.FinalPrice}</p>
      </a>
    </li>
    `;
}

export default class ProductList {
  constructor(category, dataSource, listElement) {
    this.category = category;
    this.dataSource = dataSource;
    this.listElement = listElement;
  }

  async init() {
    const list = await this.dataSource.getData();
    this.renderList(list);
  }

  renderList(list) {
    const visibleProducts = list.filter((product) => pagePaths[product.Id]);
    renderListWithTemplate(productCardTemplate, this.listElement, visibleProducts);
  }
}