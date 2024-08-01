// fetch('https://api-colombia.com/api/v1/Department')
//     .then(response => response.json())
//     .then(data => datosDepartamentos(data)).catch(error => console.log(error));

    // fetch('https://api-colombia.com//api/v1/City')
    // .then(response => response.json())
    // .then(data => datosCiudad(data)).catch(error => console.log(error));

    // fetch('https://api-colombia.com//api/v1/NaturalArea')
    // .then(response => response.json())
    // .then(data => datosNatural(data)).catch(error => console.log(error));



    fetch('https://api-colombia.com/api/v1/Department')
  .then(response => response.json())
  .then(data => {
    datosDepartamentos(data);
    return fetch('https://api-colombia.com//api/v1/City');
  })
  .then(response => response.json())
  .then(data => {
    datosCiudad(data);
    return fetch('https://api-colombia.com//api/v1/NaturalArea');
  })
  .then(response => response.json())
  .then(data => {
    datosNatural(data);
  })
  .catch(error => console.log(error));

    let tarjetas = document.getElementsByClassName("tarjeta");
    let tarjeta = tarjetas[0];
    let tarjetas2 = document.getElementsByClassName("tarjeta2");
    let tarjeta2 = tarjetas2[0];
    let contador = 0;

    let datosDepartamentos = (data) => {
    let url = new URLSearchParams(window.location.search).get('id');
    let event = data.find(event => event.id == url);
    document.querySelector("h1").innerHTML = event.name;
    document.querySelector("p").innerHTML = event.description;
}

tarjetas[0].parentNode.removeChild(tarjetas[0]);



function datosCiudad(data) {
    let url = new URLSearchParams(window.location.search).get('id');
    let events = data.filter(event => event.departmentId == url);
    events.forEach((event) => {
        let nuevasTarjetas = document.getElementById("tarjetas").appendChild(tarjeta.cloneNode(true));
        nuevasTarjetas.setAttribute("class", "ciudad CY TY card me-4 mb-4 tarjeta");

        nuevasTarjetas.querySelector("h5").innerHTML = event.name;
        if (event.description.length > 0) {
            nuevasTarjetas.querySelector("p").innerHTML = event.description;
        } else {
            nuevasTarjetas.querySelector("p").innerHTML = "No hay descripción";
        }
       
    });



}

tarjetas2[0].parentNode.removeChild(tarjetas2[0]);
function datosNatural(data) {
    let url = new URLSearchParams(window.location.search).get('id');
    let events = data.filter(event => event.departmentId == url);
    
    const uniqueCategoryIds = new Set();

    for (let i = 0; i < events.length; i++) {
        for (let j = 0; j < events.length; j++) {    
           
            if (i !== j && events[i].categoryNaturalAreaId === events[j].categoryNaturalAreaId) {
                uniqueCategoryIds.add(events[i].categoryNaturalAreaId);
                

            }
        }
    }

    const uniqueEventNames = new Set();
    events.forEach((event) => {
        if (!uniqueEventNames.has(event.name)) {
            let nuevasTarjetas = document.getElementById("tarjetas2").appendChild(tarjeta2.cloneNode(true));
            nuevasTarjetas.setAttribute("class", "natural CY TY card me-4 mb-4");
            nuevasTarjetas.querySelector("h5").innerHTML = event.name;
            nuevasTarjetas.querySelector("p").innerHTML = "No hay descripción";
            uniqueEventNames.add(event.name);
        }
    });
}










// let CheckboxCategoria = document.getElementById("checkboxCategoria");
// CheckboxCategoria.addEventListener("click", (e) => {
//     let checkbox = e.target;
//     if (checkbox.type === "checkbox") {
//         contador++;
//         console.log(tarjetas);
//         Array.from(tarjetas).forEach((tarjeta) => {
           
//             if (checkbox.checked) {
//                 tarjeta.classList.replace("CN", "CY");
//             } else {
//                 if (contador === 2) {
//                     tarjeta.classList.replace("CY", "CN");
//                 }
//             }
//         });
//         if (checkbox.checked === false) {
//             contador -= 2;
//         }
//     }
// });



// let CheckboxCategoria = document.getElementById("checkboxCategoria");
// CheckboxCategoria.addEventListener("click", (e) => {
//   let checkbox = e.target;
//   let nuevasTarjetas = document.getElementById("tarjetita")
//   let tarjetasss = nuevasTarjetas[0];
//   if (checkbox.type === "checkbox") {
//     console.log(tarjetasss);
//     contador++;
//    Array.from(tarjetas).forEach((tarjeta) => {
//             //   let h3 = tarjeta.className.slice('21');
//     //   if (contador === 1) {
//     //     tarjeta.classList.replace("CY", "CN");
//     //   }
//       if (checkbox.checked) {
//         // if (h3 === "Región" + checkbox.id) {
//         //   tarjeta.classList.replace("CN", "CY");
//         // }
//       } else {
//         // if (h3 === "Región" + checkbox.id) {
//         //   tarjeta.classList.replace("CY", "CN");
//         // }
//         if (contador === 2) {
//           tarjeta.classList.replace("CN", "CY");
//         }
//       }
//     });
//     if (checkbox.checked === false) {
//       contador -= 2;
//     }
//     console.log(contador);
//     // mostrarFiltrados();
//   }
// });

// console.log(tarjetas);






let CheckboxCategoria = document.getElementById("checkboxCategoria");
CheckboxCategoria.addEventListener("click", (e) => {
  let checkbox = e.target;
  if (checkbox.type === "checkbox") {
      if (checkbox.checked) {
console.log(tarjetas);
      } else {
console.log("adios");
      }

  }
});