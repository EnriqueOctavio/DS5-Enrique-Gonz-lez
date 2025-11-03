let alumnos = [];
let uid = 1;

const form = document.getElementById("form-estudiante");
const nombre = document.getElementById("nombre");
const apellido = document.getElementById("apellido");
const email = document.getElementById("email");
const edad = document.getElementById("edad");
const carrera = document.getElementById("carrera");
const lista = document.getElementById("lista");
const badge = document.getElementById("badge");
const btnLimpiar = document.getElementById("btn-limpiar");
const btnBorrarTodo = document.getElementById("btn-borrar-todo");

function resetForm(){
  form.reset();
  edad.value = "18";
  nombre.focus();
}

function pintar(){
  lista.innerHTML = "";
  if(alumnos.length === 0){
    const tr = document.createElement("tr");
    tr.className = "vacio";
    const td = document.createElement("td");
    td.colSpan = 7;
    td.textContent = "No hay resultados.";
    tr.appendChild(td);
    lista.appendChild(tr);
  }else{
    alumnos.forEach((a,i)=>{
      const tr = document.createElement("tr");
      tr.innerHTML = `
        <td>${i+1}</td>
        <td>${a.nombre}</td>
        <td>${a.apellido}</td>
        <td>${a.email}</td>
        <td>${a.edad}</td>
        <td>${a.carrera}</td>
        <td><button class="boton-mini" data-id="${a.id}">Eliminar</button></td>
      `;
      lista.appendChild(tr);
    });
  }
  const n = alumnos.length;
  badge.textContent = n === 1 ? "1 estudiante" : `${n} estudiantes`;
}

function emailValido(v){
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
}

form.addEventListener("submit", function(e){
  e.preventDefault();
  if(!form.reportValidity()) return;

  const n = nombre.value.trim();
  const ap = apellido.value.trim();
  const em = email.value.trim();
  const ed = parseInt(edad.value,10);
  const ca = carrera.value;

  if(!emailValido(em)){ alert("Por favor escribe un email válido."); return; }
  if(isNaN(ed) || ed < 18 || ed > 100){ alert("La edad debe estar entre 18 y 100."); return; }
  if(!ca){ alert("Selecciona una carrera."); return; }

  alumnos.push({ id: uid++, nombre: n, apellido: ap, email: em, edad: ed, carrera: ca });
  pintar();
  resetForm();
});

btnLimpiar.addEventListener("click", resetForm);

lista.addEventListener("click", function(e){
  if(e.target.matches("button[data-id]")){
    const id = Number(e.target.getAttribute("data-id"));
    alumnos = alumnos.filter(a => a.id !== id);
    pintar();
  }
});

btnBorrarTodo.addEventListener("click", function(){
  if(alumnos.length === 0) return;
  const ok = confirm("¿Borrar todos los estudiantes?");
  if(!ok) return;
  alumnos = [];
  pintar();
});

pintar();
