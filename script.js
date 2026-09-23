const boton = document.getElementById('alto_contraste');

boton.addEventListener('click', () => {
  document.body.classList.toggle('efecto-invertido');
});