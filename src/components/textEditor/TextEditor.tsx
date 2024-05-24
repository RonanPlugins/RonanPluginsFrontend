import { Color } from "@tiptap/extension-color";
import ListItem from "@tiptap/extension-list-item";
import TextStyle from "@tiptap/extension-text-style";
import { EditorContent, useEditor } from "@tiptap/react";
import Placeholder from "@tiptap/extension-placeholder";
import StarterKit from "@tiptap/starter-kit";
import ToolBar from "./Toolbar";
import("./style.css");

const extensions = [
  Placeholder.configure({
    placeholder: "Your plugins description...",
    showOnlyWhenEditable: false,
  }),
  Color.configure({ types: [TextStyle.name, ListItem.name] }),
  TextStyle.configure({ types: [ListItem.name] }),
  StarterKit.configure({
    bulletList: {
      keepMarks: true,
      keepAttributes: false, // TODO : Making this as `false` becase marks are not preserved when I try to preserve attrs, awaiting a bit of help
    },
    orderedList: {
      keepMarks: true,
      keepAttributes: false, // TODO : Making this as `false` becase marks are not preserved when I try to preserve attrs, awaiting a bit of help
    },
  }),
];

const content = "";
export default function TextEditor({ onChange }: { onChange: any }) {
  const editor = useEditor({
    extensions,
    content,
    onUpdate: () => onChange(editor?.getHTML()),
  });
  return (
    <>
      <ToolBar editor={editor} />
      <EditorContent editor={editor}></EditorContent>
    </>
  );
}
