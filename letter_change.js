function LetterChanges(str) { 

  // code goes here  
  var converted = str.replace(/[a-z]/gi, function(char) { 
    return (char === 'z' || char === 'Z') ? 'a' : String.fromCharCode(char.charCodeAt() + 1);
  });
var capitalized = converted.replace(/a|e|i|o|u/gi, function(vowel) { 
    return vowel.toUpperCase();
  });
  return capitalized; 
         
}
   
// keep this function call here 
LetterChanges(readline());