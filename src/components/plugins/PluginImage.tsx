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
      src={`http://localhost:3001/images/${
        image ? `plugins/${image}` : `notavailable.png`
      }`}
    />
  );
}
