class ServicioCanino {
    constructor(turno, precio, esExtento, tipo) {
      this.turno = turno;
      this.precio = precio;
      this.esExtento = esExtento;
      this.tipo = tipo;
    }
  
    sumarIva() {
      if (this.esExtento.toLowerCase() == "si") {
        this.precio = this.precio * 1.21;
      }
    }

    aplicarDescuento(codigo){
        if (codigo.toUpperCase() == "EDUCAN21")
        {
            this.precio = this.precio / 1.25;
        }
    }
  
    imprimir() {
      alert(
        `Se ha impreso la información del ${this.tipo}, puede ir a la consola para ver la información`
      );
      console.log(`=========== SERVICIO CANINO: ${this.tipo.toUpperCase()}  ==========`);
      console.log(`El precio con IVA (si no está exento) es: ${this.precio}`);
      console.log(`El turno en que se prestará el servicio: ${this.turno}`);
      console.log(`=====================================================`);
    }
  }

  alert(
    `Carrito de compras(beta):
    Inicialmente este programa solo recibe items y calcula el IVA de los mismos.
    En las proximas pantallas podrá  calcular el precio final de un servivio con el IVA`
  );

alert(
    `Por usar nuestra app en version beta, te regalamos un codigo de DESCUENTO!!! 
    ingresa EDUCAN21`
)

 
  let tipoServicio = prompt("Indique el tipo de servicio: (Curso/Paseo/Adiestramiento)");
  let turno = prompt("Indique el turno en que se prestará el servicio: (Mañana/Tarde/Noche)");
  let precio = parseInt(prompt("Indique el precio del sercicio: "));
  let esExento = prompt(
    "¿El servicio lleva IVA? (indique 'si' o 'no')"
  );

  let codigoDescuento = prompt("Si tienes codigo de descuento, escribelo aqui:  ");

  const servicio = new ServicioCanino(turno, precio, esExento, tipoServicio);
  servicio.aplicarDescuento(codigoDescuento);


  servicio.sumarIva();
  servicio.imprimir();
  
