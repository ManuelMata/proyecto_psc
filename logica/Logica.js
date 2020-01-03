// .....................................................................
// Logica.js
// .....................................................................

const sqlite3 = require( "sqlite3" )

// .....................................................................
// .....................................................................

module.exports = class Logica {
	// .................................................................
	// nombreBD: Texto
	// -->
	//	constructor () -->
	// .................................................................
	constructor( nombreBD, cb ) {
		this.laConexion = new sqlite3.Database(
			nombreBD,
			( err ) => {		
				if( ! err ) {
					this.laConexion.run( "PRAGMA foreign_keys = ON" )
				}
				cb( err)
			})
} // ()

// .................................................................
// nombreTabla:Texto
//	-->
//		borrarFilasDe() -->
// .................................................................

borrarFilasDe( tabla ) {
	return new Promise( (resolver, rechazar) => {
		this.laConexion.run(
			"delete from " + tabla + ";",
			(err)=> ( err ? rechazar(err) : resolver() )
		 )
	})
} // ()

// .................................................................
// borrarFilasDeTodasLasTablas() -->
// .................................................................

async borrarFilasDeTodasLasTablas() {
	await this.borrarFilasDe( "Matricula" )
	await this.borrarFilasDe( "Asignatura" )
	await this.borrarFilasDe( "Persona" )
} // ()

// .................................................................
// datos:{dni:Texto, nombre:Texto: apellidos:Texto}
// -->
//	insertarPersona() -->
// .................................................................

insertarPersona( datos ) {
	var textoSQL =
		'insert into Persona values( $dni, $nombre, $apellidos );'
	var valoresParaSQL = { $dni: datos.dni, $nombre: datos.nombre,
							$apellidos: datos.apellidos }
	return new Promise( (resolver, rechazar) => {
		this.laConexion.run( textoSQL, valoresParaSQL, function( err ) {
			( err ? rechazar(err) : resolver() )
		})
	})
} // ()

// .................................................................
// dni:Texto
// 	-->
//	buscarPersonaPorDNI() <--
//	<--
// {dni:Texto, nombre:Texto: apellidos:Texto}
// .................................................................

buscarPersonaConDNI( dni ) {
	var textoSQL = "select * from Persona where dni=$dni";
	var valoresParaSQL = { $dni: dni }

	return new Promise( (resolver, rechazar) => {
		this.laConexion.all( textoSQL, valoresParaSQL,
			( err, res ) => {
				( err ? rechazar(err) : resolver(res) )
			})
	})
} // ()

// .................................................................
// cerrar() -->
// .................................................................

cerrar() {
	return new Promise( (resolver, rechazar) => {
		this.laConexion.close( (err)=>{
			( err ? rechazar(err) : resolver() )
		})
	})
} // ()

} // class
// .....................................................................
// .....................................................................

