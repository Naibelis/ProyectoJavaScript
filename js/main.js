class ServicioCanino {
  constructor(id, tipoServicio, turno, precio, exentoIva, src, cantidad) {
    this.id = id;
    this.tipoServicio = tipoServicio;
    this.turno = turno;
    this.precio = precio;
    this.exentoIva = exentoIva;
    this.src = src;
    this.cantidad = cantidad;
  }

  sumarIva() {
    if (this.exentoIva.toLowerCase() == "si") {
      this.precio = this.precio * 1.21;
    }
  }

  aplicarDescuento(codigo) {
    if (codigo.toUpperCase() == "EDUCAN21") {
      this.precio = this.precio / 1.25;
    }
  }
}

let serviciosDir = "https://naibelis.github.io/ProyectoJavaScript/data/servicios.json";

let carrito = [];

document.addEventListener("DOMContentLoaded", () => {
  if (localStorage.getItem("carrito")) {
    carrito = JSON.parse(localStorage.getItem("carrito"));
    mostrarCarrito();
  }
});

const borrarCarrito = (id) => {
  carrito = carrito.filter((item) => item.id != id);
  console.log({ carrito });
  localStorage.setItem("carrito", JSON.stringify(carrito));
  mostrarCarrito();
  $("#itemEliminadoNotif").fadeIn("fast").delay(1500).fadeOut("fast");
};

const mostrarCarrito = () => {
  $("#itemsCarrito").html("");
  let cantidadTotal = 0;
  let costoTotal = 0;

  for (const item of carrito) {
    cantidadTotal += item.cantidad;
    costoTotal += item.precio * item.cantidad;

    let card = $(`
    <div class="shadow-sm card mx-auto my-3" style="width: 18rem;">
      <img class="card-img-top" src='${item.src}' alt="Card image cap">
      <h5 class="card-header">
        ${item.tipoServicio}
      </h5>
      <div class="card-body">
        <p class="card-text">Turno:  ${item.turno}</p>
        <p class="card-text">Precio: $${item.precio}</p>
        <div class="dropdown-divider"></div>
        <p class="card-text">Cantidad: ${item.cantidad}</p>
        <button class="btn btn-danger">
          Borrar
        </button>
      </div>
    </div>
    `);

    card.find(".btn").click((e) => {
      e.preventDefault();
      borrarCarrito(item.id);
    });
    $("#itemsCarrito").append(card);
  }

  $("#cantidadItems").html(cantidadTotal);
  $("#costoTotal").html(costoTotal);
};

const agregarAlCarrito = (servicio) => {
  let encontrado = false;

  carrito = carrito.map((item) => {
    if (item.id == servicio.id) {
      encontrado = true;
      let actualizado = new ServicioCanino(
        item.id,
        item.tipoServicio,
        item.turno,
        item.precio,
        item.exentoIva,
        item.src,
        parseInt(item.cantidad) + 1
      );
      return actualizado;
    } else {
      return item;
    }
  });

  if (!encontrado) {
    let itemCarrito = new ServicioCanino(
      servicio.id,
      servicio.tipoServicio,
      servicio.turno,
      servicio.precio,
      servicio.exentoIva,
      servicio.src,
      1
    );

    carrito.push(itemCarrito);
  }

  mostrarCarrito();
  localStorage.setItem("carrito", JSON.stringify(carrito));
  $("#itemAgregadoNotif").fadeIn("fast").delay(1500).fadeOut("fast");
};

$.getJSON(serviciosDir, function (res, textStatus) {
  let listadoServicios = [];
  if (textStatus == "success") {
    listadoServicios = res.items;
  }

  for (const servicio of listadoServicios) {
    let card = $(`
      <div class="shadow-sm card mx-auto my-3" style="width: 18rem;">
        <img class="card-img-top" src='${servicio.src}' alt="Card image cap">
        <h5 class="card-header">
          ${servicio.tipoServicio}
        </h5>
        <div class="card-body">
          <p class="card-text">Turno:  ${servicio.turno}</p>
          <p class="card-text">Precio: $${servicio.precio}</p>
          <div class="dropdown-divider"></div>
          <button class="btn bg-info text-white">
            Agregar al carrito
          </button>
        </div>
      </div>
    `);
    console.log({ servicio });

    card.find(".btn").click((e) => {
      e.preventDefault();
      agregarAlCarrito(servicio);
    });
    $("#listadoServ").append(card);
  }
});

$("#botonComprar").on("click", (e) => {
  e.preventDefault();
  $("#compradoNotif").fadeIn("fast").delay(1500).fadeOut("fast");
});

$("#registrar").on("click", (e) => {
  e.preventDefault();
  const datos = {
    nombre: $("#nombre").val(),
    apellido: $("#apellido").val(),
    email: $("#email").val(),
  };
  console.log({ datos });

  localStorage.setItem("datos", JSON.stringify(datos));

  $("#mensajeInvitacion").hide();
  $("#nombreUsuario").html(`${datos.nombre} ${datos.apellido}`);
  $("#mensajeBienvenida").show();

  $("#cerrar").click();
});
