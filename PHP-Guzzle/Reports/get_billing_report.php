<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8" />
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <title>Get Billing Report</title>
  <meta name="viewport" content="width=device-width, initial-scale=1">
</head>
<body>
  <h1>Get Billing Report</h1>
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
      $client_id = ''; // Enter your client id
      $client_secret = ''; // Public apps should not expose client secret

      $base64_client = base64_encode($client_id . ':' . $client_secret);

      $username = ''; // Enter your username
      $password = ''; // Enter your password

      $startDate = ''; // yyyy-mm-dd
      $endDate = ''; // yyyy-mm-dd
      $payType = ''; // All Types, Cash, Check, Credit, Clover Mini, Gift Certificate, No Payment, Paw Point Redemption, Refund, Tradeout, Unprocessed
      $ownerPortal = ''; // yes, no

      $params = array(
        'username' => $username,
        'password' => $password,
        'grant_type' => 'password',
        'scope' => 'report_read' // Enter desired scopes in space separated list
      );

      $headers = array(
        'Authorization' => 'Basic ' . $base64_client,
      );

      // Retrieve an access token
      $response = $client->post('token', ['form_params' => $params, 'headers' => $headers]);
      $data = json_decode($response->getBody()->__toString(), true);
      $access_token = $data['access_token'];

      // Retrieve billing report
      $custom_endpoint = 'report/billing-report/' . $startDate . '/' . $endDate . '/' . $payType . '/' . $ownerPortal;
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