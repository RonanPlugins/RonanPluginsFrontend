export default function ResourceImage({
  image,
  className,
  url,
}: {
  image?: any;
  className?: string;
  url?: string;
}) {
  return (
    <img
      className={`rounded-md max-h-[80px] max-w-[80px]` + className}
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
