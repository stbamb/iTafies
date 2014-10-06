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


function onFileSelected(event, num) {
  var selectedFile = event.target.files[0];
  var reader = new FileReader();

  var imgtag = document.getElementById("preview" + num);
  imgtag.title = selectedFile.name;

  reader.onload = function(event) {
    imgtag.src = event.target.result;
  };

  reader.readAsDataURL(selectedFile);
}


//Mostrar evento
function mostrarEvento(evento){
	var event = JSON.parse(evento);
	
	var form = $("#form")[0];
	
	//Obtiene las imágenes subidas
	var image1 = form.imagen1
	var image2 = form.imagen2
	var image3 = form.imagen3
	
	var labelsStr = "";
	for (var i=0; i < event.etiquetas.length-1; i++){
		labelsStr += event.etiquetas[i] + ", "
	}
	
	labelsStr += event.etiquetas[event.etiquetas.length-1];

	form.nombre.value = event.nombre;
	form.etiquetas.value = labelsStr;
	form.lugar.value = event.lugar;
	form.precio.value = event.precio;
	form.descripcion.value = event.descripcion;
	form.fecha.value = event.fecha;
	form.desde.value = event.horaInicio;
	form.hasta.value = event.horaFin;
}


//Guardar evento en DB
function guardarEvento(evento){

	var url = "http://192.168.1.120:3000/modificar/"
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
	
	xhr.send(JSON.stringify(evento));
	
}


//Agrega un nuevo evento
function guardar(){
	var form = $("#form")[0];
	
	//Obtiene las imágenes subidas
	var image1 = form.imagen1
	var image2 = form.imagen2
	var image3 = form.imagen3
	
	var images = [];

	var name = form.nombre.value;
	var strLabels = form.etiquetas.value;
	var place = form.lugar.value;
	var price = form.precio.value;	
	var description = form.descripcion.value;
	var date = form.fecha.value;
	var startTime = form.desde.value;
	var endTime = form.hasta.value;
	var creatorUsername = JSON.parse(localStorage.user).username;
	var creatorName = JSON.parse(localStorage.user).nombre;
	
	//Separa el string de etiquetas	
	var labelsArray = strLabels.split(",");
	
	for (var i = 0; i < labelsArray.length; i++){
		labelsArray[i] = labelsArray[i].trim();
	}
	labelsArray.push(name.toLowerCase());
	
	if (image1.files.length > 0) {
		var url = window.URL.createObjectURL(image1.files[0])
		convertImgToBase64(url, function(dataURL){
			images.push(dataURL);
			
			if (image2.files.length > 0) {
				var url = window.URL.createObjectURL(image2.files[0])
				convertImgToBase64(url, function(dataURL){
					images.push(dataURL);
					
					if (image3.files.length > 0) {
						var url = window.URL.createObjectURL(image3.files[0])
						convertImgToBase64(url, function(dataURL){
							images.push(dataURL);
							
							//GUARDAR EVENTO
							var evento = {'nombre': name, 'lugar': place, 'precio': price, 'fecha': date, 'horaInicio': startTime, 'horaFin': endTime, 'descripcion': description, 'etiquetas': labelsArray, 'imagenes': images, 'usernameCreador': creatorUsername, 'nombreCreador': creatorName};
							guardarEvento(evento);
						});
					}
					
					else{
						//GUARDAR EVENTO
						var evento = {'nombre': name, 'lugar': place, 'precio': price, 'fecha': date, 'horaInicio': startTime, 'horaFin': endTime, 'descripcion': description, 'etiquetas': labelsArray, 'imagenes': images, 'usernameCreador': creatorUsername, 'nombreCreador': creatorName};
						guardarEvento(evento);
					}
				});
			}
			
			else{
				//GUARDAR EVENTO
				var evento = {'nombre': name, 'lugar': place, 'precio': price, 'fecha': date, 'horaInicio': startTime, 'horaFin': endTime, 'descripcion': description, 'etiquetas': labelsArray, 'imagenes': images, 'usernameCreador': creatorUsername, 'nombreCreador': creatorName};
				guardarEvento(evento);
			}
		});
	}
	
	else{
		//GUARDAR EVENTO
		var evento = {'nombre': name, 'lugar': place, 'precio': price, 'fecha': date, 'horaInicio': startTime, 'horaFin': endTime, 'descripcion': description, 'etiquetas': labelsArray, 'imagenes': images, 'usernameCreador': creatorUsername, 'nombreCreador': creatorName};
		guardarEvento(evento);
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


function convertImgToBase64(url, callback){
    var canvas = document.createElement('CANVAS'),
        ctx = canvas.getContext('2d'),
        img = new Image;
    img.crossOrigin = 'Anonymous';
    img.onload = function(){
        var dataURL;
        canvas.height = img.height;
        canvas.width = img.width;
        ctx.drawImage(img, 0, 0);
        dataURL = canvas.toDataURL('image/png');
        callback.call(this, dataURL);
        canvas = null; 
    };
    img.src = url;
}