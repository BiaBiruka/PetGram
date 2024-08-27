const multer = require('multer');
const path = require('path');

// Destino da imagem
const imageStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    let folder = '';

    // Se vem de rota de usuário, salva na pasta de usuário
    // Se não, salva em outra pasta
    if (req.baseUrl.includes('users')) {
      folder = 'users';
    } else if (req.baseUrl.includes('photos')) {
      folder = 'photos';
    }

    // Função de callback
    cb(null, `uploads/${folder}/`);
  },
  filename: (req, file, cd) => {
    cb(null, Date.now() + path.extname(file.originalname)); //xxxxx020520204.png
    // Em um sistema maior, o ideal seria utilizar por exemplo uuid para gerar ids aleatórios
    // Isso evita o risco de repetir os nomes e acabar sobreescrevendo algo
  },
});

const imageUpload = multer({
  storage: imageStorage,
  fileFilter(req, file, cb) {
    // Verifica se o arquivo é .jpg ou .png usando expressão regular
    if (!file.originalname.match(/\.(png|jpg)$/)) {
      return cb(
        new Error(
          'Formato de imagem incompatível. Envie um arquivo de extendsão .png ou .jpg.'
        )
      );
    }
    cb(undefined, true);
  },
});

module.exports = { imageUpload };
