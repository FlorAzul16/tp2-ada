var local = {
    vendedoras: ["Ada", "Grace", "Hedy", "Sheryl"],
  
    ventas: [
      { fecha: new Date(2019, 1, 4), nombreVendedora: "Grace", componentes: ["Monitor GPRS 3000", "Motherboard ASUS 1500"] },
      { fecha: new Date(2019, 0, 1), nombreVendedora: "Ada", componentes: ["Monitor GPRS 3000", "Motherboard ASUS 1500"] },
      { fecha: new Date(2019, 0, 2), nombreVendedora: "Grace", componentes: ["Monitor ASC 543", "Motherboard MZI"] },
      { fecha: new Date(2019, 0, 10), nombreVendedora: "Ada", componentes: ["Monitor ASC 543", "Motherboard ASUS 1200"] },
      { fecha: new Date(2019, 0, 12), nombreVendedora: "Grace", componentes: ["Monitor GPRS 3000", "Motherboard ASUS 1200"] }
    ],
  
    precios: [
      { componente: "Monitor GPRS 3000", precio: 200 },
      { componente: "Motherboard ASUS 1500", precio: 120 },
      { componente: "Monitor ASC 543", precio: 250 },
      { componente: "Motherboard ASUS 1200", precio: 100 },
      { componente: "Motherboard MZI", precio: 30 },
      { componente: "HDD Toyiva", precio: 90 },
      { componente: "HDD Wezter Dishital", precio: 75 },
      { componente: "RAM Quinston", precio: 110 },
      { componente: "RAM Quinston Fury", precio: 230 }
    ]
};

// PARTE 1

// 1_

const precioMaquina = (componentes) => {
  let sumar = 0;
  componentes.forEach(componente => {
    for(let i = 0; i < local.precios.length; i++){
      if(local.precios[i].componente === componente){
        sumar += local.precios[i].precio;
      }
    }
  });
  return sumar;
};

console.log( precioMaquina(["Monitor GPRS 3000", "Motherboard ASUS 1500"]) );
// 320 ($200 del monitor + $120 del motherboard)

// 2_ 

const cantidadVentasComponente = (componente) => {
  let cantidad = 0;
  local.ventas.forEach(venta => {
    if(venta.componentes.includes(componente)){
      cantidad += 1;
    }
  });
  return cantidad
}
console.log(cantidadVentasComponente("Monitor ASC 543")); // 2

// 3_

const vendedoraDelMes = (mes,anio) => {
  let nombreVendedora = "";
  let acumularVentas = [];
  let acumulador = 0;
 
  for (let venta of local.ventas) {
    let mesVentas = venta.fecha.getMonth() + 1;
    let anioVentas = venta.fecha.getFullYear();
    if (mes === mesVentas && anio === anioVentas) {
      acumularVentas.push(venta);
    }
  }

  for (let venta of acumularVentas) {
    let valor = precioMaquina(venta.componentes)
    if (valor > acumulador) {
      acumulador += valor;
      nombreVendedora = venta.nombreVendedora;
    }
  }
  return nombreVendedora;
}

console.log( vendedoraDelMes(1, 2019) ); 
// "Ada" (vendio por $670, una máquina de $320 y otra de $350)

// 4_

const ventasMes = (mes,anio) => {
  let acumulador = 0;

  for (let venta of local.ventas) {
    let mesVentas = venta.fecha.getMonth() + 1;
    let anioVentas = venta.fecha.getFullYear();
    let valor = precioMaquina(venta.componentes)
    if (mes === mesVentas && anio === anioVentas) {
      acumulador += valor;
    }
  }
  return acumulador;
}

console.log( ventasMes(1, 2019) ); // 1250

// 5_

const ventasVendedora = (nombre) => {
  let acumuladorVentas = 0;

  for (let venta of local.ventas) {
    let valor = precioMaquina(venta.componentes)
    if (nombre === venta.nombreVendedora) {
      acumuladorVentas += valor;
    }
  }
  return acumuladorVentas;
}

console.log( ventasVendedora("Grace") ); // 900

// 6_

const componenteMasVendido = () => {
  let componentesVendidos = [];
  let acumulador = 0;
  for (let venta of local.ventas) {
    for (i = 0; i < venta.componentes.length; i++) {
      if (!componentesVendidos.includes(venta.componentes[i])) {
        componentesVendidos.push(venta.componentes[i])
      }
    }
  }
  for (i=0; i < componentesVendidos.length; i++) {
    let cantidadDeVentas = cantidadVentasComponente(componentesVendidos[i]);
    if (cantidadDeVentas > acumulador) {
      acumulador = componentesVendidos[i];
    }
  }
  return acumulador;
}

console.log(componenteMasVendido()); // Monitor GPRS 3000

// 7_ 

const huboVentas = (mes, anio) => {

  for (let venta of local.ventas) {
    let mesVentas = venta.fecha.getMonth() + 1;
    let anioVentas = venta.fecha.getFullYear();
    if (mes === mesVentas && anio === anioVentas) {
      return true
    }
  }
  return false;
}

console.log( huboVentas(1, 2019) ); // false

// PARTE 2 

//- En las ventas ya existentes, tenemos que agregar la propiedad sucursal con el 
//valor Centro (ya que es la sucursal original).

for (venta of local.ventas) {
  venta.sucursal = "Centro";
}

//- Agregar al objeto principal la propiedad sucursales: ['Centro', 'Caballito']

local.sucursales = ["Centro", "Caballito"];

//- Cargar la siguiente información en el array ventas, creando sus respectivos objetos
//siguiendo el patrón: fecha, nombreVendedora, componentes, sucursal. 

local.ventas.push(
  { fecha: new Date(2019, 1, 12), nombreVendedora: "Hedy", componentes: ["Monitor GPRS 3000", "HDD Toyiva"], sucursal: "Centro" },
  { fecha: new Date(2019, 1, 24), nombreVendedora: "Sheryl", componentes: ["Motherboard ASUS 1500", "HDD Wezter Dishital"], sucursal: "Caballito" },
  { fecha: new Date(2019, 1, 1), nombreVendedora: "Ada", componentes: ["Motherboard MZI", "RAM Quinston Fury"], sucursal: "Centro" },
  { fecha: new Date(2019, 1, 11), nombreVendedora: "Grace", componentes: ["Monitor ASC 543", "RAM Quinston"], sucursal: "Caballito" },
  { fecha: new Date(2019, 1, 15), nombreVendedora: "Ada", componentes: ["Motherboard ASUS 1200", "RAM Quinston Fury"], sucursal: "Centro" },
  { fecha: new Date(2019, 1, 12), nombreVendedora: "Hedy", componentes: ["Motherboard ASUS 1500", "HDD Toyiva"], sucursal: "Caballito" },
  { fecha: new Date(2019, 1, 21), nombreVendedora: "Grace", componentes: ["Motherboard MZI", "RAM Quinston"], sucursal: "Centro" },
  { fecha: new Date(2019, 1, 8), nombreVendedora: "Sheryl", componentes: ["Monitor ASC 543", "HDD Wezter Dishital"], sucursal: "Centro"  },
  { fecha: new Date(2019, 1, 16), nombreVendedora: "Sheryl", componentes: ["Monitor GPRS 3000", "RAM Quinston Fury"], sucursal: "Centro"  },
  { fecha: new Date(2019, 1, 27), nombreVendedora: "Hedy", componentes: ["Motherboard ASUS 1200", "HDD Toyiva"], sucursal: "Caballito" },
  { fecha: new Date(2019, 1, 22), nombreVendedora: "Grace", componentes: ["Monitor ASC 543", "HDD Wezter Dishital"], sucursal: "Centro"  },
  { fecha: new Date(2019, 1, 5), nombreVendedora: "Ada", componentes: ["Motherboard ASUS 1500", "RAM Quinston"], sucursal: "Centro"  },
  { fecha: new Date(2019, 1, 1), nombreVendedora: "Grace", componentes: ["Motherboard MZI", "HDD Wezter Dishital"], sucursal: "Centro"  },
  { fecha: new Date(2019, 1, 7), nombreVendedora: "Sheryl", componentes: ["Monitor GPRS 3000", "RAM Quinston"], sucursal: "Caballito" },
  { fecha: new Date(2019, 1, 14), nombreVendedora: "Ada", componentes: ["Motherboard ASUS 1200", "HDD Toyiva"], sucursal: "Centro"  },
)
//console.log(local);

// 1_

const ventasSucursal = (nombreSucursal) => {
  let acumuladorVentas = 0;

  for (let venta of local.ventas) {
    let valor = precioMaquina(venta.componentes)
    if (nombreSucursal === venta.sucursal) {
      acumuladorVentas += valor;
    }
  }
  return acumuladorVentas;
}

console.log( ventasSucursal("Centro") ); // 4195


// 2_ 

const ventaLocales = (nombre) => {
  let acumuladorVentas = 0;

  for (let venta of local.ventas) {
    let valor = precioMaquina(venta.componentes);
    if (nombre === venta.sucursal || nombre === venta.nombreVendedora) {
      acumuladorVentas += valor;
    }
  }
  return `El valor de las ventas totales de ${nombre} es ${acumuladorVentas}`;
}

console.log(ventaLocales("Centro"));

// 3_

const sucursalDelMes =  (mes, anio) => {
  let acumuladorVentas = 0;
  let nombreSucursal = "";
  let acumularVentas = [];


  for (let venta of local.ventas) {
    let ventasDelMes = huboVentas(mes,anio);
    if (ventasDelMes === true) {
      acumularVentas.push(venta);
    }
  }

  for (let venta of acumularVentas) {
    let valor = precioMaquina(venta.componentes)
    if (valor > acumuladorVentas) {
      acumuladorVentas += valor;
      nombreSucursal = venta.sucursal;
    }
  }
  return nombreSucursal;
}

console.log( sucursalDelMes(1, 2019) ); // "Centro"

//PARTE 3

// 1_ 

const renderPorMes = () => {

  let ventasPorMes = {};
  let ventasOrdenadas = local.ventas.sort((a, b) => {
    return a.fecha - b.fecha
  })

  for(venta of ventasOrdenadas){
    ventasPorMes[venta.fecha.getMonth()] = ventasMes(venta.fecha.getMonth() + 1, venta.fecha.getFullYear())
  }
  //console.log(venta);

  let mostrar = "Ventas por mes: \n";
  //mes es la propiedad
  for(let mes in ventasPorMes) {

    const nombreMes = [
        "enero",
        "febrero",
        "marzo",
        "abril",
        "mayo",
        "junio",
        "julio",
        "agosto",
        "septiembre",
        "octubre",
        "noviembre",
        "diciembre"
      ];

    mostrar += `Total de ${nombreMes[mes]}: ${ventasPorMes[mes]} pesos\n`;
  }
  return mostrar;
}
console.log(renderPorMes());
// Ventas por mes:
//   Total de enero 2019: 1250
//   Total de febrero 2019: 4210

// 2_ 

const renderPorSucursal = () => {
  let ventasPorSucursal = {};
  let mostrar = "Ventas por sucursal: \n";

  for (let venta of local.ventas) {
    ventasPorSucursal[venta.sucursal] = ventasSucursal(venta.sucursal);
  }

  for (prop in ventasPorSucursal) {
    mostrar += `En la sucursal ${prop} se vendieron ${ventasPorSucursal[prop]} pesos \n`;
  }

  return mostrar
}

console.log(renderPorSucursal());

// Ventas por sucursal:
//  Total de Centro: 4195
//  Total de Caballito: 1265

// 3_ 

const render = () => {
    const mostrar = "Reporte: \n"
    let nombreVendedora = "";
    let acumulador = 0;

    for (let venta of local.ventas) {

        let valor = precioMaquina(venta.componentes)
        if (valor > acumulador) {
            acumulador += valor;
            nombreVendedora = venta.nombreVendedora;
        }

        let renderMes = renderPorMes(venta);
        let renderSucursal = renderPorSucursal(venta.sucursal);
        let productoEstrella = componenteMasVendido(venta.componentes);
        let vendedora = nombreVendedora;


        return mostrar + `${renderMes}${renderSucursal}Producto estrella: ${productoEstrella} \nVendedora que más ingresos generó: ${vendedora}`;
    }
}

console.log(render());

// Reporte
// Ventas por mes:
//   Total de enero 2019: 1250
//   Total de febrero 2019: 4210
// Ventas por sucursal:
//   Total de Centro: 4195
//   Total de Caballito: 1265
// Producto estrella: Monitor GPRS 3000
// Vendedora que más ingresos generó: Grace