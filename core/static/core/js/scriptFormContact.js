const formContact = document.getElementById('formContact');
const nameForm = document.getElementById('nombre');
const lastNameForm = document.getElementById('apellido');
const emailForm = document.getElementById('mail');
const phoneForm = document.getElementById('telefono');
const dateIniForm = document.getElementById('fecha_inicio');
const dateEndForm = document.getElementById('fecha_fin');
const resetBtn = document.getElementById('btn-clear');
const textAreaC = document.getElementById('consulta');
const selectProv = document.getElementById('province');
const radioTrans = document.getElementsByName('transporte');
const inputsCont = formContact.getElementsByTagName('input');
const inputsForm = document.querySelectorAll('#formContact input');
const pErrorContact = formContact.getElementsByClassName(
	'formInputContact-error'
);
const nameDivInputs = 'groupFormContact';

const fieldsGroup = {
	nombre: 'Name',
	apellido: 'Lastname',
	mail: 'Email',
	telefono: 'Phone',
	fecha_inicio: 'Date',
	fecha_fin: 'Date',
};

// Escuchador de evento para cuando se envie el formulario
formContact.addEventListener('submit', (event) => {
	event.preventDefault();

	let condition = true;

	inputsForm.forEach((element) => {
		if (!validateForm(element.getAttribute('name'))) {
			condition = false;
		}
	});

	if (condition) {
		// En este caso para el uso de formspree.io no utilizamos el .then y el .catch para no condicionar el funcionamiento actual del formulario con el resultado de la promesa del fetch
		const formData = new FormData(formContact);
		fetch('https://formspree.io/f/mvoedgve', {
			method: 'POST',
			body: formData,
		})
			.then((response) => {})
			.catch((error) => {});

		formContact.reset();
		document
			.getElementById('formMessContact-exito')
			.classList.add('formMessContact-active');
		setTimeout(() => {
			document
				.getElementById('formMessContact-exito')
				.classList.remove('formMessContact-active');
		}, 6000);

		document.querySelectorAll('.groupFormContact-ok').forEach((icono) => {
			icono.classList.remove('groupFormContact-ok');
		});

		document
			.querySelectorAll('.inputError-inactive')
			.forEach((inputError) => {
				inputError.classList.remove('inputError-inactive');
			});
	}
});

function validateForm(attName) {
	let condi = true;
	let testEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
	let testPhone = /^\d{7,14}$/;

	switch (attName) {
		case 'nombre':
			insertTextLastElement(`#group${fieldsGroup[attName]}`, '');
			if (nameForm.value.trim() == '') {
				validateField(fieldsGroup[attName], false);
				insertTextLastElement(
					`#group${fieldsGroup[attName]}`,
					'*Nombre no válido.'
				);
				condi = false;
			} else {
				validateField(fieldsGroup[attName], true);
			}
			break;
		case 'apellido':
			insertTextLastElement(`#group${fieldsGroup[attName]}`, '');
			if (lastNameForm.value.trim() == '') {
				validateField(fieldsGroup[attName], false);
				insertTextLastElement(
					`#group${fieldsGroup[attName]}`,
					'*Apellido no válido.'
				);
				condi = false;
			} else {
				validateField(fieldsGroup[attName], true);
			}
			break;
		case 'telefono':
			insertTextLastElement(`#group${fieldsGroup[attName]}`, '');
			if (
				phoneForm.value.length < 10 ||
				phoneForm.value.trim() == '' ||
				!testPhone.test(phoneForm.value)
			) {
				validateField(fieldsGroup[attName], false);
				insertTextLastElement(
					`#group${fieldsGroup[attName]}`,
					'*Teléfono no válido.'
				);
				condi = false;
			} else {
				validateField(fieldsGroup[attName], true);
			}
			break;
		case 'mail':
			insertTextLastElement(`#group${fieldsGroup[attName]}`, '');
			if (!testEmail.test(emailForm.value)) {
				validateField(fieldsGroup[attName], false);
				insertTextLastElement(
					`#group${fieldsGroup[attName]}`,
					'*Email no válido.'
				);
				condi = false;
			} else {
				validateField(fieldsGroup[attName], true);
			}
			break;
		case 'fecha_inicio':
		case 'fecha_fin':
			insertTextLastElement(`#group${fieldsGroup[attName]}`, '');

			if (dateIniForm.value.trim() == '') {
				validateField(fieldsGroup[attName], false);
				insertTextLastElement(
					`#group${fieldsGroup[attName]}`,
					'*Debe ingresar un valor en campo fecha.'
				);
				condi = false;
			}
			if (dateEndForm.value.trim() == '') {
				validateField(fieldsGroup[attName], false);
				insertTextLastElement(
					`#group${fieldsGroup[attName]}`,
					'*Debe ingresar un valor en campo fecha.'
				);
				condi = false;
			}
			if (dateIniForm.value > dateEndForm.value) {
				validateField(fieldsGroup[attName], false);
				insertTextLastElement(
					`#group${fieldsGroup[attName]}`,
					'*Fecha hasta no puede ser menor que Fecha desde.'
				);
				condi = false;
			}
			if (condi) {
				validateField(fieldsGroup[attName], true);
			}
			break;
	}

	return condi;
}

const validateField = (field, condition) => {
	if (condition) {
		document
			.getElementById(`group${field}`)
			.classList.remove('groupFormContact-wrong');
		document
			.getElementById(`group${field}`)
			.classList.add('groupFormContact-ok');
		let container = document.querySelector(`#group${field}`);
		let matches = container.querySelectorAll('input');
		matches.forEach(function (ele) {
			ele.classList.add('inputError-inactive');
			ele.classList.remove('inputError-active');
		});
		document
			.querySelector(`#group${field} .formInputContact-error`)
			.classList.remove('formInputContact-error-active');
	} else {
		document
			.getElementById(`group${field}`)
			.classList.add('groupFormContact-wrong');
		document
			.getElementById(`group${field}`)
			.classList.remove('groupFormContact-ok');
		let container = document.querySelector(`#group${field}`);
		let matches = container.querySelectorAll('input');
		matches.forEach(function (ele) {
			ele.classList.add('inputError-active');
			ele.classList.remove('inputError-inactive');
		});

		document
			.querySelector(`#group${field} .formInputContact-error`)
			.classList.add('formInputContact-error-active');
	}
};

function insertTextLastElement(classInput, mess) {
	let eleName = document.querySelector(classInput);
	eleName.lastElementChild.innerHTML = mess;
}

const reset = (e) => {
	e.preventDefault();

	let elemRadio = radioTrans;

	selectProv.value = 'bs-as';

	textAreaC.value = '';

	elemRadio[0].checked = true;

	for (let i = 1; i < elemRadio.length; i++) {
		elemRadio[i].checked = false;
	}

	const elementsP = Array.prototype.filter.call(
		pErrorContact,
		(testElement) => testElement.nodeName === 'P'
	);

	elementsP.forEach((element) => {
		element.innerHTML = '';
	});

	inputsForm.forEach((element) => {
		let attrName = element.getAttribute('name');

		switch (attrName) {
			case 'nombre':
			case 'apellido':
			case 'telefono':
			case 'mail':
			case 'fecha_inicio':
			case 'fecha_fin':
				let container = document.querySelector(
					`#group${fieldsGroup[attrName]}`
				);
				let matches = container.querySelectorAll('input');
				matches.forEach(function (ele) {
					ele.classList.remove('inputError-active');
					ele.classList.remove('inputError-inaactive');
				});
				break;
		}
	});

	for (let inputCont of inputsCont) inputCont.value = '';
};

resetBtn.addEventListener('click', reset);
