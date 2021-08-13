
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

    ingresodedatos()  {
       
        this.id = totaltareas.length + 1  ;
        this.nombre = $("#Tarea").val() ;
        this.detalle = $("#Descripcion").val() ;
        this.estado = $("#Estado").val() ;
        this.prioridad = $("#Prioridad").val() ;
        this.asignacion = $("#Asignacion").val() ;
        this.fecha = new Date ().toLocaleDateString(); ;
    }

}

// ---------------------------------VARIABLES
let datosusuario ;       
let totaltareas = [] ;   
let comprobartareas ;
let resultadofiltro = [] ;



///Se comprueba al cargar pagina si hay tareas en el Local Storage
comprobarsihaytareas() ;

// Funciones que se ejecutan cuando el usuario hace click
$("#formulario").submit(agregartareas) ; 
$("#eliminar").click(eliminar) ;
$("#eliminaruna").click(eliminaruna) ;
$("#filtrar").click(filtrartareas) ;




///// FUNCIONES ---

function agregartareas(e) { 
   
    e.preventDefault() ;
    if ($("#Tarea").val() != "") /* valida que el campo tenga algo*/ {
      
        datosusuario = new Tarea () ;  // Se crea el objeto con las propiedades que componen cada ingreso de tarea
        datosusuario.ingresodedatos() ;   // Se solicita el ingreso de datos que quedaran en el objeto
        totaltareas.push (datosusuario) ;  // Se guarda el objeto en un array que contiene todas las tareas
        mostrartareaingresada() ; // Se muestra todo el listado de tareas ingresado 
        borrarvalues ();
    let tareasJson = JSON.stringify(totaltareas) ; // Converite objeto a JSON
    localStorage.setItem ("Tareas", tareasJson) ;  // Guardo en LS  el JSON
}   else { alert ("Por favor ingrese el nombre de la tarea" );}

}


function comprobarsihaytareas()  {
    let comprobartareas = JSON.parse(localStorage.getItem("Tareas"));
    if (comprobartareas != null)
{
    totaltareas = comprobartareas ;
    mostrartareaingresada ()
}

}

// Se borran los datos de los formularios al guardar tarea
function borrarvalues () {
     $("#Tarea").val("")   ;
     $("#Descripcion").val("") ;

}


//Arma la tabla de tareas luego de cada modificacion
function mostrartareaingresada () {    
    armadotablasuperior();
    
    for (let tarea of totaltareas) { 

        //agregarAlDom.setAttribute("id", tarea.id);
    
        $("#Tabladetareas").append ('<tr class="tarea"> <td>'  + tarea.id + 
        " <td>" + tarea.nombre +
        " <td>" + tarea.detalle +
        " <td>" + tarea.estado + 
        " <td>" + tarea.asignacion +
        " <td>" + tarea.prioridad +
        " <td>" + tarea.fecha +
        " <td> <button> Editar</button> " ) ;
 
     } ; }




function eliminar () {
    let confirmar = confirm ("Por favor confirmar si desea eliminar TODAS las tareas") ;
    if (confirmar == true ) {
        totaltareas = [] ;
        tareasJson = JSON.stringify(totaltareas) ; // Converite objeto a JSON
        localStorage.setItem ("Tareas", tareasJson) ;  // Guardo en LS  el JSON
        mostrartareaingresada () ;
      
    }
}  ;


function eliminaruna() {
    let idd = parseInt(prompt ("ingrese el numero de id a borrar")) ;
    totaltareas.splice (idd-1, 1) ;
    tareasJson = JSON.stringify(totaltareas) ; // Converite objeto a JSON
    localStorage.setItem ("Tareas", tareasJson) ;  // Guardo en LS  el JSON
    mostrartareaingresada () ;
} ;



/// FILTRADO


function filtrartareas () {
    resultadofiltro = totaltareas.filter ( pendientes => pendientes.estado == "Pendiente") ;
    mostrarfiltrado ();
}  ;


function mostrarfiltrado () {
    armadotablasuperior () 
for (let tarea of resultadofiltro) { 

    $("#Tabladetareas").append ('<tr class="tarea"> <td>'  + tarea.id + 
    " <td>" + tarea.nombre +
    " <td>" + tarea.detalle +
    " <td>" + tarea.estado + 
    " <td>" + tarea.asignacion +
    " <td>" + tarea.prioridad +
    " <td>" + tarea.fecha +
    " <td> <button> Editar</button> " ) ;
   
} ; }


function armadotablasuperior () 
{
    $("#Tabladetareas").empty(); 
    $("#Tabladetareas").append ("<tr id'cabecera'> " +
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

