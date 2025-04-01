const socket = io();

// Actualizar los nombres de los equipos
socket.on('actualizarNombresEquipos', ({ nombreEquipo1, nombreEquipo2 }) => {
    document.getElementById('equipo1').innerText = nombreEquipo1;
    document.getElementById('equipo2').innerText = nombreEquipo2;
});

// Actualizar los goles de los equipos
socket.on('actualizarGolesEquipos', ({ golesEquipo1, golesEquipo2 }) => {
    document.getElementById('golesEquipo1').innerText = golesEquipo1;
    document.getElementById('golesEquipo2').innerText = golesEquipo2;
});

// Actualizar el texto del tiempo
socket.on('actualizarTextoTiempo', (textoTiempo) => {
    document.querySelector('.tiempo-indicador').innerText = textoTiempo;
});

// Actualizar el cronómetro
socket.on('actualizarTiempo', (segundos) => {
    document.getElementById('tiempo').innerText = formatearTiempo(segundos);
});

// Cambiar el fondo de la pantalla
socket.on('actualizarImagenFondo', (ruta) => {
    document.body.style.backgroundImage = `url(${ruta})`;
    document.body.style.backgroundSize = 'cover';
    document.body.style.backgroundPosition = 'center';
});

// Función para formatear el tiempo
function formatearTiempo(segundos) {
    const minutos = Math.floor(segundos / 60);
    const segundosRestantes = segundos % 60;
    return `${minutos.toString().padStart(2, '0')}:${segundosRestantes.toString().padStart(2, '0')}`;
}
