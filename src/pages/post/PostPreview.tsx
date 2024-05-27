import { Link } from "react-router-dom";
export default function PostPreview({ post }: { post: any }) {
  // const [image, setImage] = useState<any>(null);
  // useEffect(() => {
  //   const getImage = async () => {
  //     try {
  //       const _image = await postAPI.getImage(post.image);
  //       setImage(URL.createObjectURL(_image));
  //     } catch (err) {}
  //   };
  //   getImage();
  // }, []);
  console.log(`http://localhost:3001/pluginImages/${post.image}`);
  return (
    <>
      <img src={`http://localhost:3001/pluginImages/${post.image}`} />

      <Link to={`../post/${post._id}`}>
        <h2 className="underline">{post.title}</h2>
      </Link>
    </>
  );
}
