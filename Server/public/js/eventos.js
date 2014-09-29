$(document).ready(function (){
	
	
	
	var a = window.location.toString();
	var params = a.substring(a.indexOf("html")+4);
	
	//Si contiene parametros, indica que se realiza una búsqueda
	if (params != ""){
		params = params.substring(params.indexOf("=")+1);
		var url = "http://192.168.1.120:3000/eventos/" + params;
		var xhr = createCORSRequest('GET', url);
		if (!xhr) {
			throw new Error('CORS not supported');
		}

		xhr.onload = function() {
			var responseText = xhr.responseText;
			// process the response.
			mostrarEventos(responseText);
		};

		xhr.onerror = function() {
			console.log('There was an error!');
		};
		
		xhr.send();
	}
	
	//Si no contiene parámentros, página principal.
	else{
		var url = "http://192.168.1.120:3000/eventos";
		var xhr = createCORSRequest('GET', url);
		if (!xhr) {
			throw new Error('CORS not supported');
		}

		xhr.onload = function() {
			var responseText = xhr.responseText;
			// process the response.
			mostrarEventos(responseText);
		};

		xhr.onerror = function() {
			console.log('There was an error!');
		};
		
		xhr.send();
	}
 })
 
 
 
 
 function mostrarEventos(response) {
	var arr = JSON.parse(response);
	var i;
	var out = "<hr>";

	for(i = 0; i < arr.length; i++) {
		out += "<a href=\"\\evento.html\\" + arr[i]._id+ "\">";
		out += "<h1>" + arr[i].nombre + "</h1>"
		out += "<font size=\"4\">Lugar: " + arr[i].lugar
		out += "<br>Precio: " + arr[i].precio
		out += "<br>Fecha: " + arr[i].fecha + "</font><br>";
		out += "<hr></a><br>";
	}
	$("#events").html(out);
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
