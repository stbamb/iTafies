$(document).ready(function (){
	
	//Obtiene el object id del parámetro de html
	var a = window.location.toString();
	var oid = a.substring(a.indexOf("html/")+5);
	
	var url = "http://tecmoviles.cloudapp.net:3000/evento/"+oid;
	var xhr = createCORSRequest('GET', url);
	if (!xhr) {
		throw new Error('CORS not supported');
	}

	xhr.onload = function() {
		var responseText = xhr.responseText;
		// process the response.
		mostrarEvento(responseText);
	};

	xhr.onerror = function() {
		console.log('There was an error!');
	};
	
	xhr.send();
 })
 
 
 $('#search-btn').on('click', function (e) {
	
	window.location.href='/eventos.html';

})
 
 function mostrarEvento(response) {
	var event = JSON.parse(response);
	var username = JSON.parse(localStorage.user).username;
	var out = "<hr>";
	
	var images = []
	var i;
	for (i= 0; i < event.imagenes.length; i++){
		if (i==0){
			var canvas0 = document.getElementById("c0");
			var ctx0 = canvas0.getContext("2d");

			var image0 = new Image();
			image0.src = event.imagenes[i];
			image0.onload = function() {
				var width = 275;
				var height = image0.height * (275/image0.width)
				canvas0.width = width;
				canvas0.height = height;
				ctx0.drawImage(image0, 0, 0, width, height);
			};
		}
		if (i==1){
			var canvas1 = document.getElementById("c1");
			var ctx1 = canvas1.getContext("2d");

			var image1 = new Image();
			image1.src = event.imagenes[i];
			image1.onload = function() {
				var width = 275;
				var height = image1.height * (275/image1.width)
				canvas1.width = width;
				canvas1.height = height;
				ctx1.drawImage(image1, 0, 0, width, height);
			};
		}
		if (i==2){
			var canvas2 = document.getElementById("c2");
			var ctx2 = canvas2.getContext("2d");

			var image2 = new Image();
			image2.src = event.imagenes[i];
			image2.onload = function() {
				var width = 275;
				var height = image2.height * (275/image2.width)
				canvas2.width = width;
				canvas2.height = height;
				ctx2.drawImage(image2, 0, 0, width, height);
			};
		}
	}
	
		out += "<h1>" + event.nombre + "</h1>"
		out += "<br>"
		
		out += "Lugar: " + event.lugar
		out += "<br>Precio: " + event.precio
		out += "<br>Fecha: " + event.fecha + "<br>";
		out += "<br>Horario: " + event.horaInicio + " a " + event.horaFin + "<br>";
		out += "<br>Descripción: " + event.descripcion + "<br>";
		out += "<br>Etiquetas: "
		
		for (i= 0; i < event.etiquetas.length; i++){
			out += "<br>        " + event.etiquetas[i];
		}
		out += "<br>"
		
		out += "<br>Creado por: " + event.nombreCreador + "/ @" + event.usernameCreador + "<br>";
		
		out += "</a><hr>";
		
	$("#event").html(out);
	
	
	if (event.usernameCreador == username){
		var html = "<button class=\"btn btn-default\"  onclick=\"modificar()\">Modificar</button>"
		$("#change").html(html);
	}
}

//modificar evento
function modificar(){
	var a = window.location.toString();
	var oid = a.substring(a.indexOf("html/")+5);
	window.location.href = "/modificar.html/" + oid;
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