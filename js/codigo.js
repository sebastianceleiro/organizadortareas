
/// DATOS PARA GENERAR EL ALTA DE CADA TAREA

class Tarea {
    constructor (id, nombre, detalle, estado, prioridad, asignacion,fecha) {
        this.id = id;
        this.nombre = nombre;
        this.detalle = detalle;
        this.estado = estado;
        this.prioridad = prioridad;
        this.asignacion = asignacion ;
        this.fecha = fecha ;
    }

    ingresoDeDatos()  {

     
        this.id = totalTareas.length   ;
        this.nombre = $("#Tarea").val() ;
        this.detalle = $("#Descripcion").val() ;
        this.estado = $("#Estado").val() ;
        this.prioridad = $("#Prioridad").val() ;
        this.asignacion = $("#Asignacion").val() ;
        this.fecha = new Date ().toLocaleDateString(); ;
    } 

}

//                                  VARIABLES
let datosUsuario ;       
let totalTareas = [] ;   
let comprobarTareas ;
let resultadoFiltro = [] ;
let modoEdicion = false ;
let idAEditar ;


//                                 FUNCIONES 


function  armadoTablaSuperior () 
{
    $("#Tabladetareas").empty(); 
    $("#Tabladetareas").append ("<tr id='cabecera'> " +
    "<td>ID </td> " +
    "<td>Tarea</td>" +
    "<td>Detalle</td>" +
    "<td>Estado</td>"+
    "<td>Asignado</td>"+
    "<td>Prioridad</td>"+
    "<td>Creado</td>"+
    "<td>Modificar</td>"+
    "</tr> ") ;

} ;

//Arma la tabla de tareas luego de cada modificacion
function mostrarTareaIngresada () {    
   armadoTablaSuperior () ;
   
   for (let tarea of totalTareas) { 

   
       $("#Tabladetareas").append ('<tr class="tarea"> <td>'  + tarea.id + 
       " <td>" + tarea.nombre +
       " <td>" + tarea.detalle +
       " <td>" + tarea.estado + 
       " <td>" + tarea.asignacion +
       " <td>" + tarea.prioridad +
       " <td>" + tarea.fecha +
       ' <td> <button class="botonEliminar" id=id> Eliminar </button> <button class="botonEditar" id=id2 >Editar</button>' ) ;

       $("#id").attr("id", tarea.id) ;
       $("#id2").attr("id", tarea.id) ;
      
    } 
    $(".botonEliminar").click(eliminarUna) ;
    $(".botonEditar").click(editarTarea) ;
    ; }


// Se borran los datos de los formularios al guardar tarea
function borrarValues () {
    $("#Tarea").val("")   ;
    $("#Descripcion").val("") ;

}

function agregarTareas(e) { 
   
    e.preventDefault() ;
    if ($("#Tarea").val() != "" & (modoEdicion == false)) /* valida que el campo tenga algo*/ {
      
        datosUsuario = new Tarea () ;  // Se crea el objeto con las propiedades que componen cada ingreso de tarea
        datosUsuario.ingresoDeDatos() ;   // Se solicita el ingreso de datos que quedaran en el objeto
        totalTareas.push (datosUsuario) ;  // Se guarda el objeto en un array que contiene todas las tareas
        mostrarTareaIngresada() ; // Se muestra todo el listado de tareas ingresado 
        borrarValues ();
    let tareasJson = JSON.stringify(totalTareas) ; // Converite objeto a JSON
    localStorage.setItem ("Tareas", tareasJson) ;  // Guardo en LS  el JSON
}   else if ($("#Tarea").val() == "" ) { alert ("Por favor ingrese el nombre de la tarea" );  } ;
    if (modoEdicion == true) // Se reemplaza elemento si se edita
    {
        totalTareas[idAEditar].nombre = $("#Tarea").val() ;
        totalTareas[idAEditar].detalle = $("#Descripcion").val() ;
        totalTareas[idAEditar].estado = $("#Estado").val() ;
        totalTareas[idAEditar].prioridad = $("#Prioridad").val() ;
        totalTareas[idAEditar].asignacion = $("#Asignacion").val() ;
        mostrarTareaIngresada() ; // Se muestra todo el listado de tareas ingresado 
        borrarValues ();
        modoEdicion == false ;
        let tareasJson = JSON.stringify(totalTareas) ; // Converite objeto a JSON
        localStorage.setItem ("Tareas", tareasJson) ;  // Guardo en LS  el JSO
        $("#tituloFormulario").text("Nuevo ingreso") ;
        
    }
}


function comprobarSiHayTareas()  {
    let comprobarTareas = JSON.parse(localStorage.getItem("Tareas"));
    if (comprobarTareas != null)
        {
        totalTareas = comprobarTareas ;
        mostrarTareaIngresada () ;
  
            }

}


function eliminar () {
    let confirmar = confirm ("Por favor confirmar si desea eliminar TODAS las tareas") ;
    if (confirmar == true ) {
        totalTareas = [] ;
        tareasJson = JSON.stringify(totalTareas) ; // Converite objeto a JSON
        localStorage.setItem ("Tareas", tareasJson) ;  // Guardo en LS  el JSON
        mostrarTareaIngresada () ;
       }
}  ;

function eliminarUna(e) {
    console.log(e.target.id) ;
    totalTareas.splice (e.target.id, 1) ;
    let contador = 0 ;
    for (let tarea of totalTareas)  // Actualiza los ID si algo se borra
        {   
            tarea.id = contador ;   ;
            contador++  ;} ;

    tareasJson = JSON.stringify(totalTareas) ; // Converite objeto a JSON
    localStorage.setItem ("Tareas", tareasJson) ;  // Guardo en LS  el JSON
    mostrarTareaIngresada () ;
} ;


function editarTarea(e) {
  
    $("#Tarea").val(totalTareas[e.target.id].nombre)   ;
    $("#Descripcion").val(totalTareas[e.target.id].detalle)   ;
    $("#Estado").val(totalTareas[e.target.id].estado)   ;
    $("#Asignacion").val(totalTareas[e.target.id].asignacion)   ;
    $("#Prioridad").val(totalTareas[e.target.id].prioridad)   ;

    modoEdicion = true ;
    idAEditar = e.target.id ;
    $("#tituloFormulario").text("Modificar Tarea") ;

   

}

// Funciones que se ejecutan cuando el usuario hace click

$("#formulario").submit(agregarTareas) ; 
$("#eliminar").click(eliminar) ;
$("#filtrar").click(filtrarTareas) ;
$(".botonEliminar").click(eliminarUna) ; // Esta linea no funciona
$("#ocultar").click(ocultarIngresos) ;
$(".botonEditar").click(editarTarea) ;


/// FILTRADO


function mostrarFiltrado () {
    armadoTablaSuperior () 
for (let tarea of resultadoFiltro) { 

    $("#Tabladetareas").append ('<tr class="tarea"> <td>'  + tarea.id + 
    " <td>" + tarea.nombre +
    " <td>" + tarea.detalle +
    " <td>" + tarea.estado + 
    " <td>" + tarea.asignacion +
    " <td>" + tarea.prioridad +
    " <td>" + tarea.fecha +
    ' <td> <button class="botonEliminar" id=id> Eliminar  </button>' ) ;

        $("#id").attr("id", tarea.id) ;
     
} ;      $(".botonEliminar").click(eliminarUna) ; }


function filtrarTareas () {
    resultadoFiltro = totalTareas.filter ( pendientes => pendientes.estado == "Pendiente") ;
    mostrarFiltrado ();
}  ;

function ocultarIngresos() {

   $("#formulario").slideToggle(1000) ;
 
   }
 

///Se comprueba al cargar pagina si hay tareas en el Local Storage
comprobarSiHayTareas() ;