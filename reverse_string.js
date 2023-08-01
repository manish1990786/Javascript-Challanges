function FirstReverse(string) {
  return string.split('').reverse().join('');
}
   
// keep this function call here 
FirstReverse(readline());

//--------------------------


function FirstReverse(str) { 
  var temp = '';
  for (var i = 0; i<str.length; i++) {
      temp = str[i] + temp;
  }
  // code goes here  
  return temp; 
         
}
   
// keep this function call here 
FirstReverse(readline());

//--------------------------------------


function FirstReverse(str) { 
var tomatoes = [];
for (i = str.length - 1; i > -1; i--){
  tomatoes.push(str[i]);
}
str = tomatoes.join("");
 
  return str; 
         
}
   
// keep this function call here 
FirstReverse(readline());