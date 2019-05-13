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

function crearListaNombrePorcentajeVotosConPartido(partido){
  var miembrosPartido = crearListaPorPartido(partido);
  var listaNombrePorcentaje = [];
  
  miembrosPartido.forEach(miembro => {
    var miembroNombrePorcentaje = {nombre : "",dato : 0, party : partido};
		if(miembro.middle_name == null){
			miembroNombrePorcentaje.nombre = miembro.first_name+" "+miembro.last_name;
		}else{
			miembroNombrePorcentaje.nombre = miembro.first_name+" "+miembro.middle_name+" "+miembro.last_name;		
		}
    miembroNombrePorcentaje.dato = miembro.votes_with_party_pct;
    listaNombrePorcentaje.push(miembroNombrePorcentaje);
  })
  return listaNombrePorcentaje
}
function crearListaNombreVotosPerdidosConPartido(partido){
	var miembrosPartido = crearListaPorPartido(partido);
  var listaNombreVotos = [];
  
  miembrosPartido.forEach(miembro => {
    var miembroNombreVotos = {nombre : "", dato : 0, party : partido};
		if(miembro.middle_name == null){
			miembroNombreVotos.nombre = miembro.first_name+" "+miembro.last_name;
		}else{
			miembroNombreVotos.nombre = miembro.first_name+" "+miembro.middle_name+" "+miembro.last_name;		
		}
    miembroNombreVotos.dato = miembro.missed_votes;
    listaNombreVotos.push(miembroNombreVotos);
  })
  return listaNombreVotos
}
//Ordenamiento Descendente
function ordenarListaDescendente(lista){
	lista.sort(function(unElemento, otroElemento){
		if(unElemento.dato > otroElemento.dato){
			return -1;
		}
		if(unElemento.dato < otroElemento.dato){
			return 1;
		}
		return 0;
	})
}
//Ordenamiento Ascendente
function ordenarListaAscendente(lista){
	lista.sort(function(unElemento, otroElemento){
		if(unElemento.dato > otroElemento.dato){
			return 1;
		}
		if(unElemento.dato < otroElemento.dato){
			return -1;
		}
		return 0;
	})
}
var independientes = crearListaNombrePorcentajeVotosConPartido("R");
ordenarListaDescendente(independientes);
console.log(independientes);	

//Funcion para los menores
function miembrosConDatosMenoresDelPartido(lista, partido){
	var cantidadMiembros = lista.length;
	ordenarListaDescendente(lista);
	var peoresVotantes = [];
	
	while((peoresVotantes.length/cantidadMiembros)<0.1){
		var menor = lista.pop();
		var menoresRepetidos = [];
		menoresRepetidos = lista.filter(miembro => miembro.dato == menor.dato);
		peoresVotantes.push(menor);
		peoresVotantes.concat(menoresRepetidos);
	}
	ordenarListaDescendente(peoresVotantes);
	return peoresVotantes;
}

//Funcion para los mayores
function miembrosConDatosMayoresDelPartido(lista, partido){
	var cantidadMiembros = lista.length;
	ordenarListaAscendente(lista);
	var mejoresVotantes = [];
	
	while((mejoresVotantes.length/cantidadMiembros)< 0.1){
		var mayor = lista.pop();
		var mayoresRepetidos = [];
		mayoresRepetidos = lista.filter(miembro => miembro.dato == mayor.dato);
		mejoresVotantes.push(mayor);
		mejoresVotantes.concat(mayoresRepetidos);
	}
	ordenarListaDescendente(mejoresVotantes);
	return mejoresVotantes;
}
//Completando el data
var miembrosPorcentajeVotosRepublicanos = crearListaNombrePorcentajeVotosConPartido("R");
var miembrosVotosPerdidosRepublicanos = crearListaNombreVotosPerdidosConPartido("R");
var miembrosPorcentajeVotosDemocratas = crearListaNombrePorcentajeVotosConPartido("D");
var miembrosVotosPerdidosDemocratas= crearListaNombreVotosPerdidosConPartido("D");
var miembrosPorcentajeVotosIndependientes = crearListaNombrePorcentajeVotosConPartido("I");
var miembrosVotosPerdidosIndependientes = crearListaNombreVotosPerdidosConPartido("I");

var peoresPorcentajesVotosRepublicanos = miembrosConDatosMenoresDelPartido(miembrosPorcentajeVotosRepublicanos, "R");
var peoresPorcentajesVotosDemocratas = miembrosConDatosMenoresDelPartido(miembrosPorcentajeVotosDemocratas, "D");
var peoresPorcentajeVotosIndependientes = miembrosConDatosMenoresDelPartido(miembrosPorcentajeVotosIndependientes, "I");
var peoresPorcentajesVotos = peoresDemocratas.concat(peoresRepublicanos, peoresIndependientes);

var mejoresPorcentajesVotosRepublicanos = miembrosConDatosMayoresDelPartido(miembrosPorcentajeVotosRepublicanos, "R");
var mejoresPorcentajesVotosDemocratas = miembrosConDatosMayoresDelPartido(miembrosPorcentajeVotosDemocratas, "D");
var mejoresPorcentajesVotosIndependientes = miembrosConDatosMayoresDelPartido(miembrosPorcentajeVotosIndependientes, "I");
var mejoresPorcentajesVotos = mejoresDemocratas.concat(mejoresRepublicanos, mejoresIndependientes);
ordenarListaDescendente(mejoresPorcentajesVotos);
ordenarListaDescendente(peoresPorcentajesVotos);

statistics.members_who_often_do_vote_with_their_party = mejoresPorcentajesVotos;
statistics.members_who_often_do_not_vote_with_their_party = peoresPorcentajesVotos;

console.log(JSON.stringify(statistics));