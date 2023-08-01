function VowelCount(str) { 

  var vowelArr = ["a","e","i","o","u"];
  var tot = 0;

  for (var i = 0; i < vowelArr.length; i++) {
    for (var j = 0; j < str.length; j++) {
        if (str[j] === vowelArr[i]) {
            tot++;
        }
    }
  }
  return tot;
         
}