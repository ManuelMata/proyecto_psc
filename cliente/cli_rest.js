const request = require('request');
var assert = require ('assert');
var datosPersona = { dni : "5678B", nombre : "Luis", apellidos : "Mayorgas Perez" }
request.post( 
	{ url : "http://localhost:8080/insertarPersona", 
	  headers : { 'User-Agent' : 'Manuel', 'Content-Type' : 'application/json' },
	  body : JSON.stringify( datosPersona ) 
        }, function( err, respuesta, carga ) {
		assert.equal( err, null, "¿ha habido un error?" )
		assert.equal( respuesta.statusCode, 200, "¿El codigo no es 200 (OK)" )})
