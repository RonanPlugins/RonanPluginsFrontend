import { useState } from "react";
import { Button } from "../ui/button";
import { ArrowUp } from "lucide-react";

const ScrollButton = () => {
  const [visible, setVisible] = useState(false);

  const toggleVisible = () => {
    const scrolled = document.documentElement.scrollTop;
    if (scrolled > 300) {
      setVisible(true);
    } else if (scrolled <= 300) {
      setVisible(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  };

  window.addEventListener("scroll", toggleVisible);

  return (
    <>
      {visible && (
        <Button
          className="hidden lg:block fixed right-4 bottom-4 rounded-full h-14 w-14 m-0 p-0 duration-300 animate-fadeIn"
          onClick={scrollToTop}
        >
          <ArrowUp size={22} className="mx-auto" />
        </Button>
      )}
    </>
  );
};

export default ScrollButton;
