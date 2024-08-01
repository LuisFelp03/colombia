fetch('https://api-colombia.com/api/v1/Country/Colombia')
  .then(response => response.json())
  .then(data => {
    datosColombia(data);
    return fetch('https://api-colombia.com/api/v1/Region');
  })
  .then(response => response.json())
  .then(data => {
    datosRegion(data);
    return fetch('https://api-colombia.com/api/v1/Department');
  })
  .then(response => response.json())
  .then(data => {
    datosDepartamentos(data);
  })
  .catch(error => console.log(error));



    


// fetch('https://api-colombia.com/api/v1/Department')
//   .then(response => response.json()).then(data => datosDepartamentos(data))
//   .catch(error => console.log(error));

// fetch('https://api-colombia.com/api/v1/Region')
//   .then(response => response.json()).then(data => datosRegion(data))
//   .catch(error => console.log(error));










let tarjetas = document.getElementsByClassName("card");
let tarjeta = tarjetas[0];
let Checkbox = document.getElementsByClassName("checkers");
let copiaCheckbox = Checkbox[0];
contador = 0;
let noHay = document.getElementById("noHay");
let nombreRegion = [];
let nombreRegion2 = [];
noHay.style.display = "none";



function datosColombia(data) {
  document.querySelector("p").innerHTML = data.description;
  document.querySelector("h1").innerHTML = data.name;
  document.querySelector("title").innerHTML = data.name;
  document.querySelector("link").href = data.flags[1];
}





tarjetas[0].parentNode.removeChild(tarjetas[0]);


function datosRegion(data) {
  for (let i = 0; i < data.length; i++) {
    nombreRegion.push(data[i].name);
    nombreRegion2.push(data[i].name);
  }
  
}



let datosDepartamentos = (data) => {
  data.sort((a, b) => a.regionId - b.regionId); // Sort data by regionId in ascending order
  data.forEach((data) => {
    let nuevasTarjetas = document.getElementById("tarjetas").appendChild(tarjeta.cloneNode(true));
    nuevasTarjetas.querySelector("h5").innerHTML = data.name;
    nuevasTarjetas.querySelector("p").innerHTML = data.description;
    nuevasTarjetas.setAttribute("class", "card me-4 mb-4 CY TY " + "Región" + data.regionId);;
    nuevasTarjetas.setAttribute("id", data.id);
    let nombre = nombreRegion[data.regionId - 1];    
    nuevasTarjetas.querySelector(".list-group-item-action").innerHTML = nombre;
    nuevasTarjetas.querySelector("a").setAttribute("href", "./pages/details.html?id=" + data.id);
  });



  Checkbox[0].parentNode.removeChild(Checkbox[0]);
  const regionesSinRepetir = [];
  data.forEach((event, index) => {
    if (!regionesSinRepetir.includes(event.regionId)) {
      regionesSinRepetir.push(event.regionId);
      let nuevosCheckers = document.getElementById("checkboxCategoria").appendChild(copiaCheckbox.cloneNode(true));
    
      nuevosCheckers.querySelector("label").innerHTML = nombreRegion2[event.regionId - 1];
      nuevosCheckers.querySelector("input").setAttribute("id", event.regionId);
      nuevosCheckers.querySelector("label").setAttribute("for", event.regionId);
    }
  });
};


let CheckboxCategoria = document.getElementById("checkboxCategoria");
CheckboxCategoria.addEventListener("click", (e) => {
  let checkbox = e.target;
  if (checkbox.type === "checkbox") {
    console.log(tarjetas);
    contador++;
    Array.from(tarjetas).forEach((tarjeta) => {
      let h3 = tarjeta.className.slice('21');
      if (contador === 1) {
        tarjeta.classList.replace("CY", "CN");
      }
      if (checkbox.checked) {
        if (h3 === "Región" + checkbox.id) {
          tarjeta.classList.replace("CN", "CY");
        }
      } else {
        if (h3 === "Región" + checkbox.id) {
          tarjeta.classList.replace("CY", "CN");
        }
        if (contador === 2) {
          tarjeta.classList.replace("CN", "CY");
        }
      }
    });
    if (checkbox.checked === false) {
      contador -= 2;
    }
   
    mostrarFiltrados();
  }
});



let buscarTexto = document.getElementById("buscador");
buscarTexto.addEventListener("keyup", (e) => {
  let texto = e.target.value.toLowerCase();
  Array.from(tarjetas).forEach((tarjetas, index) => {
    let nombre = tarjetas.querySelector("h5").innerText.toLowerCase();
    let descripcion = tarjetas.querySelector("p").innerText.toLowerCase();

    if (nombre.includes(texto) || descripcion.includes(texto)) {
      tarjetas.setAttribute("class", tarjetas.className.replace(" TN", " TY"));
    } else {
      tarjetas.setAttribute("class", tarjetas.className.replace(" TY", " TN"));
    }
  });
  mostrarFiltrados();
});


function mostrarFiltrados() {
  let numero = 0;
  Array.from(tarjetas).forEach((tarjetas) => {
    if (tarjetas.classList.contains("CY") && tarjetas.classList.contains("TY")) {
      tarjetas.style.display = "block";
    } else {
      tarjetas.style.display = "none";
    }
  });

  if (mensajeAmigable() === tarjetas.length) {
    noHay.style.display = "block";
   }else{
    noHay.style.display = "none";
   }
  
}

function mensajeAmigable() {
  let contadors = 0;
  for (let i = 0; i < tarjetas.length; i++) {
    for (let j = 0; j < tarjetas.length; j++) {
      if (tarjetas[i].style.display === "none" && tarjetas[i].id === tarjetas[j].id) {
        contadors++;
      } else if (tarjetas[i].style.display === "block" && tarjetas[i].id === tarjetas[j].id) {
        contadors--;
      }
    }
  }
  return contadors;
}
