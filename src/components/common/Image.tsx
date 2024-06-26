export default function Image({
  image,
  url,
  classname,
}: {
  image?: any;
  url?: string | null;
  classname?: string;
}) {
  return (
    <div
      className={`flex-shrink-0 h-[88px] w-[88px] object-contain rounded-xl bg-inherit p-1 ${classname}`}
    >
      <img
        className="rounded-xl w-[80px] h-[80px] bg-muted"
        src={
          url
            ? url
            : `${
                image
                  ? `${import.meta.env.VITE_IMAGES_URL}${image}`
                  : `/assets/unavailable.webp`
              }`
        }
      />
    </div>
  );
}

export function ImageSmall({
  image,
  url,
  classname,
}: {
  image?: any;
  url?: string | null;
  classname?: string;
}) {
  return (
    <div
      className={`flex-shrink-0 h-[60px] w-[60px] object-contain bg-inherit p-1 rounded-full ${classname}`}
    >
      <img
        className="w-full h-full bg-background rounded-full"
        src={
          url
            ? url
            : `${
                image
                  ? `${import.meta.env.VITE_IMAGES_URL}${image}`
                  : `/assets/unavailable.webp`
              }`
        }
      />
    </div>
  );
}
