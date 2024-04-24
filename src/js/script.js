import { listaJordan } from "../store/listaJordan.js";
import { formatterCurrency, animationReveal } from "../utils/utils.js";

import { findItem, createCart } from "./crud.js";

/* =========={ Adicionando as Animações }==========*/
animationReveal(".message-info");
animationReveal(".content-img");
animationReveal(".card");

/* =========={ Evitar duplicidades e adicionar itens ao carinho de compras }==========*/
const uniqueItemIds = [];

const buttonAddCart = document.querySelectorAll(".btn-plus");

const updateCountCart = () => {
  const spanCountCart = document.querySelector(".cart-counter");
  spanCountCart.innerHTML = uniqueItemIds.length;
};

buttonAddCart.forEach((btnAddCart) => {
  btnAddCart.addEventListener("click", () => {
    const itemClickedId = Number(
      btnAddCart.parentNode.parentNode.getAttribute("id")
    );

    const itemClicked = findItem(listaJordan, itemClickedId);

    // Para evitar duplicidades.
    if (!uniqueItemIds.find((id) => id == itemClicked.id)) {
      uniqueItemIds.push(itemClicked.id);
      addToCart(itemClicked.id);
      updateCountCart();
    }
  });
});

/* =========={ Toggle Cart Side }==========*/
const body = document.querySelector("body");
const btnCart = document.querySelector(".btn-cart");
const arrowLeftCart = document.querySelector(".icon-arrow");

[btnCart, arrowLeftCart].forEach((button) => {
  button.addEventListener("click", () => {
    const cart = document.querySelector(".cart-side");
    cart.classList.toggle("hide");
    body.classList.toggle("overflow-hidden");
  });
});

/* =========={ Add Item to Cart Side  }==========*/
const addToCart = (id) => {
  const item = findItem(listaJordan, id);
  const cartItem = createCart(item);
  const cart = document.querySelector(".cart-side .cart-content");

  updateTotal();
  cart.appendChild(cartItem);
};

/* =========={ Functions for total price manipulation }==========*/
const getTotal = () => {
  let total = 0;

  uniqueItemIds.forEach((id) => {
    const item = findItem(listaJordan, id);
    total += item.price;
  });

  return total;
};

const updateTotal = () => {
  const total = getTotal();
  const spanTotal = document.querySelector(".cart-side #total");

  spanTotal.innerHTML = formatterCurrency(total);
};
