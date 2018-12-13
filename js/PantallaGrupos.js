
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
	PantallaPiezas= new BrowserWindow({width:850,height:600});
	PantallaPiezas.loadURL(url.format({
		pathname: path.join(__dirname,'../PantallaPiezas.html'),
		procol: 'file',
		slashes: true
	}))
	PantallaPiezas.setResizable(false);
	PantallaPiezas.show();
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

var buscaGrupos = function(){
	var url='http://museobillete.azurewebsites.net/api/Expo/'
	fetch(url+vitrina)
	.then(datos=>datos.json())
	.then(datos=>{
		var unico = ''
		var foto = ''
		var datosGrupos = datos.mostradores[mostrador].grupos
		var descripcion = ''
		for(let i=0; i<datosGrupos.length; i++){
			unico = datosGrupos[i].unico
			var imgBotonFavorito = ''
			if (datosGrupos[i].piezas[0].descripcion == null) {
				descripcion = "Sin Descripción"
			} else {
				descripcion = datosGrupos[i].piezas[0].descripcion
			}			
			if (unico == true) {											
				foto=datosGrupos[i].piezas[0].imagenFondoUrl
				document.getElementById('abajo').innerHTML += `
				<article class="contenedor">
					<article class="abajoIzquierda">
						<img src="${foto}" class="imgFoto">
					</article>
					<article class="abajoDerecha">				
						<span class="txtTitulo">${datosGrupos[i].piezas[0].titulo}</span>
						<br>
						<span class="txtDescripcion">${descripcion}</span>												
					</article>
					<article class="articleBtn">						
						<button class="btnFavorito"></button>
						<button class="btnDetallePieza btnAbrir" value="${datosGrupos[i].piezas[0].detallesUrl}">Detalle Pieza</button>											
					</article>
				</article>
				<br>
				`				
			} else {
				foto=datosGrupos[i]. imagenFondoUrl
				document.getElementById('abajo').innerHTML += `
				<article class="contenedor">
					<article class="abajoIzquierda">						
						<img src="${foto}" class="imgFoto">
					</article>
					<article class="abajoDerecha">
						<span class="txtTitulo">${datosGrupos[i].titulo}</span>
						<br>						
						<button class="btnAbrirGrupo btnAbrir" value="${i}">Abrir Grupo</button>
					</article>
				</article>							
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
			btnFavorito[i].addEventListener('click', function () { agregarFavorito(datosGrupos[i].piezas[0].id, datosGrupos[i].piezas[0].titulo, datosGrupos[i].piezas[0].descripcion, datosGrupos[i].piezas[0].detallesUrl, datosGrupos[i].piezas[0]. imagenFondoUrl); }, false);
			const formId = new FormData();
			formId.append('id', datosGrupos[i].piezas[0].id);
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
buscaGrupos();