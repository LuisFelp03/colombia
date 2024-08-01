document.addEventListener('DOMContentLoaded', function () {
    const departmentsContainer = document.getElementById('departments-container');
    const filterInput = document.getElementById('filter-departments');
    const colombiaDescriptionContainer = document.getElementById('colombia-description-container');

    // URLs de las imágenes de los departamentos
    const departmentImages = {
        "meta": "https://upload.wikimedia.org/wikipedia/commons/thumb/0/05/Mapa_de_Meta_%28subregiones%29.svg/270px-Mapa_de_Meta_%28subregiones%29.svg.png",
        "valle_del_cauca": "https://www.familysearch.org/es/wiki/img_auth.php/thumb/6/6b/Departamento_del_Valle_del_Cauca%2C_Colombia_Mapa.png/400px-Departamento_del_Valle_del_Cauca%2C_Colombia_Mapa.png",
        "bogotá": "https://upload.wikimedia.org/wikipedia/commons/8/8b/Bogot%C3%A1_in_New_Granada_%281810%29.svg",
        "atlántico": "https://www.familysearch.org/es/wiki/img_auth.php/thumb/7/72/Departamento_de_Atl%C3%A1ntico%2C_Colombia_Mapa.png/300px-Departamento_de_Atl%C3%A1ntico%2C_Colombia_Mapa.png",
        "cundinamarca": "https://i.pinimg.com/originals/3c/87/65/3c87659dad15f8d0cbad74aec4ed37b4.png",
        "vaupés": "https://www.familysearch.org/es/wiki/img_auth.php/thumb/2/29/Departamento_de_Vaup%C3%A9s%2C_Colombia_Mapa.png/375px-Departamento_de_Vaup%C3%A9s%2C_Colombia_Mapa.png",
        "sucre": "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c5/Colombia_Sucre_location_map_%28adm_colored%29.svg/350px-Colombia_Sucre_location_map_%28adm_colored%29.svg.png",
        "casanare": "https://www.casanare.gov.co/ElCasanare/PublishingImages/Paginas/En-Colombia/casanare.jpg",
        "magdalena": "https://www.familysearch.org/es/wiki/img_auth.php/thumb/a/a6/Departamento_de_Magdalena%2C_Colombia_Mapa.png/350px-Departamento_de_Magdalena%2C_Colombia_Mapa.png",
        "la_guajira": "https://www.todacolombia.com/imagenes/departamentos-de-colombia/La-Guajira/La_Guajira_departamento.jpg",
        "antioquia": "https://previews.123rf.com/images/meteoropata/meteoropata1702/meteoropata170200668/72499699-mapa-vectorial-de-la-regi%C3%B3n-de-antioquia-colombia-mapa-vectorial-editable-divisiones.jpg",
        "huila": "https://www.todacolombia.com/imagenes/departamentos-de-colombia/Huila/Mapa_division_politica_municipios_del_departamento_del_Huila_1366x768.jpg",
        "quindío": "https://www.familysearch.org/es/wiki/img_auth.php/thumb/5/57/Departamento_de_Quind%C3%ADo%2C_Colombia_Mapa.png/350px-Departamento_de_Quind%C3%ADo%2C_Colombia_Mapa.png",
        "putumayo": "https://www.todacolombia.com/imagenes/departamentos-de-colombia/Putumayo/Mapa_division_politica_municipios_del_departamento_del_Putumayo_1366x768.jpg",
        "vichada": "https://www.todacolombia.com/imagenes/departamentos-de-colombia/Vichada/Mapa_division_politica_municipios_del_departamento_del_Vichada_1366x768.jpg",
        "cauca": "https://sedcauca.gov.co/wp-content/uploads/2018/03/MAPA-SUBREGIONES-1.jpg",
        "risaralda": "https://www.familysearch.org/es/wiki/img_auth.php/thumb/8/83/Departamento_de_Risaralda%2C_Colombia_Mapa.png/400px-Departamento_de_Risaralda%2C_Colombia_Mapa.png",
        "Caquetá": "https://www.municipios.com.co/imagenes/caqueta.jpg",
        "chocó": "https://www.gifex.com/images/0X0/2009-09-17-5883/Departamento_del_Choco.jpg",
        "arauca": "https://www.todacolombia.com/imagenes/departamentos-de-colombia/Arauca/Mapa_division_politica_municipios_del_departamento_de_Arauca.jpg",
        "nariño": "https://i.pinimg.com/736x/28/e9/af/28e9afacc126d92220f7f10fc084ad9d.jpg",
        "bolívar": "https://www.familysearch.org/es/wiki/img_auth.php/thumb/2/24/Departamento_de_Bol%C3%ADvar%2C_Colombia_Mapa.png/240px-Departamento_de_Bol%C3%ADvar%2C_Colombia_Mapa.png",
        "cesar": "https://www.familysearch.org/es/wiki/img_auth.php/thumb/9/92/Departamento_de_Cesar%2C_Colombia_Mapa.png/250px-Departamento_de_Cesar%2C_Colombia_Mapa.png",
        "san_andrés_y_providencia": "https://www.familysearch.org/es/wiki/img_auth.php/thumb/1/12/Departamento_de_San_Andr%C3%A9s_y_Providencia%2C_Colombia_Mapa.png/400px-Departamento_de_San_Andr%C3%A9s_y_Providencia%2C_Colombia_Mapa.png",
        "Cordoba": "https://www.todacolombia.com/imagenes/departamentos-de-colombia/Cordoba/Mapa_division_politica_municipios_del_departamento_de_Cordoba.jpg",
        "boyacá": "https://www.todacolombia.com/imagenes/departamentos-de-colombia/Boyaca/rs/Municipios_departamento_Boyaca_face.jpg",
        "tolima": "https://www.familysearch.org/es/wiki/img_auth.php/thumb/1/10/Departamento_de_Tolima%2C_Colombia_Mapa.png/350px-Departamento_de_Tolima%2C_Colombia_Mapa.png",
        "norte_de_santander": "https://www.familysearch.org/es/wiki/img_auth.php/thumb/a/a9/Departamento_del_Norte_de_Santander%2C_Colombia_Mapa.png/300px-Departamento_del_Norte_de_Santander%2C_Colombia_Mapa.png",
        "guaviare": "https://www.familysearch.org/es/wiki/img_auth.php/thumb/1/10/Departamento_de_Guaviare%2C_Colombia_Mapa.png/500px-Departamento_de_Guaviare%2C_Colombia_Mapa.png",
        "guainía": "https://www.gifex.com/images/0X0/2009-09-17-5886/Departamento_del_Guainia.jpg",
        "santander": "https://www.familysearch.org/es/wiki/img_auth.php/thumb/4/4e/Departamento_de_Santander%2C_Colombia_Mapa.png/350px-Departamento_de_Santander%2C_Colombia_Mapa.png",
        "caldas": "https://www.familysearch.org/es/wiki/img_auth.php/thumb/5/50/Departamento_de_Caldas%2C_Colombia_Mapa.png/600px-Departamento_de_Caldas%2C_Colombia_Mapa.png",
        "amazonas": "https://colombiaverde.com.co/wp-content/uploads/2023/04/Departamentos-de-la-region-Amazonica-colombiana.jpg",
    }


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
            // Guardar los departamentos en una variable para el filtro
            window.departments = data;
            renderDepartments(data);
        })
        .catch(error => {
            console.error('Error fetching departments:', error);
            departmentsContainer.innerHTML = '<p>Hubo un error al cargar los departamentos. Inténtalo de nuevo más tarde.</p>';
        });

    // Función para renderizar los departamentos
    function renderDepartments(departments) {
        departmentsContainer.innerHTML = ''; // Limpiar el contenedor de departamentos
        if (departments.length === 0) {
            departmentsContainer.innerHTML = '<p>No se encontró ningún departamento.</p>';
            return;
        }
        departments.forEach(department => {
            const departmentCard = document.createElement('div');
            departmentCard.className = 'col-md-4 mb-4';

            const departmentImage = departmentImages[department.name.toLowerCase()] || 'URL_DE_IMAGEN_POR_DEFECTO';
            departmentCard.innerHTML = `
                <div class="card">
                    <img src="${departmentImage}" class="card-img-top" alt="${department.name}">
                    <div class="card-body">
                        <h5 class="card-title">${department.name}</h5>
                        <p class="card-text">Código: ${department.code}</p>
                        <a href="details.html?department=${department.id}" class="btn btn-primary">Detalles</a>
                    </div>
                </div>
            `;
            departmentsContainer.appendChild(departmentCard);
        });
    }

    // Filtro de búsqueda de departamentos
    filterInput.addEventListener('input', function () {
        const filterValue = filterInput.value.toLowerCase();
        const filteredDepartments = window.departments.filter(department =>
            department.name.toLowerCase().includes(filterValue)
        );
        renderDepartments(filteredDepartments);
    });
});