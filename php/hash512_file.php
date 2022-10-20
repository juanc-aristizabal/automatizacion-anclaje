<?php
// $file  = file_get_contents("../original/shared-params.xml");
   $data    = file_get_contents("php://input");
   $hash512 = hash('sha512',$data,true);  // $hash512 = hash('sha512',$dec64,true);
   $out64   = base64_encode($hash512);
   echo $out64;
?>
