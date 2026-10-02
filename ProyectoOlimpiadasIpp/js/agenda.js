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
  // FILTRO DE EVENTOS
  // ==================================

  const filtroTipo = document.querySelector("#tipo-evento");
  const botonLimpiar = document.querySelector(
    "#limpiar-filtro-eventos"
  );

  const eventos = document.querySelectorAll(".evento");
  const mensajeResultado = document.querySelector("#resultado-eventos");
  const mensajeSinEventos = document.querySelector("#sin-eventos");

  function filtrarEventos() {
    if (!filtroTipo) {
      return;
    }

    const tipoSeleccionado = filtroTipo.value;
    let cantidadVisibles = 0;

    eventos.forEach((evento) => {
      const coincide =
        tipoSeleccionado === "todas" ||
        evento.dataset.tipo === tipoSeleccionado;

      evento.hidden = !coincide;

      if (coincide) {
        cantidadVisibles += 1;
      }
    });

    if (mensajeSinEventos) {
      mensajeSinEventos.hidden = cantidadVisibles !== 0;
    }

    if (!mensajeResultado) {
      return;
    }

    if (cantidadVisibles === 0) {
      mensajeResultado.textContent =
        "No hay actividades disponibles para el tipo seleccionado.";
      return;
    }

    if (tipoSeleccionado === "todas") {
      mensajeResultado.textContent =
        `Se muestran todas las actividades próximas: ${cantidadVisibles}.`;
      return;
    }

    const palabra =
      cantidadVisibles === 1 ? "actividad" : "actividades";

    mensajeResultado.textContent =
      `Se encontraron ${cantidadVisibles} ${palabra}.`;
  }

  if (filtroTipo) {
    filtroTipo.addEventListener("change", filtrarEventos);
  }

  if (botonLimpiar && filtroTipo) {
    botonLimpiar.addEventListener("click", () => {
      filtroTipo.value = "todas";
      filtrarEventos();
    });
  }

  // ==================================
  // MODAL DE DETALLES
  // ==================================

  const botonesDetalles = document.querySelectorAll(
    ".boton-detalles-evento"
  );

  const modal = document.querySelector("#modal-evento");
  const botonCerrarModal = document.querySelector(
    "#cerrar-modal-evento"
  );

  const tituloModal = document.querySelector(
    "#titulo-modal-evento"
  );

  const contenidoModal = document.querySelector(
    "#contenido-modal-evento"
  );

  function abrirDetalles(boton) {
    const evento = boton.closest(".evento");

    if (!evento || !modal) {
      return;
    }

    const fecha =
      evento.querySelector(".fecha-evento")?.textContent.trim() || "";

    const titulo =
      evento.querySelector("h3")?.textContent.trim() ||
      "Detalle del evento";

    const descripcion =
      evento.querySelector("p:not(.fecha-evento)")?.textContent.trim() || "";

    const datos = evento.querySelector("ul")?.innerHTML || "";

    tituloModal.textContent = titulo;

    contenidoModal.innerHTML = `
      <p class="fecha-modal">${fecha}</p>
      <p>${descripcion}</p>
      <ul>${datos}</ul>
    `;

    modal.showModal();
  }

  botonesDetalles.forEach((boton) => {
    boton.addEventListener("click", () => {
      abrirDetalles(boton);
    });
  });

  if (botonCerrarModal && modal) {
    botonCerrarModal.addEventListener("click", () => {
      modal.close();
    });
  }

  if (modal) {
    modal.addEventListener("click", (evento) => {
      const cuadro = modal.getBoundingClientRect();

      const clicFuera =
        evento.clientX < cuadro.left ||
        evento.clientX > cuadro.right ||
        evento.clientY < cuadro.top ||
        evento.clientY > cuadro.bottom;

      if (clicFuera) {
        modal.close();
      }
    });
  }

  // Estado inicial al abrir la página.
  if (filtroTipo && eventos.length > 0) {
    filtrarEventos();
  }
});