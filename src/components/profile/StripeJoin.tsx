import { Dispatch, SetStateAction, useState } from "react";
import profile from "@/api/profile";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

export default function StripeJoin({
  setID,
}: {
  setID: Dispatch<SetStateAction<string | null>>;
}): JSX.Element {
  const [loading, setLoading] = useState<boolean>(false);

  async function handleCreateAccount() {
    setLoading(true);
    const data = await profile.createStripeAccount();
    if (data && data.account) {
      setID(data.account);
      window.location.href = data.url.url;
      // console.log(data.url);
    } else {
      toast.error("Creating Account failed!", {
        richColors: true,
      });
    }
    //Some kinda of code to redirect them!
    setLoading(false);
  }
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="special">Join Now</Button>
        {/* <div className="h-10 px-4 py-2 text-sm font-medium rounded-xl bg-yellow-400 text-secondary-foreground hover:bg-yellow-500 dark:text-secondary inline-flex items-center">
          Join Now
        </div> */}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Join Our Team of Premium Developers</DialogTitle>
          <DialogDescription asChild>
            <div>
              <p>
                Creating a Stripe account allows us to generate a payment screen
                for you when customers want to purchase your Premium resources!
              </p>
              <br></br>
              <p className="text-foreground font-bold">
                Clicking below will generate an account number and forward to
                Stripe. You will need to fill in all required data before you
                can start accepting payments!
              </p>
              <br></br>
              <p className="text-xs text-center text-secondary-foreground">
                We charge a 3% fee for this service. You will be able to post
                resources up to $50 USD
              </p>
            </div>
          </DialogDescription>
        </DialogHeader>

        <DialogFooter>
          <Button
            variant="special"
            onClick={handleCreateAccount}
            disabled={loading}
          >
            {loading ? "Creating..." : "Create Account"}
          </Button>
          <DialogClose asChild>
            <Button variant="outline">Cancel</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
