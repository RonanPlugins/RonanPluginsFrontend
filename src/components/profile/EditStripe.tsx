import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { useUserContext } from "@/context/UserContext";
import StripeJoin from "./StripeJoin";
import { toast } from "sonner";
import profile from "@/api/profile";
import { Button } from "../ui/button";
import Loading from "../common/Loading";
import PremiumIcon from "../common/PremiumIcon";

export function EditStripe() {
  const { user } = useUserContext();
  const [accountID, setID] = useState<string | null>(
    user?.stripe?.account_id || null
  );
  const [status, setStatus] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);

  const getStatus = async () => {
    if (accountID === null) {
      setLoading(false);
      return;
    }
    const newStatus = await profile.getStripeStatus();
    if (newStatus !== null) setStatus(newStatus.enabled);
    setLoading(false);
  };

  useEffect(() => {
    if (accountID != user?.stripe?.account_id) {
      toast.success("Account ID Created!", {
        richColors: true,
      });
      // console.log("Account id has changed!");
      user.stripe = { account_id: accountID };
    }
    getStatus();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [accountID]);

  return (
    <Card className="relative">
      {status && <PremiumIcon />}
      <CardHeader>
        <CardTitle className="text-center">Premium Developer</CardTitle>
        <CardDescription className="text-center">
          {`Accept${status ? "ing" : ""} payments using `}
          <Link
            className="font-bold hover:underline"
            to={"https://dashboard.stripe.com/"}
          >
            Stripe
          </Link>
        </CardDescription>
      </CardHeader>
      <CardContent className="text-center">
        {accountID ? (
          <div>
            {status !== true ? (
              <div className="rounded-md border px-4 text-sm shadow-sm">
                <span className="">
                  {loading ? <Loading /> : "Pending Documents"}
                </span>
              </div>
            ) : (
              // Successful Stripe Account
              <Button>View Portal</Button>
            )}
          </div>
        ) : (
          <StripeJoin setID={setID} />
        )}
      </CardContent>
    </Card>
  );
}
