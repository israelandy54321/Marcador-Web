const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const path = require('path');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

app.use(express.static(path.join(__dirname, 'public')));
app.use('/admin', express.static(path.join(__dirname, 'admin')));

// Rutas para las vistas
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.get('/admin', (req, res) => {
  res.sendFile(path.join(__dirname, 'admin', 'index.html'));
});

// Variables del marcador
let golesEquipo1 = 0;
let golesEquipo2 = 0;
let tiempo = 0; // En segundos
let textoTiempo = "2 Tiempo";
let nombreEquipo1 = "BSC";
let nombreEquipo2 = "LDU";
let relojInterval = null;
let relojActivo = false;

// Conexión del cliente
io.on('connection', (socket) => {
    console.log('Nuevo cliente conectado');

    // Enviar datos iniciales al cliente
    socket.emit('actualizarNombresEquipos', { nombreEquipo1, nombreEquipo2 });
    socket.emit('actualizarGolesEquipos', { golesEquipo1, golesEquipo2 });
    socket.emit('actualizarTextoTiempo', textoTiempo);
    socket.emit('actualizarTiempo', tiempo);

    // Iniciar el reloj
    socket.on('iniciarReloj', () => {
        if (!relojActivo) {
            relojActivo = true;
            relojInterval = setInterval(() => {
                tiempo++;
                io.emit('actualizarTiempo', tiempo);
            }, 1000);
        }
    });

    // Pausar el reloj
    socket.on('pausarReloj', () => {
        if (relojActivo) {
            clearInterval(relojInterval);
            relojActivo = false;
        }
    });

    // Reiniciar el reloj
    socket.on('reiniciarReloj', () => {
        clearInterval(relojInterval);
        relojActivo = false;
        tiempo = 0;
        io.emit('actualizarTiempo', tiempo);
    });

    // Iniciar desde un tiempo específico
    socket.on('iniciarRelojDesde', (segundos) => {
        tiempo = segundos;
        io.emit('actualizarTiempo', tiempo);

        if (!relojActivo) {
            relojActivo = true;
            relojInterval = setInterval(() => {
                tiempo++;
                io.emit('actualizarTiempo', tiempo);
            }, 1000);
        }
    });

    // Cambiar goles
    socket.on('cambiarGoles', ({ equipo, goles }) => {
        if (equipo === 'equipo1') {
            golesEquipo1 = goles;
        } else if (equipo === 'equipo2') {
            golesEquipo2 = goles;
        }
        io.emit('actualizarGolesEquipos', { golesEquipo1, golesEquipo2 });
    });

    // Cambiar nombres
    socket.on('cambiarNombreEquipo', ({ equipo, nombre }) => {
        if (equipo === 'equipo1') {
            nombreEquipo1 = nombre;
        } else if (equipo === 'equipo2') {
            nombreEquipo2 = nombre;
        }
        io.emit('actualizarNombresEquipos', { nombreEquipo1, nombreEquipo2 });
    });

    // Cambiar texto de tiempo (ej: "1 Tiempo", "2 Tiempo", "Final")
    socket.on('cambiarTextoTiempo', (texto) => {
        textoTiempo = texto;
        io.emit('actualizarTextoTiempo', textoTiempo);
    });

    // Cambiar imagen de fondo
    socket.on('cambiarImagenFondo', (ruta) => {
        io.emit('actualizarImagenFondo', ruta);
    });

    // 🚨 NUEVO: Reiniciar todo el sistema
    socket.on('reiniciarSistema', () => {
        clearInterval(relojInterval);
        relojActivo = false;
        tiempo = 0;
        golesEquipo1 = 0;
        golesEquipo2 = 0;
        nombreEquipo1 = "Equipo 1";
        nombreEquipo2 = "Equipo 2";
        textoTiempo = "1 Tiempo";

        io.emit('actualizarTiempo', tiempo);
        io.emit('actualizarGolesEquipos', { golesEquipo1, golesEquipo2 });
        io.emit('actualizarNombresEquipos', { nombreEquipo1, nombreEquipo2 });
        io.emit('actualizarTextoTiempo', textoTiempo);
    });

    socket.on('disconnect', () => {
        console.log('Un cliente se ha desconectado');
    });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`Servidor en ejecución en http://localhost:${PORT}`);
});
