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

const listadoServicios = [
  {
    id: 1,
    tipoServicio: "Curso",
    turno: "Noche",
    precio: 1500,
    exentoIva: "no",
    src: "https://simiperrohablara.com/wp-content/uploads/2017/04/SMPH_Cursos_Cabecera_03-2-1.png",
  },
  {
    id: 2,
    tipoServicio: "Paseo",
    turno: "Mañana",
    precio: 2000,
    exentoIva: "no",
    src: "https://t1.ea.ltmcdn.com/es/images/6/1/2/img_pasear_al_perro_antes_o_despues_de_comer_22216_orig.jpg",
  },
  {
    id: 3,
    tipoServicio: "Adiestramiento",
    turno: "Tarde",
    precio: 3000,
    exentoIva: "si",
    src: "https://live.hsmob.io/storage/images/wakyma.com/wakyma.com_problemas-durante-el-adiestramiento-canino-1.jpg",
  },
];

let carrito = [];

document.addEventListener("DOMContentLoaded", () => {
  if (localStorage.getItem("carrito")) {
    carrito = JSON.parse(localStorage.getItem("carrito"));
    mostrarCarrito();
  }
});

const borrarCarrito = (id) => {
  carrito = carrito.filter((item) => item.id != id);
  localStorage.setItem("carrito", carrito);
  mostrarCarrito();
};

const mostrarCarrito = () => {
  const itemsCarrito = document.getElementById("itemsCarrito");
  itemsCarrito.innerHTML = "";

  for (const item of carrito) {
    const elemTipoServicio = document.createElement("p");
    elemTipoServicio.innerHTML = `Servicio: ${item.tipoServicio}`;

    const elemTurno = document.createElement("p");
    elemTurno.innerHTML = `Turno:  ${item.turno}`;

    const elemPrecio = document.createElement("p");
    elemPrecio.innerHTML = `Precio: ${item.precio}`;

    const elemCantidad = document.createElement("p");
    elemCantidad.innerHTML = `Cantidad: ${item.cantidad}`;

    const elemImagen = document.createElement("img");
    elemImagen.src = item.src;
    elemImagen.width = 300;

    const boton = document.createElement("button");
    boton.innerHTML = "Borrar";
    boton.onclick = () => {
      borrarCarrito(item.id);
    };

    const contenedor = document.createElement("div");
    contenedor.style =
      "border: 1px solid black; width: 450px; margin: 4px auto;";
    contenedor.appendChild(elemTipoServicio);
    contenedor.appendChild(elemTurno);
    contenedor.appendChild(elemPrecio);
    contenedor.appendChild(elemCantidad);
    contenedor.appendChild(elemImagen);
    contenedor.appendChild(boton);

    itemsCarrito.appendChild(contenedor);
  }
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
};

const listaItems = document.getElementById("listadoServ");

for (const servicio of listadoServicios) {
  const elemTipoServicio = document.createElement("p");
  elemTipoServicio.innerHTML = `Servicio: ${servicio.tipoServicio}`;

  const elemTurno = document.createElement("p");
  elemTurno.innerHTML = `Turno:  ${servicio.turno}`;

  const elemPrecio = document.createElement("p");
  elemPrecio.innerHTML = `Precio: ${servicio.precio}`;

  const elemImagen = document.createElement("img");
  elemImagen.src = servicio.src;
  elemImagen.width = 300;

  const boton = document.createElement("button");
  boton.innerHTML = "Agregar al carrito";
  boton.onclick = () => {
    agregarAlCarrito(servicio);
  };

  const contenedor = document.createElement("div");
  contenedor.style = "border: 1px solid black; width: 450px; margin: 4px auto;";
  contenedor.appendChild(elemTipoServicio);
  contenedor.appendChild(elemTurno);
  contenedor.appendChild(elemPrecio);
  contenedor.appendChild(elemImagen);
  contenedor.appendChild(boton);

  listaItems.appendChild(contenedor);
}
