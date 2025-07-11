// Función para calcular la diferencia monetaria y mostrar el resultado de los montos convertidos
function calcularDiferencia() {
    const monedaOrigen = document.getElementById('monedaOrigen').value;  // Moneda de origen (Bolívares o Dólares)
    const valorBCV = parseFloat(document.getElementById('valorMoneda').value);  // Tasa BCV
    const cantidadPago = parseFloat(document.getElementById('cantidadPago').value);  // Cantidad ingresada
    const montoConvertido = document.getElementById('montoConvertido');
    const montoConvertidoBcv = document.getElementById('montoConvertidoBcv');
    const modoPago = document.getElementById('modoPago').value;

    // Validación para asegurarse de que los valores sean números válidos
    if (isNaN(valorBCV) || isNaN(cantidadPago) || valorBCV <= 0 || cantidadPago <= 0) {
        montoConvertido.value = "Por favor ingresa valores válidos.";
        montoConvertidoBcv.value = "Por favor ingresa valores válidos.";
        return;
    }

    let resultadoDolares = cantidadPago;
    let resultadoBolivares = cantidadPago;

    // Cálculo automático dependiendo de la moneda de origen y el modo de pago
    if (monedaOrigen === "Bolivares" && modoPago === "Dolares") {
        resultadoDolares = cantidadPago / valorBCV; // Convertir de Bolívares a Dólares
        resultadoBolivares = cantidadPago; // Monto ya está en Bolívares
    } else if (monedaOrigen === "Dolares" && modoPago === "Bolivares") {
        resultadoDolares = cantidadPago; // Monto ya está en Dólares
        resultadoBolivares = cantidadPago * valorBCV; // Convertir de Dólares a Bolívares
    } else if (monedaOrigen === "Bolivares" && modoPago === "Bolivares") {
        resultadoDolares = cantidadPago / valorBCV; // Solo mostrar monto en Dólares
        resultadoBolivares = cantidadPago; // Solo mostrar monto en Bolívares
    } else if (monedaOrigen === "Dolares" && modoPago === "Dolares") {
        resultadoDolares = cantidadPago; // Solo mostrar monto en Dólares
        resultadoBolivares = cantidadPago * valorBCV; // Convertir a Bolívares
    }

    // Mostrar los resultados convertidos
    montoConvertido.value = resultadoDolares.toFixed(2); // Monto en Dólares
    montoConvertidoBcv.value = resultadoBolivares.toFixed(2); // Monto en Bolívares
}

// Manejar el envío del formulario
document.getElementById('personaForm').addEventListener('submit', function(event) {
    event.preventDefault();  // Evitar el comportamiento por defecto del formulario

    // Obtener los valores del formulario
    const nombre = document.getElementById('nombre').value;
    const estadoAsistencia = document.getElementById('estadoAsistencia').value;
    const estadoPago = document.getElementById('estadoPago').value;
    const modoPago = document.getElementById('modoPago').value;
    const cantidadPago = document.getElementById('cantidadPago').value;
    const montoConvertido = document.getElementById('montoConvertido').value;
    const montoConvertidoBcv = document.getElementById('montoConvertidoBcv').value;

    // Crear una nueva fila en la tabla
    const tabla = document.getElementById('personasList').getElementsByTagName('tbody')[0]; // Asegurarse de obtener el cuerpo de la tabla
    const fila = document.createElement('tr');

    fila.innerHTML = `
        <td>${nombre}</td>
        <td>${estadoAsistencia}</td>
        <td>${estadoPago}</td>
        <td>${modoPago}</td>
        <td>${cantidadPago}</td>
        <td>${montoConvertido}</td>
        <td>${montoConvertidoBcv}</td>
    `;

    // Agregar la fila a la tabla
    tabla.appendChild(fila);

    // Limpiar el formulario
    document.getElementById('personaForm').reset();
});
