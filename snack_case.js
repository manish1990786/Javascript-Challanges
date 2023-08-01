const snakeCase = string => {
    return string.replace(/\W+/g, " ")
      .split(/\s|\B(?=[A-Z])/)
      .map(word => word.toLowerCase())
      .join('_');
};

console.log(snakeCase('snakeCase %%% manish'));