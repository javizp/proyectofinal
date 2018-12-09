var buscaFavoritos = function(){
	var url='http://museobillete.azurewebsites.net/api/Expo/'
	fetch(url)
	.then(datos=>datos.json())
	.then(datos=>{
		var foto = ''
		var datosMostradores = datos.mostradores
		for(let i=0; i<datosMostradores.length; i++){
			foto=datosMostradores[i].imagenFondoUrl
			document.getElementById('favoritos').innerHTML += `
			<article class="abajoIzquierda">
					<img src="${foto}" class="imgFoto">
			</article>
			<article class="abajoDerecha">
				<div class="txtTitulo">${datosMostradores[i].titulo}</div>
				<button class="btnGrupos" value="${i}">Grupos</button> 
			</article>
			<hr>
			<br>
		`
		} //Termina For
		for(let i=0;i<btnGrupos.length;i++){
			btnGrupos[i].addEventListener('click', buscaGrupos);
		}
	})
}

buscaFavoritos();