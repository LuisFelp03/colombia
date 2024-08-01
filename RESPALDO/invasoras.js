document.addEventListener('DOMContentLoaded', function () {
    const url = "https://api-colombia.com/api/v1/InvasiveSpecie";
    let speciesData = []; // Variable para almacenar los datos de especies
    const tableBody = document.querySelector('#invasive-species-table tbody');
    const riskLevel1Checkbox = document.getElementById("riskLevel1");
    const riskLevel2Checkbox = document.getElementById("riskLevel2");

    // Función para inicializar la aplicación
    const init = () => {
        fetchSpeciesData();
        addEventListeners();
    };

    // Función para obtener datos de la API
    const fetchSpeciesData = () => {
        fetch(url)
            .then(response => {
                if (!response.ok) {
                    throw new Error("Network response was not ok");
                }
                return response.json(); // Convierte la respuesta a JSON
            })
            .then(data => {
                speciesData = data; // Guardar los datos en la variable
                mostrarData(data); // Mostrar los datos en la tabla
            })
            .catch(error => {
                console.error('Error fetching invasive species:', error);
                tableBody.innerHTML = '<tr><td colspan="6">Hubo un error al cargar las especies invasoras. Inténtalo de nuevo más tarde.</td></tr>';
            });
    };

    // Función para mostrar los datos en la tabla
    const mostrarData = (data) => {
        tableBody.innerHTML = ''; // Limpiar tabla antes de agregar datos

        if (data.length === 0) {
            tableBody.innerHTML = '<tr><td colspan="6" class="no-data-message">No se encontraron datos</td></tr>';
        } else {
            data.forEach(species => {
                const row = document.createElement('tr');

                // Asignar color de fondo según el nivel de riesgo
                if (species.riskLevel === 1) {
                    row.style.backgroundColor = 'blue';
                    row.style.color = 'white';  // Cambiar el color del texto para mejor legibilidad
                } else if (species.riskLevel === 2) {
                    row.style.backgroundColor = 'green';
                    row.style.color = 'white';  // Cambiar el color del texto para mejor legibilidad
                }

                row.innerHTML = `
                    <td>${species.name}</td>
                    <td>${species.scientificName}</td>
                    <td>${species.impact}</td>
                    <td>${species.manage}</td>
                    <td>${species.riskLevel}</td>
                    <td><img src="${species.urlImage}" alt="${species.name}" style="width: 100px; height: auto;"></td>
                `;
                tableBody.appendChild(row);
            });
        }
    };

    // Función para filtrar las especies según los checkboxes
    const filterSpecies = () => {
        const filteredData = speciesData.filter(species => {
            const matchesRiskLevel1 = riskLevel1Checkbox.checked ? species.riskLevel === 1 : true;
            const matchesRiskLevel2 = riskLevel2Checkbox.checked ? species.riskLevel === 2 : true;
            return matchesRiskLevel1 && matchesRiskLevel2;
        });
        mostrarData(filteredData); // Muestra los datos filtrados
    };

    // Función para agregar los event listeners a los checkboxes
    const addEventListeners = () => {
        riskLevel1Checkbox.addEventListener('change', filterSpecies);
        riskLevel2Checkbox.addEventListener('change', filterSpecies);
    };

    // Inicializa la aplicación al cargar
    init();
});