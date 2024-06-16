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
    <div className={`h-[80px] w-[80px] object-contain my-auto ${classname}`}>
      <img
        className="rounded"
        src={
          !url
            ? `${import.meta.env.VITE_IMAGES_URL}${
                image ? `plugins/${image}` : `notavailable.png`
              }`
            : url
        }
      />
    </div>
  );
}
