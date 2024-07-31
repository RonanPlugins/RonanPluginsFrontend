import { useState } from "react";

export function DevelopmentBanner({
  dismissible = true,
}: {
  dismissible?: boolean;
}) {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) return null;

  return (
    <div className="bg-yellow-500 text-black p-4 flex items-center justify-center relative">
      <p className="font-bold text-center animate-pulse">
        This webpage is under development, expect bugs!
      </p>
      {dismissible && (
        <button
          className="text-black bg-transparent border-0 cursor-pointer focus:outline-none absolute right-4"
          onClick={() => setIsVisible(false)}
        >
          &times;
        </button>
      )}
    </div>
  );
}
