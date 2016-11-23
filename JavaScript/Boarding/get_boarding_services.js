		var baseUrl = 'https://secure.petexec.net/api';
		var access_token = '';//Your access token @see: https://secure.petexec.net/api/apidoc/index.html#api-Authenticate-GetToken
		$('#submitButton').on('click', getBoardingServices);
		function getBoardingServices(e) {
			e.preventDefault();
			
			$.ajax({
				type : 'GET',
				url : baseUrl + '/boarding/services',
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