import {
  Bold,
  Strikethrough,
  Italic,
  List,
  ListOrdered,
  Heading2,
  Underline,
  Quote,
  Undo,
  Redo,
  Code,
  AlignCenter,
  Heading1,
} from "lucide-react";
import ColorPicker from "./ColorPicker";
import { Editor } from "@tiptap/react";

export default function ToolBar({ editor }: { editor: Editor }) {
  if (!editor) {
    return null;
  }

  const inactive = "p-1 rounded-lg";
  const active = "p-1 bg-primary text-white rounded-lg";

  return (
    <div
      className="px-1 py-2 rounded-tl-md rounded-tr-md flex justify-between items-start
    gap-5 w-full flex-wrap border-gray-700 border-2"
    >
      <div className="flex justify-start items-center gap-1 w-full flex-wrap">
        {/* BOLD */}
        <button
          onClick={(e) => {
            e.preventDefault();
            editor.chain().focus().toggleBold().run();
          }}
          className={editor.isActive("bold") ? active : inactive}
        >
          <Bold className="w-5 h-5" />
        </button>
        {/* ITALIC */}
        <button
          onClick={(e) => {
            e.preventDefault();
            editor.chain().focus().toggleItalic().run();
          }}
          className={editor.isActive("italic") ? active : inactive}
        >
          <Italic className="w-5 h-5" />
        </button>
        {/* UNDERLINE */}
        <button
          onClick={(e) => {
            e.preventDefault();
            editor.chain().focus().toggleUnderline().run();
          }}
          className={editor.isActive("underline") ? active : inactive}
        >
          <Underline className="w-5 h-5" />
        </button>
        {/* STRIKETHROUGH */}
        <button
          onClick={(e) => {
            e.preventDefault();
            editor.chain().focus().toggleStrike().run();
          }}
          className={editor.isActive("strike") ? active : inactive}
        >
          <Strikethrough className="w-5 h-5" />
        </button>
        {/* HEADING 1 */}
        <button
          onClick={(e) => {
            e.preventDefault();
            editor.chain().focus().toggleHeading({ level: 1 }).run();
          }}
          className={
            editor.isActive("heading", { level: 1 }) ? active : inactive
          }
        >
          <Heading1 className="w-5 h-5" />
        </button>
        {/* HEADING 2 */}
        <button
          onClick={(e) => {
            e.preventDefault();
            editor.chain().focus().toggleHeading({ level: 2 }).run();
          }}
          className={
            editor.isActive("heading", { level: 2 }) ? active : inactive
          }
        >
          <Heading2 className="w-5 h-5" />
        </button>
        {/* ALIGN CENTER */}
        <button
          onClick={(e) => {
            e.preventDefault();
            if (!editor.isActive({ textAlign: "center" }))
              editor.chain().focus().setTextAlign("center").run();
            else editor.chain().focus().setTextAlign("left").run();
          }}
          className={
            editor.isActive({ textAlign: "center" }) ? active : inactive
          }
        >
          <AlignCenter className="w-5 h-5" />
        </button>
        {/* COLOR */}
        {/* <button
          onClick={(e) => {
            editor.commands.setColor("#ff0000");
          }}
          className={editor.isActive({ color: "#ff0000" }) ? active : inactive}
        >
          <Palette className="w-5 h-5" />
        </button> */}

        <div>
          <ColorPicker editor={editor} />
        </div>
        {/* LIST */}
        <button
          onClick={(e) => {
            e.preventDefault();
            editor.chain().focus().toggleBulletList().run();
          }}
          className={editor.isActive("bulletList") ? active : inactive}
        >
          <List className="w-5 h-5" />
        </button>
        {/* ORDER LIST */}
        <button
          onClick={(e) => {
            e.preventDefault();
            editor.chain().focus().toggleOrderedList().run();
          }}
          className={editor.isActive("orderedList") ? active : inactive}
        >
          <ListOrdered className="w-5 h-5" />
        </button>
        {/* QUOTE */}
        <button
          onClick={(e) => {
            e.preventDefault();
            editor.chain().focus().toggleBlockquote().run();
          }}
          className={editor.isActive("blockquote") ? active : inactive}
        >
          <Quote className="w-5 h-5" />
        </button>
        {/* CODE */}
        <button
          onClick={(e) => {
            e.preventDefault();
            editor.chain().focus().toggleCodeBlock().run();
          }}
          className={editor.isActive("codeBlock") ? active : inactive}
        >
          <Code className="w-5 h-5" />
        </button>
        {/* UNDER */}
        <button
          onClick={(e) => {
            e.preventDefault();
            editor.chain().focus().undo().run();
          }}
          className={
            editor.isActive("undo")
              ? "p-1 rounded-lg"
              : "p-1 rounded-lg hover:text-white hover:bg-destructive"
          }
        >
          <Undo className="w-5 h-5" />
        </button>
        {/* REDO */}
        <button
          onClick={(e) => {
            e.preventDefault();
            editor.chain().focus().redo().run();
          }}
          className={
            editor.isActive("redo")
              ? "p-1 rounded-lg"
              : "p-1 rounded-lg hover:text-white hover:bg-destructive"
          }
        >
          <Redo className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}
