import { Link, useNavigate, useParams } from "react-router-dom";
import Loading from "../common/Loading";
import { useEffect, useState } from "react";
import usePageTitle from "@/utils/usePageTitle";
import { Card } from "../ui/card";
import api from "@/api";
import { toast } from "sonner";
import { Button } from "../ui/button";
import Links from "@/lib/Links";

export default function EmailVerify() {
  usePageTitle("Verifying...");
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("Verifying...");
  const { token } = useParams();
  const navigate = useNavigate();

  function verify() {
    const handleResponse = (response: any) => {
      switch (response.data.status) {
        case "verified":
          toast.success("Email verified! Continue to login");
          navigate("/login");
          break;
        case "no-token":
          toast.error("Token Invalid or Expired!", {
            className: "text-white bg-red-500 border-none",
          });
          setLoading(false);
          setMessage(
            "Token is either invalid or expired! Attempt to login to get another token!"
          );
          break;
      }
    };

    api
      .verifyEmail(token || "")
      .then((response) => {
        console.log(response);
        handleResponse(response);
      })
      .catch((err) => {
        handleResponse(err.response);
      });
  }

  useEffect(() => {
    if (!token) navigate(Links.Register);
    else verify();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Card className="max-w-2xl mx-auto my-3 flex flex-col justify-center gap-3 py-3">
      <h2 className="font-bold text-2xl text-center">Email Verification</h2>
      {loading ? (
        <Loading />
      ) : (
        <Link className="mx-auto" to={"../login"}>
          <Button variant={"link"}>Go to Login</Button>
        </Link>
      )}
      <p className="text-center">{message}</p>
    </Card>
  );
}
