export const replaceAll = (
  str: string,
  search: string,
  replacement: string,
): string => str.split(search).join(replacement);

export const parse = (str: string): string => {
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
