//declaramos variables para almacenar los mapas 1 y 2, y los marcadores de respectivos mapas
var map, map2;
var markers = [];
var markers2 = [];

//con esta funcion inicializamos el mapa con todas las opciones
function initialize() {
    var mapOptions = {center: {lat: 39.557974, lng: -99.971640}, zoom: 3};
    var map2Options = {center: {lat: 80, lng: -60}, zoom: 2};
    map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);
    map2 = new google.maps.Map(document.getElementById('map-canvas2'), map2Options);
    
    //dropeamos los 500 pins, con las lat y lng de el array res
    for (i in res){
            drop(map, parseFloat(res[i][1]), parseFloat(res[i][2]));
    }
    
    //declaramos un elemento que representa al boton buscar del tab 2 y ejecutamos la busqueda
    var button2 = document.getElementById("filter");
    google.maps.event.addDomListener(button2, 'submit', form_id);
}

//cargamos el mapa, haciendo una llamada a nuestra funcion initialize
google.maps.event.addDomListener(window, 'load', initialize);


//esta funcion nos permite dropear un marker en el mapa, posteriormente nos guarde el objeto
//del marker creado en un array respectivo del mapa
function drop(mapa, latitude, longitude){
    var marker = new google.maps.Marker({
        position: {lat: latitude, lng: longitude},
        map: mapa
    });
    if(mapa==map){
        markers.push(marker);
    }
    else if(mapa==map2){
        markers2.push(marker);
    }
}

//llamamos a ready de JQuery, para ejecutar algunas acciones cuando nuestro documento cargue
$(document).ready(function(){
    //ocultamos la informacion de las tabs, y mostramos la tab principal
    $(".contenido").hide();
    $("#tab1").show();
    
    //al hacer click en la Tab que se desea, cargamos dicha tab y ocultamos la activa
    $("#tabs li").click(function(){
        $("#tabs li").removeClass("highlight");
        $(this).addClass("highlight")
        
        $(".contenido").hide();
        var selected = $(this).find("a").attr("href");
        $(selected).show();
        google.maps.event.trigger(map2,'resize');
        //retornamos false para que no nos entregue los datos en la URL
        return false;
    });
    
    //al clickear en la flecha ocultamos los datos y agrandamos el mapa (tab general)
    $("#arrow").click(function(){
        var status = $("#datos").is(":visible");
        if(status) {
            $("#datos").hide();
            $("#map-canvas").css({"height":"70%", "width":"90%"});
            $(this).html("&#8681;");
        }
        else {
            $("#datos").show();
            $("#map-canvas").css({"height":"45%", "width":"80%"});
            $(this).html("&#8679;");
        }
        google.maps.event.trigger(map,'resize');
    });    
});
