import { Link } from "react-router-dom";
import { Card, CardContent, CardTitle } from "../ui/card";

export default function PluginEditTools({ resource }: { resource: any }) {
  return (
    <Card>
      <CardTitle className="truncate bg-primary p-2 rounded-t-md text-secondary">
        <h2>Resource Tools</h2>
      </CardTitle>
      <CardContent className="p-3">
        <Link to={"/edit"}>
          <p>Edit Resource</p>
        </Link>
        <p>Edit Icon</p>
        <p>Post Update</p>
      </CardContent>
    </Card>
  );
}
