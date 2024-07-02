fetch('./db/provincias.json')
	.then((respuesta) => respuesta.json())
	.then((datos) => {
		localStorage.setItem('provincias', JSON.stringify(datos));

		// document.addEventListener("DOMContentLoaded", () => {
		const gridProvincias = document.getElementById('grid-provincias');
		const datosProvincias = JSON.parse(localStorage.getItem('provincias'));
		if (datosProvincias) {
			datosProvincias.provincias.forEach((provincia) => {
				//   1.- Se crea un elemento <div> para cada provincia
				const gridItem = document.createElement('div');
				//   2.- Se agrega la clase "grid-item" al div que contiene el nombre de la provincia y su imagen
				gridItem.classList.add('grid-item');
				//    3.- Se agrega una etiqueta h4 con el texto del título a nuestro nuevo elemento <div>.
				gridItem.innerHTML = `<h4>${provincia.nombre}</h4>
      <img src="${provincia.imagen}" alt="${provincia.nombre}">
      `;

				gridItem.addEventListener('click', () => {
					mostrarDetallesProvincia(provincia);
				});

				gridProvincias.appendChild(gridItem);
			});
		}
	});

function mostrarDetallesProvincia(provincia) {
	//Redireccionar a otra página para mostrar los detalles
	window.location.href = `pages/provincia.html?id=${provincia.id}`;
}
