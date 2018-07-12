$(document).ready(function() {



    var mymap = L.map('mapid').setView([47.2250638, 2.690954], 6);
    // ,6z
    L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw', {
        maxZoom: 18,
        attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, ' +
            '<a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' +
            'Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
        id: 'mapbox.streets'
    }).addTo(mymap);


    console.log('hello world');
    $.ajax({

        url: 'https://public.opendatasoft.com/api/records/1.0/search/?dataset=contours-simplifies-des-departements-francais-2015&rows=120&facet=code_dept',

        type: 'GET',

        dataType: 'json',

        success: function(data, statut) {
            // console.log(data);
            for (departements of data["records"]) {
                L.geoJSON(departements["fields"]["geo_shape"]).addTo(mymap);
                $.ajax({
                    url: 'api.openweathermap.org/data/2.5/weather?q='+["fields"]["nom_chf"]+["fields"]["code_chf"]+"APPID=daf53d19967aa5ec6034966c77cbac30",
                    type: 'GET',
                    success: function(meteo, statut) {
                        console.log(meteo);

                    }

                });
            }

        }

    });
})
