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
}

function handleTqResponse(resp) {
  document.write(JSON.stringify(resp));
}
