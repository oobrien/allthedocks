var olMap;

const lineColours = 
{
	1: 'rgba(255,0,0,0.65)',
	2:  'rgba(255,96,0,0.65)',
	3:  'rgba(192,192,0,0.65)',
	4:  'rgba(0,255,0,0.65)',
	5:  'rgba(0,255,255,0.65)',
	6:  'rgba(0,129,255,0.65)',
	7:  'rgba(0,0,255,0.65)',
	8:  'rgba(128,0,255,0.65)',
	9:  'rgba(255,0,255,0.65)',
	10:  'rgba(255,0,0,0.65)',
	11:  'rgba(255,96,0,0.65)',
	12:  'rgba(192,192,0,0.65)',
}

const pointColours = 
{
	'E': 'rgba(255,0,0,0.6)',
	'W': 'rgba(0,128,0,0.6)',
	'S': 'rgba(0,0,255,0.6)',
}

function gpxStyle(feature, resolution)
{
	var scale = 2;
	if (resolution < 6) { scale = 3; }
	if (resolution < 3) { scale = 4; }
	//	if (feature.getGeometry().getType() == 'LineString') //Route lines are LineStrings
	if (feature.getGeometry().getType() == 'MultiLineString' || feature.getGeometry().getType() == 'LineString'))
	{
		return new ol.style.Style({
       		stroke: new ol.style.Stroke({
      			color: lineColours["" + feature.get('number')],
      			width: 3*scale,
    		})
		});
	}
	else if (feature.getGeometry().getType() == 'Point')
	{
		return new ol.style.Style({
			image: new ol.style.Circle({
			  fill: new ol.style.Fill({
				color: pointColours["" + feature.get('cmt')[0]],
			  }),
			  radius: 4*scale,
			  /* stroke: new ol.style.Stroke({
				color: '#000',
				width: 3, 
			  }),*/
			}),
			text: new ol.style.Text({
				text: feature.get('name'),
				font: '' + 5*scale + 'px Verdana, Arial, sans-serif',
				fill: new ol.style.Fill({ color: 'rgba(255,255,255,1)' }),
				stroke: new ol.style.Stroke({ color: 'rgba(0,0,0,1', width: 2*scale })
			})
		})
	}
}

function init()
{
	var initialZoom = 14;
	var initialLat = 51.514;
	var initialLon = -0.122;

	var layerDocksE = new ol.layer.VectorImage({
		source: new ol.source.Vector({
			url: 'https://raw.githubusercontent.com/oobrien/allthedocks/main/allthedocks_E.gpx',
			format: new ol.format.GPX()
		}),
	  	style: gpxStyle
	});

	var layerDocksS = new ol.layer.VectorImage({
		source: new ol.source.Vector({
			url: 'https://raw.githubusercontent.com/oobrien/allthedocks/main/allthedocks_S.gpx',
			format: new ol.format.GPX()
		}),
	  	style: gpxStyle
	});

	var layerDocksW = new ol.layer.VectorImage({
		source: new ol.source.Vector({
			url: 'https://raw.githubusercontent.com/oobrien/allthedocks/main/allthedocks_W.gpx',
			format: new ol.format.GPX()
		}),
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
		layers: [ layerBackground, layerDocksE, layerDocksS, layerDocksW, layerLocation ],
		controls: ol.control.defaults({}).extend([
			new ol.control.ScaleLine({geodesic: true, units: 'metric' })
		]),
		view: new ol.View({
			projection: "EPSG:3857",
			maxZoom: 18,
			minZoom: 12, 
			zoom: initialZoom,
			center: ol.proj.transform([initialLon, initialLat], "EPSG:4326", "EPSG:3857"),
			enableRotation: false
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
	
}
