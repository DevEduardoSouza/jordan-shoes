export const formatterCurrency = (value) => {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(value);
};

window.sr = ScrollReveal({ reset: true });

export const animationReveal = (element, x, y, z, duration) => {
  sr.reveal(element, {
    rotate: { x: 0, y: 40, z: 0 },

    duration: 2000,
  });
};
