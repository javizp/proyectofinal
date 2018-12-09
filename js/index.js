
const {BrowserWindow}=require('electron').remote
const app=require('electron').app
const path=require('path')
const url=require('url')

let PantallaMostradores;

var btnMostradores=document.getElementsByClassName('btnMostradores');

var buscaMostradores = function(){
	localStorage.setItem("vitrina", this.value);	
	PantallaMostradores= new BrowserWindow({width:800,height:825});
	PantallaMostradores.loadURL(url.format({
		pathname: path.join(__dirname,'../PantallaMostradores.html'),
		procol: 'file',
		slashes: true
	}))
	PantallaMostradores.show();
}

var buscaFavoritos = function(){
	console.log("click")	
	PantallaFavoritos= new BrowserWindow({width:800,height:825});
	PantallaFavoritos.loadURL(url.format({
		pathname: path.join(__dirname,'../PantallaFavoritos.html'),
		procol: 'file',
		slashes: true
	}))
	PantallaFavoritos.show();
}

var buscaVitrinas = function(){
	var url='http://museobillete.azurewebsites.net/api/Expo'
	fetch(url)
	.then(datos=>datos.json())
	.then(datos=>{
		var foto=''
		document.getElementById('abajo').innerHTML=''
		for(let i=0; i<datos.length; i++){
			foto=datos[i].imagenFondoUrl
			document.getElementById('abajo').innerHTML += `
			<article class="abajoIzquierda">
					<img src="${foto}" class="imgFoto">
			</article>
			<article class="abajoDerecha">
				<div class="txtTitulo">${datos[i].titulo}</div>
				<button class="btnMostradores" value="${datos[i].id}">Mostradores</button> 
			</article>
			<hr>
			<br>
		`
		} //Termina For
		for(let i=0;i<btnMostradores.length;i++){
			btnMostradores[i].addEventListener('click', buscaMostradores);
		}	
	})
}
buscaVitrinas();	

var btnFavoritos = document.getElementById("btnFavoritos");

btnFavoritos.addEventListener("click", buscaFavoritos, false); 