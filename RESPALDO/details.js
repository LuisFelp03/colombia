document.addEventListener('DOMContentLoaded', function () {
    const departmentDetails = document.getElementById('department-details');
    const citiesContainer = document.getElementById('cities-container');
    const areasContainer = document.getElementById('areas-container');
    const showCitiesCheckbox = document.getElementById('show-cities');
    const showAreasCheckbox = document.getElementById('show-areas');

    const urlParams = new URLSearchParams(window.location.search);
    const departmentId = urlParams.get('departmentId');

    // Mostrar indicador de carga
    departmentDetails.innerHTML = '<p>Loading department details...</p>';
    citiesContainer.innerHTML = '<p>Loading cities...</p>';
    areasContainer.innerHTML = '<p>Loading attractions...</p>';

    // Fetch department details
    fetch(`https://api-colombia.com/api/v1/Department/${departmentId}`)
        .then(response => response.json())
        .then(department => {
            departmentDetails.innerHTML = `
                <h2>${department.name}</h2>
                <p>${department.description || 'No hay descripción disponible.'}</p>
            `;

            // Fetch cities
            fetch(`https://api-colombia.com/api/v1/Department/${departmentId}/cities`)
                .then(response => response.json())
                .then(cities => {
                    citiesContainer.innerHTML = ''; // Limpiar mensaje de carga
                    cities.forEach(city => {
                        const cityCard = document.createElement('div');
                        cityCard.classList.add('col-md-4', 'card', 'mb-4', 'shadow-sm');

                        cityCard.innerHTML = `
                            <div class="card-body">
                                <h5 class="card-title">${city.name}</h5>
                                <p class="card-text">${city.description || 'No hay descripción disponible.'}</p>
                            </div>
                        `;
                        citiesContainer.appendChild(cityCard);
                    });
                })
                .catch(error => {
                    console.error('Error fetching cities:', error);
                    citiesContainer.innerHTML = '<p>Hubo un error al cargar las ciudades. Inténtalo de nuevo más tarde.</p>';
                });

            // Fetch all touristic attractions
            fetch(`https://api-colombia.com/api/v1/TouristicAttraction`)
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Network response was not ok');
                    }
                    return response.json();
                })
                .then(attractions => {
                    // Filter attractions by departmentId
                    const filteredAttractions = attractions.filter(attraction => attraction.department.id === departmentId);

                    areasContainer.innerHTML = ''; // Limpiar mensaje de carga
                    if (filteredAttractions.length === 0) {
                        areasContainer.innerHTML = '<p>No se encontraron atracciones turísticas.</p>';
                    } else {
                        filteredAttractions.forEach(attraction => {
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
                })
                .catch(error => {
                    console.error('Error fetching tourist attractions:', error);
                    areasContainer.innerHTML = '<p>Hubo un error al cargar las atracciones turísticas. Inténtalo de nuevo más tarde.</p>';
                });
        })
        .catch(error => {
            console.error('Error fetching department details:', error);
            departmentDetails.innerHTML = '<p>Hubo un error al cargar los detalles del departamento. Inténtalo de nuevo más tarde.</p>';
        });

    showCitiesCheckbox.addEventListener('change', function () {
        citiesContainer.style.display = this.checked ? 'flex' : 'none';
    });

    showAreasCheckbox.addEventListener('change', function () {
        areasContainer.style.display = this.checked ? 'flex' : 'none';
    });
});