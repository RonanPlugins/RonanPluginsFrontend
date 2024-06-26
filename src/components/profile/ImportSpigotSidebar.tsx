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
import { useUserContext } from "@/context/UserContext";
import Messages from "@/lib/Messages";
import profile from "@/api/profile";
import { useNavigate } from "react-router-dom";

export function ImportSpigotSidebar() {
  const { user }: { user: any } = useUserContext();
  const navigate = useNavigate();
  const spigotID = user.spigot?.spigotID;

  async function handleRetry() {
    await profile.resyncSpigot();
    location.reload();
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Spigot Importer</CardTitle>
        <CardDescription>
          Choose what SpigotMC plugins to import to {Messages.BrandName}
        </CardDescription>
      </CardHeader>
      <CardContent className="text-center">
        {user.spigot?.spigotID ? (
          <div>
            <div className="rounded-xl border px-4 py-1 text-sm shadow-sm">
              {spigotID}
            </div>
            <Button className="mt-2" onClick={handleRetry}>
              Resync
            </Button>
          </div>
        ) : (
          <Button onClick={() => navigate("./import/spigot")}>
            Configure Now
          </Button>
        )}
      </CardContent>
    </Card>
  );
}
