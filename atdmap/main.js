var olMap;

var layerBackground;
var layerSystems;

const style = {
  'Point': new ol.style.Style({
    image: new ol.style.Circle({
      fill: new ol.style.Fill({
        color: 'rgba(255,255,255,0.5)',
      }),
      radius: 7,
      stroke: new ol.style.Stroke({
        color: '#000',
        width: 3,
      }),
    })
  }),
  'LineString': null /*new ol.style.Style({
    stroke: new ol.style.Stroke({
      color: '#f00',
      width: 3,
    }),
  }) */,
  'MultiLineString': new ol.style.Style({
    stroke: new ol.style.Stroke({
      color: 'rgba(0,128,255,0.5)',
      width: 5,
    }),
  }),
};

function gpxStyle(feature, resolution)
{
	var scale = 2;
	if (resolution < 6) { scale = 3; }
	if (resolution < 3) { scale = 4; }
	if (feature.getGeometry().getType() == 'MultiLineString')
	{
		return new ol.style.Style({
       		stroke: new ol.style.Stroke({
      			color: getLineColour(feature.get('number')),
      			width: 3*scale,
    		})
		});
	}
	if (feature.getGeometry().getType() == 'Point')
	{
		return new ol.style.Style({
			image: new ol.style.Circle({
			  fill: new ol.style.Fill({
				color: 'rgba(255,0,0,0.6)',
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

function getLineColour(number)
{
	console.log(number);
	return lineColours["" + number];
}

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



function init()
{
	var initialZoom = 14;
	var initialLat = 51.514;
	var initialLon = -0.122;

	layerSystems = new ol.layer.VectorImage({
		source: new ol.source.Vector({
			url: 'https://raw.githubusercontent.com/oobrien/allthedocks/main/allthedocks_E.gpx',
			format: new ol.format.GPX()
		}),
	  	style: gpxStyle
	});

	layerBackground = new ol.layer.Tile({
	   source: new ol.source.OSM()
	});

	olMap = new ol.Map({
		target: "mapcontainer",
		layers: [ layerBackground, layerSystems ],
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
	
}
