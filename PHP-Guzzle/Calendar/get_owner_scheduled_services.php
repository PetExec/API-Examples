<?php
require 'vendor/autoload.php';
use GuzzleHttp\Client;
use GuzzleHttp\Psr7;
use GuzzleHttp\Exception\RequestException;

$client = new Client([
   // Base URI is used with relative requests
   'base_uri' => 'https://secure.petexec.net/api/',
   // You can set any number of default request options.
   'timeout'  => 2.0,
]);


try {
   $client_id = "";
   $client_secret = "";

   $base64_client = base64_encode("$client_id:$client_secret");

   $username = "";
   $password = "";

   $params = array(
       'grant_type'    => 'password',
       'username'      => $username,
       'password'      => $password,
       'scope'         => 'calendar_read'//Enter the scopes that you're wanting to request in a space seperated list,
       
   );

   $headers = array(
       'Authorization' => "Basic $base64_client"
   );

    // Send a request to https://secure.petexec.net/api/token
    $response = $client->post('token', ['form_params' => $params, 'headers' => $headers]);
   $data = json_decode($response->getBody()->__toString(), true);
   $access_token = $data['access_token'];

   $start_date = $_POST['start_date'];
   $end_date = $_POST['end_date'];
   $userid= '';
   
   $get_response = $client->request('get', 'calendar/scheduled-service/owner/' . $userid . '/start/' . $start_date . '/end/' . $end_date, ['headers' => ['Authorization' => 'Bearer ' . $access_token]]);
   $body = $get_response->getBody();
   echo $body;
  

} catch(RequestException $e) {
   if ($e->hasResponse()) {
       echo Psr7\str($e->getResponse());
   }
}

?>