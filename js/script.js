import { listaJordan } from "../store/listaJordan.js";
import { formatterCurrency, animationReveal } from "../utils/utils.js";
import { findItem, createCart, removeItem } from "./crud.js";

const listCart = [];

/* =========={ Adicionando as Animações }==========*/
animationReveal(".container .brand");
animationReveal(".content-img");
animationReveal(".card");

/* =========={ Evitar duplicidades e adicionar itens ao carrinho de compras }==========*/
const buttonAddCart = document.querySelectorAll(".btn-plus");

const updateCountCart = () => {
  const spanCountCart = document.querySelector(".cart-counter");
  spanCountCart.innerHTML = listCart.length;
};

buttonAddCart.forEach((btnAddCart) => {
  btnAddCart.addEventListener("click", () => {
    const itemClickedId = Number(
      btnAddCart.parentNode.parentNode.getAttribute("id")
    );

    const itemClicked = findItem(listaJordan, itemClickedId);

    if (!listCart.find((cart) => cart.id === itemClicked.id)) {
      itemClicked.quantity = 1;
      itemClicked.priceTotal = itemClicked.price;

      listCart.push(itemClicked);

      addToCart(itemClicked);
      updateCountCart();
      updateTotal();
      initRemoveItem();
    }
  });
});

/* =========={ Toggle Cart Side }==========*/
const body = document.querySelector("body");
const btnCart = document.querySelector(".btn-cart");
const arrowLeftCart = document.querySelector(".icon-arrow");
const fade = document.querySelector(".fade");

[btnCart, arrowLeftCart, fade].forEach((button) => {
  button.addEventListener("click", () => {
    const cart = document.querySelector(".cart-side");
    cart.classList.toggle("hide");
    body.classList.toggle("overflow-hidden");
    fade.classList.toggle("hide");
  });
});

/* =========={ Functions for total price manipulation }==========*/
const addToCart = (item) => {
  const cartItem = createCart(item, listCart, updateTotal);
  const cart = document.querySelector(".cart-side .cart-content");
  cart.appendChild(cartItem);
};

const getTotal = () => {
  let total = 0;
  listCart.forEach((item) => {
    total += item.quantity * item.price;
  });
  return total;
};

const updateTotal = () => {
  const total = getTotal();
  const spanTotal = document.querySelector(".cart-side #total");
  spanTotal.innerHTML = formatterCurrency(total);
};

/* =========={ Eventos de clique nos botões de remoção }==========*/
function initRemoveItem() {
  const buttonRemoveItem = document.querySelectorAll(".btn-delete");

  buttonRemoveItem.forEach((btn) => {
    btn.addEventListener("click", () => {
      const id = btn.parentNode.getAttribute("id");
      btn.parentNode.remove();
      removeItem(listCart, id);
      updateCountCart();
      updateTotal();
    });
  });
}
