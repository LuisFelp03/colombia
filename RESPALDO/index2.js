document.addEventListener('DOMContentLoaded', function () {
    const departmentsContainer = document.getElementById('departments-container');
    const filterInput = document.getElementById('filter-departments');
    const colombiaDescriptionContainer = document.getElementById('colombia-description-container');

    // Cargar descripción de Colombia
    fetch('https://api-colombia.com/api/v1/Country/Colombia')
        .then(response => response.json())
        .then(data => {
            const description = data.description || 'No hay descripción disponible de Colombia.';
            const descriptionElement = document.createElement('p');
            descriptionElement.textContent = description;
            colombiaDescriptionContainer.appendChild(descriptionElement);
        })
        .catch(error => {
            console.error('Error fetching Colombia description:', error);
            colombiaDescriptionContainer.innerHTML = '<p>Hubo un error al cargar la descripción de Colombia. Inténtalo de nuevo más tarde.</p>';
        });

    // Cargar departamentos
    fetch('https://api-colombia.com/api/v1/Department')
        .then(response => response.json())
        .then(data => {
            data.forEach(department => {
                const departmentCard = document.createElement('div');
                departmentCard.className = 'department-card col-12 col-md-6 col-lg-4 mb-4 d-flex align-items-stretch';

                const description = department.description || 'No hay descripción disponible.';

                departmentCard.innerHTML = `
                    <div class="card h-100 w-100">
                        <div class="card-body">
                            <h3 class="card-title">${department.name}</h3>
                            <p class="card-text">${description}</p>
                            <button class="btn btn-primary" onclick="viewDetails(${department.id})">Detalles</button>
                        </div>
                    </div>
                `;
                departmentsContainer.appendChild(departmentCard);
            });
        })
        .catch(error => {
            console.error('Error fetching departments:', error);
            departmentsContainer.innerHTML = '<p>Hubo un error al cargar los departamentos. Inténtalo de nuevo más tarde.</p>';
        });

    // Filtro de departamentos
    filterInput.addEventListener('input', function () {
        const filterText = filterInput.value.toLowerCase();
        const cards = document.querySelectorAll('.department-card');
        cards.forEach(card => {
            const departmentName = card.querySelector('.card-title').textContent.toLowerCase();
            if (departmentName.includes(filterText)) {
                card.style.display = '';
            } else {
                card.style.display = 'none';
            }
        });
    });
});

// Función para ver detalles del departamento
function viewDetails(departmentId) {
    window.location.href = `details.html?departmentId=${departmentId}`;
}