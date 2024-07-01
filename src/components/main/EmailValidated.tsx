import { useParams } from "react-router-dom";
import { Card, CardHeader } from "../ui/card";

export default function EmailValidated() {
  const { id } = useParams();

  return (
    <Card className="max-w-2xl mx-auto my-3">
      <CardHeader>
        <h2 className="font-bold text-2xl text-center">
          Thank You for Verifying Your Email
        </h2>
        <p>Your email address has been successfully verified.</p>
        <p>You can now proceed to login and enjoy our services.</p>
      </CardHeader>
    </Card>
  );
}
