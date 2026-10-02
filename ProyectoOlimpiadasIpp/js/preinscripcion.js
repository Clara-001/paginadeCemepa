document.addEventListener("DOMContentLoaded", () => {
  // ==================================
  // MENÚ RESPONSIVE
  // ==================================

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

  // ==================================
  // SELECCIONAR TALLER DESDE LA URL
  //
  // Ejemplo:
  // preinscripcion.html?taller=Guitarra
  // ==================================

  const selectorTaller = document.querySelector("#taller");

  const parametrosUrl = new URLSearchParams(window.location.search);

  const tallerDesdeUrl = parametrosUrl.get("taller");

  if (selectorTaller && tallerDesdeUrl) {
    const existeOpcion = [...selectorTaller.options].some(
      (opcion) => opcion.value === tallerDesdeUrl
    );

    if (existeOpcion) {
      selectorTaller.value = tallerDesdeUrl;
    }
  }

  // ==================================
  // MENSAJE SIMPLE AL ENVIAR
  // ==================================

  const formulario = document.querySelector("#formulario-preinscripcion");

  const mensajeFormulario = document.querySelector("#mensaje-formulario");

  if (formulario && mensajeFormulario) {
    formulario.addEventListener("submit", (evento) => {
      evento.preventDefault();

      if (!formulario.checkValidity()) {
        formulario.reportValidity();
        return;
      }

      const nombre = document.querySelector("#nombre").value.trim();

      const taller = document.querySelector("#taller").value;

      mensajeFormulario.textContent =
        `Gracias, ${nombre}. Tu solicitud de preinscripción para "${taller}" fue enviada correctamente. El CEMEPA se comunicará con vos para informarte sobre los próximos pasos.`;

      formulario.reset();

      window.scrollTo({
        top: mensajeFormulario.offsetTop - 120,
        behavior: "smooth"
      });
    });

    formulario.addEventListener("reset", () => {
      mensajeFormulario.textContent = "";
    });
  }
});