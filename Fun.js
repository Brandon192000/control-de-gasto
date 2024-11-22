// Variable global para la suma total
let sumaTotal = 0;

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


    if (tipoGasto.value.trim() !== "") {
        let resultadoTipo = document.createElement("li");
        resultadoTipo.textContent = tipoGasto.value;

        // Btn Eliminar
        let botonEliminar = document.createElement("button");
        botonEliminar.textContent = "Eliminar";
        botonEliminar.classList.add("btn", "btn-danger", "btn-sm", "ms-3");
        botonEliminar.onclick = function () {
            resultadoTipo.remove();
        };

        resultadoTipo.appendChild(botonEliminar);
        grupo.appendChild(resultadoTipo);
    }

    
    if (descripcionTipo.value.trim() !== "") {
        let resultadoDescripcion = document.createElement("li");
        resultadoDescripcion.textContent = descripcionTipo.value;

        // Btn Eliminar
        let botonEliminar = document.createElement("button");
        botonEliminar.textContent = "Eliminar";
        botonEliminar.classList.add("btn", "btn-danger", "btn-sm", "ms-3");
        botonEliminar.onclick = function () {
            resultadoDescripcion.remove();
        };

        resultadoDescripcion.appendChild(botonEliminar);
        grupo.appendChild(resultadoDescripcion);

        console.log(resultadoDescripcion)
    }

    
    if (cantidadMonto.value.trim() !== "") {
        let monto = parseFloat(cantidadMonto.value);

        if (!isNaN(monto)) {
            let resultadoMonto = document.createElement("li");
            resultadoMonto.textContent = monto;

            // Btn Eliminar
            let botonEliminar = document.createElement("button");
            botonEliminar.textContent = "Eliminar";
            botonEliminar.classList.add("btn", "btn-danger", "btn-sm", "ms-3");
            botonEliminar.onclick = function () {
                actualizarSuma(monto, "eliminar");
                resultadoMonto.remove();
                console.log(resultadoMonto);
            };

            resultadoMonto.appendChild(botonEliminar);
            grupo.appendChild(resultadoMonto);

            // Llama a la función para sumar el monto
            actualizarSuma(monto, "agregar");
            
        } else {
            alert("Por favor, ingrese un número válido.");
        }
    }

    // Agregar el grupo a la lista
    lista.appendChild(grupo);
    console.log(grupo);

    // Limpiar los campos
    descripcionTipo.value = "";
    cantidadMonto.value = "";
}


function actualizarSuma(monto, suma) {

    if (suma === "agregar") {
        sumaTotal += monto;
    } else if (suma === "eliminar") {
        sumaTotal -= monto;
    }
    //muestra la suma total
    const mostrarSuma = document.getElementById("mostrarSuma");
    console.log(mostrarSuma);
    mostrarSuma.textContent = `Suma Total: ${sumaTotal.toFixed(4)}`;
    

}

console.log(sumaTotal)