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

export function getEnumIndexByKey(enumType: any, value: string): number {
  // Get an array of the enum keys
  const enumKeys = Object.keys(enumType).filter((key) => !isNaN(Number(key)));
  // Find the key that matches the value
  const matchingKey = enumKeys.find((key) => enumType[key] === value);
  // Return the index of the matching key in the enum keys array
  return enumKeys.indexOf(matchingKey as string);
}

export function getEnumIndex(enumType: any, value: any): number | null {
  const values = Object.keys(enumType);
  console.log(values, value);
  return values.indexOf(value) || null;
}

export function getEnumIndexByValue(enumType: any, value: string): number {
  // Get the keys of the enum
  const enumKeys = Object.values(enumType).filter((key) => !isNaN(Number(key)));
  // Return the index of the value in the keys array
  // console.log(enumKeys);
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

export const stringArrayToEnumIndexArray = <T extends Record<string, string>>(
  enumType: T,
  stringArray: string[] | null
): number[] => {
  if (!stringArray) return [];
  return stringArray.map((str) => {
    const enumIndex = Object.keys(enumType).findIndex(
      (key) => enumType[key as keyof T] === str
    );
    if (enumIndex === -1) {
      throw new Error(`Invalid enum value: ${str}`);
    }
    return enumIndex;
  });
};

// Function to get the string value of an enum based on its index
export function getEnumValueByIndex<T>(
  enumObj: T,
  index: number
): string | undefined {
  const values = Object.values(enumObj);
  if (index >= 0 && index < values.length) {
    return values[index] as string;
  }
  return undefined;
}

export function getEnumKeyByIndex<T>(
  enumObj: T,
  index: number
): T[keyof T] | undefined {
  const values = Object.values(enumObj) as T[keyof T][];
  return values[index];
}
