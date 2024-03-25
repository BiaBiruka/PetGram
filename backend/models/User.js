// Criação do model de usuário. É como uma "collection" ou classe em java (ou simplesmente um JSON)
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Primeiro objeto: dados do user
// Segundo objeto: configurações. Timestamps salva o momento que dados forem cirados/atualizados
const userSchema = new Schema(
  {
    name: String,
    email: String,
    password: String,
    profileImage: String,
    bio: String,
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model('User', userSchema);

module.exports = User;
