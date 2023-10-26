// Selectores
const carrito = document.querySelector("#carrito");
const vaciarCarrito = document.querySelector("#vaciar-carrito");
const contenedorCarrito = document.querySelector("#lista-carrito tbody");
const listaCursos = document.querySelector("#lista-cursos");
const vaciarCarritoBTN = document.querySelector("#vaciar-carrito");


var articulosCarrito = []

// Listeners

// Al cargar la página, intenta recuperar los mensajes del localStorage
document.addEventListener("DOMContentLoaded", function() {
    var articulosGuardados = localStorage.getItem("ArticulosCarrito")
    if (articulosGuardados) {
        articulosCarrito = JSON.parse(articulosGuardados)
  
      // Vuelve a crear los elementos en el DOM
      articulosCarrito.forEach((curso) => {

        const {imagen, titulo, precio, cantidad, id } = curso;
        const row = document.createElement("tr");
        console.log(curso.titulo);

        row.innerHTML = `
            <td>
                <img src = "${curso.imagen}" width = "100">    
            </td>
            <td>${titulo}</td>
            <td>${precio}</td>
            <td>${cantidad}</td>
            <td>   
                <a href = "#" class = "borrar-curso" data-id = "${id}">X</a>
            </td>
        `
        contenedorCarrito.appendChild(row);
    })

    }
  })

cargarEventsListeners()
function cargarEventsListeners() {
    listaCursos.addEventListener("click", añadirCurso);
    carrito.addEventListener("click", eliminarCurso);

    vaciarCarritoBTN.addEventListener("click", (e) => {
        articulosCarrito = []
        limpiarHTML()
        const articulosString = JSON.stringify(articulosCarrito)
        localStorage.setItem("ArticulosCarrito", articulosString)
    })
}

// Funciones

// Eliminar curso

function eliminarCurso(e) {
    console.log(e.target);
    if (e.target.classList.contains("borrar-curso")) {
        const cursoId = e.target.getAttribute("data-id");

        articulosCarrito = articulosCarrito.filter((curso) => 
            curso.id !== cursoId
        )
        console.log(articulosCarrito);
        carritoHTML(articulosCarrito);
        const articulosString = JSON.stringify(articulosCarrito)
        localStorage.setItem("ArticulosCarrito", articulosString)
    }

}


function añadirCurso(e) {
    e.preventDefault()

    if (e.target.classList.contains("agregar-carrito")) {
        const curso = e.target.parentElement.parentElement;
        leerDatosCurso(curso);
    }


}

// Lee la información del curso seleccionado
function leerDatosCurso(curso) {
    const infoCurso = {
        imagen: curso.querySelector("img").src,
        titulo: curso.querySelector("h4").textContent,
        precio: curso.querySelector(".precio span").textContent,
        id: curso.querySelector("a").getAttribute("data-id"),
        cantidad: 1
    }
    
    // Revisamos si ya existe

    const existe = articulosCarrito.some((curso) => curso.id === infoCurso.id)
    
    if (existe) {
        const cursos = articulosCarrito.map((curso) => {
            if (curso.id === infoCurso.id) {
                curso.cantidad++;
                //return curso; No es necesario esto
            }
            /*else {
                return curso;  No es necesario esto
            }*/
        })
    }
    else {
        articulosCarrito = [...articulosCarrito, infoCurso];
        const articulosString = JSON.stringify(articulosCarrito)
        localStorage.setItem("ArticulosCarrito", articulosString)
    }

    carritoHTML(articulosCarrito); // articulosCarrito
}

function carritoHTML() {

    limpiarHTML()

    articulosCarrito.forEach((curso) => {

        const {imagen, titulo, precio, cantidad, id } = curso;
        const row = document.createElement("tr");
        console.log(curso.titulo);

        row.innerHTML = `
            <td>
                <img src = "${curso.imagen}" width = "100">    
            </td>
            <td>${titulo}</td>
            <td>${precio}</td>
            <td>${cantidad}</td>
            <td>   
                <a href = "#" class = "borrar-curso" data-id = "${id}">X</a>
            </td>
        `
        contenedorCarrito.appendChild(row);
    })
}


function limpiarHTML() {
    
    while (contenedorCarrito.firstChild) {
        contenedorCarrito.firstChild.remove();
    }
}
