export default function PluginImage({
  image,
  className,
}: {
  image: any;
  className?: string;
}) {
  return (
    <img
      className={`rounded-md ` + className}
      src={`${import.meta.env.VITE_IMAGES_URL}${
        image ? `plugins/${image}` : `notavailable.png`
      }`}
    />
  );
}
