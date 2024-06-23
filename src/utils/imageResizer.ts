import Resizer from "react-image-file-resizer";

export function resizeFile(file: File) {
  return new Promise((resolve) => {
    Resizer.imageFileResizer(
      file,
      300,
      300,
      "JPEG",
      100,
      0,
      (uri: any) => {
        resolve(uri);
      },
      "file"
    );
  });
}

export function downsizeImage(file: any, callback: any) {
  resizeFile(file).then((newFile) => callback(newFile));
}
