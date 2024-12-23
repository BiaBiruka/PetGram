const User = require('../models/User');
const jwt = require('jsonwebtoken');
const jwtSecret = process.env.JWT_SECRET;

const authGuard = async (req, res, next) => {
  const authHeader = req.headers['authorization'];

  // Token vem como Bearer 8terht6yrj6rft4. Só a segunda parte importa, então separa
  const token = authHeader && authHeader.split(' ')[1];

  // Checa se tem token
  // O if do token já vai dar errado se não tem autorização, então só uma validação já basta
  if (!token) {
    return res.status(401).json({ errors: ['Access denied.'] });
  }

  // Checa se token é válido
  try {
    const verified = jwt.verify(token, jwtSecret);

    //Pega todos os dados do usuário menos a senha
    req.user = await User.findById(verified.id).select('-password');

    next();
  } catch {
    return res.status(401).json({ errors: ['Inavlid token.'] });
  }
};

module.exports = authGuard;
