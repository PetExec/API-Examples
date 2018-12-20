!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8" />
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <title>Get Pet Info</title>
  <meta name="viewport" content="width=device-width, initial-scale=1">
</head>
<body>
  <h1>Get Pet Info</h1>
  <?php 

    // --- REQUIRES GUZZLE --- 
    // http://docs.guzzlephp.org/en/latest/overview.html#installation

    require 'vendor/autoload.php';
    use GuzzleHttp\Client;
    use GuzzleHttp\Psr7;
    use GuzzleHttp\ExceptionRequestException;

    $client = new Client([
      'base_uri' => 'https://secure.petexec.net/api/',
      'timeout' => 2.0,
    ]);

    try {    

      // --- Fill out everything below ---
      $client_id = ''; // Your client id
      $client_secret = ''; // Public apps should not expose client secret
      $username = ''; // Your username
      $password = ''; // Your password

      $petID = ''; // Enter id of pet
      $desiredScope = 'pet_read'; //Enter desired scope/s in space separated list
      // ---------------------------------

      $base64_client = base64_encode($client_id . ':' . $client_secret);

      $params = array(
        'username' => $username,
        'password' => $password,
        'grant_type' => 'password',
        'scope' => $desiredScope,
      );

      $headers = array(
        'Authorization' => 'Basic ' . $base64_client,
      );

      // Retrieve an access token
      $response = $client->post('token', ['form_params' => $params, 'headers' => $headers]);
      $data = json_decode($response->getBody()->__toString(), true);
      $access_token = $data['access_token'];

      // Retrieve pet info
      $custom_endpoint = 'pet/' . $petID;
      $get_response = $client->request('get', $custom_endpoint, ['headers' => ['Authorization' => 'Bearer ' . $access_token]]);
      $body = $get_response->getBody();
      echo $body;
    } catch(RequestException $e) {
      if ($e->hasResponse()) {
        echo Psr7str($e->getResponse());
      }
    }
  ?>
</body>
</html>
