//funcion que crea la tabla con el contenido incluido
function crearTablaEnHtml(members){
	var tabla = document.getElementById('table-data');
	tabla.innerHTML ="";
	var contenidoTabla = crearContenidoTabla(members);
	tabla.innerHTML = contenidoTabla;
}



//Funcion que crea el contenido de la tabla
function crearContenidoTabla(members){
	var table = '<thead class="thead"><tr><th>Full name</th><th>Party</th><th>State</th><th>Seniority</th><th>Percentage of votes whith party</th></tr></thead>';
	
	table += '<tbody>';
	
	members.forEach(function(member){
		table += '<tr>';
		if(member.middle_name === null){
			table += '<td ><a href ="' +member.url+ '">' + member.first_name+' '+member.last_name+'</td>';
		}else{
			table +='<td><a href="' +member.url+ '">'+member.first_name+' '+member.middle_name+' '+member.last_name+'</td>';
		}
	table += '<td class="party">'+member.party+'</td>';
	table += '<td class="state">'+member.state+'</td>';
	table += '<td>'+member.seniority+'</td>';
	table += '<td>% '+member.votes_with_party_pct+'</td>';
	table += '</tr>';
	})
	table += '</tbody>';
	return table;
}

//Funcion que crea el contenido de la tabla senate at glance
function crearContenidoTablaSenateAtGlance(elementos){
  var tabla = '<thead class="thead"><tr><th>Party</th><th>Number of Reps</th><th>% Voted with Party</th></tr></thead>';
  tabla +='<tbody>';
  
  elementos.forEach(elemento =>{
    tabla += '<tr>';
    table += '<td class="party">'+elemento.party+'</td>';
    tabla += '<td class="numberOfReps">'+elemento.numberOfReps+'</td>';
    tabla += '<td class="porcVotedWithParty>'+elemento.porcVotedWithParty+'</td>'
    tabla += '</tr>';
  })
  tabla += '</tbody>';
  return tabla;
}