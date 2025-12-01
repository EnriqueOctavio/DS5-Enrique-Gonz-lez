(() => {
  const App = (() => {
    const state = {
      alumnos: [],
      uid: 1,
    };

    const htmlElements = {
      form: document.querySelector("#form-estudiante"),
      nombre: document.querySelector("#nombre"),
      apellido: document.querySelector("#apellido"),
      email: document.querySelector("#email"),
      edad: document.querySelector("#edad"),
      carrera: document.querySelector("#carrera"),
      lista: document.querySelector("#lista"),
      badge: document.querySelector("#badge"),
      btnLimpiar: document.querySelector("#btn-limpiar"),
      btnBorrarTodo: document.querySelector("#btn-borrar-todo"),
    };

    const templates = {
      filaVacia() {
        return `
          <tr class="vacio">
            <td colspan="7">No hay resultados.</td>
          </tr>
        `;
      },
      filaAlumno(alumno, index) {
        return `
          <tr>
            <td>${index + 1}</td>
            <td>${alumno.nombre}</td>
            <td>${alumno.apellido}</td>
            <td>${alumno.email}</td>
            <td>${alumno.edad}</td>
            <td>${alumno.carrera}</td>
            <td>
              <button class="boton-mini" data-id="${alumno.id}">Eliminar</button>
            </td>
          </tr>
        `;
      },
      badgeTexto(total) {
        if (total === 1) return "1 estudiante";
        return `${total} estudiantes`;
      },
    };

    const utils = {
      resetForm() {
        htmlElements.form.reset();
        htmlElements.edad.value = "18";
      },
      emailValido(valor) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(valor);
      },
      pintarTabla() {
        const { lista, badge } = htmlElements;
        const { alumnos } = state;

        lista.innerHTML = "";

        if (alumnos.length === 0) {
          lista.innerHTML = templates.filaVacia();
        } else {
          alumnos.forEach((alumno, index) => {
            lista.innerHTML += templates.filaAlumno(alumno, index);
          });
        }

        badge.textContent = templates.badgeTexto(alumnos.length);
      },
    };

    const handlers = {
      onFormSubmit(e) {
        e.preventDefault();

        if (!htmlElements.form.reportValidity()) return;

        const n = htmlElements.nombre.value.trim();
        const ap = htmlElements.apellido.value.trim();
        const em = htmlElements.email.value.trim();
        const ed = parseInt(htmlElements.edad.value, 10);
        const ca = htmlElements.carrera.value;

        if (!utils.emailValido(em)) {
          alert("Por favor escribe un email válido.");
          return;
        }

        if (isNaN(ed) || ed < 18 || ed > 100) {
          alert("La edad debe estar entre 18 y 100.");
          return;
        }

        if (!ca) {
          alert("Selecciona una carrera.");
          return;
        }

        state.alumnos.push({
          id: state.uid++,
          nombre: n,
          apellido: ap,
          email: em,
          edad: ed,
          carrera: ca,
        });

        utils.pintarTabla();
        utils.resetForm();
      },

      onListaClick(e) {
        const boton = e.target.closest("button[data-id]");
        if (!boton) return;

        const id = Number(boton.getAttribute("data-id"));
        state.alumnos = state.alumnos.filter((a) => a.id !== id);
        utils.pintarTabla();
      },

      onBtnLimpiarClick() {
        utils.resetForm();
      },

      onBtnBorrarTodoClick() {
        if (state.alumnos.length === 0) return;

        const ok = confirm("¿Borrar todos los estudiantes?");
        if (!ok) return;

        state.alumnos = [];
        utils.pintarTabla();
      },
    };

    return {
      init() {
        htmlElements.form.addEventListener("submit", handlers.onFormSubmit);
        htmlElements.lista.addEventListener("click", handlers.onListaClick);
        htmlElements.btnLimpiar.addEventListener("click", handlers.onBtnLimpiarClick);
        htmlElements.btnBorrarTodo.addEventListener("click", handlers.onBtnBorrarTodoClick);

        utils.pintarTabla();
      },
    };
  })();

  App.init();
})();
