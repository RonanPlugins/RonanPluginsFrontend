import Loading from "./Loading";

export default function Image({
  image,
  url,
  classname,
  loading,
}: {
  image?: string;
  url?: string | null;
  classname?: string;
  loading?: boolean;
}) {
  return (
    <div
      className={`flex-shrink-0 h-[88px] w-[88px] object-contain rounded-xl bg-muted-foreground p-1 ${classname}`}
    >
      {!loading ? (
        <img
          className="rounded-xl w-[80px] h-[80px]"
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
      ) : (
        <Loading className="rounded-xl w-[80px] h-[80px] bg-muted-foreground flex" />
      )}
    </div>
  );
}

export function ImageSmall({
  image,
  url,
  classname,
}: {
  image?: string;
  url?: string | null;
  classname?: string;
}) {
  return (
    <div
      className={`flex-shrink-0 h-[58px] w-[58px] object-contain bg-muted-foreground p-1 rounded-full ${classname}`}
    >
      <img
        className="w-full h-full rounded-full"
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
