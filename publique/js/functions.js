function showalarms(id){
  var divElement = document.getElementById(id);
  var str = id.substring(0,id.length-2);
  var str2 = id.substring(id.length-2,id.length);


  if(str2=='Up'){
    var str = id.substring(0,id.length-2);
    str += "Down";
  }
  else{
  var str = id.substring(0,id.length-4);
  str += "Up";
  }

  var divElementToHide = document.getElementById(str)
  if(divElement.style.display=="none"){
    divElement.style.display="block";
    divElementToHide.style.display="none"
  }
  else{
    divElement.style.display="none";
  }
}


function showDetail(id){
let div = document.getElementById(id);
if(div.style.display=="none"){
  div.style.display=""
}
else{
  div.style.display="none"
}
}

//
// function test(){
//   http.post("/authorisation").setheader(token).then(if(true){window.location('/manage/ajouter ville')} else { console.log('access not granted');} )
// }
