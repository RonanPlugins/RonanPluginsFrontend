export default function Image({
  image,
  className,
  url,
}: {
  image?: any;
  className?: string;
  url?: string | null;
}) {
  return (
    <img
      className={`rounded-md h-[80px] w-[80px] object-contain` + className}
      src={
        !url
          ? `${import.meta.env.VITE_IMAGES_URL}${
              image ? `plugins/${image}` : `notavailable.png`
            }`
          : url
      }
    />
  );
}
