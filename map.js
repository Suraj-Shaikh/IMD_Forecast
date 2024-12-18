var map, view, layerSwitcher;

    var view = new ol.View({
        // projection:'EPSG:4326',
        // projection:'EPSG:32643',
        center: ol.proj.fromLonLat([76.994967, 20.702250]),
        zoom: 6,
    });

    // NBSS Soil Depth Layer
    map = new ol.Map({
        target: "map",
        view: view,
    });

    var OSM = new ol.layer.Tile({
        title: "OSM",
        type: 'base',
        visible: true,
        source: new ol.source.OSM(),
    });

    var satellite = new ol.layer.Tile({
        title: 'Satellite',
        type: 'base',
        visible: true,
        source: new ol.source.XYZ({
            attributions: ['Powered by Esri',
                'Source: Esri, DigitalGlobe, GeoEye, Earthstar Geographics, CNES/Airbus DS, USDA, USGS, AeroGRID, IGN, and the GIS User Community'
            ],
            attributionsCollapsible: false,
            url: 'https://services.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
            maxZoom: 23
        })
    });

    var basemaps = new ol.layer.Group({
        title: 'Base Maps',
        layers: [satellite, OSM]
    });

    map.addLayer(basemaps);

    var overlays = new ol.layer.Group({
        title: 'Ovelays',
        layers: []
    });

    map.addLayer(overlays);

    layerSwitcher = new ol.control.LayerSwitcher({
        activationMode: 'click',
        startActive: true,
        tipLabel: 'Layers', // Optional label for button
        groupSelectStyle: 'children', // Can be 'children' [default], 'group' or 'none'
        collapseTipLabel: 'Collapse layers',
    });
    map.addControl(layerSwitcher);
    layerSwitcher.renderPanel();


    var IMDFocrecast = new ol.layer.Image({
        title: 'NDVI',
        // extent: [-180, -90, -180, 90],
        source: new ol.source.ImageWMS({
            url: 'http://localhost:8080/geoserver/wms',
            params: {
                'LAYERS': 'IMD:timeseries_data_mh',
                'time': '2024-10-27'
            },
            ratio: 1,
            serverType: 'geoserver'
        })
    });

    overlays.getLayers().push(IMDFocrecast);
    layerSwitcher.renderPanel();



// var dates = ['2021-06-10', '2021-06-26', '2021-07-12', '2021-07-28', '2021-08-13', '2021-08-29', '2021-09-14', '2021-09-30', '2021-10-16', '2021-11-01', '2021-11-17', '2021-12-03', '2021-12-19', '2022-01-01', '2022-01-17', '2022-02-02', '2022-02-18', '2022-03-06', '2022-03-22', '2022-04-07', '2022-04-23', '2022-05-09'];
// var dateValue = document.getElementById("date_value");
// dateValue.innerHTML = dates[0];
// var sliderRange = document.getElementById("myRange");
// sliderRange.max = dates.length - 1;


// //console.log(dateValue.innerHTML);

// // Update the current slider value (each time you drag the slider handle)
// sliderRange.oninput = function () {
//     dateValue.innerHTML = dates[this.value].slice(0, 10);
//     overlays.getLayers().item(0).getSource().updateParams({ 'TIME': dates[this.value] });
//     i = this.value;
//     //console.log(i); 
// }

// var i = 0;                  //  set your counter to 0

// var timer;
// function play() {

//     //  create a loop function
//     timer = setTimeout(run, 1000);
//     function run() {   //  call a 3s setTimeout when the loop is called

//         overlays.getLayers().item(0).getSource().updateParams({ 'TIME': dates[i] });
//         dateValue.innerHTML = dates[i];
//         sliderRange.value = i;
//         //  your code here
//         if (i <= 20) { i++ };                    //  increment the counter
//         if (i < 22) {           //  if the counter < 22, call the loop function
//             play();             //  ..  again which will trigger another 
//         }                       //  ..  setTimeout()
//     }
// }

// // myLoop(); 
// var start = document.getElementById("play");

// start.addEventListener("click", play);

// var stop = document.getElementById("pause");


// stop.addEventListener("click", pause);

// var reset1 = document.getElementById("reset");


// reset1.addEventListener("click", reset);

// function pause() {
//     console.log(i);
//     clearTimeout(timer);

//     overlays.getLayers().item(0).getSource().updateParams({ 'TIME': dates[i] });
//     dateValue.innerHTML = dates[i];
//     sliderRange.value = i;
// }

// function reset() {

//     clearTimeout(timer);
//     i = 0;
//     overlays.getLayers().item(0).getSource().updateParams({ 'TIME': dates[i] });
//     dateValue.innerHTML = dates[i];
//     sliderRange.value = i;
// }
