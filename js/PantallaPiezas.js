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
var btnFavoritos=document.getElementsByClassName('btnFavoritos')

btnFavorito.addEventListener('click',agregarFavorito)

var detallePieza = function(){
	window.open(this.value, "_self")
}

var agregarFavorito = function(){
	
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
			document.getElementById('piezas').innerHTML += `
			<article class="abajoIzquierda">			
				<img src="${foto}" class="imgFoto">
			</article>
			<article class="abajoDerecha">
				<div class="txtTitulo">${datosPiezas[i].titulo}</div>
				<div class="txtTitulo">${datosPiezas[i].descripcion}</div>
				<button class="btnDetallePieza" value="${datosPiezas[i].detallesUrl}">Detalle Pieza</button>
				<button class="btnFavorito" value="${datosPiezas[i].id}">Favorito</button>
			</article>
			<hr>
			<br>
			`		
		} //Termina For
		for(let i=0;i<btnDetallePieza.length;i++){
			btnDetallePieza[i].addEventListener('click', detallePieza);
		}
	})
}

buscaPiezas();