import { listaJordan } from "../store/listaJordan.js";

window.sr = ScrollReveal({ reset: true });

const animationReveal = (element, x, y, z, duration) => {
  sr.reveal(element, {
    rotate: { x: 0, y: 40, z: 0 },

    duration: 2000,
  });
};

animationReveal(".message-info");
animationReveal(".content-img");
animationReveal(".card");

/**/

const shoppingCart = [];

const btnsAddCart = document.querySelectorAll(".btn-plus");

btnsAddCart.forEach((btnAddCart) => {
  btnAddCart.addEventListener("click", () => {
    const cartId = btnAddCart.parentNode.parentNode.getAttribute("id");

    const item = listaJordan.find((cart) => cart.id == cartId);

    // verificar se o id do card já está no array
    if (!shoppingCart.find((id) => id == item.id)) {
      addCard(item);
    }else{}

    console.log(shoppingCart);
  });
});

const addCard = (item) => {
  shoppingCart.push(item.id);
};



// toogle cart side

const btnCart = document.querySelector(".btn-cart");
const arrowLeftCart = document.querySelector(".icon-arrow");

const body = document.querySelector("body");

arrowLeftCart.addEventListener("click", () => {
  const cart = document.querySelector(".cart-side");

  cart.classList.toggle("hide");
  body.classList.toggle("overflow-hidden");
});

btnCart.addEventListener("click", () => {
  const cart = document.querySelector(".cart-side");

  cart.classList.toggle("hide");
  body.classList.toggle("overflow-hidden");
});