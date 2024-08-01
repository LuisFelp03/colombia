document.addEventListener('DOMContentLoaded', function () {
    const departmentsContainer = document.getElementById('departments-container');
    const filterInput = document.getElementById('filter-departments');

    fetch('https://api-colombia.com/api/v1/Department')
        .then(response => response.json())
        .then(data => {
            let row;
            data.forEach((department, index) => {
                if (index % 3 === 0) {
                    row = document.createElement('div');
                    row.classList.add('row');
                    departmentsContainer.appendChild(row);
                }

                const departmentCard = document.createElement('div');
                departmentCard.classList.add('department-card', 'col-md-4', 'card', 'mb-4', 'shadow-sm');

                // Asegurarse de que los datos existan antes de acceder a ellos
                const description = department.description || 'No hay descripción disponible.';

                departmentCard.innerHTML = `
                    <div class="card-body">
                        <h3 class="card-title">${department.name}</h3>
                        <p class="card-text">${description}</p>
                        <button class="btn btn-primary" onclick="viewDetails(${department.id})">Detalles</button>
                    </div>
                `;
                row.appendChild(departmentCard);
            });
        })
        .catch(error => {
            console.error('Error fetching departments:', error);
            departmentsContainer.innerHTML = '<p>Hubo un error al cargar los departamentos. Inténtalo de nuevo más tarde.</p>';
        });

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

function viewDetails(departmentId) {
    window.location.href = `details.html?departmentId=${departmentId}`;
}