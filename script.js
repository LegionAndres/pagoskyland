// Función para manejar el envío del formulario
document.getElementById('personaForm').addEventListener('submit', function(event) {
    event.preventDefault();  // Evitar el comportamiento por defecto del formulario

    // Obtener los valores del formulario
    const nombre = document.getElementById('nombre').value;
    const estadoAsistencia = document.getElementById('estadoAsistencia').value;
    const estadoPago = document.getElementById('estadoPago').value;
    const cantidadPago = document.getElementById('cantidadPago').value;

    // Verificar que la cantidad de pago no esté vacía o inválida
    if (cantidadPago === "" || isNaN(cantidadPago)) {
        alert("Por favor ingresa una cantidad válida.");
        return;
    }

    // Crear una nueva fila en la tabla
    const tabla = document.getElementById('personasList').getElementsByTagName('tbody')[0]; // Obtener el cuerpo de la tabla
    const fila = document.createElement('tr');

    // Insertar los datos en la fila
    fila.innerHTML = `
        <td>${nombre}</td>
        <td>${estadoAsistencia}</td>
        <td>${estadoPago}</td>
        <td>${cantidadPago}</td>
    `;

    // Agregar la fila a la tabla
    tabla.appendChild(fila);

    // Limpiar el formulario
    document.getElementById('personaForm').reset();
});
