const fs = require('fs');
const path = require('path');
const http = require('http');
// Ruta de la imagen a leer
const imagePath = './imatges/imatge.jpg';

const server = http.createServer((req, res) => {
  if (req.method === 'POST' && req.url === '/upload') {
    const chunks = [];

    req.on('data', (chunk) => {
      chunks.push(chunk);
    });

    req.on('end', () => {
      const buffer = Buffer.concat(chunks);
      const origenPath = path.join(__dirname, 'FitxerOrigen.txt');
      const destinoPath = path.join(__dirname, 'Docs1', 'FitxerDesti.txt');

      fs.writeFile(destinoPath, buffer, { flag: 'a+' }, (err) => {
        if (err) {
          console.error(err);
          res.statusCode = 500;
          res.end('Error al copiar el archivo');
        } else {
          console.log('El contenido del archivo origen ha sido copiado al archivo destino');
          res.end();
        }
      });
    });
  } else {
    res.statusCode = 404;
    res.end();
  }

  // Verificar si la imagen existe
  if (!fs.existsSync(imagePath)) {
    res.writeHead(404, { 'Content-Type': 'text/plain' });
    res.end('La imagen no existe');
    return;
  }

  // Stream de lectura de la imagen
  const imageStream = fs.createReadStream(imagePath);

  // Nombre de la imagen
  const imageName = imagePath.split('/').pop();
  const origenPath = path.join(__dirname, 'FitxerOrigen.txt');
  const destinoPath = path.join(__dirname, 'Docs1', 'FitxerDesti.txt');

  // Se lee el stream de datos en bloques de 16384 Bytes
  imageStream.on('data', (chunk) => {
    console.log(`Nombre de la imagen: ${imageName}`);
    console.log(`Buffer de datos leído: ${chunk}`);
  });

  // Respuesta HTTP con la imagen
  res.setHeader('Content-Type', 'image/jpeg');
  imageStream.pipe(res);

});

fs.readFile(origenPath, (err, data) => {
  if (err) throw err;

  fs.writeFile(destinoPath, data, { flag: 'a+' }, (err) => {
    if (err) throw err;
    console.log('El contenido del archivo origen ha sido copiado al archivo destino');
  });

});
function mostrarFitxersICarpetes(carpeta) {
  const arxiusICarpetes = fs.readdirSync(carpeta);

  arxiusICarpetes.forEach((arxiuICarpeta) => {
    const ruta = path.join(carpeta, arxiuICarpeta);
    const stat = fs.statSync(ruta);

    if (stat.isFile()) {
      console.log(ruta);
    } else if (stat.isDirectory()) {
      console.log(ruta);
      mostrarFitxersICarpetes(ruta);
    }
  });
}

mostrarFitxersICarpetes('C:\\Users\\Nerea\\Desktop\\UF1_ExamenAaD');

const port = 3000;

server.listen(port, () => {
  console.log(`Servidor HTTP iniciado en el puerto ${port}`);
});
