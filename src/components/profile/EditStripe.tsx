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
import { Button } from "../ui/button";
import PremiumIcon from "../common/PremiumIcon";
import profile from "@/api/profile";

export function EditStripe() {
  const { user, isPremiumReady } = useUserContext();
  const [accountID, setID] = useState<string | null>(
    user?.stripe?.account_id || null
  );
  const [accountLinkCreatePending, setAccountLinkCreatePending] =
    useState(false);

  async function getLink() {
    setAccountLinkCreatePending(true);
    if (!accountID) return;
    const link = await profile.createStripeAccountLink(accountID);
    if (link === null) {
      // setError(true);
    } else {
      window.location.href = link.url;
    }

    setAccountLinkCreatePending(false);
  }

  useEffect(() => {
    if (user && accountID && accountID != user?.stripe?.account_id) {
      toast.success("Account ID Created!", {
        richColors: true,
      });
      // console.log("Account id has changed!");
      user.stripe = { ...user.stripe, account_id: accountID };
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [accountID]);

  return (
    <Card className="relative">
      {isPremiumReady && <PremiumIcon />}
      <CardHeader>
        <CardTitle className="text-center">Premium Developer</CardTitle>
        <CardDescription className="text-center">
          {`Accept${isPremiumReady ? "ing" : ""} payments using `}
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
            {!isPremiumReady ? (
              <Button
                variant="destructive"
                className="mx-auto flex flex-col py-6"
                disabled={accountLinkCreatePending}
                onClick={getLink}
              >
                <p>Pending Documents</p>
                <p className="text-xs">Click to Complete</p>
              </Button>
            ) : (
              // Successful Stripe Account
              <Button variant="special">View Portal</Button>
            )}
          </div>
        ) : (
          <StripeJoin setID={setID} />
        )}
      </CardContent>
    </Card>
  );
}
