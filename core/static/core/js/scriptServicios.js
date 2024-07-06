$(function () {
	let currentDate = new Date();
	let day = currentDate.getDate();
	let month = currentDate.getMonth() + 1;
	let year = currentDate.getFullYear();
	let formattedDate =
		year +
		'-' +
		(month < 10 ? '0' : '') +
		month +
		'-' +
		(day < 10 ? '0' : '') +
		day;

	$('#start_date').datepicker({
		dateFormat: 'yy-mm-dd',
		minDate: formattedDate,
		onSelect: function (selectedDate) {
			$('#end_date').datepicker('option', 'minDate', selectedDate);
		},
	});

	$('#end_date').datepicker({
		dateFormat: 'yy-mm-dd',
		onSelect: function (selectedDate) {
			$('#start_date').datepicker('option', 'maxDate', selectedDate);
		},
	});
});

async function getWeather() {
	const city = $('#city').val();
	const apiKey = '3231ad7025f796ee95f1af937da55f76';
	const weatherInfoContainer = $('#cards');
	weatherInfoContainer.empty();

	if (!city) {
		alert('Por favor selecciona una ciudad.');
		return;
	}

	try {
		const response = await fetch(
			`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&lang=es`
		);
		const data = await response.json();

		const temperature = data.main.temp;
		const weather =
			data.weather[0].description.charAt(0).toUpperCase() +
			data.weather[0].description.slice(1);
		const minTemperature = data.main.temp_min;
		const maxTemperature = data.main.temp_max;
		const weatherIcon = data.weather[0].icon;
		const temperatureRange = `${toCelsius(minTemperature)}°C - ${toCelsius(
			maxTemperature
		)}°C`;

		const card = $('<div>').addClass('card');
		card.html(`
            <h3>${city}</h3>  
            <p class="fecha">Pronóstico Actual</p>
            <div class="weather-info">
                <p class="temp">${toCelsius(temperature)}°C  ${weather}</p>
                <img src="http://openweathermap.org/img/wn/${weatherIcon}@2x.png" alt="" class="temp-img">
                <p class="range">Temp Min/Máx: ${temperatureRange}</p>
            </div>
        `);
		weatherInfoContainer.append(card);
	} catch (error) {
		console.error('Error al obtener el pronóstico del tiempo:', error);
		alert(
			'Ha ocurrido un error al obtener el pronóstico del tiempo. Por favor, intenta nuevamente más tarde.'
		);
	}
}

// funcion de calculo de promedios para días posteriores
// la Api de forma gratuita sólo nos da hasta 5 días después del actual
async function getWeatherForecast() {
	const city = $('#city').val();
	const startDate = $('#start_date').datepicker('getDate');
	const endDate = $('#end_date').datepicker('getDate');
	const apiKey = '3231ad7025f796ee95f1af937da55f76';
	const weatherInfoContainer = $('#cards');
	weatherInfoContainer.empty();

	if (!city || !startDate || !endDate) {
		alert('Por favor selecciona una ciudad y especifica un rango de fechas.');
		return;
	}

	const startDateString = startDate.toISOString().split('T')[0];
	const endDateString = endDate.toISOString().split('T')[0];

	try {
		const response = await fetch(
			`https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&lang=es`
		);
		const data = await response.json();

		// Almacenador las temperaturas diarias
		const dailyTemperatures = {};

		// Filtrar los datos del pronóstico para incluir solo los días dentro del rango seleccionado
		const filteredData = data.list.filter((item) => {
			const itemDate = new Date(item.dt * 1000);
			const dateKey = itemDate.toISOString().split('T')[0];
			return dateKey >= startDateString && dateKey <= endDateString;
		});

		// Iterar sobre los datos filtrados y acumular las temperaturas diarias
		filteredData.forEach((item) => {
			const itemDate = new Date(item.dt * 1000);
			const dateKey = itemDate.toISOString().split('T')[0];

			// Si es la primera vez que encontramos esta fecha, inicializamos el acumulador
			if (!dailyTemperatures[dateKey]) {
				dailyTemperatures[dateKey] = {
					temperatureSum: 0,
					count: 0,
					minTemperature: Infinity,
					maxTemperature: -Infinity,
					description: '',
					weatherIcon: '',
				};
			}

			// Acumular la temperatura
			const temperature = item.main.temp;
			dailyTemperatures[dateKey].temperatureSum += temperature;
			dailyTemperatures[dateKey].count++;

			// Actualizar la temperatura mínima y máxima
			if (temperature < dailyTemperatures[dateKey].minTemperature) {
				dailyTemperatures[dateKey].minTemperature = temperature;
			}
			if (temperature > dailyTemperatures[dateKey].maxTemperature) {
				dailyTemperatures[dateKey].maxTemperature = temperature;
			}

			// Guardar la descripción del clima y el icono correspondiente
			dailyTemperatures[dateKey].description = item.weather[0].description;
			dailyTemperatures[dateKey].weatherIcon = item.weather[0].icon;
		});

		// Calcular el promedio diario y mostrar los resultados
		Object.keys(dailyTemperatures).forEach((dateKey) => {
			const averageTemperature =
				dailyTemperatures[dateKey].temperatureSum /
				dailyTemperatures[dateKey].count;
			const formattedDate = revertDateFormat(dateKey);
			const minTemperature = toCelsius(
				dailyTemperatures[dateKey].minTemperature
			);
			const maxTemperature = toCelsius(
				dailyTemperatures[dateKey].maxTemperature
			);
			let description = dailyTemperatures[dateKey].description;
			// Convertir la primera letra a mayúscula
			description = description.charAt(0).toUpperCase() + description.slice(1);
			const weatherIcon = dailyTemperatures[dateKey].weatherIcon;

			// Agregar los resultados al contenedor HTML
			const card = $('<div>').addClass('card');
			card.html(`
                <h3>${city}</h3>  
                <p class="fecha">${formattedDate}</p>
                <div class="weather-info">
                    <p class="temp">Temp promedio ${toCelsius(
											averageTemperature
										)}°C ${description}</p>
                    <img src="http://openweathermap.org/img/wn/${weatherIcon}.png" alt="${description}" class="temp-img">
                    <p class="temp">Temp: ${minTemperature}°C - ${maxTemperature}°C
                </div>
            `);
			weatherInfoContainer.append(card);
		});
	} catch (error) {
		console.error('Error al obtener el pronóstico del tiempo:', error);
		alert(
			'Ha ocurrido un error al obtener el pronóstico del tiempo. Por favor, intenta nuevamente más tarde.'
		);
	}
}

function revertDateFormat(dateString) {
	const date = new Date(dateString);
	const options = {
		weekday: 'long',
		year: 'numeric',
		month: 'long',
		day: 'numeric',
	};
	let formattedDate = date.toLocaleDateString('es-ES', options);
	formattedDate =
		formattedDate.charAt(0).toUpperCase() + formattedDate.slice(1);

	return formattedDate;
}

function toCelsius(kelvin) {
	return Math.round(kelvin - 273.15);
}
