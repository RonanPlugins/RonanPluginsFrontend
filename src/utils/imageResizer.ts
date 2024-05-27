import Resizer from "react-image-file-resizer";

export const resizeFile = (file: File) =>
  new Promise((resolve) => {
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
