import { formatToTitleCase } from "@/utils/formatter";
import { useState } from "react";

enum PAGE {
  OVERVIEW,
  RELEASES,
}

export function ResourcePages({ resource }: { resource: any }) {
  const [active, setActive] = useState<PAGE>(
    PAGE[PAGE.OVERVIEW as unknown as keyof typeof PAGE]
  );
  return (
    <div className="flex flex-row items-start gap-1 text-center font-bold px-2 pt-2 self-end">
      {Object.keys(PAGE)
        .filter((v: any) => !isNaN(v))
        .map((val: string) => {
          const value: any = val;
          const enumVal: PAGE = PAGE[value as keyof typeof PAGE];
          const isActive = active === enumVal;
          return (
            <p
              key={val}
              className={`max-w-32 w-full py-2 px-5 hover:cursor-pointer rounded-t-lg text-base ${
                isActive ? "bg-primary" : "hover:bg-primary bg-secondary"
              }`}
              onClick={() => setActive(enumVal)}
            >
              {formatToTitleCase(enumVal)}
            </p>
          );
        })}
    </div>
  );
}
