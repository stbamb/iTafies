function misEventos(){
	window.location.href = "/eventos.html?srch-term=" + JSON.parse(localStorage.user).username;
}

function buscar(){
	window.location.href = "/eventos.html?srch-term=" + $("#srch-term")[0].value;
}

function getPosition(){
	//window.location.href = 'http://files.parsetfss.com/8b6b30bb-d33b-40a6-9fac-f3d8ee991c0f/tfss-dc91c8b9-d40f-43ac-992f-da4d54079c4f-maps.html';
}
