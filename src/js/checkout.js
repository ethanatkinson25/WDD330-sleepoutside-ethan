import { getLocalStorage, loadHeaderFooter } from "./utils.mjs";

loadHeaderFooter();

const form = document.querySelector("#checkout-form");
const subtotalElement = document.querySelector("#subtotal");
const taxElement = document.querySelector("#tax");
const shippingElement = document.querySelector("#shipping");
const totalElement = document.querySelector("#total");

function formatCurrency(amount) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(amount);
}

function getCartItems() {
  const cart = getLocalStorage("so-cart");
  return Array.isArray(cart) ? cart : [];
}

function calculateOrderSummary() {
  const items = getCartItems();
  const subtotal = items.reduce((sum, item) => {
    const price = Number(item.FinalPrice ?? item.finalPrice ?? 0);
    const quantity = Number(item.Quantity ?? 1);
    return sum + price * quantity;
  }, 0);

  const tax = subtotal * 0.06;
  const shipping = items.length === 0 ? 0 : 10 + (items.length - 1) * 2;
  const total = subtotal + tax + shipping;

  subtotalElement.textContent = formatCurrency(subtotal);
  taxElement.textContent = formatCurrency(tax);
  shippingElement.textContent = formatCurrency(shipping);
  totalElement.textContent = formatCurrency(total);
}

calculateOrderSummary();

form?.addEventListener("submit", (event) => {
  event.preventDefault();

  if (!form.checkValidity()) {
    form.reportValidity();
    return;
  }

  const firstName = document.querySelector("#firstName").value.trim();
  const lastName = document.querySelector("#lastName").value.trim();

  alert(`Thank you, ${firstName} ${lastName}! Your order has been placed.`);
  form.reset();
  localStorage.removeItem("so-cart");
  calculateOrderSummary();
});
