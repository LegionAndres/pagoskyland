// Mostrar u ocultar el formulario
function mostrarFormulario() {
    const formulario = document.getElementById('formulario');
    formulario.style.display = formulario.style.display === 'none' ? 'block' : 'none';
}

// Manejar el envío del formulario
document.getElementById('personaForm').addEventListener('submit', function(event) {
    event.preventDefault();  // Evitar el comportamiento por defecto del formulario

    const nombre = document.getElementById('nombre').value;
    const estadoAsistencia = document.getElementById('estadoAsistencia').value;
    const estadoPago = document.getElementById('estadoPago').value;
    const modoPago = document.getElementById('modoPago').value;

    // Crear una nueva fila en la tabla
    const tabla = document.getElementById('personasList');
    const fila = document.createElement('tr');

    fila.innerHTML = `
        <td>${nombre}</td>
        <td>${estadoAsistencia}</td>
        <td>${estadoPago}</td>
        <td>${modoPago}</td>
    `;

    // Agregar la fila a la tabla
    tabla.appendChild(fila);

    // Limpiar el formulario
    document.getElementById('personaForm').reset();
    mostrarFormulario(); // Ocultar el formulario después de agregar la persona
});
