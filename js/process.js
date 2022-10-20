   document.getElementById('mnu_1').addEventListener("click",choose_anchor);
   document.getElementById('mnu_2').addEventListener("click",choose_anchor);

   document.getElementById('btn_process').addEventListener("click",process);
// document.getElementById('test').addEventListener("click",test);

let parametros = "";
let COL = 0;

let key = {
            crt:  "",
            hash: "" 
          };

let anchor={
             name:            "",
             data:            "",
             downloadURL:     "",
             verificationCert:""
           }

let externalconf={
                  data:            "",
                  url:             "",
                  old_location:    "",
                  new_location:    "",
                  hash_shareparams:"",
                  signedData:      "",
                  hash_signData:   ""
                 }

let share_params = {                    
                     data:   "",
                     url:    "",
                     folder: ""   
                   };                 


get_key();
get_location();

function choose_anchor(){
    document.getElementById("c-anchor").style.display="block"
    if(this.id=='mnu_1') {COL=0; document.getElementById('id_anchor').innerHTML = 'Colombia Country Anchor';}
    if(this.id=='mnu_2') {COL=1; document.getElementById('id_anchor').innerHTML = 'Foreign Country Anchor';}
}
  
async function get_key(){
       
    let data = await get_externalfile('../data/certs/AND_certificate.crt');
        if(data){
                data    = replaceAll("\n","",data);
                data    = data.replace(/-----BEGIN CERTIFICATE-----/g, '');
                data    = data.replace(/-----END CERTIFICATE-----/g, '');  
                key.crt = data;
             // console.log(key.crt);
                key.crt = "MIIELzCCAxegAwIBAgIUEcvtEL+Yglg1TTtVMg7Ny/YBGOUwDQYJKoZIhvcNAQENBQAwgaYxCzAJBgNVBAYTAkNPMQ8wDQYDVQQIDAZCT0dPVEExDzANBgNVBAcMBkJPR09UQTE5MDcGA1UECgwwQ09SUE9SQUNJT04gQUdFTkNJQSBOQUNJT05BTCBERSBHT0JJRVJOTyBESUdJVEFMMQswCQYDVQQLDAJJVDEMMAoGA1UEAwwDQU5EMR8wHQYJKoZIhvcNAQkBFhB4cm9hZEBhbmQuZ292LmNvMB4XDTIyMDYxODExMzYyOFoXDTIzMDYxODExMzYyOFowgaYxCzAJBgNVBAYTAkNPMQ8wDQYDVQQIDAZCT0dPVEExDzANBgNVBAcMBkJPR09UQTE5MDcGA1UECgwwQ09SUE9SQUNJT04gQUdFTkNJQSBOQUNJT05BTCBERSBHT0JJRVJOTyBESUdJVEFMMQswCQYDVQQLDAJJVDEMMAoGA1UEAwwDQU5EMR8wHQYJKoZIhvcNAQkBFhB4cm9hZEBhbmQuZ292LmNvMIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAwY0+p17Lc0dWBAQFzAZ+zWK7PvBa/9UWtrdV4/sxYdJYwNuZbnnBgRYRykjUDofLNw+/uv1OpgTQeiwyojRyOyFCFxI/Ko2EZn65sxMwuCO/RWv8lKD7/lR+vwk0hkfp2onGLybPCXVZJ8kTGltjlp/OuMRw+F7uNFIemXPDMVOOLDPu0b/wxo5HMjNoIOsceZ6rjZUzSG9HIeJrxJmIAgSgHMgLbdX1FFjom4stY/VYiZ1G9yXTrKioCI4VMLI+P48ipE/7IDwV7ufrPY2RrhU8XTt14AtmZlAbioWZvrI7CfXVDLsEvGPjgJPgGl3KLOjZVu0k57/bcBZahtb9UwIDAQABo1MwUTAdBgNVHQ4EFgQUjmEtESijXs+dcUCwWx2AruWW/s0wHwYDVR0jBBgwFoAUjmEtESijXs+dcUCwWx2AruWW/s0wDwYDVR0TAQH/BAUwAwEB/zANBgkqhkiG9w0BAQ0FAAOCAQEABxPMpc8XfLJIuREBYYVTWRIV4qU1oV8k2zIELqRnveoiQ4WF4ngoo2/DDprMcH6WlfpSdnZg3HXuTobsdJKd8EdBeGpd9aztzmX94bsgJgaxMpfoAEoCky+tiKmPHMLRWZbBg/BDdnUXO7+YdJ8eH9G5bxLevu2eI+nvHJAhe7koRqyq8DU/Zjt1W7esQKUKegdNRysKvCplrf0gzbTG2/NNogjab0nfYX749oriWZMjBh0NjM8wS+7Hi4foo7hcPCQqyyK1GB8oNpc74RQ1XqUR4Y0jTUOk0gPolKD4/jAXxa6zaAAM5rZaitXXryWvrQQ9fE6XhuQJOF4SZNUPWQ=="
                key.hash = await sendData('hash512',key.crt);
                key.hash = key.hash.trim();
                if(key.hash) console.log('HASH_KEY_: ' + key.hash);
        }else{
                console.log('error get AND_certificate.crt');
        }
}

async function get_location(){

    let data = await get_externalfile('../data/url_externalconf');
    if(data){
        externalconf.new_location = 'http://' + data.trim();     //  http://10.0.2.15
        console.log('externalconf.new_location:  ' + externalconf.new_location);         
    }else{
        console.log('error get_location');
    }  
}

async function get_externalconf(){

     externalconf.old_location = sub_str(anchor.data,'<downloadURL>','</downloadURL>');
     externalconf.url          = externalconf.old_location.replace('/externalconf',"");

   //externalconf.data = await get_externalfile('../original/externalconf');
     externalconf.data = await get_externalfile(externalconf.old_location);  
     if(externalconf.data) return true;
     else                  return false;


}

async function get_shareparams(){

      parametros = await get_externalfile('../data/parametros');

      let arr = externalconf.data.split("\n"); 
      share_params.folder = arr[13].replace("Content-location: ","").replace('/V2/',"").replace('/shared-params.xml',"");
      share_params.url    = externalconf.url + '/V2/' + share_params.folder + '/shared-params.xml';  //  'http://10.0.2.15/original/shared-params.xml';
      
      share_params.data = await get_externalfile(share_params.url);
      if(externalconf.data) return true;
      else                   return false;   
    //------------------------------------------------------------------------------------------------------------------
}

async function edit_sharedparams(){

  //------------------------------------------------------------------------------------------------------------------------    
    let edit = share_params.data.indexOf("<username");
    if(edit>0) share_params.data = edit_parameters('kill',share_params.data);
    else       share_params.data = edit_parameters('add',share_params.data);
  //------------------------------------------------------------------------------------------------------------------------
    share_params.hash = await sendData('hash512_file',share_params.data);
    if(share_params.hash){
           console.log("share_params.hash");
           console.log(share_params.hash);
    }else{
           console.log('error al genrear hash shared-params...');
    }   
  //------------------------------------------------------------------------------------------------------------------------

}

async function edit_externalconf(){
 
  let arr     = externalconf.data.split("\n");
      arr[6]  = "Expire-date: 2022-12-18T01:20:01Z";
      arr[16] = share_params.hash;
      arr[22] = "Verification-certificate-hash: " + key.hash + '; hash-algorithm-id="http://www.w3.org/2001/04/xmlenc#sha512"';
        
  let signedData = "";
  for(let i=5; i <= 17; i++)  signedData += arr[i] + "\n";
  signedData = signedData.trim();                     

  let signature = await sendData('signSSL',signedData);
  if(signature){
                 arr[24] = signature;
                 externalconf.data = "";
                 for (let i=0; i<arr.length; i++) externalconf.data += arr[i] + "\n";
               }

        console.log(externalconf.data);

}

async function edit_new_anchor(){

      let name_file = "";
      if(COL==0) name_file = "externalconfCOL";
      if(COL==1) name_file = "externalconf";
      
      let str   = externalconf.new_location + '/' + name_file;
      let line1 = "<downloadURL>" + str + "</downloadURL>";
      anchor.data = replace_str(anchor.data,'<downloadURL>','</downloadURL>',line1);
    
      let line2 =  "<verificationCert>" + key.crt + "</verificationCert>";
      anchor.data = replace_str(anchor.data,"<verificationCert>","</verificationCert>",line2);
  //----------------------------------------------------------------------------------------
      let new_name_ancla = "_" + anchor.name;
      download_file(anchor.data , new_name_ancla, 'text/xml;encoding:utf-8');
    //download_file(share_params.data , 'shared-params.xml', 'text/xml;encoding:utf-8');
    //download_file(externalconf.data , 'externalconfCOL', 'encoding:utf-8');

      savefile("",name_file,externalconf.data);
      savefile(share_params.folder,"shared-params.xml",share_params.data);
  //----------------------------------------------------------------------------------------

}

async function process(){


  let get1 = await get_externalconf();
  let get2 = await get_shareparams();  

  let get4 = await edit_sharedparams();
  let get5 = await edit_externalconf();
  let get6 = await edit_new_anchor();


/*  
  let obj ={
              anchor:       anchor.data,
              externalconf: externalconf.data,
              share_params: share_params.data
           }
  console.log(obj);
*/

}
