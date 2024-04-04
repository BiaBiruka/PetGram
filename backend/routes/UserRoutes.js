const express = require('express');
const router = express.Router();

// Importa a função do controller
const { register } = require('../controllers/UserController');

// Middleware
const validate = require("../middlewares/handleValidation")

// Rotas - define o tipo (post, get...), o caminho e a função executada
// coloca-se o middleware entre a rota e a função
router.post('/register', validate, register);

module.exports = router;
