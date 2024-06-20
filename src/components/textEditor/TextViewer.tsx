import { useRef } from "react";
import { Editor } from "@tinymce/tinymce-react";

export function TextViewer({ content = "" }: { content?: string }) {
  const editorRef = useRef(null);
  const contentStyle = `
    body {
      font-family:Helvetica,Arial,sans-serif;
      font-size:14px;
    }
  `;
  return (
    <>
      <Editor
        tinymceScriptSrc="/tinymce/tinymce.min.js"
        licenseKey="gpl"
        onInit={(_evt, editor) => (editorRef.current = editor)}
        initialValue={content}
        disabled={true}
        init={{
          promotion: false, //Removes (Upgrade) button
          branding: false, //Removes (built with) button
          min_height: 500,
          menubar: false,
          statusbar: false,
          toolbar: false,
          plugins: ["autoresize"],
          content_css: "style.css",
          // content_style: contentStyle,
          autoresize_overflow_padding: 10,
        }}
      />
    </>
  );
}
