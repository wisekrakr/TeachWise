export function getAllUserProducts(items, arr, id) {
  items.map(item => (item.user === id ? arr.push(item) : (item = null)));
}

export const times = n => f => {
  let iter = i => {
    if (i === n) return;
    f(i);
    iter(i + 1);
  };
  return iter(0);
};

export const range = (from, to, step = 1) => {
  let i = from;
  const range = [];

  while (i <= to) {
    range.push(i);
    i += step;
  }

  return range;
};
