var baseUrl = 'https://secure.petexec.net/api';
	var access_token = '';//Your access token @see: https://secure.petexec.net/api/apidoc/index.html#api-Authenticate-GetToken
	$('#submitButton').on('click', getGrooming);

	function getGrooming(e) {
		e.preventDefault();
		//Get the start and End Dates
		//In the examples we use a JQuery date picker
		var start_date = document.getElementById("form").elements.namedItem("start_date").value;
		var end_date = document.getElementById("form").elements.namedItem("end_date").value;

		$.ajax({
			type : 'GET',
			url : baseUrl + '/calendar/grooming/start/' + start_date +'/end/' + end_date,
			dataType : 'json',
			headers : {
				'Authorization' : 'Bearer ' + access_token
			},
			success : successCallback,
			error : errorCallback
		});
	}

	function successCallback(data, textStatus, jqXHR) {
		$('#result').html(textStatus + '<br/>' + JSON.stringify(data));
	}

	function errorCallback(jqXHR, textStatus, errorThrown) {
		$('#result').html(JSON.stringify(jqXHR.responseJSON));
	}

