let url = "https://api-colombia.com/api/v1/Department"; // URL 
de la API para obtener departamentos
let speciesData = []; // Variable para almacenar los datos de 
departamentos

// imágenes para los departamentos
const departmentImages = {
    // (Imágenes de departamentos como en tu código original)
    Casanare:
        "https://regionorinoquia.com/wp-content/uploads/2022/11/Departamento-de-Casanare.jpg",

    Cundinamarca:
        "https://www.formulaentretenimiento.com/wp-content/uploads/2019/07/Cundinamarca-Formula-Entretenimiento.jpg",

    Cauca:
        "https://th.bing.com/th/id/OIP.uOiS11srb-2hDXwiypENggHaEn?rs=1&pid=ImgDetMain",

    Cesar:
        "https://th.bing.com/th/id/OIP.cYx-ybH_VGZLbg1UORFCFQHaE9?rs=1&pid = ImgDetMain",

    Chocó:
        "https://th.bing.com/th/id/OIP.SKFRn8eV4yH79UEdTiRTLAHaE_?rs=1&pid = ImgDetMain",

    Córdoba:
        "https://th.bing.com/th/id/R.d22c8b3d2ae719415529ef1758802cdc?rik=v9Kjwvvdu5vUsg&pid=ImgRaw&r=0",

    Guaviare:
        "https://www.colombiaextraordinaria.com/somos_colombia/external/img/img_departamentos/GUAVIAREimagen_ff.jpg",

    "La Guajira":
        "https://th.bing.com/th/id/OIP.BeNQThnb3cFVKZN_PWVWswHaEK?rs=1&pid = ImgDetMain",

    Magdalena:
        "https://th.bing.com/th/id/OIP.KKr4yRQiuxbeEpw9pnsM-AHaEK?rs=1&pid = ImgDetMain",

    Nariño:
        "https://th.bing.com/th/id/R.27e1fa1517876d142b83026c98f21b00?rik=o3PIoXgV8HpCiQ&riu=http%3a%2f%2fentretenimientotolima.com%2fwp-content%2fuploads%2f2021%2f06%2f100-10-1536x1024.jpg&ehk=2dpXN%2fPX7GKr0C88n5uAvnxntg%2f9AaNAHuuFTuB1O1o%3d&risl=&pid=ImgRaw&r=0",

    Caquetá:
        "https://th.bing.com/th/id/OIP.Xs1obQ5xBjaLPhnp8cqv1gHaEV?rs=1&pid = ImgDetMain",

    Guainía:
        "https://radionacional-v3.s3.amazonaws.com/s3fs-public/inline-images/Portada%20libro.jpeg",

    Amazonas:
        "https://th.bing.com/th/id/OIP.txUrAwQhiVi-e3BLtJXQWwHaEd?rs=1&pid=ImgDetMain",

    Antioquia:
        "https://th.bing.com/th/id/OIP.Yx_1PgeJj4laYkgWvmFXQwHaEg?rs=1&pid = ImgDetMain",

    Arauca:
        "https://th.bing.com/th/id/OIP.o72X2SeBumMLE422RIJPNQHaE7?rs=1&pid = ImgDetMain",

    Atlántico:
        "https://th.bing.com/th/id/OIP.aV-7Fiz9s_O2NDpnUZ372AHaFD?rs=1& pid = ImgDetMain",

    Bogotá:
        "https://th.bing.com/th/id/OIP.gs_q9-6PGXDm6nTuU5OfzAHaE7?rs=1&pid = ImgDetMain",

    Bolívar:
        "https://www.triviantes.com/wp-content/uploads/2022/07/bolivar-1.jpg",

    "Norte de Santander":
        "https://th.bing.com/th/id/OIP.z_Huf-Cq_DyM-oq8FuCXZAHaEH?rs = 1 & pid=ImgDetMain",

    Putumayo:
        "https://3.bp.blogspot.com/-BWEkX16xjUE/T8_jDUPyiLI/AAAAAAAAACU/SHlQaOunYDE/s1600/1.jpg",

    Quindío:
        "https://www.periodismoinvestigativo.com.co/wp-content/uploads/2020/12/paisaje-cultural-cafetero.jpg",

    Risaralda: "https://i.ytimg.com/vi/GYr-5Y5b1Aw/maxresdefault.jpg",

    "San Andrés y Providencia":
        "https://th.bing.com/th/id/R.1e76dcd36e83db654c733f433bf699ec?rik=ayaxrZqNSvMapw&pid=ImgRaw&r=0",

    Santander:
        "https://www.santanderalextremo.com/wp-content/uploads/2019/02/comida-tipica-santander.jpg",

    Tolima:
        "https://th.bing.com/th/id/OIP.Sbsi4deU_B2IzeP4rZ2nVQHaE8?rs=1&pid = ImgDetMain",

    "Valle del Cauca":
        "https://th.bing.com/th/id/OIP.l0ITWmLICl2wepxaGVnj8AHaE8?rs = 1 & pid=ImgDetMain",

    Vaupés:
        "https://th.bing.com/th/id/R.f07f8bc7c09e35849c55a08e2067f9b4?rik=zKA4kn8%2fAYbMcw&pid=ImgRaw&r=0&sres=1&sresct=1",

    Vichada:
        "https://th.bing.com/th/id/OIP.ET_ZM9YDGGEdcHYke10NSgHaE7?rs=1&pid = ImgDetMain",

    Caldas:
        "https://i.pinimg.com/originals/f0/03/94/f00394e237ed54634473fe3a92ffb0b5.jpg",

    Boyacá:
        "https://cdn.colombia.com/sdi/2013/12/19/puente-de-boyaca-1141958.jpg",

    Huila:
        "https://3.bp.blogspot.com/-OzNn3gaQdV8/TdVOK9RbOpI/AAAAAAAANxI/HPEdwijkS8Y/s1600/SDC15541.JPG",

    Meta: "https://www.triviantes.com/wp-content/uploads/2022/10/departamento-meta-de-colombia-1.jpeg",

    Sucre:
        "https://th.bing.com/th/id/OIP.Szt4uk8UqOhWU_uQQ6LO6AHaEM?rs=1&pid = ImgDetMain",
};
// Función para obtener datos de la API
fetch(url)
    .then((response) => {
        if (!response.ok) {
            throw new Error("Network response was not ok");
        }
        return response.json();
    })
    .then((data) => {
        speciesData = data; // Guardar los datos en la variable
        mostrarData(data); // Mostrar los datos en la tabla
    })
    .catch((error) => console.log("Error fetching data:", error));

// Función para mostrar los datos en tarjetas
const mostrarData = (data) => {
    let body = "";
    for (var i = 0; i < data.length; i++) {
        let imageUrl = departmentImages[data[i].name] || data[i].
            urlImage; // Usa la imagen del mapa o la imagen por defecto

        body += `<div class="col-md-4">
                    <div class="card">
                      <img src="${imageUrl}" 
class="card-img-top" alt="${data[i].name}">
                      <div class="card-body">
                        <h5 class="card-title">${data[i].name}</
h5>
                        <h6 class="card-subtitle mb-2 
text-muted">${data[i].description}</h6>
                        <a href="details.html?id=${data[i].id}" 
class="btn btn-primary">Detalles</a>
                      </div>
                    </div>
                  </div>`;
    }
    document.getElementById("data").innerHTML = body; // Actualiza 
    // el contenido del cuerpo de la tarjeta
};

// Función para filtrar los departamentos según el buscador
const filterCards = () => {
    // Obtener el valor del campo de búsqueda y convertirlo a 
    minúsculas
    const searchInput = document.getElementById("search").value.
        toLowerCase();

    // Filtrar los datos de especies basándose en el nombre del 
    departamento
    const filteredData = speciesData.filter((department) => {
        // Comprobar si el nombre del departamento incluye la 
        // entrada de búsqueda
        return department.name.toLowerCase().includes(searchInput);
    });

    // Llamar a la función para mostrar los datos filtrados
    mostrarData(filteredData); // Muestra los datos filtrados
};

// Función para limpiar el campo de búsqueda y los checkboxes
const clearSearch = () => {
    document.getElementById("search").value = ""; // Limpiar el 
    // campo de búsqueda
    document.getElementById("riskLevel1").checked = false; // 
    // Desmarcar checkbox de riesgo 1
    document.getElementById("riskLevel2").checked = false; // 
    // Desmarcar checkbox de riesgo 2
    mostrarData(speciesData); // Mostrar todos los datos
};