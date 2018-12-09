
const {BrowserWindow}=require('electron').remote
const app=require('electron').app
const path=require('path')
const url=require('url')

let PantallaPiezas;

var btnDetallePieza=document.getElementsByClassName('btnDetallePieza')
var btnFavorito=document.getElementsByClassName('btnFavorito')
var btnAbrirGrupo=document.getElementsByClassName('btnAbrirGrupo')
var vitrina=localStorage.getItem('vitrina')
var mostrador=localStorage.getItem('mostrador')

var detallePieza = function(){
	window.open(this.value, "_self")
}

var buscaPiezas = function(){
	localStorage.setItem("grupo", this.value);	
	PantallaPiezas= new BrowserWindow({width:800,height:825});
	PantallaPiezas.loadURL(url.format({
		pathname: path.join(__dirname,'../PantallaPiezas.html'),
		procol: 'file',
		slashes: true
	}))
	PantallaPiezas.show();
}

var agregarFavorito = function(titulo,descripcion,detalle,imagen){
	const data = new FormData();
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
		}else{
			alert('No se pudo agregar a tu lista de favoritos')
		}
	})
}

var buscaGrupos = function(){
	var url='http://museobillete.azurewebsites.net/api/Expo/'
	fetch(url+vitrina)
	.then(datos=>datos.json())
	.then(datos=>{
		var unico = ''
		var foto = ''
		var datosGrupos = datos.mostradores[mostrador].grupos
		for(let i=0; i<datosGrupos.length; i++){
			unico = datosGrupos[i].unico
			if (unico == true) {
				foto=datosGrupos[i].piezas[0]. imagenFondoUrl
				document.getElementById('grupos').innerHTML += `
				<article class="abajoIzquierda">
					Pieza Unica
					<img src="${foto}" class="imgFoto">
				</article>
				<article class="abajoDerecha">
					<div class="txtTitulo">${datosGrupos[i].piezas[0].titulo}</div>
					<div class="txtDescripcion">${datosGrupos[i].piezas[0].descripcion}</div>
					<button class="btnDetallePieza" value="${datosGrupos[i].piezas[0].detallesUrl}">Detalle Pieza</button>
					<button class="btnFavorito" value="${datosGrupos[i].piezas[0].id}">Agregar a favoritos</button>
				</article>
				<hr>
				<br>
				`
			} else {
				foto=datosGrupos[i]. imagenFondoUrl
				document.getElementById('grupos').innerHTML += `
				<article class="abajoIzquierda">
					Grupo
					<img src="${foto}" class="imgFoto">
				</article>
				<article class="abajoDerecha">
					<div class="txtTitulo">${datosGrupos[i].titulo}</div>
					<div class="txtTitulo">${datosGrupos[i].descripcion}</div>
					<button class="btnAbrirGrupo" value="${i}">Abrir Grupo</button>
				</article>
				<hr>
				<br>
				`
			}
		} //Termina For
		for(let i=0;i<btnDetallePieza.length;i++){
			btnDetallePieza[i].addEventListener('click', detallePieza);
		}
		for(let i=0;i<btnAbrirGrupo.length;i++){
			btnAbrirGrupo[i].addEventListener('click', buscaPiezas);
		}
		for (let i = 0; i < btnFavorito.length; i++) {
			btnFavorito[i].addEventListener('click', function () { agregarFavorito(datosGrupos[i].piezas[0].titulo, datosGrupos[i].piezas[0].descripcion, datosGrupos[i].piezas[0].detallesUrl, foto); }, false);
		}
	})
}

buscaGrupos();