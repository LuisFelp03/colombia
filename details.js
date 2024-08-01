// document.addEventListener('DOMContentLoaded', function () {
//     const departmentDetails = document.getElementById('department-details');
//     const citiesContainer = document.getElementById('cities-container');
//     const areasContainer = document.getElementById('areas-container');
//     const showCitiesCheckbox = document.getElementById('show-cities');
//     const showAreasCheckbox = document.getElementById('show-areas');
//     const searchInput = document.getElementById('filter-departments');

//     // Obtener parámetros de la URL
//     const urlParams = new URLSearchParams(window.location.search);
//     const departmentId = urlParams.get('departmentId');

//     // Mensajes de carga inicial
//     departmentDetails.innerHTML = '<p>Loading department details...</p>';
//     citiesContainer.innerHTML = '<p>Loading cities...</p>';
//     areasContainer.innerHTML = '<p>Loading natural areas...</p>';

//     let cities = [];
//     let naturalAreas = [];

//     // Obtener detalles del departamento
//     fetch(`https://api-colombia.com/api/v1/Department/${departmentId}`)
//         .then(response => response.json())
//         .then(department => {
//             departmentDetails.innerHTML = `
//                 <h2>${department.name}</h2>
//                 <p>${department.description || 'No hay descripción disponible.'}</p>
//             `;

//             // Obtener ciudades del departamento
//             fetch(`https://api-colombia.com/api/v1/Department/${departmentId}/cities`)
//                 .then(response => response.json())
//                 .then(data => {
//                     cities = data;
//                     displayCities(cities);
//                 })
//                 .catch(error => {
//                     console.error('Error fetching cities:', error);
//                     citiesContainer.innerHTML = '<p>Hubo un error al cargar las ciudades. Inténtalo de nuevo más tarde.</p>';
//                 });

//             // Obtener áreas naturales
//             fetch(`https://api-colombia.com/api/v1/NaturalArea`)
//                 .then(response => response.json())
//                 .then(data => {
//                     naturalAreas = data.filter(area => area.department.id === departmentId);
//                     displayNaturalAreas(naturalAreas);
//                 })
//                 .catch(error => {
//                     console.error('Error fetching natural areas:', error);
//                     areasContainer.innerHTML = '<p>Hubo un error al cargar las áreas naturales. Inténtalo de nuevo más tarde.</p>';
//                 });
//         })
//         .catch(error => {
//             console.error('Error fetching department details:', error);
//             departmentDetails.innerHTML = '<p>Hubo un error al cargar los detalles del departamento. Inténtalo de nuevo más tarde.</p>';
//         });

//     // Mostrar/ocultar ciudades
//     showCitiesCheckbox.addEventListener('change', function () {
//         citiesContainer.style.display = this.checked ? 'block' : 'none';
//     });

//     // Mostrar/ocultar áreas naturales
//     showAreasCheckbox.addEventListener('change', function () {
//         areasContainer.style.display = this.checked ? 'block' : 'none';
//     });

//     // Filtrar ciudades y áreas naturales
//     searchInput.addEventListener('input', function () {
//         const filter = searchInput.value.toLowerCase();
//         const filteredCities = cities.filter(city => city.name.toLowerCase().includes(filter));
//         const filteredNaturalAreas = naturalAreas.filter(area => area.name.toLowerCase().includes(filter));
//         displayCities(filteredCities);
//         displayNaturalAreas(filteredNaturalAreas);
//     });

//     // Función para mostrar ciudades
//     function displayCities(cities) {
//         citiesContainer.innerHTML = '';
//         cities.forEach(city => {
//             const cityCard = document.createElement('div');
//             cityCard.classList.add('col-md-4', 'card', 'mb-4', 'shadow-sm');

//             const descriptionContent = city.description
//                 ? city.description
//                 : '<img src="https://www.researchgate.net/profile/Leonardo-Romero-2/publication/341654885/figure/fig2/AS:895530230091776@1590522453109/Mapa-del-Sistema-de-Ciudades-de-Colombia-Fuente-Mision-del-Sistema-de-Ciudades.ppm" alt="Mapa del Sistema de Ciudades de Colombia" style="width: 100%; height: auto;" />';

//             cityCard.innerHTML = `
//                 <div class="card-body">
//                     <h5 class="card-title">${city.name}</h5>
//                     <p class="card-text">${descriptionContent}</p>
//                 </div>
//             `;
//             citiesContainer.appendChild(cityCard);
//         });
//     }

//     // Función para mostrar áreas naturales
//     function displayNaturalAreas(areas) {
//         areasContainer.innerHTML = '';
//         if (areas.length === 0) {
//             areasContainer.innerHTML = '<p>No se encontraron áreas naturales.</p>';
//         } else {
//             areas.forEach(area => {
//                 const areaCard = document.createElement('div');
//                 areaCard.classList.add('col-md-4', 'card', 'mb-4', 'shadow-sm');
//                 areaCard.innerHTML = `
//                     <img src="${area.images.length > 0 ? area.images[0] : 'default-image-url.jpg'}" class="card-img-top" alt="${area.name}">
//                     <div class="card-body">
//                         <h5 class="card-title">${area.name}</h5>
//                         <p class="card-text">${area.description || 'No hay descripción disponible.'}</p>
//                     </div>
//                 `;
//                 areasContainer.appendChild(areaCard);
//             });
//         }
//     }
// });

// fetch('https://api-colombia.com/api/v1/Department')
//     .then(Response => Response.json())
//     .then(data => datosDepartamentos(data)).catch(error => console.log(error));

// fetch('https://api-colombia.com/api/v1/City')
//     .then(Response => Response.json())
//     .then(data => datosCiudad(data)).catch(error => console.log(error));

// fetch('https://api-colombia.com/api/v1/NaturalArea')
//     .then(Response => Response.json())
//     .then(data => datosNatural(data)).catch(error => console.log(error));

// let tarjetota = document.getElementById("tarjetota");
// let tarjetas = document.getElementById("tarjetita");
// let tarjeta = tarjetas[0];   tarjeta
// let tarjetas2 = document.getElementById("tarjetita2");
// let tarjeta2 = tarjetas2[0]; tarjeta

// let datosDepartamentos = (data) => {
//     let url = new URLSearchParams(window.location.search).get('id');
//     let event = data.find(event => event.id == url);
//     document.querySelector("h3").innerHTML = event.name;
//     document.getElementById("descripcionTarjetota").innerHTML = event.description;   description
// }

// tarjetas.parentNode.removeChild(tarjetas);



// // Obtener datos de la API de Ciudades
// fetch('https://api-colombia.com/api/v1/City')
//     .then(response => response.json()) // Convertir la respuesta a JSON
//     .then(data => mostrarCiudades(data)) // Llamar a la función para mostrar ciudades
//     .catch(error => console.log(error)); // Manejar errores en caso de fallo

// // Obtener datos de la API de Áreas Naturales
// fetch('https://api-colombia.com/api/v1/NaturalArea')
//     .then(response => response.json()) // Convertir la respuesta a JSON
//     .then(data => mostrarAreasNaturales(data)) // Llamar a la función para mostrar áreas naturales
//     .catch(error => console.log(error)); // Manejar errores en caso de fallo
// // Función para mostrar los datos de las ciudades
// function mostrarCiudades(data) {
//     let tarjetas = document.getElementById("tarjetita"); // Obtener el elemento de la tarjeta de ciudades
//     let cardImage = tarjetas.querySelector(".card-img-top"); // Obtener el elemento de imagen dentro de la tarjeta
//     let cardTitle = tarjetas.querySelector(".card-title"); // Obtener el título de la tarjeta
//     let cardText = tarjetas.querySelector(".card-text"); // Obtener el texto de la tarjeta

//     // Suponiendo que se quiere mostrar la primera ciudad por ahora
//     let ciudad = data[0]; // Obtener la primera ciudad de los datos
//     cardImage.src = "https://flagcdn.com/w320/co.png"; // Reemplazar con la URL de la imagen de la ciudad si está disponible
//     cardTitle.textContent = ciudad.name; // Establecer el nombre de la ciudad en el título
//     cardText.textContent = ciudad.description; // Establecer la descripción de la ciudad en el texto
// }

// // Función para mostrar los datos de las áreas naturales
// function mostrarAreasNaturales(data) {
//     let tarjetas2 = document.getElementById("tarjetita2"); // Obtener el elemento de la tarjeta de áreas naturales
//     let cardImage = tarjetas2.querySelector(".card-img-top"); // Obtener el elemento de imagen dentro de la tarjeta
//     let cardTitle = tarjetas2.querySelector(".card-title"); // Obtener el título de la tarjeta
//     let cardText = tarjetas2.querySelector(".card-text"); // Obtener el texto de la tarjeta

//     // Suponiendo que se quiere mostrar el primer área natural por ahora
//     let areaNatural = data[0]; // Obtener el primer área natural de los datos
//     cardImage.src = "https://flagcdn.com/w320/co.png"; // Reemplazar con la URL de la imagen del área natural si está disponible
//     cardTitle.textContent = areaNatural.name; // Establecer el nombre del área natural en el título
//     cardText.textContent = areaNatural.description; // Establecer la descripción del área natural en el texto
// }


//Cod prov 

// function obtenerCiudades(data) {
//     // let url = new URLSearchParams(window.location.search).get('id');
//     // let events = data.find(event => event.id == url);
//     console.log(data);

// }

// let url = "https://api-colombia.com/api/v1/Department"
// let url2 = "https://api-colombia.com/api/v1/City"
// let url3 = "https://api-colombia.com/api/v1/NaturalArea"

// fetch(url)
//     .then(response => response.json())
//     .then(data => pintar(data))

// fetch(url2)
//     .then(response => response.json())
//     .then(data => obtenerCiudades(data))
//     .catch(e => console.log(e))

// fetch(url3)
//     .then(response => response.json())
//     .then(data => obtenerAreas(data))
//     .catch(e => console.log(e))

// let ciudadesArray = []
// let areas = []
// let contenedorAreas = document.getElementById("contenedorAreas")
// let contenedorCiudades = document.getElementById("contenedorCiudades")

// function obtenerAreas(array) {

//     let areasDuplicadas = array.filter(data => data.departmentId == idArreglo)
//     areasDuplicadas.forEach(elemento => {
//         if (!areas.includes(elemento.name)) {
//             areas.push(elemento.name)
//         }

//     });
//     console.log(areas);
//     pintarAreas(areas);
// }

// function obtenerCiudades(array) {
//     let nuevoArreglo = array.filter(data => data.departmentId == idArreglo)
//     ciudadesArray = nuevoArreglo
//     pintarCiudades(nuevoArreglo)

// }

// function pintar(tarj) {
//     let posicion = tarj.find(num => num.id == idArreglo);
//     let contenedorDinamico = document.getElementById("tarjetaDinamica");
//     contenedorDinamico.innerHTML = `
//         <div class="card" style="width: 18rem;">
//             <img src="${posicion.image}" class="card-img-top" alt="${posicion.name}">
//             <div class="card-body">
//                 <h5 class="card-title">${posicion.name}</h5>
//                 <p class="card-text">${posicion.description}</p>
//             </div>
//         </div>
//     `;
// }

document.addEventListener('DOMContentLoaded', function () {
    const departmentNameElement = document.getElementById('department-name');
    const departmentInfoElement = document.getElementById('department-info');
    const citiesContainer = document.getElementById('cities-list');
    const airportsContainer = document.getElementById('airports-list');

    // Obtener el ID del departamento desde la URL
    const urlParams = new URLSearchParams(window.location.search);
    const departmentId = urlParams.get('id');

    if (!departmentId) {
        departmentInfoElement.innerHTML = '<p>Departamento no especificado.</p>';
        return;
    }

    // URLs de las APIs
    const departmentUrl = `https://api-colombia.com/api/v1/Department/${departmentId}`;
    const citiesUrl = 'https://api-colombia.com/api/v1/City';
    const airportsUrl = 'https://api-colombia.com/api/v1/Airport';

    // Obtener detalles del departamento
    fetch(departmentUrl)
        .then(response => response.json())
        .then(data => {
            departmentNameElement.textContent = data.name;
            departmentInfoElement.innerHTML = `
          <p>${data.description || 'No hay descripción disponible para este departamento.'}</p>
        `;
        })
        .catch(error => {
            console.error('Error fetching department details:', error);
            departmentInfoElement.innerHTML = '<p>Hubo un error al cargar la información del departamento. Inténtalo de nuevo más tarde.</p>';
        });

    // Obtener ciudades y aeropuertos
    Promise.all([
        fetch(citiesUrl).then(response => response.json()),
        fetch(airportsUrl).then(response => response.json())
    ])
        .then(([citiesData, airportsData]) => {
            // Filtrar ciudades por departamento
            const cities = citiesData.filter(city => city.departmentId == departmentId);
            if (cities.length > 0) {
                cities.forEach(city => {
                    citiesContainer.innerHTML += `
              <div class="card mb-3">
                <div class="card-body">
                  <h5 class="card-title">${city.name}</h5>
                </div>
              </div>
            `;
                });
            } else {
                citiesContainer.innerHTML = '<p>No hay ciudades disponibles para este departamento.</p>';
            }

            // Filtrar aeropuertos por departamento
            const airports = airportsData.filter(airport => airport.departmentId == departmentId);
            if (airports.length > 0) {
                airports.forEach(airport => {
                    airportsContainer.innerHTML += `
              <div class="card mb-3">
                <div class="card-body">
                  <h5 class="card-title">${airport.name}</h5>
                  <p class="card-text">Código: ${airport.code}</p>
                  <p class="card-text">Ubicación: ${airport.location}</p>
                </div>
              </div>
            `;
                });
            } else {
                airportsContainer.innerHTML = '<p>No hay aeropuertos disponibles para este departamento.</p>';
            }
        })
        .catch(error => {
            console.error('Error fetching cities or airports:', error);
            citiesContainer.innerHTML = '<p>Hubo un error al cargar las ciudades. Inténtalo de nuevo más tarde.</p>';
            airportsContainer.innerHTML = '<p>Hubo un error al cargar los aeropuertos. Inténtalo de nuevo más tarde.</p>';
        });
});