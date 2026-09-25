import { getLocalStorage, loadHeaderFooter } from "./utils.mjs";
import CheckoutProcess from "./CheckoutProcess.mjs";

loadHeaderFooter();

const form = document.querySelector("#checkout-form");
const checkout = new CheckoutProcess("so-cart", ".order-summary");

checkout.init();
checkout.calculateOrderTotal();

form?.addEventListener("submit", async (event) => {
  event.preventDefault();

  if (!form.checkValidity()) {
    form.reportValidity();
    return;
  }

  checkout.list = getLocalStorage("so-cart") || [];
  checkout.calculateOrderTotal();

  try {
    const response = await checkout.checkout(form);
    console.log("Order submitted successfully", response);
    alert("Thank you! Your order has been placed.");
    form.reset();
    localStorage.removeItem("so-cart");
    checkout.init();
    checkout.calculateOrderTotal();
  } catch (error) {
    console.error("Checkout failed", error);
    alert("There was a problem submitting your order. Please try again.");
  }
});
