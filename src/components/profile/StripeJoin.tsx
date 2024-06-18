import { Dispatch, SetStateAction, useState } from "react";
import profile from "@/api/profile";
import { toast } from "sonner";
import { CheckCircle2Icon, InfoIcon } from "lucide-react";
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
        {/* <Button className="bg-yellow-400 text-secondary-foreground hover:bg-yellow-500 dark:text-secondary">
            Join Now
          </Button> */}
        <div className="h-10 px-4 py-2 text-sm font-medium rounded-md bg-yellow-400 text-secondary-foreground hover:bg-yellow-500 dark:text-secondary inline-flex items-center">
          Join Now
        </div>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Join Our Team of Premium Developers</DialogTitle>
          <DialogDescription>
            <span>
              Creating a Stripe account allows us to generate a payment screen
              for you when customers want to purchase your Premium resources!
            </span>
            <br></br>
            <span className="text-xs text-red-400">
              Clicking below will generate an account number and create a link
              to Stripe. You will need to fill in all required data before you
              can start accepting payments!
            </span>
            <br></br>
            <span className="text-center text-green-800">
              We have a 0% fee for this service. You will be accepting payments
              directly!
            </span>
          </DialogDescription>
        </DialogHeader>

        <DialogFooter>
          <Button onClick={handleCreateAccount} disabled={loading}>
            {loading ? "Creating..." : "Create Account"}
          </Button>
          <DialogClose>
            <div className="h-10 px-4 py-2 text-sm font-medium rounded-md inline-flex items-center border border-input bg-background hover:bg-accent hover:text-accent-foreground">
              Cancel
            </div>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
