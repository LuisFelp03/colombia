document.addEventListener('DOMContentLoaded', function () {
    const departmentDetails = document.getElementById('department-details');
    const citiesContainer = document.getElementById('cities-container');
    const areasContainer = document.getElementById('areas-container');
    const showCitiesCheckbox = document.getElementById('show-cities');
    const showAreasCheckbox = document.getElementById('show-areas');
    const searchInput = document.getElementById('filter-departments');

    const urlParams = new URLSearchParams(window.location.search);
    const departmentId = urlParams.get('departmentId');

    departmentDetails.innerHTML = '<p>Loading department details...</p>';
    citiesContainer.innerHTML = '<p>Loading cities...</p>';
    areasContainer.innerHTML = '<p>Loading attractions...</p>';

    let cities = [];
    let attractions = [];

    fetch(`https://api-colombia.com/api/v1/Department/${departmentId}`)
        .then(response => response.json())
        .then(department => {
            departmentDetails.innerHTML = `
                <h2>${department.name}</h2>
                <p>${department.description || 'No hay descripción disponible.'}</p>
            `;

            fetch(`https://api-colombia.com/api/v1/Department/${departmentId}/cities`)
                .then(response => response.json())
                .then(data => {
                    cities = data;
                    displayCities(cities);
                })
                .catch(error => {
                    console.error('Error fetching cities:', error);
                    citiesContainer.innerHTML = '<p>Hubo un error al cargar las ciudades. Inténtalo de nuevo más tarde.</p>';
                });

            fetch(`https://api-colombia.com/api/v1/TouristicAttraction`)
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Network response was not ok');
                    }
                    return response.json();
                })
                .then(data => {
                    attractions = data.filter(attraction => attraction.department.id === departmentId);
                    displayAttractions(attractions);
                })
                .catch(error => {
                    console.error('Error fetching tourist attractions:', error);
                    areasContainer.innerHTML = '<p>Hubo un error al cargar las Áreas Naturales. Inténtalo de nuevo más tarde.</p>';
                });
        })
        .catch(error => {
            console.error('Error fetching department details:', error);
            departmentDetails.innerHTML = '<p>Hubo un error al cargar los detalles del departamento. Inténtalo de nuevo más tarde.</p>';
        });

    showCitiesCheckbox.addEventListener('change', function () {
        citiesContainer.style.display = this.checked ? 'block' : 'none';
    });

    showAreasCheckbox.addEventListener('change', function () {
        areasContainer.style.display = this.checked ? 'block' : 'none';
    });

    searchInput.addEventListener('input', function () {
        const filter = searchInput.value.toLowerCase();
        const filteredCities = cities.filter(city => city.name.toLowerCase().includes(filter));
        const filteredAttractions = attractions.filter(attraction => attraction.name.toLowerCase().includes(filter));
        displayCities(filteredCities);
        displayAttractions(filteredAttractions);
    });

    function displayCities(cities) {
        citiesContainer.innerHTML = '';
        cities.forEach(city => {
            const cityCard = document.createElement('div');
            cityCard.classList.add('col-md-4', 'card', 'mb-4', 'shadow-sm');

            const descriptionContent = city.description
                ? city.description
                : '<img src="https://www.researchgate.net/profile/Leonardo-Romero-2/publication/341654885/figure/fig2/AS:895530230091776@1590522453109/Mapa-del-Sistema-de-Ciudades-de-Colombia-Fuente-Mision-del-Sistema-de-Ciudades.ppm" alt="Mapa del Sistema de Ciudades de Colombia" style="width: 100%; height: auto;" />';

            cityCard.innerHTML = `
                <div class="card-body">
                    <h5 class="card-title">${city.name}</h5>
                    <p class="card-text">${descriptionContent}</p>
                </div>
            `;
            citiesContainer.appendChild(cityCard);
        });
    }

    function displayAttractions(attractions) {
        areasContainer.innerHTML = '';
        if (attractions.length === 0) {
            areasContainer.innerHTML = '<p>No se encontraron atracciones turísticas.</p>';
        } else {
            attractions.forEach(attraction => {
                const attractionCard = document.createElement('div');
                attractionCard.classList.add('col-md-4', 'card', 'mb-4', 'shadow-sm');
                attractionCard.innerHTML = `
                    <img src="${attraction.images.length > 0 ? attraction.images[0] : 'default-image-url.jpg'}" class="card-img-top" alt="${attraction.name}">
                    <div class="card-body">
                        <h5 class="card-title">${attraction.name}</h5>
                        <p class="card-text">${attraction.description || 'No hay descripción disponible.'}</p>
                    </div>
                `;
                areasContainer.appendChild(attractionCard);
            });
        }
    }
});