var baseUrl = 'https://beta.petexec.net/api';
		var access_token = '';//Your access token @see: https://beta.petexec.net/api/apidoc/index.html#api-Authenticate-GetToken
		$('#submitbutton').on('click', search_criteria);
		function search_criteria(e) {
			e.preventDefault();
			 var search_info = document.getElementById("form").elements.namedItem("search_criteria").value;
			var page_number = '1'; //page number of search results
			var data_per_page = '30'; //Amount of entires per page
			
			$.ajax({
				type : 'GET',
				url : baseUrl + '/search/owners/' + search_info + '/page/' + page_number + '/data/' + data_per_page,
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