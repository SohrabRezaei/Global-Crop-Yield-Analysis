
var myIcon = L.icon({
    iconUrl: 'https://www.svgrepo.com/show/206227/corn.svg',
    iconSize: [40,30]
})

// The base Map:
let Esri_WorldStreetMap = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer/tile/{z}/{y}/{x}', {
	attribution: 'Tiles &copy; Esri &mdash; Source: Esri, DeLorme, NAVTEQ, USGS, Intermap, iPC, NRCAN, Esri Japan, METI, Esri China (Hong Kong), Esri (Thailand), TomTom, 2012'
});

let Esri_NatGeoWorldMap = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/NatGeo_World_Map/MapServer/tile/{z}/{y}/{x}', {
	attribution: 'Tiles &copy; Esri &mdash; National Geographic, Esri, DeLorme, NAVTEQ, UNEP-WCMC, USGS, NASA, ESA, METI, NRCAN, GEBCO, NOAA, iPC',
	maxZoom: 16
});

var Esri_WorldTopoMap = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Topo_Map/MapServer/tile/{z}/{y}/{x}', {
	attribution: 'Tiles &copy; Esri &mdash; Esri, DeLorme, NAVTEQ, TomTom, Intermap, iPC, USGS, FAO, NPS, NRCAN, GeoBase, Kadaster NL, Ordnance Survey, Esri Japan, METI, Esri China (Hong Kong), and the GIS User Community'
});

let outDoor = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/outdoors-v11/tiles/{z}/{x}/{y}?access_token={accessToken}', {
attribution: 'Map data © <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    tileSize: 512,
    zoomOffset: -1,
    accessToken: API_KEY
});

let dark = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/dark-v10/tiles/{z}/{x}/{y}?access_token={accessToken}', {
attribution: 'Map data © <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    tileSize: 512,
    zoomOffset: -1,
    accessToken: API_KEY
});
var CartoDB_DarkMatter = L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
	attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
	subdomains: 'abcd',
	maxZoom: 20
});

let satellite = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/satellite-v9/tiles/{z}/{x}/{y}?access_token={accessToken}', {
attribution: 'Map data © <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    tileSize: 512,
    zoomOffset: -1,
    accessToken: API_KEY
});


let baseMaps = {
    StreetMap:Esri_WorldStreetMap,
    Outdoor: outDoor,
    Dark: CartoDB_DarkMatter,
    NatGeo: Esri_NatGeoWorldMap,
  };


let map = L.map('recomMap', {
    center: [40, 0],
    zoom: 1.5,
    layers: [Esri_WorldStreetMap],
    fullscreenControl: true
});

L.control.layers(baseMaps).addTo(map);

// ############# Recommendation section ###########//
// Data source
const url = '/api/crops';
var cropRecom;
d3.json(url).then(cropData=>{
    cropRecom=cropData;
});

const cropBox = d3.select("#cropbox");
const threeRecoms = d3.select('#threeRecoms');
var tbody = d3.select("tbody");

const showCountry=(countryName)=>{
    console.log(cropRecom[countryName])
    cropBox.html(countryName)
    buildTable(cropRecom, countryName)
    ;
};

topCountries.forEach(function(country) {
    L.marker(country.geometry.coordinates,{icon:myIcon}).addTo(map).on('click',()=>showCountry(country.properties.country));
});

function buildTable(countryCropYeild, countryName) {
    tbody.html("");
    const data = countryCropYeild[countryName]; 
    Object.entries(data).forEach((crop) => {
        let row = tbody.append("tr");
            row.text(crop[0]);
        let cell = row.append("td");
            cell.text(crop[1]);
        });
    };