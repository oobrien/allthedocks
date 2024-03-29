var olMap;

const lineColours = 
{
	'E1': 'rgba(255,0,0,0.65)',
	'E2': 'rgba(192,0,0,0.65)',
	'E3': 'rgba(128,0,0,0.65)',
	'E4': 'rgba(192,0,0,0.65)',
	'E5': 'rgba(255,0,0,0.65)',
	'E6': 'rgba(192,0,0,0.65)',
	'E7': 'rgba(128,0,0,0.65)',

	'N1': 'rgba(255,0,255,0.65)',
	'N2': 'rgba(192,0,192,0.65)',
	'N3': 'rgba(128,0,128,0.65)',
	'N4': 'rgba(192,0,192,0.65)',
	'N5': 'rgba(255,0,255,0.65)',
	'N6': 'rgba(192,0,192,0.65)',
	'N7': 'rgba(128,0,128,0.65)',

	'P1': 'rgba(128,128,255,0.65)',
	'P2':  'rgba(64,64,255,0.65)',
	'P3':  'rgba(0,0,255,0.65)',
	'P4':  'rgba(64,64,255,0.65)',
	'P5':  'rgba(128,128,255,0.65)',
	'P6':  'rgba(64,64,255,0.65)',
	'P7':  'rgba(0,0,255,0.65)',

	'S1':  'rgba(128,0,255,0.65)',
	'S2':  'rgba(96,0,192,0.65)',
	'S3':  'rgba(64,0,128,0.65)',
	'S4':  'rgba(96,0,192,0.65)',
	'S5':  'rgba(128,0,255,0.65)',
	'S6':  'rgba(96,0,192,0.65)',
	'S7':  'rgba(64,0,128,0.65)',

	'W1':  'rgba(0,192,0,0.65)',
	'W2':  'rgba(0,128,0,0.65)',
	'W3':  'rgba(0,64,0,0.65)',
	'W4':  'rgba(0,128,0,0.65)',
	'W5':  'rgba(0,192,0,0.65)',
	'W6':  'rgba(0,128,0,0.65)',
	'W7':  'rgba(0,64,0,0.65)',
}

const pointColours = 
{
	'E': 'rgba(255,64,64,0.6)',
	'N': 'rgba(255,64,255,0.6)',
	'P': 'rgba(64,64,192,0.6)',
	'S': 'rgba(128,64,255,0.6)',
	'W': 'rgba(0,192,0,0.6)',
}

const scoreColours = 
{
	'E': 'rgba(255,0,0,1)',
	'N': 'rgba(255,0,255,1)',
	'P': 'rgba(64,64,255,1)',
	'S': 'rgba(128,0,255,1)',
	'W': 'rgba(0,192,0,1)',
}

const labelColours = 
{
	'E': 'rgba(128,0,0,1)',
	'N': 'rgba(128,0,128,1)',
	'P': 'rgba(0,0,128,1)',
	'S': 'rgba(64,0,128,1)',
	'W': 'rgba(0,64,0,1)',
}

function gpxStyle(feature, resolution)
{
	var scale = 1;
	if (resolution < 12) { scale = 2; }
	if (resolution < 6) { scale = 3; }
	if (resolution < 3) { scale = 4; }
	//Route lines are LineStrings, track lines are MultiLineStrings
	if (feature.getGeometry().getType() == 'MultiLineString' || feature.getGeometry().getType() == 'LineString')
	{
		return new ol.style.Style({
       		stroke: new ol.style.Stroke({
      			color: lineColours["" + feature.get('name')[0] + feature.get('number')],
      			width: 3*scale,
    		})
		});
	}
	else if (feature.getGeometry().getType() == 'Point')
	{
		return new ol.style.Style({
			image: new ol.style.Circle({
			  fill: new ol.style.Fill({
				color: (feature.get('visited') == null ? pointColours["" + feature.get('cmt')[0]] : 'rgba(0,0,0,1)'),
			  }),
			  radius: 4*scale,
			  /* stroke: new ol.style.Stroke({
				color: '#000',
				width: 3, 
			  }),*/
			}),
			text: new ol.style.Text({
				text: (resolution > 10 ? null : (feature.get('visited') == null ? feature.get('name'): feature.get('name') + "\n" + feature.get('visited'))),
				font: '' + 5*scale + 'px Verdana, Arial, sans-serif',
				fill: new ol.style.Fill({ color: (feature.get('visited') == null ? 'rgba(255,255,255,1)' : 'rgba(0,255,0,1)') }),
				stroke: new ol.style.Stroke({ color: labelColours["" + feature.get('cmt')[0]], width: 2*scale })
			})
		})
	}
}

function getVisited()
{
	$.ajax({url: 'getvisited.php', method: 'GET', dataType:'json', async: true, success: function(data) 
	{ 
		var docks = data['result'];

		var e = layerDocksE.getSource().getFeatures();
		var n = layerDocksN.getSource().getFeatures();
		var p = layerDocksP.getSource().getFeatures();
		var s = layerDocksS.getSource().getFeatures();
		var w = layerDocksW.getSource().getFeatures();

		for (var i in e) { e[i].set('visited', null)}
		for (var i in n) { n[i].set('visited', null)}
		for (var i in p) { p[i].set('visited', null)}
		for (var i in s) { s[i].set('visited', null)}
		for (var i in w) { w[i].set('visited', null)}

		var ev = 0, nv = 0, pv = 0, sv = 0, wv = 0;
		for (var i in docks)
		{
			$('#cb' + docks[i][0]).prop('checked', true);
			$('#vt' + docks[i][0]).html(docks[i][1]);

			var team = docks[i][2];
			if (team == "E")
			{
				layerDocksE.getSource().getFeatureById(docks[i][0]).set('visited', docks[i][1]);
				ev++;
			}
			else if (team == "N")
			{
				layerDocksN.getSource().getFeatureById(docks[i][0]).set('visited', docks[i][1]);
				nv++;
			}
			else if (team == "P")
			{
				layerDocksP.getSource().getFeatureById(docks[i][0]).set('visited', docks[i][1]);
				pv++;
			}
			else if (team == "S")
			{
				layerDocksS.getSource().getFeatureById(docks[i][0]).set('visited', docks[i][1]);
				sv++;
			}
			else if (team == "W")
			{
				layerDocksW.getSource().getFeatureById(docks[i][0]).set('visited', docks[i][1]);
				wv++;
			}
		}	
		$('#sbE').html(ev);	
		$('#sbN').html(nv);	
		$('#sbP').html(pv);	
		$('#sbS').html(sv);	
		$('#sbW').html(wv);	
	}});
}

function filter()
{
	var id = document.getElementById('segmentchooser').value;
	if (id == 'All Stages')
	{
		window.location.hash = '';
	}
	else
	{
		window.location.hash = id;
	}
	
	var features = [];
	var features2 = features.concat(layerDocksE.getSource().getFeatures());
	var features3 = features2.concat(layerDocksS.getSource().getFeatures());
	var features4 = features3.concat(layerDocksP.getSource().getFeatures());
	var features5 = features4.concat(layerDocksN.getSource().getFeatures());
	var features = features5.concat(layerDocksW.getSource().getFeatures());

	for (var i in features)
	{
		 var feature = features[i];
		 var fid = feature.get('name').substring(0, 2);
		 if (id == 'All Stages' || fid == id || (feature.get('cmt') != null && feature.get('cmt').substring(0, 2) == id))
		 {
			feature.setStyle(null);
			if (fid == id)
			{
				olMap.getView().fit(feature.getGeometry(), { 'padding': [20, 20, 20, 20]});
			}
		 } 
		 else
		 {
			feature.setStyle(new ol.style.Style({})); 
		 }
	}
}

var selectitems = [];

function populateSelect(source)
{
	var features = source.getFeatures();
	for (var i in features)
	{
		var feature = features[i];
		if (feature.getGeometry().getType() == 'MultiLineString' || feature.getGeometry().getType() == 'LineString')
		{
			selectitems.push(feature.get('name') + " (" + (0.1*Math.round(0.01*feature.get('desc'))).toFixed(1) + "km, " + feature.get('src') + " docks)");
		}
		else
		{
			feature.setId('' + feature.get('src'));
		}
	}
	
	if (selectitems.length > 30)
	{
		selectitems.sort();
		var select = document.getElementById('segmentchooser');
		for (var i in selectitems)
		{
			var opt = document.createElement('option');
			opt.value = selectitems[i].substring(0, 2);
			opt.innerHTML =  selectitems[i];
			select.appendChild(opt);			
		}
		initComplete();
	}	
}

function initComplete()
{
	getVisited();
	setInterval(getVisited, 1000*60*5);
	
	var hash = window.location.hash.substring(1);

	if (hash != '')
	{
		document.getElementById('segmentchooser').value = hash;
		filter();
	}
}

var layerDocksE;
var layerDocksS;
var layerDocksW;
var layerDocksP;
var layerDocksN;

function init()
{
	var initialZoom = 14;
	var initialLat = 51.514;
	var initialLon = -0.122;

	var sourceDocksE = new ol.source.Vector({
			url: 'https://raw.githubusercontent.com/oobrien/allthedocks/main/allthedocks_E.gpx',
			format: new ol.format.GPX()
	});	
	sourceDocksE.on('featuresloadend', function()
	{
		populateSelect(sourceDocksE);
	});
	layerDocksE = new ol.layer.VectorImage({
		source: sourceDocksE,
	  	style: gpxStyle
	});
	
	var sourceDocksN = new ol.source.Vector({
			url: 'https://raw.githubusercontent.com/oobrien/allthedocks/main/allthedocks_N.gpx',
			format: new ol.format.GPX()
	});	
	sourceDocksN.on('featuresloadend', function()
	{
		populateSelect(sourceDocksN);
	});
	layerDocksN = new ol.layer.VectorImage({
		source: sourceDocksN,
	  	style: gpxStyle
	});

	var sourceDocksP = new ol.source.Vector({
			url: 'https://raw.githubusercontent.com/oobrien/allthedocks/main/allthedocks_P.gpx',
			format: new ol.format.GPX()
	});	
	sourceDocksP.on('featuresloadend', function()
	{
		populateSelect(sourceDocksP);
	});
	layerDocksP = new ol.layer.VectorImage({
		source: sourceDocksP,
	  	style: gpxStyle
	});
	
	var sourceDocksS = new ol.source.Vector({
			url: 'https://raw.githubusercontent.com/oobrien/allthedocks/main/allthedocks_S.gpx',
			format: new ol.format.GPX()
	});	
	sourceDocksS.on('featuresloadend', function()
	{
		populateSelect(sourceDocksS);
	});
    layerDocksS = new ol.layer.VectorImage({
		source: sourceDocksS,
	  	style: gpxStyle
	});

	var sourceDocksW = new ol.source.Vector({
			url: 'https://raw.githubusercontent.com/oobrien/allthedocks/main/allthedocks_W.gpx',
			format: new ol.format.GPX()
	});	
	sourceDocksW.on('featuresloadend', function()
	{
		populateSelect(sourceDocksW);
	});
	layerDocksW = new ol.layer.VectorImage({
		source: sourceDocksW,
	  	style: gpxStyle
	});

	var layerBackground = new ol.layer.Tile({
	   source: new ol.source.OSM()
	});

	const sourceLocation = new ol.source.Vector();
	const layerLocation = new ol.layer.Vector({
	  source: sourceLocation,
	  style: new ol.style.Style({
			image: new ol.style.Circle({			
				radius: 7,
				fill: new ol.style.Fill({ color: 'rgba(255,255,255,0.5)' }),
				stroke: new ol.style.Stroke({ 
					color: 'rgba(0,128,255,0.7)', 
					width: 5})
			})
		})
	});      
      
	olMap = new ol.Map({
		target: "mapcontainer",
		layers: [ layerBackground, layerDocksE, layerDocksN, layerDocksP, layerDocksS, layerDocksW, layerLocation ],
		controls: ol.control.defaults.defaults({}).extend([
			new ol.control.ScaleLine({geodesic: true, units: 'metric' })
		]),
		view: new ol.View({
			projection: "EPSG:3857",
			maxZoom: 19,
			minZoom: 12, 
			zoom: initialZoom,
			center: ol.proj.transform([initialLon, initialLat], "EPSG:4326", "EPSG:3857"),
			//enableRotation: false
		})
	});
	
	//0 = off
	//1 = starting
	//2 = operating and zoomed
	
	let geolocation = 0;
	let geolocationHandlerId = 0
	function switchOnGeolocation()
	{
	   geolocation = 1;
		geolocationHandlerId = navigator.geolocation.watchPosition(function(pos) {
		  sourceLocation.clear(true);
		  sourceLocation.addFeature(
			new ol.Feature(new ol.geom.Point(ol.proj.fromLonLat([pos.coords.longitude, pos.coords.latitude]))));
		  if (geolocation == 1 || geolocation == 2)
		  {
		  	geolocation = 2;
			olMap.getView().fit(sourceLocation.getExtent(), {
			  maxZoom: 16,
			  duration: 500
			});
		  }
		}, function(error) {
		  alert(`ERROR: ${error.message}`);
		}, {
		  enableHighAccuracy: true
		});	
	}

	const locate = document.createElement('div');
	locate.className = 'ol-control ol-unselectable locate';
	locate.innerHTML = '<button title="Locate me">◎</button>';
	locate.addEventListener('click', function() {
	  if (geolocation == 0)
	  {
	  	switchOnGeolocation();
	  }
	  if (geolocation == 2)
	  {
	  	navigator.geolocation.clearWatch(geolocationHandlerId);
		sourceLocation.clear(true);
	  	geolocation = 0;
	  }
	});
	olMap.addControl(new ol.control.Control({
	  element: locate
	}));	
	
	for (var i in scoreColours) 
	{
		$('#sbt' + i).css('color', scoreColours[i]);
		$('#lt' + i).css('color', scoreColours[i]);
	}	
}

$(document).ready(function()
{
	init();
});
