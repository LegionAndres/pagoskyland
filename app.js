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

// Función para mostrar el campo de nombre manual si se selecciona "Otro"
function mostrarCampoNombreManual() {
    const destinoPagoPersona = document.getElementById('destinoPagoPersona').value;
    const campoNombreManual = document.getElementById('campoNombreManual');

    // Mostrar el campo de nombre manual si se selecciona "Otro"
    if (destinoPagoPersona === "Otro") {
        campoNombreManual.style.display = 'block';
    } else {
        campoNombreManual.style.display = 'none';
    }
}

// Función para verificar la asistencia
function verificarAsistencia() {
    const estadoAsistencia = document.getElementById('estadoAsistencia').value;
    const cantidadPago = document.getElementById('cantidadPago');

    // Si la persona está ausente, no es obligatorio ingresar el monto, pero se puede registrar
    if (estadoAsistencia === "Ausente") {
        cantidadPago.removeAttribute("required");
    } else {
        cantidadPago.setAttribute("required", "true");
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
    const destinoPagoPersona = document.getElementById('destinoPagoPersona').value;
    const nombreManual = document.getElementById('nombreManual').value;

    // Verificar que la cantidad de pago y el tipo de cambio sean válidos
    if (isNaN(cantidadPago) || isNaN(tipoCambio) || cantidadPago < 0 || tipoCambio <= 0) {
        alert("Por favor ingresa una cantidad y tipo de cambio válidos.");
        return;
    }

    // Si el destino es "Otro", tomar el nombre manual
    const responsableFinal = destinoPagoPersona === "Otro" ? nombreManual : destinoPagoPersona;

    // Realizar la conversión automática si el tipo de cambio es válido
    let equivalencia = 0;
    let monedaEquivalente = '';
    
    if (monedaPago === "Dolares") {
        equivalencia = cantidadPago * tipoCambio;
        monedaEquivalente = "Bolívares";
        totalDolares += cantidadPago;
    } else if (monedaPago === "Bolivares") {
        equivalencia = cantidadPago / tipoCambio;
        monedaEquivalente = "Dólares";
        totalBolivares += cantidadPago;
    }

    // Mostrar el equivalente calculado en la interfaz
    document.getElementById('equivalenciaDiv').style.display = 'block';
    document.getElementById('monedaEquivalente').innerText = monedaEquivalente;
    document.getElementById('equivalenciaResultado').innerText = equivalencia.toFixed(2);

    // Crear una nueva fila en la tabla con los datos del pago y responsable
    const tabla = document.getElementById('personasList').getElementsByTagName('tbody')[0];
    const fila = document.createElement('tr');

    fila.innerHTML = `
        <td>${nombre}</td>
        <td>${estadoAsistencia}</td>
        <td>${estadoPago}</td>
        <td>${cantidadPago}</td>
        <td>${monedaPago}</td>
        <td>${formaPago}</td>
        <td>${responsableFinal}</td>
        <td>${equivalencia.toFixed(2)} ${monedaEquivalente}</td>
        <td><span class="delete-x" onclick="eliminarFila(this)">X</span></td>
    `;

    tabla.appendChild(fila);

    // Actualizar los totales
    document.getElementById('totalDolares').innerText = totalDolares.toFixed(2);
    document.getElementById('totalBolivares').innerText = totalBolivares.toFixed(2);

    // Limpiar el formulario pero mantener los resultados de la equivalencia
    document.getElementById('personaForm').reset();
    document.getElementById('equivalenciaDiv').style.display = 'none';
});

// Función para eliminar una fila
function eliminarFila(element) {
    const row = element.closest('tr');
    row.remove();
    actualizarTotales();
}

// Función para actualizar los totales
function actualizarTotales() {
    totalDolares = 0;
    totalBolivares = 0;

    const rows = document.querySelectorAll('#personasList tbody tr');

    rows.forEach(row => {
        const cantidadPago = parseFloat(row.cells[3].innerText);
        const monedaPago = row.cells[4].innerText;

        if (monedaPago === "Dólares") {
            totalDolares += cantidadPago;
        } else {
            totalBolivares += cantidadPago;
        }
    });

    document.getElementById('totalDolares').innerText = totalDolares.toFixed(2);
    document.getElementById('totalBolivares').innerText = totalBolivares.toFixed(2);
}

// Función para descargar la tabla como un archivo CSV
document.getElementById('downloadCSV').addEventListener('click', function () {
    const table = document.getElementById('personasList');
    const rows = table.querySelectorAll('tr');
    
    let csvContent = '';
    
    // Recorrer las filas de la tabla
    rows.forEach((row, index) => {
        const cells = row.querySelectorAll('th, td');
        const rowArray = [];

        // Recorrer las celdas de cada fila
        cells.forEach(cell => {
            rowArray.push(cell.innerText); // Extraer el texto de cada celda
        });
        
        // Unir las celdas con una coma (formato CSV)
        csvContent += rowArray.join(',') + '\n';
    });

    // Crear un enlace temporal para descargar el archivo CSV
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'registro-pagos.csv'; // Nombre del archivo
    link.click(); // Simula el clic para descargar el archivo
});

// Generar PDF
document.getElementById('generatePDF').addEventListener('click', function() {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();

    doc.text('Sistema de Cobro Skyland - Registro de Participantes', 20, 10);

    const table = document.getElementById('personasList');
    const rows = table.querySelectorAll('tr');

    let yPosition = 20;
    rows.forEach(row => {
        const cells = row.querySelectorAll('td');
        let text = '';
        cells.forEach(cell => {
            text += cell.innerText + ' | ';
        });

        // Si la posición Y excede el límite de la página, agregar nueva página
        if (yPosition >= 270) {
            doc.addPage();
            yPosition = 10;
        }

        doc.text(text, 20, yPosition);
        yPosition += 10;
    });

    doc.save('registro-pagos.pdf');
});
