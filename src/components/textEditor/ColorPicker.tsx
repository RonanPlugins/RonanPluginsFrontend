import { Editor } from "@tiptap/react";
import { Palette } from "lucide-react";
import { useState } from "react";
import { GithubPicker } from "react-color";

export default function ColorPicker({ editor }: { editor: Editor }) {
  const [display, setDisplay] = useState(false);

  const handleClick = () => {
    setDisplay(!display);
  };

  const handleClose = () => {
    setDisplay(false);
  };

  const handleChange = (color: any) => {
    // setColor(color.rgb);
    // console.log(color);
    if (color.hex === "#000000") {
      editor.commands.unsetColor();
    } else {
      editor.commands.setColor(color.hex);
    }
  };

  return (
    <div>
      <button
        type="button"
        onClick={handleClick}
        className={
          !editor.getAttributes("textStyle").color
            ? "p-1 rounded-lg"
            : `p-1 bg-primary text-white rounded-lg`
        }
      >
        <Palette className="w-5 h-5" />
      </button>
      {display ? (
        <div style={{ position: "absolute", zIndex: 2 }}>
          <div
            style={{
              position: "fixed",
              top: "0px",
              right: "0px",
              bottom: "0px",
              left: "0px",
            }}
            onClick={handleClose}
          />
          <GithubPicker
            onChange={handleChange}
            width="114px"
            colors={[
              "#000000",
              "#B80000",
              "#DB3E00",
              "#FCCB00",
              "#008B02",
              "#1273DE",
              "#004DCF",
              "#5300EB",
            ]}
          />
        </div>
      ) : null}
    </div>
  );
}
