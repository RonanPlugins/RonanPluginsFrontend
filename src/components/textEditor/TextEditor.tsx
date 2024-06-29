import { useRef } from "react";
import { Editor } from "@tinymce/tinymce-react";
import { useTheme } from "@/context/ThemeContext";

export function TextEditor({
  onChange = () => {},
  content = "",
}: {
  onChange?: React.Dispatch<React.SetStateAction<string | null>>;
  content?: string | null;
}) {
  const editorRef = useRef<Editor>(null);
  // const { theme } = useTheme();
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
      "importcss",
    ],
    toolbar:
      "undo redo | blocks | " +
      "bold italic forecolor | alignleft aligncenter " +
      "alignright alignjustify | bullist numlist outdent indent | " +
      "removeformat",
    ...theme,
  };

  // useEffect(() => {
  //   if (editorRef.current) {
  //     editorRef.current.destroy();
  //     editorRef.current.init(initOptions);
  //   }
  // }, [theme]);

  return (
    <>
      <Editor
        key={modeTheme}
        tinymceScriptSrc="/tinymce/tinymce.min.js"
        licenseKey="gpl"
        onInit={(_evt, editor) => (editorRef.current = editor)}
        initialValue={content || ""}
        onChange={() => {
          if (editorRef.current) {
            onChange(editorRef.current.getContent());
          }
        }}
        init={initOptions}
        // init={{
        //   toolbar_sticky: true,
        //   promotion: false, //Removes (Upgrade) button
        //   branding: false, //Removes (built with) button
        //   min_height: 500,
        //   max_height: 2000,
        //   menubar: "edit insert table",
        //   plugins: [
        //     "advlist",
        //     "autolink",
        //     "lists",
        //     "link",
        //     "image",
        //     "charmap",
        //     "anchor",
        //     "searchreplace",
        //     "visualblocks",
        //     "code",
        //     "fullscreen",
        //     "insertdatetime",
        //     "media",
        //     "table",
        //     "wordcount",
        //     "autoresize",
        //     "importcss",
        //   ],
        //   toolbar:
        //     "undo redo | blocks | " +
        //     "bold italic forecolor | alignleft aligncenter " +
        //     "alignright alignjustify | bullist numlist outdent indent | " +
        //     "removeformat",
        //   content_css: [
        //     "/textEditor.css",
        //     theme === "dark" ? "dark" : "default",
        //   ], //Located in public/textEditor.css
        //   // importcss_append: true,
        //   // setup: function (editor) {
        //   //   editor.on("init", function () {
        //   //     editor.getBody().classList.add("prose"); // Example: Apply Tailwind prose class
        //   //   });
        //   // },
        //   // content_style:
        //   //   "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
        // }}
      />
    </>
  );
}
