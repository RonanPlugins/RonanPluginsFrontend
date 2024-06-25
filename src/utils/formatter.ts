export function formatToTitleCase(input: any): string {
  if (!input) return "";
  // Convert the input string to lowercase
  const lowerCaseStr = input.toLowerCase();

  // Replace underscores with spaces
  const spacedStr = lowerCaseStr.replace(/_/g, " ");

  // Split the string into words
  const words = spacedStr.split(" ");

  // Capitalize the first letter of each word
  const capitalizedWords = words.map(
    (word: any) => word.charAt(0).toUpperCase() + word.slice(1)
  );

  // Join the words back into a single string
  const formattedStr = capitalizedWords.join(" ");
  return formattedStr;
}
