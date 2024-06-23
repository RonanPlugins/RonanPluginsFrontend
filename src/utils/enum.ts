export function getEnumValue<T extends Record<string, string>>(
  enumObj: T,
  str: string | null
): T[keyof T] | undefined {
  if (!str) return undefined;
  const lowerCaseStr = str.toLowerCase();
  for (const key in enumObj) {
    if (Object.prototype.hasOwnProperty.call(enumObj, key)) {
      const enumValue = enumObj[key];
      if (enumValue.toLowerCase() === lowerCaseStr) {
        return enumValue as T[keyof T];
      }
    }
  }
  return undefined;
}

export function enumToArray(T: object) {
  return Object.keys(T).filter((v) => isNaN(Number(v)));
}

export function enumToKeys(T: object) {
  return Object.values(T).filter((v) => isNaN(Number(v)));
}
