
var myMap = L.map("map", {
  center: [45.52, -122.67],
  zoom: 4
});


L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
  attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
  maxZoom: 18,
  id: "mapbox.streets",
  accessToken: API_KEY
}).addTo(myMap);

var url = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson";



d3.json(url, function(data) {
  console.log(data.features);
  plotMap(data.features);
}); 

function plotMap(earthquakedata){

for (var i = 0; i < earthquakedata.length; i++) {

  var color = "";
  if (earthquakedata[i].properties["mag"] <=1 ) {
    color = "#F5F5DC";
  }
  else if (earthquakedata[i].properties["mag"] <=2) {
    color = "#FFB6C1";
  }
  else if (earthquakedata[i].properties["mag"] <=3) {
    color = "#E9967A";
  }
  else if (earthquakedata[i].properties["mag"] <=4) {
    color = "#D2691E";
  }
  else if (earthquakedata[i].properties["mag"] <=5) {
    color = "#B22222";
  }
  else {
    color = "#800000";
  }

  
  L.circle([earthquakedata[i].geometry.coordinates[1],earthquakedata[i].geometry.coordinates[0]], {
    fillOpacity: 0.75,
    color: "none",
    fillColor: color,
    radius: earthquakedata[i].properties["mag"] * 20000
  }).bindPopup("<h1>Title: " + earthquakedata[i].properties["title"] + "</h1> <hr> <h3>Magnitude: " + earthquakedata[i].properties["mag"] + "</h3>").addTo(myMap);
};



function getColor(d) {
  return d <=1 ? '#F5F5DC' :
         d <=2  ? '#FFB6C1' :
         d <= 3 ? '	#E9967A' :
         d <= 4 ? '	#D2691E' :
         d <= 5  ? '#B22222' :
                    '#800000';
}


var colorLegend = L.control({position: 'bottomright'});
colorLegend.onAdd = function (myMap) {

  var div = L.DomUtil.create('div', 'legend'),
      grades = [0, 1, 2, 3, 4, 5],
      labels = [];

  
  for (var i = 0; i < grades.length; i++) {
      div.innerHTML +=
          '<i style="background:' + getColor(grades[i] + 1) + '"></i> ' +
          grades[i] + (grades[i + 1] ? '&ndash;' + grades[i + 1] + '<br>' : '+');
  }

  return div;
};

colorLegend.addTo(myMap);


};