

function readFile(){ 

    let inputFile = document.getElementById('input');
    let file   = inputFile.files[0];
    
    let reader = new FileReader();
        reader.readAsArrayBuffer(file);

        reader.onload = function(event){
            blob = new Blob([event.target.result], {type: file.type});
            blob.text().then(text => {
                 anchor.data = text;
                 anchor.name = file.name;               
                 
                 console.log(file.name);
                   
              });
        }

    /*
    
     reader.onload = function(event){
       console.log('error de lectura de archivo...');
      // console.log(event.target.error.name);        
     }

    */
}




