
//
//  SCRIPT CONTROLLER 
//

const  Filmes = require('../models/filmes');

var Controller = {

    // Exibe todos titulos cadastrados no catalogo
    // --------------------------
    listar: async function(req, res, next) {
        
        try{ 

            throw new Error( 'outro teste outro teste' );
        }
        catch( err ) {

            let message ='Erro ! ' + err.message ;

            console.log( message );

            res.status(500).send( message );

        }
    },
};

module.exports = Controller;