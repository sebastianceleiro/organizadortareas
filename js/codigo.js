
/// DATOS PARA GENERAR EL ALTA DE CADA TAREA

class Tarea {
    constructor (id, nombre, detalle, estado, prioridad, asignacion,fecha) {
        this.id = id;
        this.nombre = nombre;
        this.detalle = detalle;
        this.estado = estado;
        this.prioridad = prioridad;
        this.asignacion = asignacion;
        this.fecha = fecha;
    }
    ingresoDeDatos()  {

     
        this.id = totalTareas.length   ;
        this.nombre = $("#tarea").val() ;
        this.detalle = $("#descripcion").val() ;
        this.estado = $("#estado").val() ;
        this.prioridad = $("#prioridad").val() ;
        this.asignacion = $("#asignacion").val() ;
        this.fecha = new Date ().toLocaleDateString() ; 
    } 
}

//                                  VARIABLES
let datosUsuario ;       
let totalTareas = [] ;   
let comprobarTareas ;
let resultadoFiltro = [] ;
let modoEdicion = false ;
let idAEditar ;
const usuarios = "data/usuarios.json" ;


function lecturaUsuarios () {

    $.getJSON(usuarios, function(respuesta,estado) { 
        if (estado === "success") {
            let listadoUsuarios = respuesta;
            console.log (listadoUsuarios);
            for (let usuario of listadoUsuarios) {
            $("#asignacion").append("<option>" + usuario.nombre + "</option>");
            };
        };
    }); 
} 
                                 
function  armadoTablaSuperior () 
{
    $("#tablaDeTareas").empty(); 
    if (totalTareas == "") { $("#tablaDeTareas").append ("No hay tareas ingreasadas")}
    else {
    $("#tablaDeTareas").append ("<tr id='cabecera'> " +
    "<td>ID </td> " +
    "<td>Tarea</td>" +
    "<td>Detalle</td>" +
    "<td>Estado</td>"+
    "<td>Asignado</td>"+
    "<td>Prioridad</td>"+
    "<td>Creado</td>"+
    "<td>Modificar</td>"+
    "</tr> ") ;
    }
} ;

//Arma la tabla de tareas luego de cada modificacion
function mostrarTareaIngresada () {    
   armadoTablaSuperior () ;
   
   for (let tarea of totalTareas) { 

   
       $("#tablaDeTareas").append ('<tr class="tarea"> <td>'  + (tarea.id+1) + 
       " <td>" + tarea.nombre +
       " <td>" + tarea.detalle +
       " <td>" + tarea.estado + 
       " <td>" + tarea.asignacion +
       " <td>" + tarea.prioridad +
       " <td>" + tarea.fecha +
       ' <td> <button class="botonEliminar btn btn-success btn-sm" id=id>Eliminar</button> <button class="botonEditar btn btn-success btn-sm" data-bs-toggle="modal" data-bs-target="#staticBackdrop" id=id2>Editar</button>' ) ;

       $("#id").attr("id", tarea.id) ;
       $("#id2").attr("id", tarea.id) ;
      
    } 
    $(".botonEliminar").click(eliminarUna) ;
    $(".botonEditar").click(editarTarea) ;
    ; }


// Se borran los datos de los formularios al guardar tarea
function borrarValues () {
    $("#tarea").val("") ;
    $("#descripcion").val("") ;
}

function agregarTareas(e) { 
   
    e.preventDefault() ;
    if ($("#tarea").val() != "" & (modoEdicion == false)) {
      
        datosUsuario = new Tarea ();  // Se crea el objeto con las propiedades que componen cada ingreso de tarea
        datosUsuario.ingresoDeDatos();   // Se solicita el ingreso de datos que quedaran en el objeto
        totalTareas.push (datosUsuario);  // Se guarda el objeto en un array que contiene todas las tareas
        mostrarTareaIngresada(); // Se muestra todo el listado de tareas ingresado 
        borrarValues ();
    let tareasJson = JSON.stringify(totalTareas); // Converite objeto a JSON
    localStorage.setItem ("tareas", tareasJson);  // Guardo en LS  el JSON
}   else if ($("#tarea").val() == "" ) { alert ("Por favor ingrese el nombre de la tarea" );  } ;
    if (modoEdicion == true) {
        guardarEdicion() ;
}

function guardarEdicion () {   // Guarda en el Array, pero en un elemento ya existente
    totalTareas[idAEditar].nombre = $("#tarea").val();
    totalTareas[idAEditar].detalle = $("#descripcion").val();
    totalTareas[idAEditar].estado = $("#estado").val();
    totalTareas[idAEditar].prioridad = $("#prioridad").val();
    totalTareas[idAEditar].asignacion = $("#asignacion").val();
    mostrarTareaIngresada(); // Se muestra todo el listado de tareas ingresado 
    borrarValues ();
    modoEdicion = false;
    let tareasJson = JSON.stringify(totalTareas); // Converite objeto a JSON
    localStorage.setItem ("tareas", tareasJson);  // Guardo en LS  el JSO
    $("#tituloFormulario").text("Nuevo ingreso");
    };
}

function comprobarSiHayTareas()  {
    let comprobarTareas = JSON.parse(localStorage.getItem("tareas"));
    if (comprobarTareas != undefined) {
        totalTareas = comprobarTareas;
        mostrarTareaIngresada ();
  }
}


function eliminar () {
    let confirmar = confirm ("Por favor confirmar si desea eliminar TODAS las tareas") ;
    if (confirmar == true ) {
        totalTareas = [];
        tareasJson = JSON.stringify(totalTareas); // Converite objeto a JSON
        localStorage.setItem ("tareas", tareasJson);  // Guardo en LS  el JSON
        mostrarTareaIngresada ();
       }
};

function eliminarUna(e) {
    console.log(e.target.id) ;
    totalTareas.splice (e.target.id, 1);
    let contador = 0;
    for (let tarea of totalTareas)  // Actualiza los ID si algo se borra
        {   
            tarea.id = contador;   
            contador++  ;};

    tareasJson = JSON.stringify(totalTareas) ; // Converite objeto a JSON
    localStorage.setItem ("tareas", tareasJson) ;  // Guardo en LS  el JSON
    mostrarTareaIngresada ();
} ;


function editarTarea(e) {
  
    $("#tarea").val(totalTareas[e.target.id].nombre);
    $("#descripcion").val(totalTareas[e.target.id].detalle);
    $("#estado").val(totalTareas[e.target.id].estado);
    $("#asignacion").val(totalTareas[e.target.id].asignacion);
    $("#prioridad").val(totalTareas[e.target.id].prioridad);

    modoEdicion = true ;
    idAEditar = e.target.id ;
    $("#tituloFormulario").text("Modificar Tarea");

}

// Funciones que se ejecutan cuando el usuario hace click

$("#formulario").submit(agregarTareas);   
$("#eliminar").click(eliminar);
$("#filtrar").click(filtrarTareas);
$(".botonEliminar").click(eliminarUna); // Esta linea no funciona
$(".botonEditar").click(editarTarea);

/// FILTRADO

function mostrarFiltrado () {
    armadoTablaSuperior () 
for (let tarea of resultadoFiltro) { 

    $("#tablaDeTareas").append ('<tr class="tarea"> <td>'  + (tarea.id+1) + 
       " <td>"  + tarea.nombre  +
       " <td>" + tarea.detalle +
       " <td>" + tarea.estado + 
       " <td>" + tarea.asignacion +
       " <td>" + tarea.prioridad +
       " <td>" + tarea.fecha +
       ' <td> <button class="botonEliminar btn btn-success btn-sm" id=id>Eliminar</button> <button class="botonEditar btn btn-success btn-sm" data-bs-toggle="modal" data-bs-target="#staticBackdrop" id=id2>Editar</button>' ) ;

       $("#id").attr("id", tarea.id);
       $("#id2").attr("id", tarea.id);
     
} ;      $(".botonEliminar").click(eliminarUna); }


function filtrarTareas () {
    resultadoFiltro = totalTareas.filter ( pendientes => pendientes.estado == "Pendiente") ;
    mostrarFiltrado ();
};

///Se comprueba al cargar pagina si hay tareas en el Local Storage
comprobarSiHayTareas();
lecturaUsuarios();