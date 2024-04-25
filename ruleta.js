const width = 650;
const height = 650;
const radius = Math.min(width, height) / 2;


const colorScale = d3
  .scaleOrdinal()
  .domain([
    "Educational",
    "Development",
    "General",
    "Design",
    "Marketing",
    "Operations",
    "People",
  ])
  .range(["#FBFBFB", "#D3D3D4", "#A7C7DC", "#D3D3D4","#FBFBFB", "#D3D3D4", "#A7C7DC"]);

const data = [
  { label: "Educational", count: 1 },
  { label: "Development", count: 1 },
  { label: "General", count: 1 },
  { label: "Design", count: 1 },
  { label: "Marketing", count: 1 },
  { label: "Operations", count: 1 },
  { label: "People", count: 1 },
];

const svg = d3
  .select("svg")
  .attr("width", width)
  .attr("height", height)
  .append("g")
  .attr("transform", `translate(${width / 2},${height / 2})`);


const pie = d3
  .pie()
  .value((d) => d.count)
  .sort(null);


const arc = d3.arc().innerRadius(0).outerRadius(radius);


const arcs = svg
  .selectAll(".arc")
  .data(pie(data))
  .enter()
  .append("g")
  .attr("class", "arc");

arcs
  .append("path")
  .attr("d", arc)
  .attr("fill", (d, i) => colorScale(d.data.label)) 
  .attr("stroke", "#203449") // Color del adentro
  .style("stroke-width", "2px");


svg
  .append("circle")
  .attr("cx", 0)
  .attr("cy", 0)
  .attr("r", radius - 16) // Tamaño del contorno (mayor que el radio de la ruleta)
  .attr("fill", "none")
  .attr("stroke", "#203449") // Color del contorno
  .attr("stroke-width", "30px");


const titleTexts = svg
  .selectAll(".title-text")
  .data(data)
  .enter()
  .append("text")
  .attr("class", "title-text")
  .attr("text-anchor", "middle")
  .attr("font-size", "16px")
  .attr("fill", "white")
  .attr("transform", (d, i) => {
    const angle = (i / data.length) * 360;
    const rotate = "rotate(" + (angle - 78) + ")";
    const translate = "translate(0, -" + (radius - 20) + ")";
    return rotate + translate;
  })
  .text((d) => d.label);


svg
  .append("circle")
  .attr("r", 60) // Tamaño del círculo con fondo negro (mayor que el círculo de la imagen)
  .attr("fill", "#203449"); // Color del fondo

// Agregar círculo en el centro con una imagen
const centerCircle = svg
  .append("circle")
  .attr("r", 50) // Tamaño del círculo con la imagen
  .attr("fill", "url(#imagen)") // Ruta de la imagen
  .on("click", () => {
    centerCircle
      .transition()
      .duration(2000) // Duración de la animación en milisegundos
      .attrTween("transform", function () {
        return d3.interpolateString("rotate(0)", "rotate(360)");
      }); // Girar 360 grados
  });

// Añadir definición para la imagen
const defs = svg.append("defs");
defs
  .append("pattern")
  .attr("id", "imagen")
  .attr("height", 1)
  .attr("width", 1)
  .attr("x", "0")
  .attr("y", "0")
  .append("image")
  .attr("xlink:href", "./logos/logowizeline.png") // Ruta de tu imagen
  .attr("height", 100) // Tamaño de la imagen
  .attr("width", 100)
  .attr("x", 0)
  .attr("y", 0);

// Seleccionar el primer arco de la ruleta
const selectedArc = arcs.filter((d, i) => i === 0);

// Posiciones predefinidas para los círculos dentro del primer arco
const predefinedPositions = [
  [40, -72],
  [30, -115],
  [77, -96],
  [115, -125],
  [72, -150],
  [30, -160],
  [30, -210],
  [75, -200],
  [120, -180],
  [157, -148],
  [190, -185],
  [155, -219],
  [115, -240],
  [75, -255],
  [30, -260],
];

// Array de rutas de imágenes
const imagePaths = [
  "./logos/logo1.png",
  "./logos/logo2.png",
  "./logos/logo3.png",
  "./logos/logo4.png",
  "./logos/logo5.png",
  "./logos/logo6.png",
  "./logos/logo7.png",
  "./logos/logo8.png",
  "./logos/logo9.png",
  "./logos/logo10.png",
  "./logos/logo11.png",
  "./logos/logo12.png",
  "./logos/logo13.png",
  "./logos/logo14.png",
  "./logos/logo15.png",
];

// Agregar 15 círculos negros dentro del primer arco en las posiciones predefinidas
for (let i = 0; i < 15; i++) {
  const imagePath = imagePaths[i % imagePaths.length];
  const imageName = imagePath.split('/').pop().split('.')[0];
  const image = selectedArc
    .append("image")
    .attr("id", imageName)
    .attr("xlink:href", imagePath) // Se utiliza el operador módulo (%) para iterar sobre las rutas de imágenes
    .attr("x", predefinedPositions[i][0] - 24) // Ajustar la posición x para centrar la imagen
    .attr("y", predefinedPositions[i][1] - 25) // Ajustar la posición y para centrar la imagen
    .attr("width", 32) // Ancho de la imagen
    .attr("height", 52); // Altura de la imagen
    image.on("click",togglePopupOpen);
}

// Seleccionar el segundo arco de la ruleta
const secondArc = arcs.filter((d, i) => i === 1);

// Posiciones predefinidas para los círculos dentro del segundo arco
const predefinedPositions2 = [[155, -90]];

// Array de rutas de imágenes para el segundo arco
const imagePaths2 = ["./logos/logo16.png"];

for (let i = 0; i < 1; i++) {
  const imagePath = imagePaths2[i % imagePaths2.length];
  const imageName = imagePath.split('/').pop().split('.')[0];
  const image = secondArc
    .append("image")
    .attr("id", imageName)
    .attr("xlink:href", imagePath) // Se utiliza el operador módulo (%) para iterar sobre las rutas de imágenes
    .attr("x", predefinedPositions2[i][0] - 25) // Ajustar la posición x para centrar la imagen
    .attr("y", predefinedPositions2[i][1] - 24) // Ajustar la posición y para centrar la imagen
    .attr("width", 135) // Ancho de la imagen
    .attr("height", 135); // Altura de la imagen
    image.on("click", togglePopupOpen);
}

// Seleccionar el segundo arco de la ruleta
const thirdArc = arcs.filter((d, i) => i === 2);

// Posiciones predefinidas para los círculos dentro del segundo arco
const predefinedPositions3 = [
  [75, 60],
  [120, 62],
  [85, 110],
  [140, 110],
  [175, 72],
  [106, 150],
  [195, 120],
  [235, 88],
  [165, 160],
  [120, 190],
  [170, 220],
  [226, 160],
];

// Array de rutas de imágenes para el segundo arco
const imagePaths3 = [
  "./logos/logo17.png",
  "./logos/logo18.png",
  "./logos/logo19.png",
  "./logos/logo20.png",
  "./logos/logo21.png",
  "./logos/logo22.png",
  "./logos/logo23.png",
  "./logos/logo24.png",
  "./logos/logo25.png",
  "./logos/logo26.png",
  "./logos/logo27.png",
  "./logos/logo28.png",
];

for (let i = 0; i < 12; i++) {
  const imagePath = imagePaths3[i % imagePaths3.length];
  const imageName = imagePath.split('/').pop().split('.')[0];
  const image = thirdArc
    .append("image")
    .attr("id", imageName)
    .attr("xlink:href", imagePath) // Se utiliza el operador módulo (%) para iterar sobre las rutas de imágenes
    .attr("x", predefinedPositions3[i][0] - 25) // Ajustar la posición x para centrar la imagen
    .attr("y", predefinedPositions3[i][1] - 24) // Ajustar la posición y para centrar la imagen
    .attr("width", 32) // Ancho de la imagen
    .attr("height", 32); // Altura de la imagen
    image.on("click", togglePopupOpen);
}

// Seleccionar el segundo arco de la ruleta
const fourthArc = arcs.filter((d, i) => i === 3);

// Posiciones predefinidas para los círculos dentro del segundo arco
const predefinedPositions4 = [
  [-12, 90],
  [-48, 160],
  [40, 190],
  [-40, 235],
];

const imagePaths4 = [
  "./logos/logo29.png",
  "./logos/logo30.png",
  "./logos/logo31.png",
  "./logos/logo32.png",
];

for (let i = 0; i < 4; i++) {

  const imagePath = imagePaths4[i % imagePaths4.length];
  const imageName = imagePath.split('/').pop().split('.')[0]; // Extract the file name from the path
  const image = fourthArc
    .append("image")
    .attr("id", imageName) // Use the file name as the image ID // Asignar un id único a cada imagen
    .attr("xlink:href", imagePath) // Se utiliza el operador módulo (%) para iterar sobre las rutas de imágenes
    .attr("x", predefinedPositions4[i][0] - 25) // Ajustar la posición x para centrar la imagen
    .attr("y", predefinedPositions4[i][1] - 24) // Ajustar la posición y para centrar la imagen
    .attr("width", 75) // Ancho de la imagen
    .attr("height", 75); // Altura de la imagen
    image.on("click", togglePopupOpen);
}

// Seleccionar el segundo arco de la ruleta
const fifthArc = arcs.filter((d, i) => i === 4);

const predefinedPositions5 = [
    [-115, 65],
    [-195, 145],
];

const imagePaths5 = [
    "./logos/logo33.png",
    "./logos/logo34.png",
];

for (let i = 0; i < 2; i++) {
    const imagePath = imagePaths5[i % imagePaths5.length];
    const imageName = imagePath.split('/').pop().split('.')[0];
    const image = fifthArc.append("image")
        .attr("id", imageName)
        .attr("xlink:href", imagePath)
        .attr("x", predefinedPositions5[i][0] - 25) 
        .attr("y", predefinedPositions5[i][1] - 24) 
        .attr("width", 85)
        .attr("height", 85);
        image.on("click",togglePopupOpen);
}

const sixthArc = arcs.filter((d, i) => i === 5);

const predefinedPositions6 = [
    [-242, -86],
];

const imagePaths6 = [
    "./logos/logo35.png",
];

for (let i = 0; i < 1; i++) {
    const imagePath = imagePaths6[i % imagePaths6.length];
    const imageName = imagePath.split('/').pop().split('.')[0];
    const image = sixthArc.append("image")
        .attr("id", imageName)
        .attr("xlink:href", imagePath)
        .attr("x", predefinedPositions6[i][0] - 25) 
        .attr("y", predefinedPositions6[i][1] - 24) 
        .attr("width", 135) 
        .attr("height", 135);
        image.on("click", togglePopupOpen);
}

const seventhArc = arcs.filter((d, i) => i === 6);

const predefinedPositions7 = [
    [-30, -72],
    [-21, -115],
    [-77, -96],
    [-110, -128],
    [-72, -168],
    [-25, -158],
    [-20, -215],
    [-75, -235],
    [-120, -211],
    [-146, -158],
    [-180, -195],
];

const imagePaths7 = [
    "./logos/logo36.png",
    "./logos/logo37.png",
    "./logos/logo38.png",
    "./logos/logo39.png",
    "./logos/logo40.png",
    "./logos/logo41.png",
    "./logos/logo42.png",
    "./logos/logo43.png",
    "./logos/logo44.png",
    "./logos/logo45.png",
    "./logos/logo46.png",
];

for (let i = 0; i < 11; i++) {
    const imagePath = imagePaths7[i % imagePaths7.length];
    const imageName = imagePath.split('/').pop().split('.')[0];
    const image = seventhArc.append("image")
        .attr("id", imageName)
        .attr("xlink:href", imagePath)
        .attr("x", predefinedPositions7[i][0] - 24)
        .attr("y", predefinedPositions7[i][1] - 25) 
        .attr("width", 32) 
        .attr("height", 52); 
        image.on("click", togglePopupOpen);
}

// Efecto de deslizamiento a la hora de hacer click en los enlaces con #
$(document).ready(function () {
  $('a[href^="#"]').on("click", function (e) {
    e.preventDefault();

    var target = this.hash;
    var $target = $(target);

    $("html, body")
      .stop()
      .animate(
        {
          scrollTop: $target.offset().top,
        },
        900,
        "swing",
        function () {
          window.location.hash = target;
        }
      );
  });
});

