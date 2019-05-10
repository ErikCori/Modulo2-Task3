var statistics = {
        number_of_democrats: 0,
        number_of_republicans: 0,
        number_of_independents: 0,
        total: 0,
        democrats_average_votes_with_party: 0,
        republicans_average_votes_with_party: 0,
        independents_average_votes_with_party: 0,
        members_who_often_do_not_vote_with_their_party: [],
        members_who_often_do_vote_with_their_party: [],
        members_who_missed_the_most_votes: [],
        members_who_missed_the_least_votes: [],
      }
//Array de miembros
var miembros = data.results[0].members;
//Funcion que crea lista de miembros por partido
function crearListaPorPartido(partido){
	 var miembrosPartido = miembros.filter(miembro => miembro.party == partido);
	 return miembrosPartido;
}
//Funcion que asigna el numero de miembros por partido
function asignarCantidadDeMiembrosPorPartido(partido){
  var miembrosPartido = crearListaPorPartido(partido);
  asignarCantidad(partido, miembrosPartido);
}
function asignarCantidad(partido, elementos){
  if(partido == "D"){
    statistics.number_of_democrats = elementos.length;
  }else{
    if(partido == "R"){
      statistics.number_of_republicans = elementos.length;
    }else{
      statistics.number_of_independents = elementos.length;
    }
  }
}
//Agrego cantidad de miembros por partido
asignarCantidadDeMiembrosPorPartido("D");
asignarCantidadDeMiembrosPorPartido("R");
asignarCantidadDeMiembrosPorPartido("I");
statistics.total = miembros.length;

/*//Creo listas de miembros por partido
var miembrosDemocratas = crearListaPorPartido("D");
var miembrosRepublicanos = crearListaPorPartido("R");
var miembrosIndependientes = crearListaPorPartido("I");

//Agrego cantidad de miembros por partido a statistics
statistics.total = miembros.length; 
statistics.number_of_democrats = miembrosDemocratas.length;
statistics.number_of_republicans = miembrosRepublicanos.length;
statistics.number_of_independents = miembrosIndependientes.length;
*/
console.log(JSON.stringify(statistics));


function asignarPromedioDeVotosPorPartido(partido){
  var promedioPorPartido = promedioDeVotosPorPartido(partido);
  asignarPromedio(partido, promedioPorPartido);
}

//Funcion que calcula el promedio de votos por partido
function promedioDeVotosPorPartido(partido){
  var miembrosPartido = crearListaPorPartido(partido);
  var cantidadMiembros = miembrosPartido.length;
  var porcentajeTotalVotos = 0;
  miembrosPartido.forEach(member => {
    porcentajeTotalVotos += member.votes_with_party_pct;
  })
  var promedio = porcentajeTotalVotos /cantidadMiembros;
  return promedio;
}
function asignarPromedio(partido, elemento){
  if(partido == "D"){
    statistics.democrats_average_votes_with_party = elemento;
  }else{
    if(partido == "R"){
      statistics.republicans_average_votes_with_party = elemento;
    }else{
      statistics.independents_average_votes_with_party = elemento;
    }
  }
}
//Asigno promedio de votos por partido
asignarPromedioDeVotosPorPartido("D");
asignarPromedioDeVotosPorPartido("R");
asignarPromedioDeVotosPorPartido("I");

console.log(JSON.stringify(statistics));

function crearListaNombrePorcentajePorPartido(partido){
  var miembrosPartido = crearListaPorPartido(partido);
  var listaNombrePorcentaje = [];
  
  miembrosPartido.forEach(miembro => {
    var miembroNombrePorcentaje = {nombre : "",porcentajeVotos : 0};
		if(miembro.middle_name == null){
			miembroNombrePorcentaje.nombre = miembro.first_name+" "+miembro.last_name;
		}else{
			miembroNombrePorcentaje.nombre = miembro.first_name+" "+miembro.middle_name+" "+miembro.last_name;		
		}
    miembroNombrePorcentaje.porcentajeVotos = miembro.votes_with_party_pct;
    listaNombrePorcentaje.push(miembroNombrePorcentaje);
  })
  return listaNombrePorcentaje
}
//Ordenamiento Descendente
function ordenarListaPorPorcentajeDescendente(lista){
	lista.sort(function(unElemento, otroElemento){
		if(unElemento.porcentajeVotos > otroElemento.porcentajeVotos){
			return -1;
		}
		if(unElemento.porcentajeVotos < otroElemento.porcentajeVotos){
			return 1;
		}
		return 0;
	})
}
//Ordenamiento Ascendente
function ordenarListaPorPorcentajeAscendente(lista){
	lista.sort(function(unElemento, otroElemento){
		if(unElemento.porcentajeVotos > otroElemento.porcentajeVotos){
			return 1;
		}
		if(unElemento.porcentajeVotos < otroElemento.porcentajeVotos){
			return -1;
		}
		return 0;
	})
}
var independientes = crearListaNombrePorcentajePorPartido("R");
ordenarListaPorPorcentajeDescendente(independientes);
console.log(independientes);	

function miembrosQueMenosVotanConSuPartido(partido){
	var miembrosPartido = crearListaNombrePorcentajePorPartido(partido);
	var cantidadMiembros = miembrosPartido.length;
	ordenarListaPorPorcentajeDescendente(miembrosPartido);
	var peoresVotantes = [];
	
	while((peoresVotantes.length/cantidadMiembros)<0.1){
		var menor = miembrosPartido.pop();
		var menoresRepetidos = [];
		menoresRepetidos = miembrosPartido.filter(miembro => miembro.porcentajeVotos == menor.porcentajeVotos);
		peoresVotantes.push(menor);
		peoresVotantes.concat(menoresRepetidos);
	}
	ordenarListaPorPorcentajeDescendente(peoresVotantes);
	return peoresVotantes;
}
function miembrosQueMasVotanConSuPartido(partido){
	var miembrosPartido = crearListaNombrePorcentajePorPartido(partido);
	var cantidadMiembros = miembrosPartido.length;
	ordenarListaPorPorcentajeAscendente(miembrosPartido);
	var mejoresVotantes = [];
	
	while((mejoresVotantes.length/cantidadMiembros)< 0.1){
		var mayor = miembrosPartido.pop();
		var mayoresRepetidos = [];
		mayoresRepetidos = miembrosPartido.filter(miembro => miembro.porcentajeVotos == mayor.porcentajeVotos);
		mejoresVotantes.push(mayor);
		mejoresVotantes.concat(mayoresRepetidos);
	}
	ordenarListaPorPorcentajeDescendente(mejoresVotantes);
	return mejoresVotantes;
}

var peoresRepublicanos = miembrosQueMenosVotanConSuPartido("R");
var peoresDemocratas = miembrosQueMenosVotanConSuPartido("D");
var peoresIndependientes = miembrosQueMenosVotanConSuPartido("I");
var peoresVotantes = peoresDemocratas.concat(peoresRepublicanos, peoresIndependientes);
var mejoresRepublicanos = miembrosQueMasVotanConSuPartido("R");
var mejoresDemocratas = miembrosQueMasVotanConSuPartido("D");
var mejoresIndependientes = miembrosQueMasVotanConSuPartido("I");
var mejoresVotantes = mejoresDemocratas.concat(mejoresRepublicanos, mejoresIndependientes);
ordenarListaPorPorcentajeDescendente(mejoresVotantes);
ordenarListaPorPorcentajeDescendente(peoresVotantes);

statistics.members_who_missed_the_least_votes = mejoresDemocratas;
statistics.members_who_missed_the_most_votes = peoresVotantes;

console.log(JSON.stringify(statistics));