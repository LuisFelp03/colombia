const areasContainer = document.getElementById('areasContainer');

// Fetch atracciones turísticas
fetch(`https://api-colombia.com/api/v1/TouristicAttraction`)
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(attractions => {
        if (attractions.length === 0) {
            areasContainer.innerHTML = '<p>No se encontraron atracciones turísticas.</p>';
        } else {
            attractions.forEach(attraction => {
                const attractionCard = document.createElement('div');
                attractionCard.classList.add('col-md-4', 'card', 'mb-4', 'shadow-sm');

                attractionCard.innerHTML = `
                    <img src="${attraction.images.length > 0 ? attraction.images : 'default-image-url.jpg'}" class="card-img-top" alt="${attraction.name}">
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