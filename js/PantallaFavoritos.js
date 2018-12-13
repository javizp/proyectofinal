
var btnFavorito = document.getElementsByClassName('btnFavorito');
var btnDetallePieza = document.getElementsByClassName('btnDetallePieza');

var detallePieza = function () {
	window.open(this.value, "_self")
}

var quitarFavorito = function (id) {
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
}

var buscaFavoritos = function(){
	var url ='http://localhost/proyectofinal/model/showFavoritos.php'
	fetch(url)
	.then(datos=>datos.json())
	.then(datos=>{
		var foto = ''
		var descripcion = ''
		for(let i=0; i<datos.length; i++){
			if (datos[i].descripcion == null) {
				descripcion = "Sin Descripción"
			} else {
				descripcion = datos[i].descripcion
			}
			foto=datos[i].imagen
			document.getElementById('abajo').innerHTML += `
			<article class="contenedor">
				<article class="abajoIzquierda">
					<img src="${foto}" class="imgFoto">
				</article>
				<article class="abajoDerecha">
					<span class="txtTitulo">${datos[i].titulo}</span>
					<br>
					<span class="txtDescripcion">${descripcion}</span>					
				</article>
				<article class="articleBtn">						
					<button class="btnFavorito"><img src="img/corazon_rojo.png"/></button>
					<button class="btnDetallePieza btnAbrir" value="${datos[i].detalle}">Detalle Pieza</button>
				</article>
			</article>						
			<br>
		`
		} //Termina For
		for (let i = 0; i < btnDetallePieza.length; i++) {
			btnDetallePieza[i].addEventListener('click', detallePieza);
		}
		for(let i=0;i<btnFavorito.length;i++){
			btnFavorito[i].addEventListener('click', function () { quitarFavorito(datos[i].id); }, false);
		}
	})
}

buscaFavoritos();