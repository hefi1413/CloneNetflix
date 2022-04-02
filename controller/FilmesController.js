//  SCRIPT CONTROLLER

const Filmes = require('../models/filmes.js');

var message = '';

var filmesController = {
  // Exibe todos titulos cadastrados no catalogo
  // --------------------------
  listar: async function (req, res, next) {
    const fileName = 'index.ejs';

    try {
      let filmes = await Filmes.findAll({ raw: true });

      //console.log( filmes );

      setTimeout(() => {
        message = '';
      }, 5000);

      res.render(fileName, { 'filmes': filmes, 'message': message });
    } catch (err) {
      console.log( `Erro ! ${err}`);

      res.status(500).send('Não foi possível exibir os dados.');
    }
  },

  // Adiciona/cadastra um titulo no catalogo
  // --------------------------
  adicionar: async function (req, res, next) {
    console.log(req.method + ' ' + req.url);

    let _filme = req.body;
    console.log(_filme);
    try {
      // verifica se filme ja esta cadastrado
      let filme = await Filmes.findOne({ where: { nome: _filme.nome } });

      if (filme) {
        // filme ja existe catalogo
        message = `Erro! Filme ja existe no catálogo!`;
        console.log(message);
        res.redirect('/');
        return;
      }

      // adiciona filme
      Filmes.create(_filme)
        .then(() => {
          message = `Parabéns! Filme adicionado com sucesso!`;
          res.redirect('/');
        })
        .catch(err => {
          message = `Não foi possível adicionar filme!`;

          throw new Error(message);
        });
    } catch (err) {
      console.log('Erro ! ' + err.message);

      res.redirect('/');
    }
  },

  // Altera um titulo cadastrado no catalogo
  // --------------------------
  editar: async function (req, res, next) {
    console.log(req.method + ' ' + req.url);

    let _filme = req.body;
    try {
      // localiza filme no BD
      var filme = await Filmes.findByPk(_filme.id);

      if (!filme) {
        message = `Erro ! O filme ${_filme.nome} não foi localizado !`;
        res.redirect('/');
        return;
      }
      //
      // Altera filme

      // prevem o servidor de aletrar o id do filme
      delete filme.id;

      filme.nome = _filme.nome;
      filme.ano = _filme.ano;
      filme.genero = _filme.genero;
      filme.descricao = _filme.descricao;
      filme.tipo = _filme.tipo;
      filme.imagem = _filme.imagem;

      filme.save()
        .then(result => {
          message = `Sucesso ! Filme alterado com sucesso.`;

          res.redirect('/');
        })
        .catch(err => {
          message = `Erro ! Não foi possível aletrar filme.`;

          throw new Error(message);
        });
    } catch (err) {
      console.log('Erro ! ' + err.message );

      res.redirect('/');
    }
  },


  // renderiza tela detalhes
  detalhes: async function (req, res, next) {
    console.log(req.method + ' ' + req.url);

    let flmeid = req.params.id;
    try {
      // localiza filme no BD
      let filme = await Filmes.findByPk(flmeid);

      if (!filme) {
        message = `Erro ! O filme id:${flmeid} não foi localizado !`;
        res.redirect('/');
        return;
      };
      res.render('detalhes.ejs', { 'filme': filme });

    } catch (err) {
      console.log('Erro ! ' + err.message );

      res.redirect('/');
    }
  },



  // renderiza a tela de edição
  render: async function (req, res, next) {
    console.log(req.method + ' ' + req.url);

    let _filme = req.body;
    try {
      // localiza filme no BD
      let filme = await Filmes.findByPk(_filme.id);

      if (!filme) {
        message = `Erro ! O filme ${_filme.nome} não foi localizado !`;
        res.redirect('/');
        return;
      };
      res.render('cadastro.ejs', { 'filme': filme });

    } catch (err) {
      console.log('Erro ! ' + err.message );

      res.redirect('/');
    }
  },


  // Exclui um titulo do catalogo
  // --------------------------
  deletar: async function (req, res, next) {
    console.log(req.method + ' ' + req.url);

    let filmeId = req.params.id;

    try {
      // localiza filme no BD
      var filme = await Filmes.findByPk(filmeId);

      if (!filme) {
        message = `Erro ! O filme ${filmeId} não foi localizado !`;
        res.redirect('/');
        return;
      }

      filme.destroy()
        .then(() => {
          message = `Filme deletado com sucesso.`;

          res.redirect('/');
        })
        .catch(err => {
          message = `Não foi possível deletar o filme.`;

          throw new Error(message);
        });
    } catch (err) {
      console.log('Erro ! ' + err.message);

      res.redirect('/');
    }
  },
};

module.exports = filmesController;