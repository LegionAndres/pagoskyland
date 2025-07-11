// Función para manejar el envío del formulario
document.getElementById('personaForm').addEventListener('submit', function(event) {
    event.preventDefault();  // Evitar el comportamiento por defecto del formulario

    // Obtener los valores del formulario
    const nombre = document.getElementById('nombre').value;
    const estadoAsistencia = document.getElementById('estadoAsistencia').value;
    const estadoPago = document.getElementById('estadoPago').value;
    const cantidadPago = document.getElementById('cantidadPago').value;
    const monedaPago = document.getElementById('monedaPago').value;
    const tipoCambio = document.getElementById('tipoCambio').value;

    // Verificar que la cantidad de pago no esté vacía o inválida
    if (cantidadPago === "" || isNaN(cantidadPago) || tipoCambio === "" || isNaN(tipoCambio)) {
        alert("Por favor ingresa una cantidad y tipo de cambio válidos.");
        return;
    }

    // Realizar la conversión automática si el tipo de cambio es válido
    let equivalencia = 0;
    let monedaEquivalente = '';
    
    if (monedaPago === "Dolares") {
        // Si el pago es en Dólares, calcular el equivalente en Bolívares
        equivalencia = cantidadPago * tipoCambio;
        monedaEquivalente = "Bolívares";
    } else if (monedaPago === "Bolivares") {
        // Si el pago es en Bolívares, calcular el equivalente en Dólares
        equivalencia = cantidadPago / tipoCambio;
        monedaEquivalente = "Dólares";
    }

    // Mostrar el equivalente calculado en la interfaz
    document.getElementById('equivalenciaDiv').style.display = 'block';
    document.getElementById('monedaEquivalente').innerText = monedaEquivalente;
    document.getElementById('equivalenciaResultado').innerText = equivalencia.toFixed(2);

    // Crear una nueva fila en la tabla
    const tabla = document.getElementById('personasList').getElementsByTagName('tbody')[0]; // Obtener el cuerpo de la tabla
    const fila = document.createElement('tr');

    // Insertar los datos en la fila
    fila.innerHTML = `
        <td>${nombre}</td>
        <td>${estadoAsistencia}</td>
        <td>${estadoPago}</td>
        <td>${cantidadPago}</td>
        <td>${monedaPago}</td>
        <td>${equivalencia.toFixed(2)} ${monedaEquivalente}</td> <!-- Mostrar equivalencia -->
    `;

    // Agregar la fila a la tabla
    tabla.appendChild(fila);

    // Limpiar el formulario
    document.getElementById('personaForm').reset();
    document.getElementById('equivalenciaDiv').style.display = 'none';  // Ocultar la equivalencia al reiniciar
});
