      var baseUrl = 'https://beta.petexec.net/api';
      var access_token = '';//Your access token @see: https://beta.petexec.net/api/apidoc/index.html#api-Authenticate-GetToken
      $('#submitButton').on('click', getVet);
      function getVet(e) {
      	e.preventDefault();

        $.ajax({
          type: 'GET',
          url: baseUrl + '/vet/',
          dataType: 'json',
          headers: {
            'Authorization': 'Bearer ' + access_token
          },
          success: successCallback,
          error: errorCallback
        });
      }

      function successCallback(data, textStatus, jqXHR) {
        $('#result').html(textStatus + '<br/>' + JSON.stringify(data));
      }

      function errorCallback(jqXHR, textStatus, errorThrown) {
        $('#result').html(JSON.stringify(jqXHR.responseJSON));
      }