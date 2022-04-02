const express = require('express');
const path = require('path');
require('dotenv').config();
const Filmes = require('./models/filmes');
const app = express();
const port = process.env.PORT || 3000;
const env = require('dotenv');

// enviroment variables
env.config();

// controllers do app
const filmesController = require('./controller/FilmesController');

app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));


//Rotas //

// consulta
app.get('/', filmesController.listar);

// adiciona no banco de dados
app.post('/add', filmesController.adicionar);

// renderiza a tela de edição
app.get('/editar/:id', filmesController.editar);

// altera no banco de dados
app.post('/editar', filmesController.alterar);

// deleta no banco de dados
app.post('/deletar/:id', filmesController.deletar);

app.get('/cadastro', filmesController.cadastro);

app.get('/detalhes/:id', filmesController.detalhes);

/*
app.get('/', (req, res) => {
  res.render('index.ejs');
});
*/


/*
app.get('/detalhes/:id', async (req, res) => {
  const filme = await Filmes.findByPk(req.params.id);
  res.render('detalhes', { filme: filme });
});
*/

app.get('/deletar/:id', async (req, res) => {
 const filme = await Filmes.findByPk(req.params.id);
 res.render('deletar', { filme: filme });
});

app.listen(port, () => console.log(`Servidor rodando em http://localhost:${port}`));