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

        success: function(states, statut) {
            // console.log(data);
            for (departements of states["records"]) {

                L.geoJSON(departements["fields"]["geo_shape"]).addTo(mymap);

                var cities = departements["fields"]["nom_chf"];
                //
                // console.log(cities);

                $.ajax({

                    url:'http://api.openweathermap.org/data/2.5/weather?q='+ cities +',fr&APPID=daf53d19967aa5ec6034966c77cbac30',

                    type: 'GET',

                    dataType: "json",

                    success: function(towns, statut) {
                            L.marker(towns["coord"]["lon"], towns["coord"]["lat"]).addTo(mymap);

                    }

                });
            }

        }

    });
})



                     // 'http://api.openweathermap.org/data/2.5/weather?q=London,uk&APPID=daf53d19967aa5ec6034966c77cbac30',
