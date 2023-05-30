// correr usando node js. 
// node ubicacion/generate_test_data_usuario y se guarda el archivo de una
const { getRandomValues } = require('crypto');
const fs = require('fs');

function pickAnonimo() {
  var r = Math.random();
  if(r > 0.7){
    return true
  }
  if(r < 0.7){
    return false
  }
}

function getRandomDate() {
  const startTimestamp = new Date(`${2020}-01-01`).getTime();
  const endTimestamp = new Date(`${2022 + 1}-01-01`).getTime();
  const randomTimestamp = Math.random() * (endTimestamp - startTimestamp) + startTimestamp;
  d = new Date(randomTimestamp);
  return d.toISOString().split('T')[0];
}
function getRandomItem(list){
  const randomIndex = Math.floor(Math.random() * list.length);
  return list[randomIndex];
}
function generateRespuestasRandom(i, usuarios){
  re = [];
    for(var x = 1; x <= i; x++ ){
      u = 
      re.push({
        id_usuario_respuesta: {$oid: getRandomItem(usuarios)},
        username_respuesta: `usuario${x+1}`,
        fecha: {$date: getRandomDate()},
        comentario: `respuesta a comentario ${x}`,
        anonimo: pickAnonimo(),
      });
    }
    return re;
}

function generateRandomHexString() {
  const characters = '0123456789ABCDEF';
  let randomString = '';

  for (let i = 0; i < 24; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    randomString += characters[randomIndex];
  }

  return randomString;
}

const preguntas = [];
usuarios = []
productos = [];
for(let i = 1; i<= 8; i++){
  productos.push(generateRandomHexString());
}
for(let i = 1; i <=5; i++){
  usuarios.push(generateRandomHexString());
}


for (let i = 1; i <= 30; i++) {
  u = i % 5;
  const pregunta = {
    id_producto: { $oid: getRandomItem(productos)},
    id_usuario_pregunta: { $oid: usuarios[u] },
    username_pregunta: `usuario${u}`,
    fecha: {
      $date: getRandomDate(),
    },
    comentario: `comentario de usuario ${u}`,
    anonimo: pickAnonimo(),
    respuestas: generateRespuestasRandom(u, usuarios)
  };
  preguntas.push(pregunta);
}

const jsonContent = JSON.stringify(preguntas);

fs.writeFile('generated data/preguntas.json', jsonContent, 'utf8', (err) => {
  if (err) {
    console.error('An error occurred while writing to the file:', err);
  } else {
    console.log('The preguntas data has been saved to users.json file.');
  }
});