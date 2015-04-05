//Abrimos los archivos con un XMLHTTPRequest de AJAX y los leemos
var txtFile = new XMLHttpRequest();
var txtFile2 = new XMLHttpRequest();
txtFile.open("GET", "checkins_output.csv", false);
txtFile2.open("GET", "input4.json", false);
txtFile.send();
txtFile2.send();
var datos = txtFile.responseText;
var datos_json = txtFile2.responseText;


//Declaramos una funcion con los 500 checkins del archivo leido
var res = datos.split("\n");
for (i=0; i<res.length; i++){
    res[i] = res[i].split(",");
}

//Convertimos nuestro string en un objeto
var usuarios = JSON.parse(datos_json).usuarios;

//Guardamos el objeto de cada usuario en un array en donde su key es el ID del usuario
//para posterior acceso mas facil
var dataset = {};
for (i in usuarios){
    dataset[usuarios[i].id] = usuarios[i];
}

//Borramos todos los markers del mapa indicado
function clearMarkers(marker_array){
    for(i in marker_array){
        marker_array[i].setMap(null);
    }
}

//Esta es la funcion llamada en la funcion initialize de "script.js"
//Basicamente toma los datos del form de la tab 2 y ejecuta la busqueda
//desplegando los checkins en el mapa
function form_id(event){
    //primero limpiamos los markers del mapa y luego obtenemos los datos del form
    clearMarkers(markers2);
    var id_actual;
    var values = $(this).serializeArray();
    var form_id = values[0]["value"];
    
    //Vemos si es necesario aplicar los filtros de amigos y fecha
    var check1 = document.getElementById("amigos").checked;
    var check2 = document.getElementById("date").checked;
    if(check1){
        var date1 = values[2]["value"];
        var date2 = values[3]["value"];
    }
    else{
        var date1 = values[1]["value"];
        var date2 = values[2]["value"];
    }
    
    //Controlamos que el ID ingresado para buscar efectivamente exista
    //En caso contrario, le informamos al usuario de los IDs que existen
    if(form_id in dataset){
        id_actual = dataset[form_id];
        get_checkins(id_actual, check1, check2, date1, date2);
        alert("Busqueda finalizada!");
    }
    else{
        alert("Ese ID no existe, los IDs disponibles son: \n" + JSON.stringify(Object.keys(dataset)));
    }
    //Evitamos que se muestre la informacion del POST en la url
    event.preventDefault();
}

//tomamos el ID buscado y llamamos a la funcion drop() para desplegar los markers de acuerdo a los filtros
function get_checkins(id_actual, include_friends, apply_filter, date1, date2){
    var checkins = id_actual["check-ins"];
    if(apply_filter){
        for (i in checkins){
            var time = checkins[i].time.substring(0,7);
            if(time >= date1 && time <= date2){
                drop(map2, parseFloat(checkins[i].latitude), parseFloat(checkins[i].longitude));
            }
        }
    }
    else{
        for (i in checkins){
            drop(map2, parseFloat(checkins[i].latitude), parseFloat(checkins[i].longitude));
        }
    }
    if(include_friends){
        var friends = id_actual.amigos;
        for(i in friends){
            var checkins_f = friends[i]["check-ins"];
            for(i in checkins_f){
                drop(map2, parseFloat(checkins_f[i].latitude), parseFloat(checkins_f[i].longitude));
            }
        }
    }
}
