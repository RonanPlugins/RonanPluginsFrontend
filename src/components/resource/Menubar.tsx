import { Button } from "../ui/button";

export function ResourceMenuBar({ resource }: { resource: any }) {
  return (
    <div className="w-full bg-gray-200 space-x-2 rounded">
      <Button variant="ghost" className="underline bg-white rounded-none">
        Description
      </Button>
      <Button variant="ghost" className="underline bg-white rounded-none">
        Updates
      </Button>
    </div>
  );
}
