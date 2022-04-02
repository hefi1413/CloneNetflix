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

      //console.table( filmes );

      setTimeout(() => {
        message = '';
      }, 5000);
  
      res.render(fileName, { 'filmes': filmes, 'message': message });
    } catch (err) {
      console.log( `Erro ! ${err}`);

      res.status(500).send('Não foi possível exibir os dados.');
    }
  },

  // renderiza tela de cadastro
  // --------------------------
  cadastro: async function (req, res, next) {
    console.log(req.method + ' ' + req.url);

    setTimeout(() => {
      message = '';
    }, 5000);

    res.render('cadastro', { 'message': message });

  },

  // Adiciona/cadastra um titulo no catalogo (/cadastro/add)
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
        res.redirect('/cadastro');
        return;
      }

      // adiciona filme
      Filmes.create(_filme)
        .then(() => {
          message = `Parabéns! Filme adicionado com sucesso!`;

          res.redirect('/cadastro');
        })
        .catch(err => {
          message = `Não foi possível adicionar filme!`;

          throw new Error(err.message);
        });
    } catch (err) {
      console.log('Erro ! ' + err.message);

      res.redirect('/cadastro');
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

      setTimeout(() => {
        message = '';
      }, 5000);
  
      res.render('detalhes.ejs', { 'filme': filme, 'message': message });

    } catch (err) {
      message = `Erro ! Não foi possível exibir detalhes do filme.`;

      console.log('Erro ! ' + err.message );

      res.redirect('/');
    }
  },

  // renderiza a tela de edição (/detalhes/editar)
  editar: async function (req, res, next) {
    console.log(req.method + ' ' + req.url);

    let filmeid = req.params.id;
    try {
      // localiza filme no BD
      let filme = await Filmes.findByPk(filmeid);

      if (!filme) {
        message = `Erro ! O filme id:${filmeid} não foi localizado !`;
        res.redirect(`/detalhes/${filmeid}`);
        return;
      };

      setTimeout(() => {
        message = '';
      }, 5000);
  
      res.render('editar', { 'filme': filme, 'message': message });

    } catch (err) {
      message = `Erro ! Não foi possível editar filme.`;

      console.log('Erro ! ' + err.message );

      res.redirect(`/detalhes/${filmeid}`);
    }
  },


  // Altera um titulo cadastrado no catalogo
  // --------------------------
  alterar: async function (req, res, next) {
    console.log(req.method + ' ' + req.url);

    //console.log('req.body',  req.body );

    let _filme = req.body;
    try {
      // localiza filme no BD
      var filme = await Filmes.findByPk(_filme.id);

      if (!filme) {
        message = `Erro ! O filme ${_filme.nome} não foi localizado !`;

        console.log( message );

        res.redirect(`/detalhes/${_filme.id}`);
        return;
      }
      //
      // Altera filme

      // prevem o servidor de aletrar o id do filme
      delete filme.id;

      filme.nome = _filme.nome;
      filme.descricao = _filme.descricao;
      filme.imagem = _filme.imagem;

      filme.save()
        .then(result => {
          message = `Sucesso ! Filme alterado com sucesso.`;

          res.redirect(`/editar/${_filme.id}`);
        })
        .catch(err => {
          message = `Erro ! Não foi possível aletrar filme.`;

          throw new Error(err.message);
        });
    } catch (err) {
      console.log('Erro ! ' + err.message );

      res.redirect(`/editar/${_filme.id}`);
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

          throw new Error(err.message);
        });
    } catch (err) {
      console.log('Erro ! ' + err.message);

      res.redirect('/');
    }
  },
};

module.exports = filmesController;