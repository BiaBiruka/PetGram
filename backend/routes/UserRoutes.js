const express = require('express');
const router = express.Router();

// Importa a função do controller
const {
  register,
  login,
  getCurrentUser,
} = require('../controllers/UserController');

// Middleware
const validate = require('../middlewares/handleValidation');
const {
  userCreateValidation,
  loginValidation,
} = require('../middlewares/userValidations');
const authGuard = require('../middlewares/authGuard');

// Rotas - define o tipo (post, get...), o caminho e a função executada
// coloca-se o middleware entre a rota e a função
// validate vai pegar os erros vindos do userCreateValidation, por isso vem depois
router.post('/register', userCreateValidation(), validate, register);
router.post('/login', loginValidation(), validate, login);
router.get('/profile', authGuard, getCurrentUser);

module.exports = router;
