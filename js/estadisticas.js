//Array de miembros
var miembros = data.results[0].members;
//Funcion que crea lista de miembros por partido

function crearListaPorPartido(partido){
	 var miembrosPartido = miembros.filter(miembro => miembro.party == partido);
	 return miembrosPartido;
}
//Creo listas de miembros por partido
var cantMiembrosDemocratas = crearListaPorPartido("D");
var cantMiembrosRepublicanos = crearListaPorPartido("R");
var cantMiembrosIndependientes = crearListaPorPartido("I");

//Agrego cantidad de miembros por partido a statistics
statistics.total = miembros.length; 
statistics.number_of_democrats = cantMiembrosDemocratas.length;
statistics.number_of_republicans = cantMiembrosRepublicanos.length;
statistics.number_of_independents = cantMiembrosIndependientes.length;

console.log(JSON.stringify(statistics));

