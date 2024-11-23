// Variable global para la suma total
let sumaTotal = 0;

// Objeto para almacenar los gastos por categoría
let gastosPorCategoria = {
    alimentacion: 0,
    alquiler: 0,
    transporte: 0,
    entretenimiento: 0
};

function agregarLista() {
    let tipoGasto = document.getElementById("tipo");
    let descripcionTipo = document.getElementById("descripcion");
    let cantidadMonto = document.getElementById("Monto");

    // Validaciones
    if (tipoGasto.value.trim() === "" || descripcionTipo.value.trim() === "" || !isNaN(descripcionTipo.value)) {
        alert("Digite un valor válido, no puede ser solo números ni tampoco espacios en blanco");
        return;
    }

    if (cantidadMonto.value.trim() === "" || isNaN(cantidadMonto.value)) {
        alert("Digite un monto válido, no puede dejar espacios en blanco y tampoco permite letras");
        return;
    }

    let lista = document.getElementById("lista");
    let grupo = document.createElement("div");
    grupo.classList.add("grupo");

    /*--------------------------------------------creacion de elemntos li tio, descrip y monto-------------------------------------------------------*/
    if (tipoGasto.value.trim() !== "") {
        let resultadoTipo = document.createElement("li");
        resultadoTipo.textContent = tipoGasto.value;
        grupo.appendChild(resultadoTipo);
    }

    if (descripcionTipo.value.trim() !== "") {
        let resultadoDescripcion = document.createElement("li");
        resultadoDescripcion.textContent = descripcionTipo.value;
        grupo.appendChild(resultadoDescripcion);
    }

    let monto = parseFloat(cantidadMonto.value); // variable para convertir el monto a numero

    let resultadoMonto = document.createElement("li");
    resultadoMonto.textContent = monto.toFixed(2);
    grupo.setAttribute("data-monto", monto.toString()); //se guardca el monto como un string dt-* es una manera de almacenar elementos personalizados del html
    grupo.appendChild(resultadoMonto);

    // Actualizar el contador de la categoría
    if (tipoGasto.value in gastosPorCategoria) {
        gastosPorCategoria[tipoGasto.value] += monto;
    } else {
        alert("Categoría no válida.");
    }

    // Agrega el monto a la suma total
    actualizarSuma(monto, "agregar");

    // Crear el btnn "Eliminar"
    let botonEliminar = document.createElement("button");
    botonEliminar.textContent = "Eliminar";
    botonEliminar.classList.add("btn", "btn-danger", "btn-sm", "ms-3");

    botonEliminar.onclick = function () {
        let montoGrupo = parseFloat(grupo.getAttribute("data-monto"));
        let categoria = grupo.querySelector("li").textContent.trim(); 

        if (montoGrupo && categoria in gastosPorCategoria) {
            
            gastosPorCategoria[categoria] -= montoGrupo; // Resto el gasto de la categoría

            actualizarSuma(montoGrupo, "eliminar");
            mostrarPorcentajes();
        }

        grupo.remove();
    };

    grupo.appendChild(botonEliminar);
    lista.appendChild(grupo);

    limpiar(descripcionTipo, cantidadMonto);

    // Mostrar los porcentajes actualizados
    mostrarPorcentajes();
}

function actualizarSuma(monto, accion) {
    if (accion === "agregar") {
        sumaTotal += monto;
    } else if (accion === "eliminar") {
        sumaTotal -= monto;
    }

    const mostrarSuma = document.getElementById("mostrarSuma");
    mostrarSuma.textContent = `Suma Total: ${sumaTotal.toFixed(4)}`;
}

function mostrarPorcentajes() {
    const porcentajeDiv = document.getElementById("porcentajes");
    porcentajeDiv.innerHTML = ""; 

    for (let categoria in gastosPorCategoria) {
        let porcentaje = (gastosPorCategoria[categoria] / sumaTotal) * 100 || 0; /* aqui agarro el objeto especifico y cuantas veces fue seleecionado lo divido por la sumatotal y lo multiplico por 100 para que se haga porciento y con el 0 lo que hago es que si el resultado no es un numero valido entonces se establece como 0 */
        let p = document.createElement("p");
        p.textContent = `Categoría ${categoria}: ${porcentaje.toFixed(2)}%`;
        porcentajeDiv.appendChild(p);
    }
}

function limpiar(descripcionTipo, cantidadMonto) {
    // Limpiar los campos
    descripcionTipo.value = "";
    cantidadMonto.value = "";
}

function limpiarInputs() {
    let inputs = document.querySelectorAll("input[type='text']");
    let tipo = document.querySelectorAll("select");

    for (let i = 0; i < tipo.length; i++) {
        tipo[i].selectedIndex = 0;
    }

    for (let i = 0; i < inputs.length; i++) {
        inputs[i].value = "";
    }
}
