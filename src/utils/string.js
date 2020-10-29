export const replaceAll = (str, search, replacement) => {
  return str.split(search).join(replacement);
};

export const parse = (str) => {
  const replacement = [
    ['{', '\\{'],
    ['}', '\\}'],
    ['(', '\\('],
    [')', '\\)'],
    ['*', '\\*'],
    ['^', '\\^'],
    ['+', '\\+'],
    ['-', '\\-'],
    ['%', '\\%'],
  ];
  let result = str;
  replacement.forEach(([a, b]) => {
    result = replaceAll(result, a, b);
  });
  return result;
};
