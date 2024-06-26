import { useRef } from "react";
import { Editor } from "@tinymce/tinymce-react";
import { useTheme } from "@/context/ThemeContext";

export function TextViewer({ content = "" }: { content?: string }) {
  const editorRef = useRef(null);

  const { theme: modeTheme } = useTheme();

  const theme =
    modeTheme === "dark"
      ? {
          skin: "oxide-dark",
          content_css: "dark",
        }
      : {
          skin: "oxide",
          content_css: "default",
        };

  const initOptions = {
    promotion: false, //Removes (Upgrade) button
    branding: false, //Removes (built with) button
    min_height: 500,
    menubar: false,
    statusbar: false,
    toolbar: false,
    plugins: ["autoresize", "importcss"],
    autoresize_overflow_padding: 10,
    content_style: "img {max-width: 100%;}",
    ...theme,
  };

  return (
    <>
      <Editor
        key={modeTheme}
        tinymceScriptSrc="/tinymce/tinymce.min.js"
        licenseKey="gpl"
        onInit={(_evt, editor) => (editorRef.current = editor)}
        initialValue={content}
        disabled={true}
        init={initOptions}
      />
    </>
  );
}
