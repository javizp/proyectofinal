const {BrowserWindow}=require('electron').remote
const app=require('electron').app
const path=require('path')
const url=require('url')

let PantallaMonedas;

var btnFavorito=document.getElementsByClassName('btnFavorito')
var btnDetallePieza=document.getElementsByClassName('btnDetallePieza')

var vitrina=localStorage.getItem('vitrina')
var mostrador=localStorage.getItem('mostrador')
var grupo=localStorage.getItem('grupo')


var detallePieza = function(){
	window.open(this.value, "_self")
}

var agregarFavorito = function(id,titulo,descripcion,detalle,imagen){
	//Buscamos si ya existe en la tabla favoritos
	const formId = new FormData();
	formId.append('id', id);
	fetch('http://localhost/proyectofinal/model/encuentraUnFavorito.php', {
		method: 'post',
		body: formId
	})			
		.then(existeEnFavoritos => existeEnFavoritos.json())
		.then(existeEnFavoritos => {			
				if (existeEnFavoritos.respuesta == true) {
					//Al entrar aqui estamos eliminadolo de la tabla de favoritos
					const data = new FormData();
					data.append('id', id);
					fetch('http://localhost/proyectofinal/model/quitarFavoritos.php', {
						method: 'post',
						body: data
					})
						.then(datos => datos.json())
						.then(datos => {
							if (datos.respuesta == true) {
								alert('Favorito eliminado')
								location.reload();
							} else {
								alert('No se pudo retirar de tu lista de favoritos')
							}
					})
				} else {
					//Al entrar aqui estamos gruandolo en la tabla de favoritos
					const data = new FormData();
					data.append('id',id);
					data.append('titulo',titulo);
					data.append('descripcion', descripcion);
					data.append('detalle', detalle);
					data.append('imagen', imagen);
					fetch('http://localhost/proyectofinal/model/agregarFavoritos.php',{
						method: 'post',
						body: data
					})
					.then(datos=>datos.json())
					.then(datos=>{
						if(datos.respuesta == true){
							alert('Favorito agregado')
							location.reload();
						}else{
							alert('No se pudo agregar a tu lista de favoritos')
						}
					})					
				}													
		})
}

var buscaPiezas = function(){
	var url='http://museobillete.azurewebsites.net/api/Expo/'
	fetch(url+vitrina)
	.then(datos=>datos.json())
	.then(datos=>{
		var foto = ''
		var datosPiezas = datos.mostradores[mostrador].grupos[grupo].piezas
		for(let i=0; i<datosPiezas.length; i++){			
			
			foto=datosPiezas[i].imagenFondoUrl
			document.getElementById('abajo').innerHTML += `
			<article class="contenedor">
				<article class="abajoIzquierda">			
					<img src="${foto}" class="imgFoto">
				</article>
				<article class="abajoDerecha">
					<div class="txtTitulo">${datosPiezas[i].titulo}</div>
					<div class="txtTitulo">${datosPiezas[i].descripcion}</div>
					<button class="btnDetallePieza pure-button" value="${datosPiezas[i].detallesUrl}">Detalle Pieza</button>
					<button class="btnFavorito"></button>
				</article>
			</article>
			<br>
			`		
		} //Termina For
		for(let i=0;i<btnDetallePieza.length;i++){
			btnDetallePieza[i].addEventListener('click', detallePieza);
		}
		for (let i = 0; i < btnFavorito.length; i++) {
			btnFavorito[i].addEventListener('click', function () { agregarFavorito(datosPiezas[i].id, datosPiezas[i].titulo, datosPiezas[i].descripcion, datosPiezas[i].detallesUrl, datosPiezas[i].imagenFondoUrl); }, false);
			const formId = new FormData();
			formId.append('id', datosPiezas[i].id);
			fetch('http://localhost/proyectofinal/model/encuentraUnFavorito.php', {
				method: 'post',
				body: formId
			})			
				.then(existeEnFavoritos => existeEnFavoritos.json())
				.then(existeEnFavoritos => {			
						if (existeEnFavoritos.respuesta == true) {
							btnFavorito[i].innerHTML += `<img src='img/corazon_rojo.png'> `
						} else {
							btnFavorito[i].innerHTML += `<img src='img/corazon_blanco.png'>` 					
						}													
				})	
		}
	})
}

buscaPiezas();