const formulario = document.querySelector('form');
const borrarConfig = document.querySelector('#borrarConfig');

// Escuchador de evento para cuando se envie el formulario
formulario.addEventListener('submit', (event) => {
	event.preventDefault();
	guardarConfig();
});
// Escuchador de evento para cuando se haga click en borrar configuracion
borrarConfig.addEventListener('click', limpiarConfig);
// Escuchador de evento para que cuando se cargue la página, se cargue la info del local storage en caso que exista
window.addEventListener('load', cargarConfig);

// Función para guardar la configuración del usuario en localStorage
function guardarConfig() {
	const userName = document.querySelector('#username').value;
	const saludarUsuario = document.querySelector('#saludarUsuario');
	localStorage.setItem('username', userName);
	saludarUsuario.textContent = `Hola ${userName}!`;
	document.querySelector('#username').value = '';
}

// Función para cargar la configuración del usuario desde localStorage
function cargarConfig() {
	const SavedUserName = localStorage.getItem('username');
	if (SavedUserName) {
		document.querySelector(
			'#saludarUsuario'
		).textContent = `Hola ${SavedUserName}!`;
		document.querySelector('#username').value = '';
	}
}

// Función para eliminar la configuración del usuario
function limpiarConfig() {
	localStorage.removeItem('username');
	document.querySelector('#saludarUsuario').textContent = ``;
	document.querySelector('#username').value = '';
	document.body.className = ``;
}
