function SwapCase(str) { 

  var result = '';

  for (var i = 0; i < str.length; i++) {
    var c = str[i];
    var u = c.toUpperCase();

    result += u === c ? c.toLowerCase() : u;
  }

  return result;
         
}