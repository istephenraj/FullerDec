// NOTE: You must replace the client id on the following line.
var clientId = '1004478290140-i7dig89ojdeghfhfc0cd6lc5sv8etipf.apps.googleusercontent.com';
var scopes = 'https://spreadsheets.google.com/feeds';

function init() {
  gapi.auth.authorize(
      {client_id: clientId, scope: scopes, immediate: true},
      handleAuthResult);
}

function handleAuthResult(authResult) {
  var authorizeButton = document.getElementById('authorize-button');
  if (authResult && !authResult.error) {
    authorizeButton.style.visibility = 'hidden';
    makeApiCall();
  } else {
    authorizeButton.style.visibility = '';
    authorizeButton.onclick = handleAuthClick;
  }
}

function handleAuthClick(event) {
  gapi.auth.authorize(
      {client_id: clientId, scope: scopes, immediate: false},
      handleAuthResult);
  return false;
}

function makeApiCall() {
  // Note: The below spreadsheet is "Public on the web" and will work
  // with or without an OAuth token.  For a better test, replace this
  // URL with a private spreadsheet.
  
  
  /*var tqUrl = ''https://docs.google.com/a/fuller.edu/spreadsheets/d/1KTH4a3CEKTdlPrTNSijkikmVKYSFp09ESLa_KnqU9AE/edit?usp=sharing&headers=2&sheet=Summary&tq='' +
      '&tqx=responseHandler:handleTqResponse' +
      '&access_token=' + encodeURIComponent(gapi.auth.getToken().access_token);
*/
  
  //document.write('<script src="' + tqUrl +'" type="text/javascript"></script>');
  document.write('Here again');
  google.charts.load('current', {
		'packages' : [ 'corechart', 'controls', 'table' ]
	});
	// Set a callback to run when the Google Visualization API is loaded.
	google.charts.setOnLoadCallback(drawSheetName);
	google.charts.setOnLoadCallback(drawGraph);
	google.charts.setOnLoadCallback(drawDashboard);
	
function drawDashboard() {
		var queryString = encodeURIComponent('SELECT B, C, D, S  where R > 45');
		var query = new google.visualization.Query(
				'https://docs.google.com/a/fuller.edu/spreadsheets/d/1KTH4a3CEKTdlPrTNSijkikmVKYSFp09ESLa_KnqU9AE/edit?usp=sharing&headers=2&sheet=Summary&tq='
				 https://docs.google.com/a/fuller.edu/spreadsheets/d/1KTH4a3CEKTdlPrTNSijkikmVKYSFp09ESLa_KnqU9AE/edit?usp=sharing
						+ queryString);
		query.send(handleTestQueryResponse);
	}
	function handleTestQueryResponse(response) {
		var testGraph = response.getDataTable();
		if (response.isError()) {
			alert('Error in query: ' + response.getMessage() + ' '
					+ response.getDetailedMessage());
			return;
		}
		var dashboard = new google.visualization.Dashboard(document
				.getElementById('dashboard_div'));
		var donutRangeSlider = new google.visualization.ControlWrapper({
			'controlType' : 'CategoryFilter',
			'containerId' : 'filter_div',
			'options' : {
				'filterColumnLabel' : 'Category',
				"ui": {"label": "Choose Expense Category",
					   "labelStacking": "horizontal"}
			}
		});
		var pieChart = new google.visualization.ChartWrapper({
			'chartType' : 'BarChart',
			'containerId' : 'chart_div1',
			'options' : {
				title : 'Expense Categories',
				chartArea : {
					width : 900,
					height: 1000,
			        bar: {groupWidth: "55%"},
				},
				colors : [ 'green', 'red' ],
				hAxis : {
					title : '$',
					minValue : 0
				},
				vAxis : {
					title : 'Description'
				}
			},
		 'view': {'columns': [0,1,2]}
		});
		dashboard.bind(donutRangeSlider, pieChart);
		dashboard.draw(testGraph);
	}
	
	function drawSheetName() {
		var queryString = encodeURIComponent('SELECT A,B,C, D, E, F, G,H, I, J, K, L , M, N, O, P,Q ');
		var query = new google.visualization.Query(
				'https://docs.google.com/a/fuller.edu/spreadsheets/d/1KTH4a3CEKTdlPrTNSijkikmVKYSFp09ESLa_KnqU9AE/edit?usp=sharing&headers=2&sheet=Summary&tq='
						+ queryString);
		query.send(handleSampleDataQueryResponse);
	}
	function handleSampleDataQueryResponse(response) {
		var data = response.getDataTable();
		if (response.isError()) {
			alert('Error in query: ' + response.getMessage() + ' '
					+ response.getDetailedMessage());
			return;
		}
		var table = new google.visualization.Table(document
				.getElementById('table_div'));
		table.draw(data, {
			showRowNumber : true,
			width : '100%',
			height : '100%'
		});
	}
	function drawGraph() {
		var queryString = encodeURIComponent('SELECT B, C,D where R >= 75');
		var query = new google.visualization.Query(
				'https://docs.google.com/a/fuller.edu/spreadsheets/d/1KTH4a3CEKTdlPrTNSijkikmVKYSFp09ESLa_KnqU9AE/edit?usp=sharing&headers=2&sheet=Summary&tq='
						+ queryString);
		query.send(handleGraphQueryResponse);
	}
	function handleGraphQueryResponse(response) {
		var dataGraph = response.getDataTable();
		if (response.isError()) {
			alert('Error in query: ' + response.getMessage() + ' '
					+ response.getDetailedMessage());
			return;
		}
		var options = {
			title : 'Over Budget',
			chartArea : {
				width : '50%'
			},
			colors : [ '#b0120a', '#ffab91' ],
			hAxis : {
				title : '$$',
				minValue : 0
			},
			vAxis : {
				title : 'Description'
			}
		};
		var chart = new google.visualization.BarChart(document
				.getElementById('chart_div'));
		chart.draw(dataGraph, options);
	}
}

function handleTqResponse(resp) {
  document.write(JSON.stringify(resp));
}
