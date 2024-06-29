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
    <div className="flex flex-row items-start gap-3 text-center font-bold">
      {Object.keys(PAGE)
        .filter((v: any) => !isNaN(v))
        .map((val: string) => {
          const value: any = val;
          const enumVal: PAGE = PAGE[value as keyof typeof PAGE];
          const isActive = active === enumVal;
          return (
            <p
              key={val}
              className={`w-full px-6 border-b-4 text-lg hover:cursor-pointer ${
                isActive
                  ? "border-accent"
                  : "border-accent-foreground hover:border-accent text-muted-foreground hover:text-secondary-foreground"
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
