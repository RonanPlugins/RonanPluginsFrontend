import { Color } from "@tiptap/extension-color";
import ListItem from "@tiptap/extension-list-item";
import TextStyle from "@tiptap/extension-text-style";
import Image from "@tiptap/extension-image";
import {
  BubbleMenu,
  EditorContent,
  FloatingMenu,
  useEditor,
} from "@tiptap/react";
import Placeholder from "@tiptap/extension-placeholder";
import StarterKit from "@tiptap/starter-kit";
import ToolBar from "./Toolbar";
import TextAlign from "@tiptap/extension-text-align";
import Underline from "@tiptap/extension-underline";
import Link from "@tiptap/extension-link";
import("./style.css");

const extensions = [
  Link.configure({
    validate: (href) => /^https?:\/\//.test(href),
    openOnClick: false,
  }),
  Underline,
  Image,
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
    dropcursor: {
      width: 2,
    },
  }),
  TextAlign.configure({
    types: ["heading", "paragraph"],
  }),
];

export default function TextEditor({
  onChange = null,
  canEdit = false,
  content = "",
  className = "",
}: {
  onChange?: any;
  canEdit?: boolean;
  content?: string;
  className?: string;
}) {
  const editor = useEditor({
    extensions,
    content,
    editable: canEdit,
    onUpdate: () => (onChange ? onChange(editor?.getHTML()) : null),
  });
  return (
    <>
      {canEdit && editor && (
        <BubbleMenu
          className="bubble-menu"
          tippyOptions={{ duration: 100 }}
          editor={editor}
        >
          <button
            type="button"
            onClick={() => editor.chain().focus().toggleBold().run()}
            className={editor.isActive("bold") ? "is-active" : ""}
          >
            Bold
          </button>
          <button
            type="button"
            onClick={() => editor.chain().focus().toggleItalic().run()}
            className={editor.isActive("italic") ? "is-active" : ""}
          >
            Italic
          </button>
        </BubbleMenu>
      )}

      {canEdit && editor && (
        <FloatingMenu
          className="floating-menu"
          tippyOptions={{ duration: 100 }}
          editor={editor}
        >
          <button
            type="button"
            onClick={() =>
              editor.chain().focus().toggleHeading({ level: 1 }).run()
            }
            className={
              editor.isActive("heading", { level: 1 }) ? "is-active" : ""
            }
          >
            H1
          </button>
          <button
            type="button"
            onClick={() =>
              editor.chain().focus().toggleHeading({ level: 2 }).run()
            }
            className={
              editor.isActive("heading", { level: 2 }) ? "is-active" : ""
            }
          >
            H2
          </button>
          <button
            type="button"
            onClick={() => editor.chain().focus().toggleBulletList().run()}
            className={editor.isActive("bulletList") ? "is-active" : ""}
          >
            Bullet List
          </button>
        </FloatingMenu>
      )}

      {canEdit && editor && <ToolBar editor={editor} />}
      <EditorContent className={className} editor={editor} />
    </>
  );
  // return (
  //   <>
  //     <ToolBar editor={editor} />
  //     <EditorContent editor={editor}></EditorContent>
  //   </>
  // );
}
