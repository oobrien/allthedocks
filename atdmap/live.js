function initComplete()
{
	$.ajax({url: 'getall.php', method: 'GET', dataType:'json', async: true, success: function(data) 
	{ 
		var docks = data['result'];

		var w = [];
		var s = [];
		var e = [];

		for (var i in docks)
		{
			var team = (docks[i][5][0]);
			if (team == "W") 
			{ 
					w.push("<div><div class='cb'><label><input type='checkbox' id='cb" + docks[i][0] + "' onchange='saveedit(" + docks[i][0] + ")' />" + docks[i][4] + "</label>&nbsp;<span id='vt" + docks[i][0] +  "'></span></div></div>");
			}
			if (team == "S") 
			{ 
					s.push("<div><div class='cb'><label><input type='checkbox' id='cb" + docks[i][0] + "' onchange='saveedit(" + docks[i][0] + ")' />" + docks[i][4] + "</label>&nbsp;<span id='vt" + docks[i][0] +  "'></span></div></div>");
			}
			if (team == "E") 
			{ 
					e.push("<div><div class='cb'><label><input type='checkbox' id='cb" + docks[i][0] + "' onchange='saveedit(" + docks[i][0] + ")' />" + docks[i][4] + "</label>&nbsp;<span id='vt" + docks[i][0] +  "'></span></div></div>");
			}
		}	
 		document.getElementById('westlist').innerHTML = w.join("");
		document.getElementById('southlist').innerHTML = s.join("");
		document.getElementById('eastlist').innerHTML = e.join("");	 	
		getVisited();

	}})		
	setInterval(getVisited, 1000*60*1);
}

function saveedit(tfl_id)
{
	var element = $('#cb' + tfl_id);
	$('#vt' + tfl_id).html('');
	
	var checked = $('#cb' + tfl_id).prop('checked');
	
	$.ajax({
		url: 'saveedit.php',
		method: 'POST',
		data: { 'tfl_id': tfl_id, 'visited': (checked ? 1 : 0) },
		async: true,
		dataType: 'json',
		success: function(data) {
			getVisited();
		},
		error: function() {
		}
	}); 
}
