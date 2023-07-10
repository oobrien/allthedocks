function initComplete()
{
	$.ajax({url: 'getall.php', method: 'GET', dataType:'json', async: true, success: function(data) 
	{ 
		var docks = data['result'];

		var w = [];
		var s = [];
		var e = [];
		var p = [];
		var n = [];

		for (var i in docks)
		{
			var team = (docks[i][5][0]);
			var html = "<div><div class='cb'><label><input class='" + team + "' type='checkbox' id='cb" + docks[i][0] + "' onchange='saveedit(" + docks[i][0] + ", \"" + team + "\")' />" + docks[i][4] + "</label>&nbsp;<span id='vt" + docks[i][0] +  "'></span></div></div>";
			if (team == "W") 
			{ 
					w.push(html);
			}
			if (team == "S") 
			{ 
					s.push(html);
			}
			if (team == "E") 
			{ 
					e.push(html);
			}
			if (team == "P") 
			{ 
					p.push(html);
			}
			if (team == "N") 
			{ 
					n.push(html);
			}
		}	
 		document.getElementById('westlist').innerHTML = w.join("");
		document.getElementById('southlist').innerHTML = s.join("");
		document.getElementById('eastlist').innerHTML = e.join("");	 	
		document.getElementById('putneylist').innerHTML = p.join("");	 	
		document.getElementById('northlist').innerHTML = n.join("");	 	
		getVisited();

	}})		
	setInterval(getVisited, 1000*60*1);
	
	var hash = window.location.hash.substring(1);

	if (hash != '')
	{
		document.getElementById('segmentchooser').value = hash;
		filter();
	}
}

var lockedotherteams = false;
function saveedit(tfl_id, team)
{
	var element = $('#cb' + tfl_id);
	$('#vt' + tfl_id).html('');
	
	if (!lockedotherteams)
	{
		$('input[type=checkbox]').each(function() {
		   if ($(this).attr("class") != team) {
				$(this).prop("disabled", true);
		   }
		});	
		lockedotherteams = true;	
	}

	var checked = $('#cb' + tfl_id).prop('checked');
	if (checked)
	{
			$('#vt' + tfl_id).html('*****');
	}	
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

$(document).ready(function()
{
	initComplete();
});