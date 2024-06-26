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

export function castStringToEnum<T>(
  enumType: T,
  value: string
): T[keyof T] | null {
  const enumValues = Object.values(enumType);
  if (enumValues.includes(value as T[keyof T])) {
    return value as T[keyof T];
  }
  return null;
}

export function getEnumIndexByKey(enumType: any, value: number): number {
  // Get an array of the enum keys
  const enumKeys = Object.keys(enumType).filter((key) => !isNaN(Number(key)));
  // Find the key that matches the value
  const matchingKey = enumKeys.find((key) => enumType[key] === value);
  // Return the index of the matching key in the enum keys array
  return enumKeys.indexOf(matchingKey as string);
}

export function getEnumIndexByValue(enumType: any, value: string): number {
  // Get the keys of the enum
  const enumKeys = Object.values(enumType).filter((key) => !isNaN(Number(key)));
  // Return the index of the value in the keys array
  console.log(enumKeys);
  return enumKeys.indexOf(value);
}

export function getEnumIndexByValue2(enumType: any, value: string): number {
  // Get an array of the enum keys
  const enumKeys = Object.keys(enumType).filter((key) => !isNaN(Number(key)));
  // Find the key that matches the value
  const matchingKey = enumKeys.find((key) => enumType[key] === value);
  // Return the index of the matching key in the enum keys array
  return enumKeys.indexOf(matchingKey as string);
}
