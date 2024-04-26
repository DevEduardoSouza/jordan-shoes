import { formatterCurrency } from "../utils/utils.js";

/**
 * Função que encontra um item em um array com base em um ID específico.
 * @param {Array} array O array no qual o item será procurado.
 * @param {*} id O ID do item a ser encontrado.
 * @returns {*} O item encontrado, ou undefined se não for encontrado.
 */
export const findItem = (array, id) => {
  return array.find((element) => element.id === id);
};

/**
 * Função que cria um elemento de carrinho de compras com base nas informações fornecidas.
 * @param {Object} item As informações do item a ser adicionado ao carrinho.
 * @param {string} item.id O ID do item.
 * @param {string} item.image O URL da imagem do item.
 * @param {string} item.title O título do item.
 * @param {number} item.price O preço do item.
 * @returns {HTMLElement} O elemento HTML que representa o item no carrinho.
 */
export const createCart = ({ id, image, title, price }, listCart,updateTotal) => {
  const cartItem = document.createElement("div");
  cartItem.classList.add("cart-item");
  cartItem.id = id;
  price = formatterCurrency(price);

  const content = `
        <img
          src="${image}"
          alt="${title}"
        />
        <div class="cart-item-info">
          <h4>${title}</h4>
          <p>${price}</p>
        </div>
        <div class="btn-delete">
          <i class="bi bi-trash3"></i>
        </div>
        <div class="buttons">
          <button class="btn btn-minus btn-minus-cart"><i class="bi bi-dash"></i></button>
          <span class="value quantity">1</span>
          <button class="btn btn-plus btn-plus-cart" ><i class="bi bi-plus"></i></button>
        </div>
    `;

  cartItem.innerHTML = content;

  // Adicionar evento de clique ao botão de adição
  const btnPlus = cartItem.querySelector(".btn-plus-cart");
  btnPlus.addEventListener("click", () => {
    const quantity = cartItem.querySelector(".quantity");
    quantity.innerHTML = Number(quantity.innerHTML) + 1;
    const itemFound = listCart.find((item) => item.id === id);
    if (itemFound) {
      itemFound.quantity = Number(quantity.textContent);
      updateTotal();
    }
  });

  // Adicionar evento de clique ao botão de subtração
  const btnMinus = cartItem.querySelector(".btn-minus-cart");
  btnMinus.addEventListener("click", () => {
    const quantity = cartItem.querySelector(".quantity");
    if (Number(quantity.textContent) > 1) {
      quantity.innerHTML = Number(quantity.innerHTML) - 1;
      const itemFound = listCart.find((item) => item.id === id);
      if (itemFound) {
        itemFound.quantity = Number(quantity.textContent);
        updateTotal();
      }
    }
  });

  return cartItem;
};


export const removeItem = (listCart, id) => {
  id = Number(id);
  const index = listCart.findIndex((element) => element.id === id);
  if (index !== -1) {
    listCart.splice(index, 1);
  }
};

