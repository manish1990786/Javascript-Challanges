function LongestWord(sen) { 

  var arr = sen.match(/[a-z]+/gi);

  var sorted = arr.sort(function(a, b) {
    return b.length - a.length;
  });

  return sorted[0];
         
}

LongestWord(readline());


//----------------------------------


function LongestWord(sen) { 
  return sen.match(/w+/g).reduce((item, next) => item.length >= next.length ? item : next);  
}
   
// keep this function call here 
LongestWord(readline());