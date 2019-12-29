function randomColorFactor() {
  return Math.round(Math.random() * 255);
}

export function randomColor(opacity) {
  return (
    "rgba(" +
    randomColorFactor() +
    "," +
    randomColorFactor() +
    "," +
    randomColorFactor() +
    "," +
    (opacity || ".4") +
    ")"
  );
}
