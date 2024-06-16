export default function Image({
  image,
  url,
}: {
  image?: any;
  url?: string | null;
}) {
  return (
    <div className={`h-[80px] w-[80px] object-contain my-auto`}>
      <img
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
