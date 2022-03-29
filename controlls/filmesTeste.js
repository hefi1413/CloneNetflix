
//
//  SCRIPT CONTROLLER 
//

const  Filmes = require('../models/filmes');

var Controller = {

    // Exibe todos titulos cadastrados no catalogo
    // --------------------------
    listar: async function(req, res, next) {
        
        const fileName = 'consultar.ejs';
        try{ 

            Filmes.findAll({raw: true})
                .then( (filmes) => {
                    res.render(fileName, { filmes });
                })
                .catch( err => {
                    res.status(500).send( err.messsage );
                })
        }
        catch( e ) {

            console.log( 'Err:', e );

            res.status(500).send( e );

        }
    },
};

module.exports = Controller;