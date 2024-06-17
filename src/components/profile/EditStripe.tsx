import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { Link } from "react-router-dom";
import profile from "@/api/profile";
import { toast } from "sonner";
import { CheckCircle2Icon } from "lucide-react";

export function EditStripe() {
  const [key, setKey] = useState<string>("");
  const [open, setOpen] = useState(false);

  async function handleSubmit() {
    setOpen(false);
    await profile.setStripe(key);
    toast("Stripe Api Key Added", {
      icon: <CheckCircle2Icon />,
    });
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Stripe API Key</CardTitle>
        <CardDescription>
          {"Accept payments using "}
          <Link
            className="font-bold hover:underline"
            to={"https://dashboard.stripe.com/"}
          >
            Stripe
          </Link>
        </CardDescription>
      </CardHeader>
      <CardContent className="text-center">
        <>
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
              <Button onClick={() => setOpen((prev) => !prev)}>
                Set Your Api Key
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Stripe Api Key</DialogTitle>
                <DialogDescription>
                  Adding your Stripe Api Key, allows us to generate a payment
                  screen for you when customers would like to purchase your
                  Premium resources.
                  <p className="text-xs text-red-400">
                    For security we cannot display your current api key if you
                    already set one up!
                  </p>
                  <p>The api key should start with `sk_`</p>
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="name" className="text-right">
                    Api Key
                  </Label>
                  <Input
                    id="name"
                    placeholder="Your Stripe Secret Key"
                    className="col-span-3"
                    onChange={(e) => setKey(e.target.value)}
                  />
                </div>
              </div>

              <DialogFooter>
                <Button onClick={handleSubmit} disabled={!key}>
                  Save Changes
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setOpen(false)}
                >
                  Cancel
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </>
      </CardContent>
    </Card>
  );
}
