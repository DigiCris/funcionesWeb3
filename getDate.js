const {Web3} = require('web3');

const web3 = new Web3('https://rpc-mainnet.maticvigil.com');

/*
Descripcion: Mandandole como paramentro el hash de una transacción devuelve el fecha y hora de dicha transacción. Para eso lee en que bloque está y luego busca el tiempo en dicho bloque.
params transactionHash (string) transaction hash de una transaccion en la blockchain
return:   error... => si falla
          2023-09-30T03:03:27.000Z
*/
async function getTransactionDate(transactionHash) {
  try {
    // Obtiene la información de la transacción desde la red de Polygon
    const transaction = await web3.eth.getTransaction(transactionHash);

    // Obtiene el bloque que contiene la transacción
    const block = await web3.eth.getBlock(transaction.blockHash);

    // Convierte bigint a string para que no haya problemas
    var timestamp = block.timestamp.toString();
    timestamp = timestamp * 1000;// Multiplica por 1000 para convertir a milisegundo y cambiarlo a int
    return timestamp; // Devolvemos el valor

  } catch (error) {
    console.error('Error al obtener la fecha y hora de la transacción:', error);
  }
}

// Ejemplo de uso:
async function main() {
  const transactionHash = '0xe26518fb361657ca96d090952042d265f17301f3ad8b6bd9e51b8ef6a343e206';
  var res = await getTransactionDate(transactionHash);
  const date = new Date(res); // Lo ponemos en formato legible
  console.log(date); // Devolvemos el valor 
}

main();