// Variables para acumular los totales
let totalDolares = 0;
let totalBolivares = 0;

// Función para mostrar el campo de destino solo si se selecciona "Otro Banco"
function mostrarCampoDestino() {
    const formaPago = document.getElementById('formaPago').value;
    const campoDestino = document.getElementById('campoDestino');

    // Mostrar el campo de destino solo si se selecciona "Otro Banco"
    if (formaPago === "Otro Banco") {
        campoDestino.style.display = 'block';
    } else {
        campoDestino.style.display = 'none';
    }
}

// Función para manejar el envío del formulario
document.getElementById('personaForm').addEventListener('submit', function(event) {
    event.preventDefault();  // Evitar el comportamiento por defecto del formulario

    // Obtener los valores del formulario
    const nombre = document.getElementById('nombre').value;
    const estadoAsistencia = document.getElementById('estadoAsistencia').value;
    const estadoPago = document.getElementById('estadoPago').value;
    const cantidadPago = parseFloat(document.getElementById('cantidadPago').value);
    const monedaPago = document.getElementById('monedaPago').value;
    const tipoCambio = parseFloat(document.getElementById('tipoCambio').value);
    const formaPago = document.getElementById('formaPago').value;
    const destinoPago = document.getElementById('destinoPago').value;

    // Verificar que la cantidad de pago y el tipo de cambio sean válidos
    if (isNaN(cantidadPago) || isNaN(tipoCambio) || cantidadPago <= 0 || tipoCambio <= 0) {
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
        totalDolares += cantidadPago;  // Sumar a total en Dólares
    } else if (monedaPago === "Bolivares") {
        // Si el pago es en Bolívares, calcular el equivalente en Dólares
        equivalencia = cantidadPago / tipoCambio;
        monedaEquivalente = "Dólares";
        totalBolivares += cantidadPago;  // Sumar a total en Bolívares
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
        <td>${formaPago}</td>
        <td>${formaPago === 'Otro Banco' ? destinoPago : 'N/A'}</td>
        <td>${equivalencia.toFixed(2)} ${monedaEquivalente}</td> <!-- Mostrar equivalencia -->
    `;

    // Agregar la fila a la tabla
    tabla.appendChild(fila);

    // Actualizar los totales
    document.getElementById('totalDolares').innerText = totalDolares.toFixed(2);
    document.getElementById('totalBolivares').innerText = totalBolivares.toFixed(2);

    // Limpiar el formulario pero mantener los resultados de la equivalencia
    document.getElementById('personaForm').reset();
    document.getElementById('equivalenciaDiv').style.display = 'none';  // Ocultar la equivalencia al reiniciar
});

// Generar PDF
document.getElementById('generatePDF').addEventListener('click', function() {
    const { jsPDF } = window.jspdf;  // Acceder a la librería jsPDF
    const doc = new jsPDF();

    // Agregar un título al PDF
    doc.text('Sistema de Cobro Skyland', 20, 10);

    // Capturar la tabla de personas registradas
    const table = document.getElementById('personasList');
    const rows = table.querySelectorAll('tr');

    let yPosition = 20;
    rows.forEach(row => {
        const cells = row.querySelectorAll('td, th');
        let text = '';
        cells.forEach(cell => {
            text += cell.innerText + ' | ';
        });
        doc.text(text, 20, yPosition);
        yPosition += 10;
    });

    // Guardar el PDF con el nombre 'registro-pagos.pdf'
    doc.save('registro-pagos.pdf');
});
