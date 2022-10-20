<?php

  $header = $_REQUEST["obj"]; 
  $obj = json_decode($header);
  $data = file_get_contents("php://input");
  
    
    createfolder('../V2/'); 
    
    if($obj->folder=="") save('../'.$obj->namefile,$data); 
    else{
          createfolder('../V2/' . $obj->folder);
          save('../V2/' . $obj->folder . '/' . $obj->namefile, $data);
    }

    
    


function save($path,$str){

    $fp = fopen($path,'wb');
    $ok = fwrite($fp,$str);
    fflush($fp);                   // Fuerza a que se escriban los datos pendientes en el buffer
    fclose($fp);    

    if($ok){ 
             chmod($path,0777); 
             echo 'SERVIDOR: Datos guardados correctamente';
    }else{
             echo 'SERVIDOR: Error al cargar datos...'; 
    }
}

function createfolder($folder){

    if(file_exists($folder)==false){
       if(!mkdir($folder, 0777,true)){ echo "ERROR_No se puede crear ". $folder; exit();}
       else                          { chmod($folder,0777); }
    }

}




?>