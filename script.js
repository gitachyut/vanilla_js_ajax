function vanillaJsAjax(type,url,files,fnUploadStatus,fnUploadDone,errors){
    var xml = new XMLHttpRequest()
    xml.open(type,url)
    xml.upload.addEventListener('progress', function(e){
        let uploadingStatus = e.loaded/e.total;
        uploadingStatus =  Math.ceil(uploadingStatus*100);
        fnUploadStatus(uploadingStatus)
    }, false);
    xml.onloadend = function(){
      fnUploadDone(files);
    }
    xml.send(files)
}

document.getElementById('uploadform').addEventListener('submit',function(e){
  e.preventDefault()
  var files = document.getElementById("upload").files
  var pbar = document.getElementById("prog")
  var status = document.getElementById("status")

  vanillaJsAjax("POST","http://localhost:8000/a.php",files,function(res){
    pbar.value = res;
  },function(res){
    let str= '';
    for(file of res){
      str  = str + '<li>'+file.name+'</li>'
    }
    pbar.value = 0;
    status.innerHTML = "Uploaded Files :-<br>"+str
  })


})
