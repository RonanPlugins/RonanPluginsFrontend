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
      className={`flex-shrink-0 h-[96px] w-[96px] object-contain rounded-xl ring-4 ring-card ${classname}`}
    >
      {!loading ? (
        <img
          className="rounded-xl w-[96px] h-[96px] bg-muted"
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
        <Loading className="rounded-xl w-[96px] h-[96px] bg-muted flex" />
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
      className={`flex-shrink-0 h-[44px] w-[44px] object-contain bg-muted p-1 rounded-full ${classname}`}
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
