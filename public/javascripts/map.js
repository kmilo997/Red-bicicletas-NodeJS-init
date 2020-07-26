var mymap = L.map('mapid').setView([3.5339, -76.3044], 14);

//L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    /*maxZoom: 18,
    id: 'mapbox/streets-v11',
    tileSize: 512,
    zoomOffset: -1,
    accessToken: 'your.mapbox.access.token'*/
}).addTo(mymap);

//L.marker([3.53795, -76.29722]).addTo(mymap);

$.ajax({
    dataType: "json",
    url: "api/bicicletas",
    success: function (res){
        console.log(res);
        res.bicicletas.forEach(e => {
            L.marker([e.ubicacion[0], e.ubicacion[1]],{title:e.id}).addTo(mymap);
        });
    }
})