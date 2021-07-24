

class Tarea {
    constructor (id, nombre, detalle, prioridad, asignacion,fecha) {
        this.id = id;
        this.nombre = nombre;
        this.detalle = detalle;
        this.prioridad = prioridad;
        this.asignacion = asignacion ;
        this.fecha = fecha ;
    }

    ingresodedatos()  {
        identificador++ ;
        this.id = identificador  ;
        this.nombre = prompt ("ingrese nombre de la tarea") ;
        this.detalle = prompt ("ingrese un detalle de la misma") ;
        this.prioridad = prompt ("ingrese la prioridad") ;
        this.asignacion = prompt ("quien realizara la tarea?") ;
        this.fecha = new Date ().toLocaleDateString(); ;
    }

    
    mostrartareaingresada () {    
        
        divtareas.textContent = "" ;
        for (let tarea of totaltareas) { 

            let agregarAlDom = document.createElement("div") ;
            agregarAlDom.className = "tarea" ;
            
            agregarAlDom.innerHTML  =  ( "<br> ID: " + tarea.id +
                                "<br>Tarea:  " + tarea.nombre + 
                                 "<br>Detalle de la tarea:  " + tarea.detalle +  
                                 "<br>Prioridad:  " + tarea.prioridad + 
                                 "<br>Asignado a:  " + tarea.asignacion + 
                                 "<br>Fecha de creacion:  " + tarea.fecha )

            
         
        
            divtareas.appendChild(agregarAlDom);    
           
                            
            console.log (tarea) ;
            
            
         } ;
        
    }

}


let identificador = 0 ;
let datosusuario ;       
let totaltareas = [] ;   
let listadotareas = "" ;
let divtareas = document.getElementById("areatareas") ;




// Se disparan todas las funciones al tocar el boton
function presionarboton() { 
    datosusuario = new Tarea () ;  // Se crea el objeto con las propiedades que componen cada ingreso de tarea
    datosusuario.ingresodedatos() ;   // Se solicita el ingreso de datos que quedaran en el objeto
    totaltareas.push (datosusuario) ;  // Se guarda el objeto en un array que contiene todas las tareas
    datosusuario.mostrartareaingresada() ; // Se muestra todo el listado de tareas ingresado 
   

}