import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Button } from "../ui/button";

export function Vote({ server }: { server: any }) {
  function vote() {
    // navigator.clipboard.writeText(
    //   `${server.address}${server.port ? ":" + server.port : ""}`
    // );
    // toast.info("Voting coming soon!");
  }
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button onClick={vote} className="p-2" variant="special">
          Vote
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogTitle className="flex flex-row gap-2">
          Voting is Currently Disabled
        </DialogTitle>
        <div>
          <p>We're working hard to bring this feature back. Stay tuned!</p>
        </div>
        <DialogClose asChild>
          <Button variant="secondary">Close</Button>
        </DialogClose>
      </DialogContent>
    </Dialog>
  );
}
