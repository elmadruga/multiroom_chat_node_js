// Importando o módulo do framework Express
var express = require('express');

// Importando o módulo do consign
var consign = require('consign');

// Importando o módulo do body-parser
var bodyParser = require('body-parser');

// Importando o módulo do express-validator
var expressValidator = require('express-validator');


// Iniciando o objeto do express
var app = express();

// Setando as variáveis 'view engine' e 'views do express
app.set('view engine', 'ejs');
app.set('views', './app/views');

// Configurando o middleware express.static
app.use(express.static('./app/public'));

// Configurando o middleware body-parser
app.use(bodyParser.urlencoded({extended: true}));

// Configurando o middleware express-validator
app.use(expressValidator());

// Efetua o autoload das rotas, models, e controllers para o objeto app
consign()
    .include('app/routes')
    .then('app/models')
    .then('app/controllers')
    .into(app);


// Exportando o objeto app que será usado por app.js
module.exports = app;