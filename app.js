// Variables globales
let cantidadItems = 0;
let totalAcumulado = 0;

// Selectores
const botonesAgregar = document.querySelectorAll(".btn-agregar");
const listaCarrito = document.querySelector("#lista-carrito");
const badge = document.querySelector("#badge");
const total = document.querySelector("#total");
const btnVaciar = document.querySelector("#btn-vaciar");
const msgVacio = document.querySelector("#msg-vacio");

// Eventos para agregar productos
botonesAgregar.forEach((boton) => {
  boton.addEventListener("click", () => {
    const nombre = boton.dataset.nombre;
    const precio = Number(boton.dataset.precio);

    agregarAlCarrito(nombre, precio);
  });
});

// Función agregar
function agregarAlCarrito(nombre, precio) {
  msgVacio.style.display = "none";

  const li = document.createElement("li");

  li.classList.add(
    "list-group-item",
    "d-flex",
    "justify-content-between",
    "align-items-center",
  );

  li.innerHTML = `
        <span>${nombre} - $${precio}</span>
        <button class="btn-eliminar">✕</button>
    `;

  listaCarrito.appendChild(li);

  cantidadItems++;
  totalAcumulado += precio;

  updateBadge();
  updateTotal();

  const btnEliminar = li.querySelector(".btn-eliminar");

  btnEliminar.addEventListener("click", () => {
    eliminarItem(li, precio);
  });
}

// Función eliminar
function eliminarItem(li, precio) {
  li.remove();

  totalAcumulado -= precio;
  cantidadItems--;

  updateTotal();
  updateBadge();

  verificarCarritoVacio();
}

// Actualizar badge
function updateBadge() {
  badge.textContent = cantidadItems;
}

// Actualizar total
function updateTotal() {
  total.textContent =
    "$" +
    totalAcumulado.toLocaleString("es-CR", {
      minimumFractionDigits: 2,
    });
}

// Verificar si el carrito quedó vacío
function verificarCarritoVacio() {
  const items = listaCarrito.querySelectorAll("li:not(#msg-vacio)");

  if (items.length === 0) {
    msgVacio.style.display = "block";
  }
}

// Vaciar carrito
btnVaciar.addEventListener("click", () => {
  listaCarrito
    .querySelectorAll("li:not(#msg-vacio)")
    .forEach((li) => li.remove());

  cantidadItems = 0;
  totalAcumulado = 0;

  updateBadge();
  updateTotal();

  msgVacio.style.display = "block";
});
