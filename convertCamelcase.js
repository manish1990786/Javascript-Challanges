function camelChallange(str) {
  str = str.replace(/[^a-zA-Z]/g, " ");
  newStr = "";

  for (let i = 0; i < str.length; i++) {
    if (str[i - 1] === " " && str[i] !== " ") {
      newStr += str[i].toUpperCase();
    } else {
      newStr += str[i].toLowerCase();
    }
  }
  newStr = newStr.replace(/[^a-zA-Z]/g, "");
  console.log(newStr);
}
camelChallange("cute*lazy 131321dog54545jumps over");





function CamelCase(str) {
  return str
    .toLowerCase()
    .replace(/[^\w]+(.)/g, (ltr) => ltr.toUpperCase())
    .replace(/[^a-zA-Z]/g, '');
}
// keep this function call here 
console.log(CamelCase("cats AND*Dogs-are Awesome"));
console.log(CamelCase("a b c d-e-f%g"));





function ConvertCamelToSnack(str){
  const camelToSnakeCase = str.replace(/[A-Z]/g, letter => `_${letter.toLowerCase()}`);
  return camelToSnakeCase
}
console.log(ConvertCamelToSnack("catsAndDogsAreAwesome"))



