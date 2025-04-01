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

// Conexión del cliente
io.on('connection', (socket) => {
    console.log('Nuevo cliente conectado');

    // Enviar los valores iniciales cuando un cliente se conecta
    socket.emit('actualizarNombresEquipos', { nombreEquipo1, nombreEquipo2 });
    socket.emit('actualizarGolesEquipos', { golesEquipo1, golesEquipo2 });
    socket.emit('actualizarTextoTiempo', textoTiempo);
    socket.emit('actualizarTiempo', tiempo);

    // Escuchar eventos del administrador
    socket.on('iniciarReloj', () => {
        setInterval(() => {
            tiempo++;
            io.emit('actualizarTiempo', tiempo);
        }, 1000);
    });

    socket.on('reiniciarReloj', () => {
        tiempo = 0;
        io.emit('actualizarTiempo', tiempo);
    });

    socket.on('iniciarRelojDesde', (segundos) => {
        tiempo = segundos;
        io.emit('actualizarTiempo', tiempo);
    });

    socket.on('cambiarGoles', ({ equipo, goles }) => {
        if (equipo === 'equipo1') {
            golesEquipo1 = goles;
        } else if (equipo === 'equipo2') {
            golesEquipo2 = goles;
        }
        io.emit('actualizarGolesEquipos', { golesEquipo1, golesEquipo2 });
    });

    socket.on('cambiarNombreEquipo', ({ equipo, nombre }) => {
        if (equipo === 'equipo1') {
            nombreEquipo1 = nombre;
        } else if (equipo === 'equipo2') {
            nombreEquipo2 = nombre;
        }
        io.emit('actualizarNombresEquipos', { nombreEquipo1, nombreEquipo2 });
    });

    socket.on('cambiarTextoTiempo', (texto) => {
        textoTiempo = texto;
        io.emit('actualizarTextoTiempo', textoTiempo);
    });

    socket.on('cambiarImagenFondo', (ruta) => {
        io.emit('actualizarImagenFondo', ruta);
    });

    socket.on('disconnect', () => {
        console.log('Un cliente se ha desconectado');
    });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`Servidor en ejecución en http://localhost:${PORT}`);
});
