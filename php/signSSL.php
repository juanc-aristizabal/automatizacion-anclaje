<?php
    $data   = file_get_contents("php://input");
    $p_key  = file_get_contents("./AND_private.key");
    $binary_signature = "";
    $ok     = openssl_sign($data, $binary_signature, $p_key, "sha512");
    $base64 = base64_encode( $binary_signature );
    echo $base64;
?>
