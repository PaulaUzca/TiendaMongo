// correr usando node js. 
// node ubicacion/generate_test_data_usuario y se guarda el archivo de una
const fs = require('fs');

function pickRandomRol() {
  var r = Math.random();
  if(r < 0.7){
    return "comprador";
  }
  else{
    return "vendedor";
  }
}

function getRandomDate() {
  const startTimestamp = new Date(`${1986}-01-01`).getTime();
  const endTimestamp = new Date(`${2010 + 1}-01-01`).getTime();
  const randomTimestamp = Math.random() * (endTimestamp - startTimestamp) + startTimestamp;
  d = new Date(randomTimestamp);
  return d.toISOString().split('T')[0];
}

function generateRandomPhoneNumber() {
  const areaCode = Math.floor(Math.random() * 900) + 100; // Random 3-digit area code
  const firstThreeDigits = Math.floor(Math.random() * 1000); // Random 3-digit first three digits
  const lastFourDigits = Math.floor(Math.random() * 10000) // Random 4-digit last four digits

  return `${areaCode}${firstThreeDigits.toString().padStart(3, '0')}${lastFourDigits.toString().padStart(4, '0')}`;
}

function pickRandomTipoDocumento() {
  var r = Math.random();
  if(r > 0.5){
    return "CC"
  }
  if(r < 0.5 && r > 0.3){
    return "CE"
  }
  return "Pasaporte"
}

function generarRedesRandom(i){
  x =  i % 4;
  redes = [];
  if (x == 0){
    redes.push( {
      nombre: "Instagram",
      usuario: `usuario${i}_instagram`,
      enlace: `https://www.instagram.com/usuario${i}_instagram`
    });
  }
  if( x == 1){
    redes.push( {
      nombre: "Twitter",
      usuario: `usuario${i}twitter`,
      enlace: `https://www.twitter.com/usuario${i}twitter`
    });
  }
  if( x == 2){
    redes.push( {
      nombre: "Tiktok",
      usuario: `usuario${i}_tiktok`,
      enlace: `https://www.tiktok.com/usuario${i}tiktok`
    });
  }
  if( x == 3){
    redes.push( {
      nombre: "Facebook",
      usuario: `usuario${i}_tiktok`,
      enlace: `https://www.tiktok.com/usuario${i}tiktok`
    });
  }
  return redes;
}


const users = [];


for (let i = 1; i <= 20; i++) {
  const usuario = {
    nombre: `Usuario ${i}`,
    username: `usuario${i}`,
    rol: pickRandomRol(),
    fecha_nacimiento: {
      $date: getRandomDate(),
    },
    correo: `usuario${i}@example.com`,
    telefono: generateRandomPhoneNumber(),
    direccion: {
      detalle: `Calle Principal ${i}`,
      ciudad: `Ciudad ${ i % 4}`,
      departamento: `Departamento ${i % 3}`
    },
    documento: {
      tipo_documento: pickRandomTipoDocumento(),
      num_documento: (123456 * i).toString()
    },
    redes: generarRedesRandom(i)
  };
  users.push(usuario);
}

const jsonContent = JSON.stringify(users);

fs.writeFile('generated data/users.json', jsonContent, 'utf8', (err) => {
  if (err) {
    console.error('An error occurred while writing to the file:', err);
  } else {
    console.log('The users data has been saved to users.json file.');
  }
});