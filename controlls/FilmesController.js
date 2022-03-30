
//
//  SCRIPT CONTROLLER 
//

const  Filmes = require('../models/filmes');

var message = '';

  
var filmesController = {

    // Exibe todos titulos cadastrados no catalogo
    // --------------------------
    listar: async function(req, res, next) {
        console.log( req.method + ' ' + req.url  );

        const fileName ='consultarTeste.ejs';
        
        try {
            let filmes = await Filmes.findAll( { raw: true } );

            //console.table( filmes );

            setTimeout(() => {
                message = ""
            }, 5000);
          
            res.render( fileName , { 'filmes': filmes, 'message': message });
        }
        catch( err ) {
            message = 'Erro ! ' + err.message;
            res.status(500).send( message );
        }
    },

    // Adiciona/cadastra um titulo no catalogo
    // --------------------------
    adicionar: async function(req, res, next) {
        console.log( req.method + ' ' + req.url  );
        
        let _filme =req.body;
        try {
            // verifica se filme ja esta cadastrado
            let filme =await Filmes.findOne( { where: { 'codigo': _filme.codigo } } );

            if( filme ) {   // filme ja existe catalogo
                message = `Erro! Filme ja existe no catálogo!`;
                res.redirect("/");
                return;
            };

            //console.log('filme: ', filme);
            
            // adiciona filme
            Filmes.create( _filme )
            .then( () => { 
                message = `Parabéns! Filme adicionado com sucesso!`;
                
                console.log('message: ', message);

                res.redirect("/");
             } )
             .catch( (err) => {
                message = `Não foi possível adicionar filme! \r\n ${err}` ; 

                // console.log('err : ', message);

                throw new Error( message );
             });
        } catch( err ) {
            message = "Erro ! " + err.message;

            console.log( message );

            res.redirect("/");
        }
    },

    // Altera um titulo cadastrado no catalogo
    // --------------------------
    editar: async function(req, res, next) {
        console.log( req.method + ' ' + req.url  );

        let _filme =req.body;
        try {
            // localiza filme no BD
            var filme = await Filmes.findByPk(_filme.id);

            if( ! filme ) {
                message =`Erro ! O filme ${_filme.nome} não foi localizado !`;
                res.redirect("/");
                return;
            };
            //
            // Altera filme

            // prevem o servidor de alterar o id do filme
            delete filme.id;

            filme.nome =_filme.nome;
            filme.ano = _filme.ano;
            filme.genero = _filme.genero;
            filme.descricao = _filme.descricao;
            filme.tipo = _filme.tipo;
            filme.imagem = _filme.imagem;

            filme.save()
            .then( (result) => {
                message = `Sucesso ! Filme alterado com sucesso.`;

                //console.log( 'message:', result );

                res.redirect("/");
            })
            .catch( (err) => {
                message = `Erro ! Não foi possível aletrar filme.  ${err.message}`;

                //console.log( 'Error:', err );

                throw new Error( message );
            });
        }
        catch( err ) {
            message = "Erro ! " + err.message;

            console.log( message );

            res.redirect("/");
        }
    },

    // Exclui um titulo do catalogo
    // --------------------------
    deletar: async function(req, res, next) {
        console.log( req.method + ' ' + req.url  );

        let filmeId =req.params.id;
        try {
            // localiza filme no BD
            var filme = await Filmes.findByPk(filmeId);
        
            filme.destroy()
            .then( () => {
                message = `Sucesso ! Filme deletado com sucesso.`;
    
                res.redirect("/")
            })
            .catch( (err) => {
                message = `Não foi possível deletar o filme.  ${err.message}`;

                //console.log( 'Error:', err );

                throw new Error( message );
            });
        }
        catch( err ) {
            message = "Erro ! " + err.message;

            console.log( message );

            res.redirect("/");
        }
    },
};


module.exports =filmesController;