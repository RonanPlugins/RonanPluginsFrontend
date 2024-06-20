import { useRef } from "react";
import { Editor } from "@tinymce/tinymce-react";

export function TextEditor({
  onChange = () => {},
  content = "",
}: {
  onChange?: any;
  content?: string;
}) {
  const editorRef = useRef(null);
  //   const log = () => {
  //     if (editorRef.current) {
  //       console.log(editorRef.current.getContent());
  //     }
  //   };
  return (
    <>
      <Editor
        tinymceScriptSrc="/tinymce/tinymce.min.js"
        licenseKey="gpl"
        onInit={(_evt, editor) => (editorRef.current = editor)}
        initialValue={content}
        onChange={onChange}
        init={{
          toolbar_sticky: true,
          promotion: false, //Removes (Upgrade) button
          branding: false, //Removes (built with) button
          min_height: 500,
          max_height: 2000,
          menubar: "edit insert table",
          plugins: [
            "advlist",
            "autolink",
            "lists",
            "link",
            "image",
            "charmap",
            "anchor",
            "searchreplace",
            "visualblocks",
            "code",
            "fullscreen",
            "insertdatetime",
            "media",
            "table",
            "wordcount",
            "autoresize",
          ],
          toolbar:
            "undo redo | blocks | " +
            "bold italic forecolor | alignleft aligncenter " +
            "alignright alignjustify | bullist numlist outdent indent | " +
            "removeformat",
          content_style:
            "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
        }}
      />
    </>
  );
}
