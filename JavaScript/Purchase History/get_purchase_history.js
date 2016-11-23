var baseUrl = 'https://beta.petexec.net/api';
		var access_token = '';//Your access token @see: https://beta.petexec.net/api/apidoc/index.html#api-Authenticate-GetToken
		$('#getPurchaseHistory').on('click', getPurchaseHistory);
		function getPurchaseHistory(e) {
			e.preventDefault();
			var ownerid = ''; // Enter your Owner ID

			$.ajax({
				type : 'GET',
				url : baseUrl + '/purchase-history/owner/' + ownerid,
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