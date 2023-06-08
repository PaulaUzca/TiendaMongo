// correr usando node js. 
// node ubicacion/generate_test_data_usuario y se guarda el archivo de una
const fs = require('fs');

function pickBool() {
  var r = Math.random();
  if(r > 0.7){
    return true
  }
  if(r < 0.7){
    return false
  }
}

function pickRandomNumber(max, min, flotante){
   if(flotante){
    const random = Math.random() * (max - min) + min;
  return parseFloat(random.toFixed(1));
   }
  return Math.floor(Math.random()*max);

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


function generateRandomHexString() {
  const characters = '0123456789ABCDEF';
  let randomString = '';

  for (let i = 0; i < 24; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    randomString += characters[randomIndex];
  }

  return randomString;
}

function generateValoracionesRandom(i, compradores){
  re = [];
    for(var x = 1; x <= i; x++ ){
      u = 
      re.push({
        id_usuario: {$oid: getRandomItem(compradores)},
        username: `usuario${x+1}`,
        fecha: {$date: getRandomDate()},
        valoracion: pickRandomNumber(5,1, false),
        comentario: `comentario de valoracion${x}`,
        anonimo: pickBool(),
      });
    }
    return re;
}


const productos = [];
usuarios = [];
categorias = ['tecnología', 'cosmeticos', 'ropa dama', 'ropa caballero'];
usuarios = [
  '64754db164e0b5d403b635c7',
  '64754de0a197ce8e9cafd9f1',
  '64754de0a197ce8e9cafd9f7',
  '64754de0a197ce8e9cafd9f8',
  '64754de0a197ce8e9cafd9fb',
  '64754de0a197ce8e9cafd9fc'
];
compradores = [
  '64754d9a78e6046e6409f839',
  '64754db164e0b5d403b635c6',
  '64754db164e0b5d403b635c8',
  '64754de0a197ce8e9cafd9ef',
  '64754de0a197ce8e9cafd9f0',
  '64754de0a197ce8e9cafd9f2',
  '64754de0a197ce8e9cafd9f3',
  '64754de0a197ce8e9cafd9f4',
  '64754de0a197ce8e9cafd9f5',
  '64754de0a197ce8e9cafd9f6',
  '64754de0a197ce8e9cafd9f9',
  '64754de0a197ce8e9cafd9fa',
  '64754de0a197ce8e9cafd9fd',
  '64754de0a197ce8e9cafd9fe',
  '64754de0a197ce8e9cafd9ff',
  '64754de0a197ce8e9cafda00',
  '64754de0a197ce8e9cafda01'
];


for (let i = 1; i <= 20; i++) {
  u = i % 5;
  const producto = {
    id_vendedor: { $oid: getRandomItem(usuarios) },
    username_vendedor: `vendedor${i}`,
    nombre: `producto ${i}`,
    descripcion: `super descripcion de producto ${i}`,
    imagen: `www.imagendeproducto${i}.png`,
    dimensiones: {
      altura: pickRandomNumber(100, 0,false),
      ancho: pickRandomNumber(100, 0,false)
    },
    categoria: getRandomItem(categorias),
    precio: pickRandomNumber(1000, 0, true),
    fecha_publicacion: {$date: getRandomDate()},
    fecha_actualizacion: {$date: getRandomDate()},
    stock: pickRandomNumber(200,0, false),
    disponible: pickBool(),
    video: `www.video${i}.com`,
    valoraciones: generateValoracionesRandom(u, compradores)
  };
  productos.push(producto);
}

const jsonContent = JSON.stringify(productos);

fs.writeFile('generated data/productos.json', jsonContent, 'utf8', (err) => {
  if (err) {
    console.error('An error occurred while writing to the file:', err);
  } else {
    console.log('The preguntas data has been saved to users.json file.');
  }
});
