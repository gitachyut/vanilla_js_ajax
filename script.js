document.getElementById('uploadform').addEventListener('submit',function(e){
  e.preventDefault()
  var form = e.target
  var formData = new FormData(form)
  var xml = new XMLHttpRequest()
  var files = document.getElementById("upload").files
  var pbar = document.getElementById("prog")
  xml.open("POST","http://localhost:8000/a.php")
  xml.upload.addEventListener('progress', function(e){
      let up = e.loaded/e.total;
      pbar.value = Math.ceil(up*100);
  }, false);
  xml.onloadend = function(){
    if(this.status == 200  ){
      pbar.value = 0
    }
    var str = '<br>';
    for(file of files){
      str  = str + '<li>'+file.name+'</li>'
    }
    form.reset()
    document.getElementById("status").innerHTML = "Uploaded Files :-"+str
  }
  formData.append("file", files);
  xml.send(formData)
})
