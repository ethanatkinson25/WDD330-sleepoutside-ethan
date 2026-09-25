import { alertMessage, getLocalStorage, setLocalStorage } from "./utils.mjs";

export default class ProductDetails {
  // Stores the selected product ID and its data source.
  constructor(productId, dataSource) {
    this.productId = productId;
    this.product = {};
    this.dataSource = dataSource;
  }

  // Loads the selected product and renders its detail view.
  async init() {
    this.product = await this.dataSource.findProductById(this.productId);
    this.renderProductDetails();
  }

  // Adds the current product to the shopping cart and confirms it to the user.
  addProductToCart() {
    const cartItems = getLocalStorage("so-cart") || [];
    cartItems.push(this.product);
    setLocalStorage("so-cart", cartItems);
    alertMessage(`${this.product.NameWithoutBrand} added to cart.`);
  }

  // Builds and injects the product detail markup into the page.
  renderProductDetails() {
    const productElement = document.querySelector(".product-detail");
    if (!productElement) return;

    productElement.innerHTML = productDetailsTemplate(this.product);

    const addToCartButton = document.getElementById("addToCart");
    if (addToCartButton) {
      addToCartButton.addEventListener("click", this.addProductToCart.bind(this));
    }
  }
}

// Creates the HTML for a product detail card.
function productDetailsTemplate(product) {
  const imageUrl = product.Images?.PrimaryLarge || product.Image || "";
  const brandName = product.Brand?.Name || "";
  const colorName = product.Colors?.[0]?.ColorName || "";

  return `<section class="product-detail">
    <h3>${brandName}</h3>
    <h2 class="divider">${product.NameWithoutBrand}</h2>
    <img
      class="divider"
      src="${imageUrl}"
      alt="${product.NameWithoutBrand}"
    />
    <p class="product-card__price">$${product.FinalPrice}</p>
    <p class="product__color">${colorName}</p>
    <p class="product__description">${product.DescriptionHtmlSimple}</p>
    <div class="product-detail__add">
      <button id="addToCart" data-id="${product.Id}">Add to Cart</button>
    </div>
  </section>`;
}