// script.js (admin)
const socket = io();

function iniciarReloj() {
    socket.emit('iniciarReloj');
}

function pausarReloj() {
    socket.emit('pausarReloj');
}


function reiniciarReloj() {
    socket.emit('reiniciarReloj');
}

function reiniciarSistema() {
    if (confirm("¿Estás seguro de que quieres reiniciar todo el marcador?")) {
      socket.emit('reiniciarSistema');
    }
  }
  

function iniciarRelojDesde() {
    const minutos = document.getElementById('tiempoMinutos').value;
    const segundos = minutos * 60;
    socket.emit('iniciarRelojDesde', segundos);
}

function cambiarGoles(equipo) {
    const goles = document.getElementById(`goles${equipo === 'equipo1' ? 'Equipo1' : 'Equipo2'}`).value;
    socket.emit('cambiarGoles', { equipo, goles });
}

function cambiarNombreEquipo(equipo) {
    const nombre = document.getElementById(`nombre${equipo === 'equipo1' ? 'Equipo1' : 'Equipo2'}`).value;
    socket.emit('cambiarNombreEquipo', { equipo, nombre });
}

function cambiarTextoTiempo() {
    const texto = document.getElementById('tiempoTexto').value;
    socket.emit('cambiarTextoTiempo', texto);
}

function cargarImagenFondo() {
    const input = document.getElementById('imagenFondo');
    if (input.files && input.files[0]) {
        const reader = new FileReader();
        reader.onload = function (e) {
            socket.emit('cambiarImagenFondo', e.target.result);
        };
        reader.readAsDataURL(input.files[0]);
    }
}
