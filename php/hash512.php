<?php

   $data    = file_get_contents("php://input");
   $dec64   = base64_decode($data);
   $hash512 = hash('sha512',$dec64,true);
   $hash64  = base64_encode($hash512);   
   echo $hash64;

   

?>



