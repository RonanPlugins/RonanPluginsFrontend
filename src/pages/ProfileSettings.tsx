import { useUserContext } from "@/context/UserContext";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import Messages from "@/lib/Messages";
import profileAPI from "@/api/profile";

export default function ProfileSettings() {
  const { user }: { user: any } = useUserContext();
  const [displayName, setDisplayName] = useState<any>("");

  // async function handleSettings() {
  //   const response = await profileAPI.setName(displayName, user._id);

  //   console.log(response);
  //   setDisplayName(null);
  // }

  return (
    <div className="w-full my-2">
      <h1 className="scroll-m-20 text-5xl font-extrabold tracking-tight text-center my-8 bg-gradient-to-r from-violet-600 to-rose-400 text-transparent bg-clip-text">
        Profile Settings
      </h1>
      <div className="w-full flex flex-row justify-center space-x-2">
        {/* <Card className="w-[350px]">
          <CardHeader>
            <CardTitle>Display Settings</CardTitle>
            <CardDescription>Update your public image</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={(ev) => ev.currentTarget.reset()}>
              <div className="grid w-full items-center gap-4">
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="name">Display Name</Label>
                  <Input
                    id="name"
                    placeholder={user.name}
                    onChange={(e) => setDisplayName(e.target.value)}
                  />
                </div>
              </div>
            </form>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button
              type="submit"
              onClick={handleSettings}
              disabled={displayName === null || displayName === ""}
            >
              Save
            </Button>
          </CardFooter>
        </Card> */}
      </div>
    </div>
  );
}
