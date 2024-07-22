import { getEnumValueByIndex } from "@/utils/enum";

export function CategoriesToString<T>(obj: T, cats: number[]) {
  console.log(cats);
  const text = cats.map(
    (val, index) =>
      `${index === 0 ? "" : " "}${getEnumValueByIndex(obj, val)}${
        index >= cats.length - 1 ? "" : ", "
      }`
  );
  return <>{text}</>;
}
