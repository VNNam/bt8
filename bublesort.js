const bubleSort = (list, cb = (a, b) => a > b) => {
  let arr = Array.from(list);
  for (let i = 0; i < arr.length; i++) {
    for (let j = i + 1; j < arr.length; j++) {
      ((condition) => {
        if (condition) {
          let temp = arr[i];
          arr[i] = arr[j];
          arr[j] = temp;
        }
      })(cb(arr[j], arr[i]));
    }
  }
  console.log('unsorted list: ', list);
  console.log('sorted list: ', arr);
};
console.log('ascending order:');
bubleSort(
  [9, 6, 10, 2, 5, 3, 8, 6, 4, 6, 0, 1, 2, 3, 4, 7, 6, 4, 3],
  (a, b) => a < b
);
console.log('descending order:');
bubleSort(
  [9, 6, 10, 2, 5, 3, 8, 6, 4, 6, 0, 1, 2, 3, 4, 7, 6, 4, 3],
  (a, b) => a > b
);
