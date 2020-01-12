// .....................................................................
// ReglasREST.js
// .....................................................................
module.exports.cargar = function( servidorExpress, laLogica ) {
	
	// .......................................................
	// GET /prueba
	// .......................................................
	servidorExpress.get('/prueba', function( peticion, respuesta ){
		console.log( " * GET /prueba " )
		respuesta.send( "¡Funciona!" )
	}) // get /prueba

	// .......................................................
	// GET /persona/<dni>
	// .......................................................

	servidorExpress.get(
		'/persona/:dni',
		async function( peticion, respuesta ){
			console.log( " * GET /persona " )

			// averiguo el dni
			var dni = peticion.params.dni

			// llamo a la función adecuada de la lógica
			var res = await laLogica.buscarPersonaConDNI( dni )

			// si el array de resultados no tiene una casilla ...
			if( res.length != 1 ) {
				// 404: not found
				respuesta.status(404).send( "no encontré dni: " + dni )
				return
			}

			// todo ok
			respuesta.send( JSON.stringify( res[0] ) )
	}) // get /persona


	// .......................................................
	// POST /alta
	// .......................................................

	servidorExpress.post(
		'/alta/', async function(req, res, next) {
		console.log( " * POST /alta ")
		console.log( "req.body:",req.body)
    		var errors=[]
    		if (!req.body.dni){
        		errors.push("No se ha incluido el dni");
    		}
    		if (!req.body.nombre){
        		errors.push("No se ha incluido el nombre");
    		}
    		if (!req.body.apellidos){
        		errors.push("No se han incluido los apellidos");
    		}
    		if (errors.length){
        		res.status(400).json({"error":errors.join(",")});
        		return;
    		}

		var dni = req.body.dni
		var nombre = req.body.nombre
		var apellidos = req.body.apellidos

		var res = await laLogica.insertarPersona(dni,nombre,apellidos)

        	if (err){
            		res.status(400).json({"error": err.message})
            		return;
        	}
		
		// todo ok
		res.send( JSON.stringify( res[0] ) )

    	}) //post alta

} // cargar()
// .....................................................................
// .....................................................................
