
const {BrowserWindow}=require('electron').remote
const app=require('electron').app
const path=require('path')
const url=require('url')

let PantallaGrupos;

var btnGrupos=document.getElementsByClassName('btnGrupos')

var buscaGrupos = function(){
	localStorage.setItem("mostrador", this.value);	
	PantallaGrupos= new BrowserWindow({width:800,height:825});
	PantallaGrupos.loadURL(url.format({
		pathname: path.join(__dirname,'../PantallaGrupos.html'),
		procol: 'file',
		slashes: true
	}))
	PantallaGrupos.show();
}

var vitrina=localStorage.getItem('vitrina')

var buscaMostradores = function(){
	var url='http://museobillete.azurewebsites.net/api/Expo/'
	fetch(url+vitrina)
	.then(datos=>datos.json())
	.then(datos=>{
		var foto = ''
		var datosMostradores = datos.mostradores
		for(let i=0; i<datosMostradores.length; i++){
			foto=datosMostradores[i].imagenFondoUrl
			document.getElementById('abajo').innerHTML += `
			<article class="contenedor">
				<article class="abajoIzquierda">
						<img class="imgFoto" src="${foto}">
				</article>
				<article class="abajoDerecha">
					<div class="txtTitulo">${datosMostradores[i].titulo}</div>
					<button class="btnGrupos pure-button" value="${i}">Abrir Mostrador</button> 
				</article>						
			</article>
			<br>			
		`
		} //Termina For
		for(let i=0;i<btnGrupos.length;i++){
			btnGrupos[i].addEventListener('click', buscaGrupos);
		}
	})
}

buscaMostradores();