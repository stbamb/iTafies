$(document).ready(function (){


	
 })


 //Guardar usuario en DB
function guardarUsuario(usuario){

	var url = "http://192.168.1.120:3000/crearusuario/"
	console.log(url);
	
	var xhr = createCORSRequest('POST', url);
	if (!xhr) {
		throw new Error('CORS not supported');
	}
	
	xhr.setRequestHeader("Content-Type", "application/json");
	xhr.onload = function() {
		var responseText = xhr.responseText;
		alert(responseText);
	};

	xhr.onerror = function() {
		console.log('There was an error!');
	};
	
	xhr.send(JSON.stringify(usuario));
	
}
 

//Agrega un nuevo usuario
function registrar(){
	var form = $("#form")[0];

	var name = form.name.value;
	var username = form.username.value;
	var password = form.password.value;
	var password2 = form.password2.value;
	
	if (name != "" && username != "" && password != ""){
		if (password != password2){
			alert("Las contraseñas no coinciden");
		}
		else{
			//GUARDAR USUARIO
			var usuario = {'nombre': name, 'username': username, 'password': password};
			guardarUsuario(usuario);
		}
	}
	
	else{
		alert("Debe llenar todos los campos");
	}
}


function createCORSRequest(method, url) {
	var xhr = new XMLHttpRequest();
	if ("withCredentials" in xhr) {

		// Check if the XMLHttpRequest object has a "withCredentials" property.
		// "withCredentials" only exists on XMLHTTPRequest2 objects.
		xhr.open(method, url, true);

	} else if (typeof XDomainRequest != "undefined") {

		// Otherwise, check if XDomainRequest.
		// XDomainRequest only exists in IE, and is IE's way of making CORS requests.
		xhr = new XDomainRequest();
		xhr.open(method, url);

	} else {

		// Otherwise, CORS is not supported by the browser.
		xhr = null;

	}
	return xhr;
}