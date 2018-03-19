function convert(){
  var arraybuffer  = document.getElementById("myFile");
  var data = new Uint8Array(arraybuffer);
  var arr = new Array();
  for(var i = 0; i != data.length; ++i) arr[i] = String.fromCharCode(data[i]);
  var bstr = arr.join("");

  var workbook = XLSX.read(bstr, {type:"binary"});
  //* DO SOMETHING WITH workbook HERE */
  var first_sheet_name = workbook.SheetNames[0];
  /* Get worksheet */
  var worksheet = workbook.Sheets[first_sheet_name];
  console.log(XLSX.utils.sheet_to_json(worksheet,{raw:true}));
}
