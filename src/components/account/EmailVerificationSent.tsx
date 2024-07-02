import { useNavigate, useParams } from "react-router-dom";
import { Card, CardContent, CardHeader } from "../ui/card";
import { Button } from "../ui/button";
import usePageTitle from "@/utils/usePageTitle";
import { useEffect, useState } from "react";
import api from "@/api";
import { toast } from "sonner";

export function EmailVerificationSent() {
  usePageTitle("Verification Sent");
  const { email } = useParams();
  const navigate = useNavigate();
  const [timeleft, setTimeleft] = useState(5);

  const handleResendEmail = async () => {
    console.log("Resend verification email", email);
    setTimeleft(60);
    api
      .resendRegister(email || "")
      .then((data) => {
        // console.log(data);
        switch (data.status) {
          case "user-not-found":
            toast.error("User with this email does not exist!", {
              className: "bg-red-500 border-none text-white",
            });
            break;
          case "email-sent":
            toast.success("Email re-sent! Please check your inbox/spam!");
            break;
          case "email-wait":
            toast.error("Please wait before requesting another email", {
              className: "bg-red-500 border-none text-white",
            });
            setTimeleft(data.cooldown || 60);
            break;
          case "user-verified":
            toast.success("Email already verified, please login!");
            navigate("/login");
            break;
          default:
            console.log("Case not evaluated", data);
        }
        // console.log("data", data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    if (!email) navigate("./about");
    if (timeleft > 0) {
      const timerId = setTimeout(() => {
        setTimeleft(timeleft - 1);
      }, 1000);

      // Clean up the timer when the component unmounts or when the timer reaches 0
      return () => clearTimeout(timerId);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [timeleft]);

  return (
    <Card className="flex flex-col items-center justify-center min-h-3.5 max-w-2xl mx-auto my-3">
      <CardHeader>
        <h2 className="text-2xl mb-3 font-bold">Verify Your Email</h2>
      </CardHeader>
      <CardContent className="text-center flex flex-col gap-3">
        <p className="mb-3">
          A verification email has been sent to your email address {email}.
        </p>
        <p>
          Please check your inbox and follow the instructions to verify your
          email.
        </p>
        <div className="flex flex-row gap-2 justify-center">
          <Button
            variant="special"
            onClick={handleResendEmail}
            disabled={timeleft > 0}
          >
            {`Resend Email ${timeleft > 0 ? `(${timeleft})` : ""}`}
          </Button>
          <Button onClick={() => navigate("/login")}>Back to Login</Button>
        </div>
      </CardContent>
    </Card>
  );
}
