// Configuración inicial
const url = "https://api-colombia.com/api/v1/Invasivespecie";
let speciesData = []; // Variable para almacenar los datos de especies

// Función para inicializar la aplicación
const init = () => {
    fetchSpeciesData();
};

// Función para obtener datos de la API
const fetchSpeciesData = () => {
    fetch(url)
        .then((response) => {
            if (!response.ok) {
                throw new Error("Network response was not ok");
            }
            return response.json(); // Convierte la respuesta a JSON
        })
        .then((data) => {
            speciesData = data; // Guardar los datos en la variable
            mostrarData(data); // Mostrar los datos en la tabla
        })
        .catch((error) => console.log("Error fetching data:", error));
};

// Función para mostrar los datos en la tabla
const mostrarData = (data) => {
    console.log(data);
    let body = "";

    // Verifica si no hay datos
    if (data.length === 0) {
        body =
            "<tr><td colspan='7' class='no-data-message'>No se encontraron datos</td></tr>";
        document.getElementById("noResults").style.display = "block"; // Mostrar mensaje
    } else {
        document.getElementById("noResults").style.display = "none"; // Ocultar mensaje

        // Itera sobre los datos y crea las filas de la tabla
        data.forEach((species) => {
            let rowClass = getRowClass(species.riskLevel); // Obtener clase de fila
            body += `<tr class="${rowClass}">
                <td>${species.id}</td>
                <td>${species.name}</td>
                <td>${species.scientificName}</td>
                <td class="scrollable-cell"><div class="inner-cell">${species.impact}</div></
td>
                <td class="scrollable-cell"><div class="inner-cell">${species.manage}</div></
td>
                <td>${species.riskLevel}</td>
                <td><img src="${species.urlImage}" alt="${species.name}"></td>
            </tr>`;
        });
    }

    // Actualiza el contenido del cuerpo de la tabla
    document.getElementById("data").innerHTML = body;
};

// Función para obtener la clase de la fila según el nivel de riesgo
const getRowClass = (riskLevel) => {
    if (riskLevel === 1) {
        return "table-primary"; // Azul oscuro para riesgo 1
    } else if (riskLevel === 2) {
        return "table-success"; // Verde oscuro para riesgo 2
    }
    return ""; // Sin clase si no es 1 ni 2
};

// Función para filtrar las especies según el buscador y los checkboxes
const filterCards = () => {
    const searchInput = document.getElementById("search").value.toLowerCase();
    const riskLevel1Checked = document.getElementById("riskLevel1").checked;
    const riskLevel2Checked = document.getElementById("riskLevel2").checked;

    // Filtra los datos según el nombre y el nivel de riesgo
    const filteredData = speciesData.filter((species) => {
        const matchesSearch = species.name.toLowerCase().includes(searchInput);
        const matchesRiskLevel1 = riskLevel1Checked
            ? species.riskLevel === 1
            : true;
        const matchesRiskLevel2 = riskLevel2Checked
            ? species.riskLevel === 2
            : true;

        return matchesSearch && matchesRiskLevel1 && matchesRiskLevel2;
    });

    mostrarData(filteredData); // Muestra los datos filtrados
};

// Función para limpiar el campo de búsqueda y los checkboxes
const clearSearch = () => {
    document.getElementById("search").value = ""; // Limpiar el campo de búsqueda
    document.getElementById("riskLevel1").checked = false; // Desmarcar checkbox de riesgo 1
    document.getElementById("riskLevel2").checked = false; // Desmarcar checkbox de riesgo 2
    mostrarData(speciesData); // Mostrar todos los datos
};




// Inicializa la aplicación al cargar
window.onload = init;