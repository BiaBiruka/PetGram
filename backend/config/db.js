const mongoose = require('mongoose');

// Isso vai ser pego do .env pois os ambientes vão possuir acessos diferentes
const dbUser = process.env.DB_USER;
const dbPass = process.env.DB_PASS;

// conexão com o bd
const conn = async () => {
  try {
    const dbConn = await mongoose.connect(
      `mongodb+srv://${dbUser}:${dbPass}@petgram.yq54d71.mongodb.net/?retryWrites=true&w=majority&appName=PetGram`
    );
    console.log('Conectado com sucesso');
    return dbConn;
  } catch (error) {
    console.log(error);
  }
};

conn();

module.exports = conn;
