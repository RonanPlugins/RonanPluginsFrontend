export const toggleFromArray = (arr: any[] | null, value: any) => {
  if (!arr) {
    return [value];
  } else if (arr.includes(value)) {
    // Remove the item if it's in the array
    return arr.filter((item) => item !== value);
  } else {
    // Add the item if it's not in the array
    return [...arr, value];
  }
};
