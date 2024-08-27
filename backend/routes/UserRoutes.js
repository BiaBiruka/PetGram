const express = require('express');
const router = express.Router();

// Importa a função do controller
const {
  register,
  login,
  getCurrentUser,
  update,
  getUserById,
} = require('../controllers/UserController');

// Middleware
const validate = require('../middlewares/handleValidation');
const {
  userCreateValidation,
  loginValidation,
  userUpdateValidation,
} = require('../middlewares/userValidations');
const authGuard = require('../middlewares/authGuard');
const { imageUpload } = require('../middlewares/imageUpload');

// Rotas - define o tipo (post, get...), o caminho e a função executada
// coloca-se o middleware entre a rota e a função
// validate vai pegar os erros vindos do userCreateValidation, por isso vem depois
router.post('/register', userCreateValidation(), validate, register);
router.post('/login', loginValidation(), validate, login);
router.get('/profile', authGuard, getCurrentUser);
router.put(
  '/',
  authGuard,
  userUpdateValidation(),
  validate,
  imageUpload.single('profileImage'),
  update
);
router.get('/:id', getUserById);

module.exports = router;
