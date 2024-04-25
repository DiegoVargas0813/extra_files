function togglePopupOpen(elem) {

  TagSearch('imagen',elem.target.id).then(data => {
    var popup = document.getElementById("popup-1");

    if (popup && data[0]) {

      const contenido = document.getElementById("contenido");
      contenido.innerHTML = '';
      popup.classList.toggle("active");

      const obj = data[0];
      Object.keys(data[0]).forEach(key => {
        if (!obj[key]) {
          obj[key] = "N/A";
        }
      });

      const name = document.createElement("h2");
      const contentname = document.createTextNode(data[0].nombreherramienta);
      
      const purpose = document.createElement("p");
      const contentpurpose = document.createTextNode(`Purpose: ${data[0].propositoia}`);

      const subpurpose = document.createElement("p");
      const contentsubpurpose = document.createTextNode(`Secondary Purpose: ${data[0].subpropositoia}`);

      const ecosystem = document.createElement("p");
      const contentecosystem = document.createTextNode(`Ecosystem: ${data[0].ecosistema}`);
      
      const cost = document.createElement("p");
      const contentcost = document.createTextNode(`Cost: ${data[0].costo}`);
      
      const license = document.createElement("p");
      const contentlicense = document.createTextNode(`License: ${data[0].licencia}`)

      let link = document.createElement("a");
      link.href = data[0].linkherramienta;
      const contentlink = document.createTextNode(`Link`)

      const description = document.createElement("p");
      const contentdesc = document.createTextNode(`Description: ${data[0].descripcion}`);
      
      name.appendChild(contentname);
      purpose.appendChild(contentpurpose);
      subpurpose.appendChild(contentsubpurpose);
      ecosystem.appendChild(contentecosystem);
      cost.appendChild(contentcost);
      license.appendChild(contentlicense);
      link.appendChild(contentlink);
      description.appendChild(contentdesc);
         
      contenido.appendChild(name);
      contenido.appendChild(purpose);
      contenido.appendChild(subpurpose);
      contenido.appendChild(ecosystem);
      contenido.appendChild(cost);
      contenido.appendChild(license);
      contenido.appendChild(link);
      contenido.appendChild(description);

    } else {
      const contenido = document.getElementById("contenido");
      contenido.innerHTML = '';
      popup.classList.toggle("active");

      const errorMesagePopup = document.createElement("p");
      const contentEMP = document.createTextNode("Herramienta no encontrada");

      errorMesagePopup.appendChild(contentEMP);
      contenido.appendChild(errorMesagePopup);

      console.log("No jala el popup: error 1");
    }
  }).catch(error => {
    console.error('Error fetching tool data:', error);
  });
}


function togglePopupClose(id){
  var popup = document.getElementById("popup-1");
  if(popup){
      popup.classList.remove("active");
  }
  else{
      console.log("No jala el popup: error 2");
  }
}