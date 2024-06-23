import { resizeFile } from "./imageResizer";

const MAX_FILE_SIZE = 5000000;
const ACCEPTED_IMAGE_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
];

export function validateImage(image: File | null): string | null {
  if (!image) {
    return "Please select a resource image!";
  } else {
    if (!(image.size <= MAX_FILE_SIZE)) {
      return `Max file size exceeded (${(image.size / 1000000).toFixed(
        2
      )}MB / 5MB)`;
    } else {
      if (!ACCEPTED_IMAGE_TYPES.includes(image.type)) {
        return "Only .jpg, .jpeg, .png and .webp formats are supported";
      }
    }
  }
  return null;
}

const MAX_JAR_SIZE = 50000000;
const ACCEPTED_JAR_TYPES = [".jar", ".zip"];

export function validateJar(jar: File | null): string | null {
  if (!jar) {
    return "Please select a file";
  } else {
    if (!(jar.size <= MAX_JAR_SIZE)) {
      return `Max file size exceeded (${(jar.size / 1000000).toFixed(
        2
      )}MB / 50MB)`;
    } else {
      for (const type of ACCEPTED_JAR_TYPES) {
        if (jar.name.endsWith(type)) return null;
      }
      return "Only .zip, .jar formats are supported";
    }
  }
}
