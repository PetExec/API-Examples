var baseUrl = 'https://beta.petexec.net/api';
		var access_token = '';//Your access token @see: https://beta.petexec.net/api/apidoc/index.html#api-Authenticate-GetToken
		$('#getShot').on('click', getShot);
		function getShot(e) {
			e.preventDefault();
			var shotid = '';
			$.ajax({
				type : 'GET',
				url : baseUrl + '/shot/' + shotid,
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