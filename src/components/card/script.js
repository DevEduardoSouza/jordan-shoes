import { listaJordan } from "../../store/listaJordan.js";
import { formatterCurrency } from "../../utils/utils.js";

const crateCard = ({ image, title, price, id }) => {
  const card = document.createElement("div");
  card.classList.add("card");
  card.id = id;
  price = formatterCurrency(price);

  card.innerHTML = `
        <div class="card-img">
            <img src="${image}" class="card-img-top" alt="...">
        </div>

        <div class="card-body">
            <h2 class="card-title">${title}</h2>
        </div>

        <div class="card-footer">
            <h5 class="card-price">${price}</h5>
            <button class="btn btn-plus"> <i class="bi bi-plus"></i> </button>
        </div>

        <span class="icon-heart" id="icon-heart-card"><i class="bi bi-heart"></i></span>
    `;

  return card;
};

const addCard = (list) => {
  list.forEach((item) => {
    const card = crateCard(item);
    document.querySelector("#containerCard").appendChild(card);
  });
};

addCard(listaJordan);
