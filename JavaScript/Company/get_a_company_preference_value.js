var baseUrl = 'https://secure.petexec.net/api';
		var access_token = '';//Your access token @see: https://secure.petexec.net/api/apidoc/index.html#api-Authenticate-GetToken
		$('#GetPerference').on('click', GetPerference);
		function GetPerference(e) {
			e.preventDefault();
			var prefName = ''; //Preference nameing convention is uri encode (Ex.Order%20Dashboard%20Notes)
			$.ajax({
				type : 'GET',
				url : baseUrl + '/preference/' + prefName,
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