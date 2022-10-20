
const get_externalfile = (urlfile) =>{

  return new Promise((resolve)=>{
    
  let xmlh = new XMLHttpRequest();
      xmlh.open("POST",'./php/get_externalfile.php?url='+urlfile,true)
      xmlh.send();

      xmlh.onreadystatechange = function() {
          if (xmlh.status === 404){
                                    console.log('file not found... ');
                                    resolve(false);
                                  }
      };
      xmlh.addEventListener("load",function(){
           let text = xmlh.responseText;
          //  console.log(text);
           resolve(text);
      });
 });

}

const send = (obj,data) =>{
    
  let str_obj = JSON.stringify(obj);


  return new Promise((resolve)=>{
    
  let xmlh = new XMLHttpRequest();
      xmlh.open("POST", "./php/loadfile.php?obj="+str_obj,true);
      xmlh.send(data);

      xmlh.onreadystatechange = function(){
      if (xmlh.readyState == 4){
        if(xmlh.status >= 300){
              console.log('No detecta o hay un error archivo php');
              resolve(false);
        }else{          
               let text = xmlh.responseText;
               if(text=='not apply') resolve(false);
               else{
                    resolve(text);
                   }
             }
      }
    }
 });
}

const sendData = (file,data) =>{
    
  return new Promise((resolve)=>{
    
  let xmlh = new XMLHttpRequest();
      xmlh.open("POST", "./php/" + file + ".php",true);
      xmlh.send(data);

      xmlh.onreadystatechange = function(){
      if (xmlh.readyState == 4){
        if(xmlh.status >= 300){
              console.log('No detecta o hay un error archivo php');
              resolve(false);
        }else{          
               let text = xmlh.responseText;
               if(text=='not apply') resolve(false);
               else{
                    resolve(text);
                   }
             }
      }
    }
 });

}

async function savefile(folder,namefile,data){

  let obj= {
            folder:     folder,
            namefile: namefile
           };

  let get = await send(obj,data);
  if(get){
           
           console.log(get);
           return true;
  }else{
    return false;
  } 

}

function hexToascii(hexx){
    var hex = hexx.toString();  // force conversion
    var str = '';
    for (var i = 0; i < hex.length; i += 2) str += String.fromCharCode(parseInt(hex.substr(i, 2), 16));
    return str;
}

function replaceAll(find,replace,str){
    while (str.indexOf(find) > -1) {
        str = str.replace(find, replace);
    }
    return str;
}

function replace_str(str_full,s1,s2,str_new){
    let p1  = str_full.indexOf(s1);
    let p2  = str_full.indexOf(s2) + s2.length;    
    let out = str_full.slice(0,p1) + str_new + str_full.slice(p2,str_full.size);
    return out;
}

function sub_str(str_full,s1,s2){
  let p1  = str_full.indexOf(s1) + s1.length;
  let p2  = str_full.indexOf(s2);    
  return str_full.slice(p1,p2);
}

function edit_parameters(w,data){

  let out = "";
  let sep  = hexToascii('20202020');
  if(w =='kill'){
    let p1 = data.indexOf(sep + "<username");
    let p3 = data.indexOf("</approvedTSA>");
    out = data.slice(0,p1) + data.slice(p3,data.size);
  }

   if(w =='add'){

    // let str_params = "<username></username>" + "\n" + sep + "<password></password>" + sep + "\n" + sep + "<oidPolicy></oidPolicy>" +"\n";
       let p1 = data.indexOf("</approvedTSA>");
       out = data.slice(0,p1) + parametros + data.slice(p1,data.size);    
   }

  return out;
}

function download_file(content,fileName,mimeType){

  var a = document.createElement('a');
  mimeType = mimeType || 'application/octet-stream';

  if (navigator.msSaveBlob) { // IE10
    navigator.msSaveBlob(new Blob([content], {
      type: mimeType
    }), fileName);
  } else if (URL && 'download' in a){ //html5 A[download]
    a.href = URL.createObjectURL(new Blob([content], {
      type: mimeType
    }));
    a.setAttribute('download', fileName);
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  } else {
    location.href = 'data:application/octet-stream,' + encodeURIComponent(content); // only this mime type is supported
  }


}