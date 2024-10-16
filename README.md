# Marcador-Web

Descripción de las Carpetas y Archivos
marcadorWeb/: Carpeta principal del proyecto.
Marcador-Web/: Carpeta donde está el código del marcador.
app/: Carpeta que contiene el código del backend.
admin/: Carpeta para los archivos relacionados con el panel administrativo.
index.html: Archivo HTML para la interfaz administrativa.
public/: Carpeta para los archivos de la vista pública.
index.html: Archivo HTML para la interfaz pública.
Dockerfile: Archivo para construir la imagen del contenedor del backend.
package.json: Archivo de configuración de Node.js con las dependencias.
index.js: Archivo principal del servidor en Node.js.
docker-compose.yml: Archivo de configuración para Docker Compose.


Construcción de la Imagen: Utiliza un Dockerfile para construir la imagen del servidor Node.js que manejará la lógica de la aplicación.
Configuración del Entorno: Al definir las dependencias en package.json, se asegura de que cualquier contenedor que se construya tendrá todo lo necesario para funcionar.
Orquestación de Servicios: Si en el futuro decide agregar una base de datos o un frontend separado, puede usar docker-compose.yml para configurar cómo se comunican estos contenedores entre sí.