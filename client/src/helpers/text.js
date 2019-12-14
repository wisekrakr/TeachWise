export function textTruncate(str, length, ending) {
  if (length == null) {
    length = 100;
  }
  if (ending == null) {
    ending = "...";
  }
  if (str.length > length) {
    return str.substring(0, length - ending.length) + ending;
  } else {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }
}

export function textTrimmer(str) {
  return str !== undefined ? str.trim().split(" ")[0] : str;
}
