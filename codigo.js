

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
        this.nombre = tareaformulario.value ;
        this.detalle = descripcionformulario.value ;
        this.estado = Estadoformulario.value ;
        this.prioridad = prioridadformulario.value ;
        this.asignacion = asignacionformulario.value ;
        this.fecha = new Date ().toLocaleDateString(); ;
    }

}

// ---------------------------------VARIABLES


let datosusuario ;       
let totaltareas = [] ;   
// Se guardan los ingresos del usuario en variables
let tabladetareas = document.getElementById("Tabladetareas") ;
let tareaformulario = document.getElementById("Tarea") ;
let descripcionformulario = document.getElementById("Descripcion") ;
let Estadoformulario = document.getElementById("Estado") ;
let prioridadformulario = document.getElementById("Prioridad") ;
let asignacionformulario = document.getElementById("Asignacion") ;
let formulario = document.getElementById("formulario") ;
let comprobartareas ;
let botonborrar = document.getElementById("eliminar") ;
let filtrar = document.getElementById("filtrar") ;
let resultadofiltro = [] ;




comprobarsihaytareas() ;
// ---- Se disparan todas las funciones al tocar el boton guardar
formulario.addEventListener("submit", agregartareas) ; 



///// FUNCIONES ---

function agregartareas(e) { 
    e.preventDefault() ;
    if (tareaformulario.value != "") /* valida que el campo tenga algo*/ {
    
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

function borrarvalues () {
     tareaformulario.value = "" ;
     descripcionformulario.value = "" ;

}

function mostrartareaingresada () {    
        
    tabladetareas.innerHTML = 
         "<tr><td>ID </td><td>Tarea</td><td>Detalle</td><td>Estado</td><td>Asignado</td><td>Prioridad</td><td>Creado</td><td>Modificar</td> " ; 
    for (let tarea of totaltareas) { 

        let agregarAlDom = document.createElement("tr") ;
        agregarAlDom.className = "tarea" ;
        


       agregarAlDom.innerHTML  =  ( " <td>" + tarea.id +
                                    " <td>" + tarea.nombre +
                                    " <td>" + tarea.detalle +
                                    " <td>" + tarea.estado + 
                                    " <td>" + tarea.asignacion +
                                    " <td>" + tarea.prioridad +
                                    " <td>" + tarea.fecha) +
                                    " <td> Editar / Eliminar " ;

        
     
    
                                    tabladetareas.appendChild(agregarAlDom);    
        
     } ; }



/// ELIMINAR

botonborrar.addEventListener("click", eliminar) ;

function eliminar () {
    
    totaltareas = [] ;
    tareasJson = JSON.stringify(totaltareas) ; // Converite objeto a JSON
    localStorage.setItem ("Tareas", tareasJson) ;  // Guardo en LS  el JSON
    mostrartareaingresada () ;
    alert ("Se eliminaron las tareas guardadas") ;
}  ;



/// FILTRADO

filtrar.addEventListener("click", filtrartareas) ;

function filtrartareas () {
    resultadofiltro = totaltareas.filter ( pendientes => pendientes.estado == "Pendiente") ;
    mostrarfiltrado ();
}  ;


function mostrarfiltrado () {
    tabladetareas.innerHTML = 
    "<tr><td>ID </td><td>Tarea</td><td>Detalle</td><td>Estado</td><td>Asignado</td><td>Prioridad</td><td>Creado</td><td>Modificar</td> " ; 
for (let tarea of resultadofiltro) { 

   let agregarAlDom = document.createElement("tr") ;
   agregarAlDom.className = "tarea" ;
   


  agregarAlDom.innerHTML  =  ( " <td>" + tarea.id +
                               " <td>" + tarea.nombre +
                               " <td>" + tarea.detalle +
                               " <td>" + tarea.estado + 
                               " <td>" + tarea.asignacion +
                               " <td>" + tarea.prioridad +
                               " <td>" + tarea.fecha) +
                               " <td> Editar / Eliminar " ;

   


                               tabladetareas.appendChild(agregarAlDom);    
   
} ; }


// Pruebas borrar cada tarea

let area = document.getElementById("Tabladetareas") ;
area.addEventListener("click", leer) ;

function leer(e) { 
    console.log (e.target)
}