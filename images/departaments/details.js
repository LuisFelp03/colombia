document.addEventListener('DOMContentLoaded', function () {
    const departmentNameElement = document.getElementById('department-name');
    const departmentDescriptionElement = document.getElementById('department-description');
    const citiesContainer = document.getElementById('cities-container');
    const naturalsContainer = document.getElementById('naturals-container');
    const filterCitiesCheckbox = document.getElementById('filter-cities');
    const filterNaturalsCheckbox = document.getElementById('filter-naturals');

    // Verifica si los elementos existen
    if (!departmentNameElement || !departmentDescriptionElement || !citiesContainer || !naturalsContainer || !filterCitiesCheckbox || !filterNaturalsCheckbox) {
        console.error('Algunos elementos están ausentes en el DOM.');
        return;
    }

    // Obtén el ID del departamento desde la URL
    const urlParams = new URLSearchParams(window.location.search);
    const departmentId = urlParams.get('id');

    if (departmentId) {
        fetch(`https://api-colombia.com/api/v1/Department/${departmentId}`)
            .then(response => response.json())
            .then(department => {
                departmentNameElement.textContent = department.name;
                departmentDescriptionElement.innerHTML = `<p>${department.description || 'No hay descripción disponible.'}</p>`;

                fetchCities(departmentId);
                fetchNaturals(departmentId);
            })
            .catch(error => {
                console.error('Error fetching department details:', error);
                departmentDescriptionElement.innerHTML = '<p>Hubo un error al cargar la información del departamento. Inténtalo de nuevo más tarde.</p>';
            });
    } else {
        departmentDescriptionElement.innerHTML = '<p>ID del departamento no proporcionado.</p>';
    }

    function fetchCities(departmentId) {
        fetch(`https://api-colombia.com/api/v1/Department/${departmentId}/City`)
            .then(response => response.json())
            .then(cities => {
                renderCards(citiesContainer, cities, 'city', 'Ciudades', filterCitiesCheckbox);
            })
            .catch(error => {
                console.error('Error fetching cities:', error);
                citiesContainer.innerHTML = '<p>Hubo un error al cargar las ciudades. Inténtalo de nuevo más tarde.</p>';
            });
    }

    function fetchNaturals(departmentId) {
        fetch(`https://api-colombia.com/api/v1/Department/${departmentId}/NaturalArea`)
            .then(response => response.json())
            .then(naturals => {
                renderCards(naturalsContainer, naturals, 'natural', 'Áreas Naturales', filterNaturalsCheckbox);
            })
            .catch(error => {
                console.error('Error fetching natural areas:', error);
                naturalsContainer.innerHTML = '<p>Hubo un error al cargar las áreas naturales. Inténtalo de nuevo más tarde.</p>';
            });
    }

    function renderCards(container, items, type, title, checkbox) {
        container.innerHTML = ''; // Limpiar el contenedor
        if (items.length === 0) {
            container.innerHTML = `<p>No se encontraron ${title.toLowerCase()}.</p>`;
            return;
        }

        items.forEach(item => {
            const card = document.createElement('div');
            card.className = 'text-center col-12 col-md-6 col-lg-4 mb-4 d-flex align-items-stretch';
            const description = item.description || 'No hay descripción disponible.';
            const imageUrl = item.image || 'https://via.placeholder.com/150'; // Imagen por defecto

            card.innerHTML = `
                <div class="card h-100 w-100">
                    <img src="${imageUrl}" class="card-img-top custom-img" alt="${item.name}">
                    <div class="card-body">
                        <h3 class="card-title">${item.name}</h3>
                        <p class="card-text">${description}</p>
                    </div>
                </div>
            `;
            container.appendChild(card);
        });

        checkbox.addEventListener('change', function () {
            container.style.display = checkbox.checked ? 'flex' : 'none';
        });
    }
});
