function NumberAddition(str) { 

    var tot = 0;
    
    str = str.replace(/[^0-9]+/g," ").split(" ");
    
    for (var i = 0; i < str.length; i++) {
        tot += Number(str[i]);
    }
  
  return tot;
         
}

console.log(NumberAddition("55mani4sh6"))