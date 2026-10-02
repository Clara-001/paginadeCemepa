document.addEventListener("DOMContentLoaded", () => {
  const botonMenu = document.querySelector("#boton-menu");
  const menuNavegacion = document.querySelector("#menu-principal");

  if (botonMenu && menuNavegacion) {
    botonMenu.addEventListener("click", () => {
      const menuAbierto = menuNavegacion.classList.toggle("abierto");

      botonMenu.setAttribute("aria-expanded", String(menuAbierto));

      botonMenu.textContent = menuAbierto
        ? "Cerrar menú"
        : "Menú";
    });
  }
});