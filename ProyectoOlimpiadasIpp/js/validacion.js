// validacion.js
document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector("form");
  const estado = document.getElementById("estado");

  // Desactiva los mensajes nativos del navegador para usar los nuestros
  form.noValidate = true;

  // ---------- Reglas de validación ----------
  // Cada función devuelve un string con el error, o "" si el campo es válido.
  const reglas = {
    nombre(valor) {
      const v = valor.trim();
      if (!v) return "Ingresá tu nombre y apellido.";
      if (v.length < 3) return "Es demasiado corto.";
      if (!/^[A-Za-zÀ-ÖØ-öø-ÿ'’-]+(\s+[A-Za-zÀ-ÖØ-öø-ÿ'’-]+)+$/.test(v))
        return "Ingresá nombre y apellido, solo con letras.";
      return "";
    },

    correo(valor) {
      const v = valor.trim();
      if (!v) return "Ingresá tu correo electrónico.";
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v))
        return "Ingresá un correo válido (ej: nombre@dominio.com).";
      return "";
    },

    password(valor) {
      if (!valor) return "Ingresá una contraseña.";
      if (valor.length < 8) return "Debe tener al menos 8 caracteres.";
      if (!/[a-z]/.test(valor)) return "Debe incluir una minúscula.";
      if (!/[A-Z]/.test(valor)) return "Debe incluir una mayúscula.";
      if (!/\d/.test(valor)) return "Debe incluir un número.";
      return "";
    },

    telefono(valor) {
      const v = valor.trim();
      if (!v) return ""; // opcional
      if (!/^[+\d\s()-]+$/.test(v))
        return "Solo números, espacios, +, - y paréntesis.";
      const digitos = v.replace(/\D/g, "");
      if (digitos.length < 8 || digitos.length > 15)
        return "Debe tener entre 8 y 15 dígitos.";
      return "";
    },

    mensaje(valor) {
      if (valor.trim().length > 500) return "Máximo 500 caracteres.";
      return ""; // opcional
    },
  };

  // ---------- Helpers de UI ----------
  function obtenerSpanError(input) {
    let span = document.getElementById(`error-${input.id}`);
    if (!span) {
      span = document.createElement("span");
      span.id = `error-${input.id}`;
      span.className = "error";
      span.setAttribute("role", "alert");
      input.insertAdjacentElement("afterend", span);
      input.setAttribute("aria-describedby", span.id);
    }
    return span;
  }

  function validarCampo(input) {
    const regla = reglas[input.name];
    if (!regla) return true;

    const mensaje = regla(input.value);
    const span = obtenerSpanError(input);

    span.textContent = mensaje;
    input.classList.toggle("invalido", Boolean(mensaje));
    input.setAttribute("aria-invalid", mensaje ? "true" : "false");

    return !mensaje;
  }

  function mostrarEstado(texto, esError) {
    estado.textContent = texto;
    estado.style.color = esError ? "#c0392b" : "";
  }

  const campos = form.querySelectorAll("input, textarea");

  // ---------- Validación en vivo ----------
  campos.forEach((campo) => {
    // Al salir del campo
    campo.addEventListener("blur", () => validarCampo(campo));

    // Mientras escribe: solo revalida si el campo ya estaba marcado como inválido
    campo.addEventListener("input", () => {
      if (campo.classList.contains("invalido")) validarCampo(campo);
    });
  });

  // ---------- Envío ----------
  form.addEventListener("submit", (e) => {
    e.preventDefault();

    let formularioValido = true;
    let primerInvalido = null;

    campos.forEach((campo) => {
      const ok = validarCampo(campo);
      if (!ok) {
        formularioValido = false;
        if (!primerInvalido) primerInvalido = campo;
      }
    });

    if (!formularioValido) {
      mostrarEstado("Revisá los campos marcados.", true);
      primerInvalido.focus();
      return;
    }

    // Acá va el envío real (fetch, etc.). Por ahora solo simulamos el éxito.
    mostrarEstado("¡Formulario enviado correctamente!", false);
    form.reset();
    campos.forEach((c) => {
      c.classList.remove("invalido");
      c.removeAttribute("aria-invalid");
      const span = document.getElementById(`error-${c.id}`);
      if (span) span.textContent = "";
    });
  });
});