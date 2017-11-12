var map, featureList, boroughSearch = [], theaterSearch = [], museumSearch = [];


//untuk menampung pencarian
var fst_lt1Search=[],fst_lt2Search=[],fst_lt3Search=[]
  ,gb_lt1Search=[],gb_lt2Search=[],gb_lt3Search=[]
  ,kantinSearch=[]
  ,lab_fst_lt1Search=[],lab_fst_lt2Search=[]
  ,psi_lt1Search=[],psi_lt2Search=[]
  ,tamanSearch=[];

//untuk menampung array semua layer yang masuk ke POI di pojok kiri
var sidebarLayers=[];

$(window).resize(function() {
  sizeLayerControl();
});

$(document).on("click", ".feature-row", function(e) {
  $(document).off("mouseout", ".feature-row", clearHighlight);
  //sidebarClick(parseInt($(this).attr("id"), 10));
  sidebarClick($(this).attr("lat"),$(this).attr("lng"));
});

if ( !("ontouchstart" in window) ) {
  $(document).on("mouseover", ".feature-row", function(e) {
    highlight.clearLayers().addLayer(L.circleMarker([$(this).attr("lat"), $(this).attr("lng")], highlightStyle));
  });
}

$(document).on("mouseout", ".feature-row", clearHighlight);

$("#about-btn").click(function() {
  $("#aboutModal").modal("show");
  $(".navbar-collapse.in").collapse("hide");
  return false;
});

$("#full-extent-btn").click(function() {
  map.fitBounds(boroughs.getBounds());
  $(".navbar-collapse.in").collapse("hide");
  return false;
});

$("#legend-btn").click(function() {
  $("#legendModal").modal("show");
  $(".navbar-collapse.in").collapse("hide");
  return false;
});

$("#login-btn").click(function() {
  $("#loginModal").modal("show");
  $(".navbar-collapse.in").collapse("hide");
  return false;
});

$("#list-btn").click(function() {
  animateSidebar();
  return false;
});

$("#nav-btn").click(function() {
  $(".navbar-collapse").collapse("toggle");
  return false;
});

$("#sidebar-toggle-btn").click(function() {
  animateSidebar();
  return false;
});

$("#sidebar-hide-btn").click(function() {
  animateSidebar();
  return false;
});

function animateSidebar() {
  $("#sidebar").animate({
    width: "toggle"
  }, 350, function() {
    map.invalidateSize();
  });
}

function sizeLayerControl() {
  $(".leaflet-control-layers").css("max-height", $("#map").height() - 50);
}

function clearHighlight() {
  highlight.clearLayers();
}

//function sidebarClick(id) {
function sidebarClick(lat,lng) {
  //var layer = markerClusters.getLayer(id);
  //map.setView([layer.getLatLng().lat, layer.getLatLng().lng], 17);
  map.setView([lat, lng], 21);
  //layer.fire("click");
  /* Hide sidebar and go to the map on small screens */
  if (document.body.clientWidth <= 767) {
    $("#sidebar").hide();
    map.invalidateSize();
  }
}

function syncSidebar() {
  /* Empty sidebar features */
  //$("#feature-list tbody").empty();
  /* Loop through theaters layer and add only features which are in the map bounds */
//  theaters.eachLayer(function (layer) {
//    if (map.hasLayer(theaterLayer)) {
//      if (map.getBounds().contains(layer.getLatLng())) {
//        $("#feature-list tbody").append('<tr class="feature-row" id="' + L.stamp(layer) + '" lat="' + layer.getLatLng().lat + '" lng="' + layer.getLatLng().lng + '"><td style="vertical-align: middle;"><img width="16" height="18" src="assets/img/theater.png"></td><td class="feature-name">' + layer.feature.properties.NAME + '</td><td style="vertical-align: middle;"><i class="fa fa-chevron-right pull-right"></i></td></tr>');
//      }
//    }
//  });
  /* Loop through museums layer and add only features which are in the map bounds */
//  museums.eachLayer(function (layer) {
//    if (map.hasLayer(museumLayer)) {
//      if (map.getBounds().contains(layer.getLatLng())) {
//        $("#feature-list tbody").append('<tr class="feature-row" id="' + L.stamp(layer) + '" lat="' + layer.getLatLng().lat + '" lng="' + layer.getLatLng().lng + '"><td style="vertical-align: middle;"><img width="16" height="18" src="assets/img/museum.png"></td><td class="feature-name">' + layer.feature.properties.NAME + '</td><td style="vertical-align: middle;"><i class="fa fa-chevron-right pull-right"></i></td></tr>');
//      }
//    }
//  });
  /* Update list.js featureList */
//////  featureList = new List("features", {
//////    valueNames: ["feature-name"]
//////  });
//////  featureList.sort("feature-name", {
//////    order: "asc"
//////  });
}






/* Basemap Layers */
var carto_positron_lite_rainbow = L.tileLayer(
  "https://cartodb-basemaps-{s}.global.ssl.fastly.net/light_nolabels/{z}/{x}/{y}.png",{
	  subdomains:"abcd",
	  attribution:'&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
	  maxZoom: 18
  });

var carto_label = L.tileLayer(
	"https://cartodb-basemaps-{s}.global.ssl.fastly.net/dark_only_labels/{z}/{x}/{y}.png",{
	  subdomains:"abcd",
		maxZoom:18
	});
var cartoLight = L.tileLayer("https://cartodb-basemaps-{s}.global.ssl.fastly.net/light_all/{z}/{x}/{y}.png", {
  maxZoom: 19,
  attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, &copy; <a href="https://cartodb.com/attributions">CartoDB</a>'
});
/* var usgsImagery = L.layerGroup([L.tileLayer("http://basemap.nationalmap.gov/arcgis/rest/services/USGSImageryOnly/MapServer/tile/{z}/{y}/{x}", {
  maxZoom: 15,
}), L.tileLayer.wms("http://raster.nationalmap.gov/arcgis/services/Orthoimagery/USGS_EROS_Ortho_SCALE/ImageServer/WMSServer?", {
  minZoom: 16,
  maxZoom: 19,
  layers: "0",
  format: 'image/jpeg',
  transparent: true,
  attribution: "Aerial Imagery courtesy USGS"
})]); */


var googleStreets = L.tileLayer('http://{s}.google.com/vt/lyrs=m&x={x}&y={y}&z={z}',{
    maxZoom: 20,
    subdomains:['mt0','mt1','mt2','mt3']
});

var googleHybrid = L.tileLayer('http://{s}.google.com/vt/lyrs=s,h&x={x}&y={y}&z={z}',{
    maxZoom: 20,
    subdomains:['mt0','mt1','mt2','mt3']
});

var googleSat = L.tileLayer('http://{s}.google.com/vt/lyrs=s&x={x}&y={y}&z={z}',{
    maxZoom: 20,
    subdomains:['mt0','mt1','mt2','mt3']
});

var googleTerrain = L.tileLayer('http://{s}.google.com/vt/lyrs=p&x={x}&y={y}&z={z}',{
    maxZoom: 20,
    subdomains:['mt0','mt1','mt2','mt3']
});

//dron DJI 
//https://sifsuska.github.io/dji20170704/17/17-102438-65365.jpg
var dron_dji20170704 = L.tileLayer('https://sifsuska.github.io/dji20170704/{z}/{z}-{x}-{y}',{
    minZoom: 17,
    maxZoom: 22
});



/* Overlay Layers */
var highlight = L.geoJson(null);
var highlightStyle = {
  stroke: false,
  fillColor: "#00FFFF",
  fillOpacity: 0.7,
  radius: 10
};

//menampung variabel warna
var ruangColors={
  "Lab":"rgba(40,96,144,1.0)",
  "Fasum":"rgba(234,137,150,1.0)",
  "Admin" : "rgba(228,243,98,1.0)",
  "Perpus" : "rgba(121,185,0,1.0)",
  "Dosen" : "rgba(184,71,255,1.0)",
  "Belajar" : "rgba(237,66,36,1.0)",

};

function style_ruang(feature) {
  return {
    opacity: 1,
    color: 'rgba(0,0,0,0.1)',
    dashArray: '',
    lineCap: 'butt',
    lineJoin: 'miter',
    weight: 3.0, 
    fillOpacity: 1,
    fillColor: ruangColors[feature.properties['tipe']]
  };
}


// GEDUNG DEKANAT FASTE

var fst_lt1 = L.geoJson(null, {
  style: style_ruang,
  onEachFeature: function (feature, layer) {
	//untuk search, push masing-masing fitur ke array kita
    fst_lt1Search.push({
      name: layer.feature.properties.nama,
      source: "FST Lantai 1",
      id: L.stamp(layer),
      bounds: layer.getBounds()
    });
	
	//untuk di klik nampilin modal
      var content = "<table class='table table-striped table-bordered table-condensed'>" 
	  + "<tr><th>Nama Ruang</th><td>" + feature.properties.nama + "</td></tr>" 
	  + "<tr><th>Luas</th><td>" + feature.properties.area + " m<sup>2</sup></td></tr>" 
	  + "<tr><th>Gambar</th><td>" + feature.properties.pict + "</td></tr>" 
	  + "<table>";
      layer.on({
        click: function (e) {
          $("#feature-title").html(feature.properties.nama);
          $("#feature-info").html(content);
          $("#featureModal").modal("show");
        }
      });
	
	//untuk POI list
      $("#feature-list tbody").append('<tr class="feature-row" id="' 
		+ L.stamp(layer) 
		+ '" lat="'+feature.geometry.coordinates[0][0][1] 
		+ '" lng="' +feature.geometry.coordinates[0][0][0] 
		+ '" bounds="' +layer.getBounds() 
		+ '"><td style="vertical-align: middle;"><img width="16" height="18" src="assets/img/theater.png"></td><td class="feature-name">' 
		+ layer.feature.properties.nama 
		+ '</td><td style="vertical-align: middle;"><i class="fa fa-chevron-right pull-right"></i></td></tr>');

  }
});
//load geojson kita dengan jQuery
$.getJSON("data/fst_lt1.geojson", function (data) {
  //tambahkan ke layer Leaflet yang tadinya masih null
  fst_lt1.addData(data);
});


var fst_lt2 = L.geoJson(null, {
  /*style: function (feature) {
    return {
      color: "black",
      ////fill: false,
      opacity: 1,
      clickable: true
    };
  }, */
  style: style_ruang,
  onEachFeature: function (feature, layer) {
    fst_lt2Search.push({
      name: layer.feature.properties.nama,
      source: "FST Lantai 2",
      id: L.stamp(layer),
      bounds: layer.getBounds()
    });

	
	//untuk di klik nampilin modal
      var content = "<table class='table table-striped table-bordered table-condensed'>" 
    + "<tr><th>Nama Ruang</th><td>" + feature.properties.nama + "</td></tr>" 
    + "<tr><th>Luas</th><td>" + feature.properties.area + " m<sup>2</sup></td></tr>" 
    + "<tr><th>Gambar</th><td>" + feature.properties.pict + "</td></tr>" 
    + "<table>";
      layer.on({
        click: function (e) {
          $("#feature-title").html(feature.properties.nama);
          $("#feature-info").html(content);
          $("#featureModal").modal("show");
        }
      });	
	
	//untuk POI list
      $("#feature-list tbody").append('<tr class="feature-row" id="' 
		+ L.stamp(layer) 
		+ '" lat="'+feature.geometry.coordinates[0][0][1] 
		+ '" lng="' +feature.geometry.coordinates[0][0][0] 
		+ '" bounds="' +layer.getBounds() 
		+ '"><td style="vertical-align: middle;"><img width="16" height="18" src="assets/img/theater.png"></td><td class="feature-name">' 
		+ layer.feature.properties.nama 
		+ '</td><td style="vertical-align: middle;"><i class="fa fa-chevron-right pull-right"></i></td></tr>');

	
  }
});
//load geojson kita dengan jQuery
$.getJSON("data/fst_lt2.geojson", function (data) {
  //tambahkan ke layer Leaflet yang tadinya masih null
  fst_lt2.addData(data);
});


var fst_lt3 = L.geoJson(null, {
    /*style: function (feature) {
    return {
      color: "green",
      //fill: false,
      opacity: 1,
      clickable: true
    };
  }, */
  style: style_ruang,
  onEachFeature: function (feature, layer) {
    fst_lt3Search.push({
      name: layer.feature.properties.nama,
      source: "FST Lantai 3",
      id: L.stamp(layer),
      bounds: layer.getBounds()
    });

	
	//untuk di klik nampilin modal
      var content = "<table class='table table-striped table-bordered table-condensed'>" 
    + "<tr><th>Nama Ruang</th><td>" + feature.properties.nama + "</td></tr>" 
    + "<tr><th>Luas</th><td>" + feature.properties.area + " m<sup>2</sup></td></tr>" 
    + "<tr><th>Gambar</th><td>" + feature.properties.pict + "</td></tr>" 
    + "<table>";      
    layer.on({
        click: function (e) {
          $("#feature-title").html(feature.properties.nama);
          $("#feature-info").html(content);
          $("#featureModal").modal("show");
        }
      });		
	
	//untuk POI list
      $("#feature-list tbody").append('<tr class="feature-row" id="' 
		+ L.stamp(layer) 
		+ '" lat="'+feature.geometry.coordinates[0][0][1] 
		+ '" lng="' +feature.geometry.coordinates[0][0][0] 
		+ '" bounds="' +layer.getBounds() 
		+ '"><td style="vertical-align: middle;"><img width="16" height="18" src="assets/img/theater.png"></td><td class="feature-name">' 
		+ layer.feature.properties.nama 
		+ '</td><td style="vertical-align: middle;"><i class="fa fa-chevron-right pull-right"></i></td></tr>');

  }
});
//load geojson kita dengan jQuery
$.getJSON("data/fst_lt3.geojson", function (data) {
  //tambahkan ke layer Leaflet yang tadinya masih null
  fst_lt3.addData(data);
});




// Gedung Baru

var gb_lt1 = L.geoJson(null, {
  style: style_ruang,
  onEachFeature: function (feature, layer) {
    gb_lt1Search.push({
      name: layer.feature.properties.nama,
      source: "Gedung Baru Lantai 1",
      id: L.stamp(layer),
      bounds: layer.getBounds()
    });

	//untuk di klik nampilin modal
      var content = "<table class='table table-striped table-bordered table-condensed'>" 
    + "<tr><th>Nama Ruang</th><td>" + feature.properties.nama + "</td></tr>" 
    + "<tr><th>Luas</th><td>" + feature.properties.area + " m<sup>2</sup></td></tr>" 
    + "<tr><th>Gambar</th><td>" + feature.properties.pict + "</td></tr>" 
    + "<table>";
    layer.on({
        click: function (e) {
          $("#feature-title").html(feature.properties.nama);
          $("#feature-info").html(content);
          $("#featureModal").modal("show");
        }
      });

	
	//untuk POI list
      $("#feature-list tbody").append('<tr class="feature-row" id="' 
		+ L.stamp(layer) 
		+ '" lat="'+feature.geometry.coordinates[0][0][1] 
		+ '" lng="' +feature.geometry.coordinates[0][0][0] 
		+ '" bounds="' +layer.getBounds() 
		+ '"><td style="vertical-align: middle;"><img width="16" height="18" src="assets/img/theater.png"></td><td class="feature-name">' 
		+ layer.feature.properties.nama 
		+ '</td><td style="vertical-align: middle;"><i class="fa fa-chevron-right pull-right"></i></td></tr>');


	  
  }
});
//load geojson kita dengan jQuery
$.getJSON("data/gb_lt1.geojson", function (data) {
  //tambahkan ke layer Leaflet yang tadinya masih null
  gb_lt1.addData(data);
});


var gb_lt2 = L.geoJson(null, {
    /*style: function (feature) {
    return {
      color: "green",
      //fill: false,
      opacity: 1,
      clickable: true
    };
  }, */
  style: style_ruang,
  onEachFeature: function (feature, layer) {
    gb_lt2Search.push({
      name: layer.feature.properties.nama,
      source: "Gedung Baru Lantai 2",
      id: L.stamp(layer),
      bounds: layer.getBounds()
    });

	//untuk di klik nampilin modal
      var content = "<table class='table table-striped table-bordered table-condensed'>" 
    + "<tr><th>Nama Ruang</th><td>" + feature.properties.nama + "</td></tr>" 
    + "<tr><th>Luas</th><td>" + feature.properties.area + " m<sup>2</sup></td></tr>" 
    + "<tr><th>Gambar</th><td>" + feature.properties.pict + "</td></tr>" 
    + "<table>";
      layer.on({
        click: function (e) {
          $("#feature-title").html(feature.properties.nama);
          $("#feature-info").html(content);
          $("#featureModal").modal("show");
        }
      });	


	
	//untuk POI list
      $("#feature-list tbody").append('<tr class="feature-row" id="' 
		+ L.stamp(layer) 
		+ '" lat="'+feature.geometry.coordinates[0][0][1] 
		+ '" lng="' +feature.geometry.coordinates[0][0][0] 
		+ '" bounds="' +layer.getBounds() 
		+ '"><td style="vertical-align: middle;"><img width="16" height="18" src="assets/img/theater.png"></td><td class="feature-name">' 
		+ layer.feature.properties.nama 
		+ '</td><td style="vertical-align: middle;"><i class="fa fa-chevron-right pull-right"></i></td></tr>');

	  
	  
  }
});
//load geojson kita dengan jQuery
$.getJSON("data/gb_lt2.geojson", function (data) {
  //tambahkan ke layer Leaflet yang tadinya masih null
  gb_lt2.addData(data);
});


var gb_lt3 = L.geoJson(null, {
  style: style_ruang,
  onEachFeature: function (feature, layer) {
    gb_lt3Search.push({
      name: layer.feature.properties.nama,
      source: "Gedung Baru Lantai 3",
      id: L.stamp(layer),
      bounds: layer.getBounds()
    });

	//untuk di klik nampilin modal
      var content = "<table class='table table-striped table-bordered table-condensed'>" 
    + "<tr><th>Nama Ruang</th><td>" + feature.properties.nama + "</td></tr>" 
    + "<tr><th>Luas</th><td>" + feature.properties.area + " m<sup>2</sup></td></tr>" 
    + "<tr><th>Gambar</th><td>" + feature.properties.pict + "</td></tr>" 
    + "<table>";
      layer.on({
        click: function (e) {
          $("#feature-title").html(feature.properties.nama);
          $("#feature-info").html(content);
          $("#featureModal").modal("show");
        }
      });
	
	//untuk POI list
      $("#feature-list tbody").append('<tr class="feature-row" id="' 
		+ L.stamp(layer) 
		+ '" lat="'+feature.geometry.coordinates[0][0][1] 
		+ '" lng="' +feature.geometry.coordinates[0][0][0] 
		+ '" bounds="' +layer.getBounds() 
		+ '"><td style="vertical-align: middle;"><img width="16" height="18" src="assets/img/theater.png"></td><td class="feature-name">' 
		+ layer.feature.properties.nama 
		+ '</td><td style="vertical-align: middle;"><i class="fa fa-chevron-right pull-right"></i></td></tr>');	  
  }
});
//load geojson kita dengan jQuery
$.getJSON("data/gb_lt3.geojson", function (data) {
  //tambahkan ke layer Leaflet yang tadinya masih null
  gb_lt3.addData(data);
});


// kantin

var kantin = L.geoJson(null, {
  style: style_ruang,
  onEachFeature: function (feature, layer) {
    kantinSearch.push({
      name: layer.feature.properties.nama,
      source: "Kantin",
      id: L.stamp(layer),
      bounds: layer.getBounds()
    });


	//untuk di klik nampilin modal
      var content = "<table class='table table-striped table-bordered table-condensed'>" 
    + "<tr><th>Nama Ruang</th><td>" + feature.properties.nama + "</td></tr>" 
    + "<tr><th>Luas</th><td>" + feature.properties.area + " m<sup>2</sup></td></tr>" 
    + "<tr><th>Gambar</th><td>" + feature.properties.pict + "</td></tr>" 
    + "<table>";
      layer.on({
        click: function (e) {
          $("#feature-title").html(feature.properties.nama);
          $("#feature-info").html(content);
          $("#featureModal").modal("show");
        }
      });	

	
	//untuk POI list
      $("#feature-list tbody").append('<tr class="feature-row" id="' 
		+ L.stamp(layer) 
		+ '" lat="'+feature.geometry.coordinates[0][0][1] 
		+ '" lng="' +feature.geometry.coordinates[0][0][0] 
		+ '" bounds="' +layer.getBounds() 
		+ '"><td style="vertical-align: middle;"><img width="16" height="18" src="assets/img/theater.png"></td><td class="feature-name">' 
		+ layer.feature.properties.nama 
		+ '</td><td style="vertical-align: middle;"><i class="fa fa-chevron-right pull-right"></i></td></tr>');

  }
});
//load geojson kita dengan jQuery
$.getJSON("data/kantin.geojson", function (data) {
  //tambahkan ke layer Leaflet yang tadinya masih null
  kantin.addData(data);
});


// lab_fst
var lab_fst_lt1 = L.geoJson(null, {
style: style_ruang,
  onEachFeature: function (feature, layer) {
    lab_fst_lt1Search.push({
      name: layer.feature.properties.nama,
      source: "Lab Lantai 1",
      id: L.stamp(layer),
      bounds: layer.getBounds()
    });


	//untuk di klik nampilin modal
      var content = "<table class='table table-striped table-bordered table-condensed'>" 
    + "<tr><th>Nama Ruang</th><td>" + feature.properties.nama + "</td></tr>" 
    + "<tr><th>Luas</th><td>" + feature.properties.area + " m<sup>2</sup></td></tr>" 
    + "<tr><th>Gambar</th><td>" + feature.properties.pict + "</td></tr>" 
    + "<table>";
      layer.on({
        click: function (e) {
          $("#feature-title").html(feature.properties.nama);
          $("#feature-info").html(content);
          $("#featureModal").modal("show");
        }
      });

	  
	
	//untuk POI list
      $("#feature-list tbody").append('<tr class="feature-row" id="' 
		+ L.stamp(layer) 
		+ '" lat="'+feature.geometry.coordinates[0][0][1] 
		+ '" lng="' +feature.geometry.coordinates[0][0][0] 
		+ '" bounds="' +layer.getBounds() 
		+ '"><td style="vertical-align: middle;"><img width="16" height="18" src="assets/img/theater.png"></td><td class="feature-name">' 
		+ layer.feature.properties.nama 
		+ '</td><td style="vertical-align: middle;"><i class="fa fa-chevron-right pull-right"></i></td></tr>');

	  
	
  }
});
//load geojson kita dengan jQuery
$.getJSON("data/lab_fst_lt1.geojson", function (data) {
  //tambahkan ke layer Leaflet yang tadinya masih null
  lab_fst_lt1.addData(data);
});


var lab_fst_lt2 = L.geoJson(null, {
  style: style_ruang,
  onEachFeature: function (feature, layer) {
    lab_fst_lt2Search.push({
      name: layer.feature.properties.nama,
      source: "Lab Lantai 2",
      id: L.stamp(layer),
      bounds: layer.getBounds()
    });
	
	//untuk di klik nampilin modal
      var content = "<table class='table table-striped table-bordered table-condensed'>" 
    + "<tr><th>Nama Ruang</th><td>" + feature.properties.nama + "</td></tr>" 
    + "<tr><th>Luas</th><td>" + feature.properties.area + " m<sup>2</sup></td></tr>" 
    + "<tr><th>Gambar</th><td>" + feature.properties.pict + "</td></tr>" 
    + "<table>";
      layer.on({
        click: function (e) {
          $("#feature-title").html(feature.properties.nama);
          $("#feature-info").html(content);
          $("#featureModal").modal("show");
        }
      });	

	//untuk POI list
      $("#feature-list tbody").append('<tr class="feature-row" id="' 
		+ L.stamp(layer) 
		+ '" lat="'+feature.geometry.coordinates[0][0][1] 
		+ '" lng="' +feature.geometry.coordinates[0][0][0] 
		+ '" bounds="' +layer.getBounds() 
		+ '"><td style="vertical-align: middle;"><img width="16" height="18" src="assets/img/theater.png"></td><td class="feature-name">' 
		+ layer.feature.properties.nama 
		+ '</td><td style="vertical-align: middle;"><i class="fa fa-chevron-right pull-right"></i></td></tr>');

	  
	  
  }
});
//load geojson kita dengan jQuery
$.getJSON("data/lab_fst_lt2.geojson", function (data) {
  //tambahkan ke layer Leaflet yang tadinya masih null
  lab_fst_lt2.addData(data);
});

// PSI
var psi_lt1 = L.geoJson(null, {
  style: style_ruang,
  onEachFeature: function (feature, layer) {
    psi_lt1Search.push({
      name: layer.feature.properties.nama,
      source: "PSI Lantai 1",
      id: L.stamp(layer),
      bounds: layer.getBounds()
    });	
	//untuk di klik nampilin modal
      var content = "<table class='table table-striped table-bordered table-condensed'>" 
    + "<tr><th>Nama Ruang</th><td>" + feature.properties.nama + "</td></tr>" 
    + "<tr><th>Luas</th><td>" + feature.properties.area + " m<sup>2</sup></td></tr>" 
    + "<tr><th>Gambar</th><td>" + feature.properties.pict + "</td></tr>" 
    + "<table>";
      layer.on({
        click: function (e) {
          $("#feature-title").html(feature.properties.nama);
          $("#feature-info").html(content);
          $("#featureModal").modal("show");
        }
      });		
	
	//untuk POI list
      $("#feature-list tbody").append('<tr class="feature-row" id="' 
		+ L.stamp(layer) 
		+ '" lat="'+feature.geometry.coordinates[0][0][1] 
		+ '" lng="' +feature.geometry.coordinates[0][0][0] 
		+ '" bounds="' +layer.getBounds() 
		+ '"><td style="vertical-align: middle;"><img width="16" height="18" src="assets/img/theater.png"></td><td class="feature-name">' 
		+ layer.feature.properties.nama 
		+ '</td><td style="vertical-align: middle;"><i class="fa fa-chevron-right pull-right"></i></td></tr>');
  }
});
//load geojson kita dengan jQuery
$.getJSON("data/psi_lt1.geojson", function (data) {
  //tambahkan ke layer Leaflet yang tadinya masih null
  psi_lt1.addData(data);
});


var psi_lt2 = L.geoJson(null, {
style: style_ruang,
  onEachFeature: function (feature, layer) {
    psi_lt2Search.push({
      name: layer.feature.properties.nama,
      source: "PSI Lantai 2",
      id: L.stamp(layer),
      bounds: layer.getBounds()
    });

	
	//untuk di klik nampilin modal
      var content = "<table class='table table-striped table-bordered table-condensed'>" 
    + "<tr><th>Nama Ruang</th><td>" + feature.properties.nama + "</td></tr>" 
    + "<tr><th>Luas</th><td>" + feature.properties.area + " m<sup>2</sup></td></tr>" 
    + "<tr><th>Gambar</th><td>" + feature.properties.pict + "</td></tr>" 
    + "<table>";
      layer.on({
        click: function (e) {
          $("#feature-title").html(feature.properties.nama);
          $("#feature-info").html(content);
          $("#featureModal").modal("show");
        }
      });		
	
	//untuk POI list
      $("#feature-list tbody").append('<tr class="feature-row" id="' 
		+ L.stamp(layer) 
		+ '" lat="'+feature.geometry.coordinates[0][0][1] 
		+ '" lng="' +feature.geometry.coordinates[0][0][0] 
		+ '" bounds="' +layer.getBounds() 
		+ '"><td style="vertical-align: middle;"><img width="16" height="18" src="assets/img/theater.png"></td><td class="feature-name">' 
		+ layer.feature.properties.nama 
		+ '</td><td style="vertical-align: middle;"><i class="fa fa-chevron-right pull-right"></i></td></tr>');

	
  }
});
//load geojson kita dengan jQuery
$.getJSON("data/psi_lt2.geojson", function (data) {
  //tambahkan ke layer Leaflet yang tadinya masih null
  psi_lt2.addData(data);
});


//menambahkan taman
var taman = L.geoJson(null, {
  style: style_ruang,
  onEachFeature: function (feature, layer) {
  //untuk search, push masing-masing fitur ke array kita
    tamanSearch.push({
      name: layer.feature.properties.nama,
      source: "Taman Cinta",
      id: L.stamp(layer),
      bounds: layer.getBounds()
    });
  
  //untuk di klik nampilin modal
      var content = "<table class='table table-striped table-bordered table-condensed'>" 
    + "<tr><th>Nama Ruang</th><td>" + feature.properties.nama + "</td></tr>" 
    + "<tr><th>Luas</th><td>" + feature.properties.area + " m<sup>2</sup></td></tr>" 
    + "<tr><th>Gambar</th><td>" + feature.properties.pict + "</td></tr>" 
    + "<table>";
      layer.on({
        click: function (e) {
          $("#feature-title").html(feature.properties.nama);
          $("#feature-info").html(content);
          $("#featureModal").modal("show");
        }
      });
  
  //untuk POI list
      $("#feature-list tbody").append('<tr class="feature-row" id="' 
    + L.stamp(layer) 
    + '" lat="'+feature.geometry.coordinates[0][0][1] 
    + '" lng="' +feature.geometry.coordinates[0][0][0] 
    + '" bounds="' +layer.getBounds() 
    + '"><td style="vertical-align: middle;"><img width="16" height="18" src="assets/img/theater.png"></td><td class="feature-name">' 
    + layer.feature.properties.nama 
    + '</td><td style="vertical-align: middle;"><i class="fa fa-chevron-right pull-right"></i></td></tr>');

  }
});
//load geojson kita dengan jQuery
$.getJSON("data/taman.geojson", function (data) {
  //tambahkan ke layer Leaflet yang tadinya masih null
  taman.addData(data);
});




/* Single marker cluster layer to hold all clusters */
var markerClusters = new L.MarkerClusterGroup({
  spiderfyOnMaxZoom: true,
  showCoverageOnHover: false,
  zoomToBoundsOnClick: true,
  disableClusteringAtZoom: 16
});



map = L.map("map", {
  zoom: 18,
  center: [0.468057,  101.355697], // center di 101.35569777220351, 0.468057021493219 
  // default layers on
  layers: [fst_lt1, gb_lt1, kantin,lab_fst_lt1, psi_lt1, taman],
  zoomControl: false,
  // we have our own attributionControl
  attributionControl: false
});

/* Layer control listeners that allow for a single markerClusters layer */
map.on("overlayadd", function(e) {
  //if (e.layer === theaterLayer) {
  //  markerClusters.addLayer(theaters);
  //  syncSidebar();
  //}
  //if (e.layer === museumLayer) {
  //  markerClusters.addLayer(museums);
  //  syncSidebar();
  //}
  
  // karena semuanya ditambahkan ... ngga usah pake if if an
  //markerClusters.addLayer(e.layer);
  //syncSidebar();
  
  
});

map.on("overlayremove", function(e) {
  //if (e.layer === theaterLayer) {
  //  markerClusters.removeLayer(theaters);
  //  syncSidebar();
  //}
  //if (e.layer === museumLayer) {
  //  markerClusters.removeLayer(museums);
  //  syncSidebar();
  //}
  
  //markerClusters.removeLayer(e.layer);
  //syncSidebar();  
  
});

/* Filter sidebar feature list to only show features in current map bounds */
map.on("moveend", function (e) {
  //syncSidebar();
});

/* Clear feature highlight when map is clicked */
map.on("click", function(e) {
  highlight.clearLayers();
});




/* Attribution control */
function updateAttribution(e) {
  $.each(map._layers, function(index, layer) {
    if (layer.getAttribution) {
      $("#attribution").html((layer.getAttribution()));
    }
  });
}
map.on("layeradd", updateAttribution);
map.on("layerremove", updateAttribution);

var attributionControl = L.control({
  position: "bottomright"
});
attributionControl.onAdd = function (map) {
  var div = L.DomUtil.create("div", "leaflet-control-attribution");
  div.innerHTML = "<span class='hidden-xs'>Developed by <a href='http://sifsuska.github.io'>SIFsuska</a> | </span><a href='#' onclick='$(\"#attributionModal\").modal(\"show\"); return false;'>Attribution</a>";
  return div;
};
map.addControl(attributionControl);

var zoomControl = L.control.zoom({
  position: "bottomright"
}).addTo(map);




/* GPS enabled geolocation control set to follow the user's location */
var locateControl = L.control.locate({
  position: "bottomright",
  drawCircle: true,
  follow: true,
  setView: true,
  keepCurrentZoomLevel: true,
  markerStyle: {
    weight: 1,
    opacity: 0.8,
    fillOpacity: 0.8
  },
  circleStyle: {
    weight: 1,
    clickable: false
  },
  icon: "fa fa-location-arrow",
  metric: false,
  strings: {
    title: "My location",
    popup: "You are within {distance} {unit} from this point",
    outsideMapBoundsMsg: "You seem located outside the boundaries of the map"
  },
  locateOptions: {
    maxZoom: 18,
    watch: true,
    enableHighAccuracy: true,
    maximumAge: 10000,
    timeout: 10000
  }
}).addTo(map);

/* Larger screens get expanded layer control and visible sidebar */
if (document.body.clientWidth <= 767) {
  var isCollapsed = true;
} else {
  var isCollapsed = false;
}

var baseLayers = {
  "Street Map": cartoLight,

				"Google Streets":googleStreets,
				"Google Hybrid":googleHybrid,
				"Google Satellite":googleSat,
				"Google Terrain":googleTerrain,  
  
  
  "Dron 20170704": dron_dji20170704,
  
  //"Aerial Imagery": usgsImagery,
  "Carto Positron": carto_positron_lite_rainbow
};

var groupedOverlays = {
  "Dekanat": {
  "Labels": carto_label,
    "Lantai 1": fst_lt1,
    "Lantai 2": fst_lt2,
    "Lantai 3": fst_lt3 
  },
  "Gedung Baru": {
    "Lantai 1": gb_lt1,
    "Lantai 2": gb_lt2,
    "Lantai 3": gb_lt3
  },
  "Lab":{
    "Lantai 1": lab_fst_lt1,
    "Lantai 2": lab_fst_lt2
  },
  "PSI":{
    "Lantai 1": psi_lt1,
    "Lantai 2": psi_lt2,
    "Kantin": kantin
  }
};

var layerControl = L.control.groupedLayers(baseLayers, groupedOverlays, {
  collapsed: isCollapsed
}).addTo(map);

/* Highlight search box text on click */
$("#searchbox").click(function () {
  $(this).select();
});

/* Prevent hitting enter from refreshing the page */
$("#searchbox").keypress(function (e) {
  if (e.which == 13) {
    e.preventDefault();
  }
});

$("#featureModal").on("hidden.bs.modal", function (e) {
  $(document).on("mouseout", ".feature-row", clearHighlight);
});

/* Typeahead search functionality */
$(document).one("ajaxStop", function () {
  $("#loading").hide();
  sizeLayerControl();
  

  /* Fit map to bounds */
  map.fitBounds(fst_lt1.getBounds());
  //perhatikan bahwa kodingan di atas dapat mengganggu center map kita
  
  
  featureList = new List("features", {valueNames: ["feature-name"]});
  featureList.sort("feature-name", {order:"asc"});

  //untuk searching
  var fst_lt1BH = new Bloodhound({
    name: "Faste Lantai 1",
    datumTokenizer: function (d) {
      return Bloodhound.tokenizers.whitespace(d.name);
    },
    queryTokenizer: Bloodhound.tokenizers.whitespace,
    local: fst_lt1Search,
    limit: 10
  });
  fst_lt1BH.initialize();
  
  
  var fst_lt2BH = new Bloodhound({
    name: "Faste Lantai 2",
    datumTokenizer: function (d) {
      return Bloodhound.tokenizers.whitespace(d.name);
    },
    queryTokenizer: Bloodhound.tokenizers.whitespace,
    local: fst_lt2Search,
    limit: 10
  });
  fst_lt2BH.initialize();
  
  
  var fst_lt3BH = new Bloodhound({
    name: "Faste Lantai 3",
    datumTokenizer: function (d) {
      return Bloodhound.tokenizers.whitespace(d.name);
    },
    queryTokenizer: Bloodhound.tokenizers.whitespace,
    local: fst_lt3Search,
    limit: 10
  });
  fst_lt3BH.initialize();  
  
  // gedung baru
  var gb_lt1BH = new Bloodhound({
    name: "Gedung Baru Lantai 1",
    datumTokenizer: function (d) {
      return Bloodhound.tokenizers.whitespace(d.name);
    },
    queryTokenizer: Bloodhound.tokenizers.whitespace,
    local: gb_lt1Search,
    limit: 10
  });
  gb_lt1BH.initialize();
  
  
  var gb_lt2BH = new Bloodhound({
    name: "Gedung Baru Lantai 2",
    datumTokenizer: function (d) {
      return Bloodhound.tokenizers.whitespace(d.name);
    },
    queryTokenizer: Bloodhound.tokenizers.whitespace,
    local: gb_lt2Search,
    limit: 10
  });
  gb_lt2BH.initialize();
  
  
  var gb_lt3BH = new Bloodhound({
    name: "Gedung Baru Lantai 3",
    datumTokenizer: function (d) {
      return Bloodhound.tokenizers.whitespace(d.name);
    },
    queryTokenizer: Bloodhound.tokenizers.whitespace,
    local: gb_lt1Search,
    limit: 10
  });
  gb_lt3BH.initialize();   
  


  //psi
  var psi_lt1BH = new Bloodhound({
    name: "PSI Lantai 1",
    datumTokenizer: function (d) {
      return Bloodhound.tokenizers.whitespace(d.name);
    },
    queryTokenizer: Bloodhound.tokenizers.whitespace,
    local: psi_lt1Search,
    limit: 10
  });
  psi_lt1BH.initialize();
  
  
  var psi_lt2BH = new Bloodhound({
    name: "PSI Lantai 2",
    datumTokenizer: function (d) {
      return Bloodhound.tokenizers.whitespace(d.name);
    },
    queryTokenizer: Bloodhound.tokenizers.whitespace,
    local: psi_lt2Search,
    limit: 10
  });
  psi_lt2BH.initialize();
    
  var kantinBH = new Bloodhound({
    name: "Kantin",
    datumTokenizer: function (d) {
      return Bloodhound.tokenizers.whitespace(d.name);
    },
    queryTokenizer: Bloodhound.tokenizers.whitespace,
    local: kantinSearch,
    limit: 10
  });
  kantinBH.initialize();
 
  //lab
  var lab_fst_lt1BH = new Bloodhound({
    name: "Lab Lantai 1",
    datumTokenizer: function (d) {
      return Bloodhound.tokenizers.whitespace(d.name);
    },
    queryTokenizer: Bloodhound.tokenizers.whitespace,
    local: lab_fst_lt1Search,
    limit: 10
  });
  lab_fst_lt1BH.initialize();

  var tamanBH = new Bloodhound({
    name: "Taman Cinta",
    datumTokenizer: function (d) {
      return Bloodhound.tokenizers.whitespace(d.name);
    },
    queryTokenizer: Bloodhound.tokenizers.whitespace,
    local: tamanSearch,
    limit: 10
  });
  tamanBH.initialize();
	
  /*
  var geonamesBH = new Bloodhound({
    name: "GeoNames",
    datumTokenizer: function (d) {
      return Bloodhound.tokenizers.whitespace(d.name);
    },
    queryTokenizer: Bloodhound.tokenizers.whitespace,
    remote: {
      url: "http://api.geonames.org/searchJSON?username=bootleaf&featureClass=P&maxRows=5&countryCode=US&name_startsWith=%QUERY",
      filter: function (data) {
        return $.map(data.geonames, function (result) {
          return {
            name: result.name + ", " + result.adminCode1,
            lat: result.lat,
            lng: result.lng,
            source: "GeoNames"
          };
        });
      },
      ajax: {
        beforeSend: function (jqXhr, settings) {
          settings.url += "&east=" + map.getBounds().getEast() + "&west=" + map.getBounds().getWest() + "&north=" + map.getBounds().getNorth() + "&south=" + map.getBounds().getSouth();
          $("#searchicon").removeClass("fa-search").addClass("fa-refresh fa-spin");
        },
        complete: function (jqXHR, status) {
          $('#searchicon').removeClass("fa-refresh fa-spin").addClass("fa-search");
        }
      }
    },
    limit: 10
  });
  geonamesBH.initialize();
  */
  /* instantiate the typeahead UI */
  $("#searchbox").typeahead({
    minLength: 3,
    highlight: true,
    hint: false
  }, {
    name: "fst1",
    displayKey: "name",
    source: fst_lt1BH.ttAdapter(),
    templates: {
      header: "<h4 class='typeahead-header'>FST Lt 1</h4>"
    }
  }, {
    name: "fst2",
    displayKey: "name",
    source: fst_lt2BH.ttAdapter(),
    templates: {
      header: "<h4 class='typeahead-header'>FST Lt 2</h4>"
    }
  }, {
    name: "fst3",
    displayKey: "name",
    source: fst_lt3BH.ttAdapter(),
    templates: {
      header: "<h4 class='typeahead-header'>FST Lt 3</h4>"
    }
  }, {
    name: "gb1",
    displayKey: "name",
    source: gb_lt1BH.ttAdapter(),
    templates: {
      header: "<h4 class='typeahead-header'>Gedung Baru Lt 1</h4>"
    }
  }, {
    name: "gb2",
    displayKey: "name",
    source: gb_lt2BH.ttAdapter(),
    templates: {
      header: "<h4 class='typeahead-header'>Gedung Baru Lt 2</h4>"
    }
  }, {
    name: "gb3",
    displayKey: "name",
    source: gb_lt3BH.ttAdapter(),
    templates: {
      header: "<h4 class='typeahead-header'>Gedung Baru Lt 3</h4>"
    }
  }, {
    name: "psi1",
    displayKey: "name",
    source: psi_lt1BH.ttAdapter(),
    templates: {
      header: "<h4 class='typeahead-header'>PSI Lt 1</h4>"
    }
  }, {
    name: "psi2",
    displayKey: "name",
    source: psi_lt2BH.ttAdapter(),
    templates: {
      header: "<h4 class='typeahead-header'>PSI Lt 2</h4>"
    }
  }, {
    name: "kantin",
    displayKey: "name",
    source: kantinBH.ttAdapter(),
    templates: {
      header: "<h4 class='typeahead-header'>Kantin</h4>"
    }
  }, {
    name: "lab_fst_lt1",
    displayKey: "name",
    source: lab_fst_lt1BH.ttAdapter(),
    templates: {
      header: "<h4 class='typeahead-header'>Lab Lantai 1</h4>"
    }
  }, {
    name: "taman",
    displayKey: "name",
    source: tamanBH.ttAdapter(),
    templates: {
      header: "<h4 class='typeahead-header'>Taman</h4>"
    }    
  }).on("typeahead:selected", function (obj, datum) {
    //if (datum.source === "Fst") {
      map.fitBounds(datum.bounds);
    //}
    //if (datum.source === "Theaters") {
    //  if (!map.hasLayer(theaterLayer)) {
    //    map.addLayer(theaterLayer);
    //  }
    //  map.setView([datum.lat, datum.lng], 17);
    //  if (map._layers[datum.id]) {
    //    map._layers[datum.id].fire("click");
    //  }
    //}
    //if (datum.source === "Museums") {
    //  if (!map.hasLayer(museumLayer)) {
    //    map.addLayer(museumLayer);
    //  }
    //  map.setView([datum.lat, datum.lng], 17);
    //  if (map._layers[datum.id]) {
    //    map._layers[datum.id].fire("click");
    //  }
    //}
    //if (datum.source === "GeoNames") {
    //  map.setView([datum.lat, datum.lng], 14);
    //}
    if ($(".navbar-collapse").height() > 50) {
      $(".navbar-collapse").collapse("hide");
    }
  }).on("typeahead:opened", function () {
    $(".navbar-collapse.in").css("max-height", $(document).height() - $(".navbar-header").height());
    $(".navbar-collapse.in").css("height", $(document).height() - $(".navbar-header").height());
  }).on("typeahead:closed", function () {
    $(".navbar-collapse.in").css("max-height", "");
    $(".navbar-collapse.in").css("height", "");
  });
  $(".twitter-typeahead").css("position", "static");
  $(".twitter-typeahead").css("display", "block");
});




// Leaflet patch to make layer control scrollable on touch browsers
var container = $(".leaflet-control-layers")[0];
if (!L.Browser.touch) {
  L.DomEvent
  .disableClickPropagation(container)
  .disableScrollPropagation(container);
} else {
  L.DomEvent.disableClickPropagation(container);
}
