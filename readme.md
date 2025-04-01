<!DOCTYPE html>
<html lang="es">
<head>
   <meta charset="UTF-8">
   <meta name="viewport" content="width=device-width, initial-scale=1.0">
   <title>Marcador de Fútbol - Público</title>
   <style>
       html, body {
           height: 100%;
           margin: 0;
           overflow: hidden; /* Evita el scroll */
           font-size: 1vw; /* Ajusta la base de tamaño del texto */
           background-image: url('/assets/final.png'); /* Ruta a la imagen de fondo */
           background-size: cover; /* Ajusta la imagen para cubrir toda el área del fondo */
           background-position: center; /* Centra la imagen en el fondo */
           background-repeat: no-repeat; /* Evita que la imagen se repita */
       }
       .reloj {
           background-color: rgb(23, 22, 22); /* Fondo negro */
           border: 4px solid #00ff00; /* Borde verde neón */
           padding: 1em;
           border-radius: 50px;
           position: absolute; /* Posiciona el reloj en la parte superior */
           top: 0; /* Se alinea al borde superior de la pantalla */
           left: 50%; /* Centra horizontalmente */
           transform: translateX(-50%); /* Ajusta el centro */
           text-align: center;
       }
       .reloj p {
           font-size: 10vw; /* Tamaño grande basado en el ancho de la pantalla */
           color: white;
           margin: 0; /* Elimina el margen por defecto */
       }
       .marcador {
           height: calc(100vh - 120px); /* Ajusta la altura disponible restando el espacio del reloj */
           width: 100vw;  /* Ocupa todo el ancho de la pantalla */
           display: flex;
           flex-direction: row;
           justify-content: space-around; /* Espacio entre equipos */
           align-items: center;
           padding: 1em 2vw; /* Espacio horizontal ajustado */
           position: absolute; /* Posiciona el marcador en la parte inferior */
           bottom: 0; /* Se alinea al borde inferior de la pantalla */
           box-sizing: border-box; /* Incluye el padding y border en el tamaño total del elemento */
       }
       .equipo {
           text-align: center;
           display: flex;
           flex-direction: column;
           justify-content: center;
           align-items: center;
           flex: 1; /* Permite que los elementos se ajusten */
          
       }
       .equipo h2 {
           font-size: 6vw; /* Tamaño ajustado para el texto del equipo */
           margin: 0.5em 0;
           padding: 0.1em 0.1em;
           color: rgb(255, 255, 255); /* Cambia el color del texto a blanco */
           background-color: rgb(23, 22, 22); /* Fondo negro */
           border: 4px solid #00ff00; /* Borde verde neón */
           border-radius: 50px;
       }
       .goles {
           font-size: 8vw; /* Tamaño grande basado en el ancho de la pantalla */
           background-color: rgb(23, 22, 22);
           color: white;
           border: 4px solid white;
           padding: 0.5em;
           border-radius: 50px;
       }
       .tiempo-indicador {
           background-color: rgb(23, 22, 22); /* Fondo negro */
           border: 2px solid white; /* Borde blanco */
           color: white;
           padding: 0.5em 1em;
           border-radius: 8px;
           font-size: 2vw; /* Tamaño del texto ajustado */
           text-align: center;
           white-space: nowrap; /* Evita que el texto se rompa en varias líneas */
       }
   </style>
</head><body>
    <div class="reloj">
        <p id="tiempo">00:00</p>
    </div>
    <div class="marcador">
        <div class="equipo">
            <h2 id="equipo1">Local</h2>
            <p id="golesEquipo1" class="goles">1</p>
        </div>
        <div class="tiempo-indicador">
            Tiempo 1
        </div>
        <div class="equipo">
            <h2 id="equipo2">Visitante</h2>
            <p id="golesEquipo2" class="goles">0</p>
        </div>
    </div>
    <script src="/socket.io/socket.io.js"></script>
    <script src="script.js"></script>
</body>
</html>





<!DOCTYPE html>
<html lang="es">
<head>
   <meta charset="UTF-8">
   <meta name="viewport" content="width=device-width, initial-scale=1.0">
   <title>Marcador de Fútbol - Público</title>
   <style>
       html, body {
           height: 100%;
           margin: 0;
           overflow: hidden; /* Evita el scroll */
           font-size: 1vw; /* Ajusta la base de tamaño del texto */
           background-image: url('/assets/final.png'); /* Ruta a la imagen de fondo */
           background-size: cover; /* Ajusta la imagen para cubrir toda el área del fondo */
           background-position: center; /* Centra la imagen en el fondo */
           background-repeat: no-repeat; /* Evita que la imagen se repita */
       }
       .container {
    display: flex;
    justify-content: center; /* Alinea horizontalmente */
    align-items: center; /* Alinea verticalmente */
    gap: 20px; /* Espacio entre elementos */
    height: 100vh; /* Para centrar en toda la pantalla */
}

.box {
    background-color: lightgray;
    padding: 20px;
    text-align: center;
    min-width: 100px;
}

       .reloj {
           background-color: rgb(23, 22, 22); /* Fondo negro */
           border: 4px solid #00ff00; /* Borde verde neón */
           padding: 1em;
           border-radius: 50px;
           position: absolute; /* Posiciona el reloj en la parte superior */
           top: 0; /* Se alinea al borde superior de la pantalla */
           left: 50%; /* Centra horizontalmente */
           transform: translateX(-50%); /* Ajusta el centro */
           text-align: center;
       }
       .reloj p {
           font-size: 10vw; /* Tamaño grande basado en el ancho de la pantalla */
           color: white;
           margin: 0; /* Elimina el margen por defecto */
       }
       .marcador {
           height: calc(100vh - 120px); /* Ajusta la altura disponible restando el espacio del reloj */
           width: 100vw;  /* Ocupa todo el ancho de la pantalla */
           display: flex;
           flex-direction: row;
           justify-content: space-around; /* Espacio entre equipos */
           align-items: center;
           padding: 1em 2vw; /* Espacio horizontal ajustado */
           position: absolute; /* Posiciona el marcador en la parte inferior */
           bottom: 0; /* Se alinea al borde inferior de la pantalla */
           box-sizing: border-box; /* Incluye el padding y border en el tamaño total del elemento */
       }
       .equipo {
           text-align: center;
           display: flex;
           flex-direction: column;
           justify-content: center;
           align-items: center;
           flex: 1; /* Permite que los elementos se ajusten */
          
       }
       .equipo h2 {
           font-size: 6vw; /* Tamaño ajustado para el texto del equipo */
           margin: 0.5em 0;
           padding: 0.1em 0.1em;
           color: rgb(255, 255, 255); /* Cambia el color del texto a blanco */
           background-color: rgb(23, 22, 22); /* Fondo negro */
           border: 4px solid #00ff00; /* Borde verde neón */
           border-radius: 50px;
       }
       .goles {
           font-size: 8vw; /* Tamaño grande basado en el ancho de la pantalla */
           background-color: rgb(23, 22, 22);
           color: white;
           border: 4px solid white;
           padding: 0.5em;
           border-radius: 50px;
       }
       .tiempo-indicador {
           background-color: rgb(23, 22, 22); /* Fondo negro */
           border: 2px solid white; /* Borde blanco */
           color: white;
           padding: 0.5em 1em;
           border-radius: 8px;
           font-size: 2vw; /* Tamaño del texto ajustado */
           text-align: center;
           white-space: nowrap; /* Evita que el texto se rompa en varias líneas */
       }
       
   </style>
      <div class="container">
        <div class="box">
            <div class="equipo">
   
                <p id="golesEquipo1" class="goles">1</p>
            </div>
        </div>

        <div class="box">

            <div class="reloj">
                <p id="tiempo">00:00</p>
            </div>
        </div>

        <div class="box">

            <div class="equipo">
            
                <p id="golesEquipo2" class="goles">0</p>
            </div>

        </div>
    </div>
    
</head><body>
 

    <div class="marcador">
        


    </div>


    <script src="/socket.io/socket.io.js"></script>
    <script src="script.js"></script>
</body>
</html>
