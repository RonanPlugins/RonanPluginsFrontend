import { useState } from "react";
import { Tiptap } from "./Tiptap";

export default function TextEditorHeader() {
  const [content, setContent] = useState<string>("");
  const handleContentChange = (reason: any) => {
    setContent(reason);
  };
  const handleSubmit = (e: any) => {
    e.preventDefault();
    console.log("Post Data...", JSON.stringify(content));
    // const data = {
    //   content: content,
    // };
    // console.log(data);
    // const existingDataString = localStorage.getItem("myData");
    // const existingData = existingDataString
    //   ? JSON.parse(existingDataString)
    //   : [];
    // const updatedData = [...existingData, data];
    // localStorage.setItem("myData", JSON.stringify(updatedData));
    setContent("");
  };
  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-5xl w-full grid place-items-center mx-auto my-2"
    >
      <Tiptap
        content={content}
        onChange={(newContent: string) => handleContentChange(newContent)}
      />
    </form>
  );
}
