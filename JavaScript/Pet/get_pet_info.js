 var baseUrl = 'https://secure.petexec.net/api';
      var access_token = '9bc96f188e061481d88efef113e8b7c2ec47f39d';//Your access token @see: https://secure.petexec.net/api/apidoc/index.html#api-Authenticate-GetToken
      $('#submitButton').on('click', getPet);
      function getPet(e) {
      	e.preventDefault();
      	var ptid = '';//petid of pet

        $.ajax({
          type: 'GET',
          url: baseUrl + '/pet/' + ptid,
          dataType: 'json',
          headers: {
            'Authorization': 'Bearer ' + access_token
          },
          success: successCallback,
          error: errorCallback
        });
      }

      function successCallback(data, textStatus, jqXHR) {
        $('#result15').html(textStatus + '<br/>' + JSON.stringify(data));
      }

      function errorCallback(jqXHR, textStatus, errorThrown) {
        $('#result15').html(JSON.stringify(jqXHR.responseJSON));
      }