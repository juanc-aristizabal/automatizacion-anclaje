<?php

   header('Access-Control-Allow-Origin: *');
   header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");
   header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE');

   $urlfile = $_REQUEST["url"];
   $data    = file_get_contents($urlfile);
   echo $data;

?>