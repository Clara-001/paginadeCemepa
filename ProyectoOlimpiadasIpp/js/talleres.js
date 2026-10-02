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
  // FILTROS DE TALLERES
  // ==================================

  const filtroDisciplina = document.querySelector("#disciplina");
  const filtroEdad = document.querySelector("#edad");
  const botonLimpiar = document.querySelector("#limpiar-filtros");
  const mensajeResultado = document.querySelector("#resultado-filtros");
  const mensajeSinResultados = document.querySelector("#sin-resultados");

  const talleres = document.querySelectorAll(".taller");
  const categorias = document.querySelectorAll(".categoria");
  const subcategorias = document.querySelectorAll(".subcategoria");

  function actualizarSubcategorias() {
    subcategorias.forEach((subcategoria) => {
      const tarjetas = subcategoria.querySelectorAll(".taller");

      const hayTarjetaVisible = [...tarjetas].some(
        (tarjeta) => !tarjeta.hidden
      );

      subcategoria.hidden = !hayTarjetaVisible;
    });
  }

  function actualizarCategorias() {
    categorias.forEach((categoria) => {
      const tarjetas = categoria.querySelectorAll(".taller");

      const hayTarjetaVisible = [...tarjetas].some(
        (tarjeta) => !tarjeta.hidden
      );

      categoria.hidden = !hayTarjetaVisible;
    });
  }

  function actualizarMensaje(cantidad) {
    if (!mensajeResultado || !filtroDisciplina || !filtroEdad) {
      return;
    }

    if (cantidad === 0) {
      mensajeResultado.textContent =
        "No hay talleres disponibles para los filtros seleccionados.";
      return;
    }

    if (
      filtroDisciplina.value === "todas" &&
      filtroEdad.value === "todas"
    ) {
      mensajeResultado.textContent =
        `Se muestran todos los talleres disponibles: ${cantidad}.`;
      return;
    }

    const palabraTaller = cantidad === 1 ? "taller" : "talleres";
    const palabraDisponible =
      cantidad === 1 ? "disponible" : "disponibles";

    mensajeResultado.textContent =
      `Se encontraron ${cantidad} ${palabraTaller} ${palabraDisponible}.`;
  }

  function aplicarFiltros() {
    if (!filtroDisciplina || !filtroEdad) {
      return;
    }

    const disciplina = filtroDisciplina.value;
    const edad = filtroEdad.value;

    let cantidadVisibles = 0;

    talleres.forEach((taller) => {
      const coincideDisciplina =
        disciplina === "todas" ||
        taller.dataset.disciplina === disciplina;

      const coincideEdad =
        edad === "todas" ||
        taller.dataset.edad === edad;

      const mostrar = coincideDisciplina && coincideEdad;

      taller.hidden = !mostrar;

      if (mostrar) {
        cantidadVisibles += 1;
      }
    });

    actualizarSubcategorias();
    actualizarCategorias();

    if (mensajeSinResultados) {
      mensajeSinResultados.hidden = cantidadVisibles !== 0;
    }

    actualizarMensaje(cantidadVisibles);
  }

  if (filtroDisciplina) {
    filtroDisciplina.addEventListener("change", aplicarFiltros);
  }

  if (filtroEdad) {
    filtroEdad.addEventListener("change", aplicarFiltros);
  }

  if (botonLimpiar && filtroDisciplina && filtroEdad) {
    botonLimpiar.addEventListener("click", () => {
      filtroDisciplina.value = "todas";
      filtroEdad.value = "todas";
      aplicarFiltros();
    });
  }

  if (filtroDisciplina && filtroEdad && talleres.length > 0) {
    aplicarFiltros();
  }

  // ==================================
  // MODAL: VER DETALLES
  // ==================================

  const botonesDetalles = document.querySelectorAll(".boton-detalles");

  const modalDetalles = document.querySelector("#modal-detalles");

  const botonCerrarModal = document.querySelector(
    "#cerrar-modal-detalles"
  );

  const tituloModal = document.querySelector("#titulo-modal-detalles");

  const contenidoModal = document.querySelector(
    "#contenido-modal-detalles"
  );

  const enlacePreinscripcionModal = document.querySelector(
    "#enlace-preinscripcion-modal"
  );

  function abrirDetalles(boton) {
    const tarjeta = boton.closest(".taller");

    if (!tarjeta || !modalDetalles) {
      return;
    }

    const titulo =
      tarjeta.querySelector("h3, h4")?.textContent.trim() || "Taller";

    const concepto = tarjeta.dataset.concepto || "Descripción no disponible.";
    const datos = tarjeta.querySelector("ul");

    if (tituloModal) {
      tituloModal.textContent = titulo;
    }

    if (contenidoModal) {
      const parrafoConcepto = document.createElement("p");
      parrafoConcepto.textContent = concepto;
      contenidoModal.replaceChildren(parrafoConcepto);

      if (datos) {
        contenidoModal.append(datos.cloneNode(true));
      }
    }

    if (enlacePreinscripcionModal) {
      enlacePreinscripcionModal.href =
        `preinscripcion.html?taller=${encodeURIComponent(titulo)}`;
    }

    modalDetalles.showModal();
  }

  botonesDetalles.forEach((boton) => {
    boton.addEventListener("click", () => {
      abrirDetalles(boton);
    });
  });

  if (botonCerrarModal && modalDetalles) {
    botonCerrarModal.addEventListener("click", () => {
      modalDetalles.close();
    });
  }

  if (modalDetalles) {
    modalDetalles.addEventListener("click", (evento) => {
      const cuadroModal = modalDetalles.getBoundingClientRect();

      const clicFueraDelModal =
        evento.clientX < cuadroModal.left ||
        evento.clientX > cuadroModal.right ||
        evento.clientY < cuadroModal.top ||
        evento.clientY > cuadroModal.bottom;

      if (clicFueraDelModal) {
        modalDetalles.close();
      }
    });
  }
});