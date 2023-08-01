function Palindrome(str) { 

  str = str.replace(/ /g,"").toLowerCase();
  var compareStr = str.split("").reverse().join("");

  if (compareStr === str) {
    return true;
  } 
  else {
    return false;
  } 

}