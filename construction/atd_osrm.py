import csv
import urllib.request, json 
from geojson import Point, Feature, FeatureCollection, dump
features = []

mode = "routed-car" #routed-bike

with open('allthedocks_list.tsv') as csvfile:
	rows = csv.reader(csvfile, delimiter='\t')
	currstage = 'cmt'
	currcoords = ''
	coordslist = []
	for row in rows:
		stage = row[5].split('.')[0]
		if stage == 'cmt':
			continue
		if currstage != stage and currstage != 'cmt':
			coordstr = ';'.join(coordslist)
			print(currstage + ': ' + coordstr)
			with urllib.request.urlopen("https://routing.openstreetmap.de/" + mode + "/trip/v1/driving/" + coordstr + "?overview=full&roundtrip=false&source=first&destination=last&geometries=geojson") as url:
				data = json.load(url)
				geom = data['trips'][0]['geometry']			
				features.append(Feature(geometry=geom, properties={"stage": currstage}))
			coordslist = []
			coordslist.append(currcoords) #Previous stage's last location. 
		currcoords = row[3] + ',' + row[2]
		coordslist.append(currcoords)
		currstage = stage
	#Do the final one		
	coordstr = ';'.join(coordslist)
	print(currstage + ': ' + coordstr)
	with urllib.request.urlopen("https://routing.openstreetmap.de/" + mode + "/trip/v1/driving/" + coordstr + "?overview=full&roundtrip=false&source=first&destination=last&geometries=geojson") as url:
		data = json.load(url)
		geom = data['trips'][0]['geometry']			
		features.append(Feature(geometry=geom, properties={"stage": currstage}))

feature_collection = FeatureCollection(features)
with open('atd2osrm_' + mode + '.geojson', 'w') as f:
   dump(feature_collection, f)
		
