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
    miembroNombrePorcentaje.nombre = miembro.first_name+" "+miembro.;
    miembroNombrePorcentaje.porcentajeVotos = miembro.votes_with_party_pct;
    listaNombrePorcentaje.push(miembroNombrePorcentaje);
  })
  return listaNombrePorcentaje
}
console.log(crearListaNombrePorcentajePorPartido("I"));
