// Arquivo de inicialização
require('dotenv').config();

const express = require('express');
const path = require('path');
const cors = require('cors');

const port = process.env.PORT;

const app = express();

// Configura para receber respostas em formato JSON ou form data (imagens)
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Resolver CORS (qdo executa requisições pelo mesmo domínio)
app.use(cors({ credentials: true, origin: 'http://localhost:3000' }));

// diretório de upload de imagens
// define que são arquivos estáticos dentro de uma pasta Uploads no diretório
app.use('/uploads', express.static(path.join(__dirname, "/uplodas")));

// conexão com o BD
require("./config/db.js")

// rotas
const router = require('./routes/Router.js');
app.use(router);

app.listen(port, () => {
  console.log(`Rodando na porta ${port}`);
});
