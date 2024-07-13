import { enumToArray } from "@/utils/enum";
import { toTitleCase } from "@/utils/formatter";
import { DiscordTutorial } from "../common/DiscordTutorial";
import { TextEditor } from "@/components/textEditor/TextEditor";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger } from "../ui/select";
import { SERVER_CATEGORY } from "minecentral-api";
import { useCreateServerContext } from "@/context/CreateServerContext";

export function ServerCreateTitle() {
  const { title, set_title } = useCreateServerContext();
  return (
    <section className="flex flex-col space-y-3">
      <Label>Title</Label>
      <Input
        placeholder="Server name"
        value={title || ""}
        onChange={(e: any) => {
          set_title(e.target.value);
        }}
      />

      <p className="text-sm text-muted-foreground">
        Name by which your server will be displayed
      </p>
    </section>
  );
}

export function ServerCreateSubtitle() {
  const { subtitle, set_subtitle } = useCreateServerContext();
  return (
    <section className="flex flex-col space-y-3">
      <Label>Subtitle</Label>
      <Input
        placeholder="Server Subtitle"
        value={subtitle || ""}
        onChange={(e: any) => {
          set_subtitle(e.target.value);
        }}
      />

      <p className="text-sm text-muted-foreground">
        Brief one-line description of your server
      </p>
    </section>
  );
}
export function ServerCreateAddress() {
  const { address, set_address, port, set_port } = useCreateServerContext();
  return (
    <div className="grid grid-cols-4 gap-3">
      <section className="flex flex-col space-y-3 col-span-3">
        <Label>Server Address</Label>
        <Input
          placeholder="0.0.0.0"
          value={address || ""}
          onChange={(e: any) => {
            set_address(e.target.value);
          }}
        />
      </section>
      <section className="flex flex-col space-y-3 col-span-1">
        <Label>Server Port</Label>
        <Input
          placeholder="33125"
          value={port || ""}
          onChange={(e: any) => {
            set_port(e.target.value);
          }}
        />
      </section>
    </div>
  );
}

export function ServerCreateCategory() {
  const { category, set_category } = useCreateServerContext();

  return (
    <div className="flex flex-col space-y-3">
      <Label>Category</Label>

      <div className="flex flex-row flex-wrap justify-center">
        <Select onValueChange={(val: any) => set_category(val)}>
          <SelectTrigger className="border-secondary text-muted-foreground">
            {toTitleCase(category) || "Choose Category..."}
          </SelectTrigger>
          <SelectContent>
            {enumToArray(SERVER_CATEGORY) //Filter out Number values (typescript stuff)
              .map((type: any) => {
                // const type = CATEGORY_PLUGIN[key as keyof typeof CATEGORY_PLUGIN];
                return (
                  <SelectItem
                    key={type}
                    value={type}
                    // variant={category === type ? "special" : "secondary"}
                    className="mb-2 mx-1 rounded-xl max-w-36 w-full"
                  >
                    {toTitleCase(type)}
                  </SelectItem>
                );
              })}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}

export function ServerCreateDescription() {
  const { description, set_description } = useCreateServerContext();
  return (
    <div>
      <Label>Description</Label>
      <div className="my-3"></div>
      <TextEditor content={description} onChange={set_description} />
    </div>
  );
}

export function ServerCreateOptionals({ className }: { className: string }) {
  const { language, set_language, discord, set_discord, tags, set_tags } =
    useCreateServerContext();
  return (
    <div className={className}>
      {/* Languages */}
      <section className="flex flex-col space-y-3">
        <Label>Supported Languages</Label>
        <Input
          placeholder="Supported Languages"
          value={language || ""}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            set_language(e.target.value);
          }}
        />

        <p className="text-sm text-muted-foreground">
          Languages your server speaks/allows in chat
        </p>
      </section>

      {/* Discord */}
      <section className="flex flex-col space-y-3">
        <Label>Discord Server ID</Label>
        <Input
          placeholder="Discord Server ID"
          value={discord || ""}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            set_discord(e.target.value);
          }}
        />

        <Dialog>
          <DialogTrigger asChild>
            <Button
              variant="secondary"
              className="text-sm text-muted-foreground pointer text-wrap"
            >
              Click to learn how to Find/Enable your Discord Server Widget.
              Copy/paste your Server ID above.
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-5xl h-5/6">
            <DiscordTutorial />
          </DialogContent>
        </Dialog>
      </section>
      {/* Tags */}
      <section className="flex flex-col space-y-3">
        <Label>Tags</Label>
        <Input
          placeholder="First,Second,Third"
          value={tags || ""}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            set_tags(e.target.value);
          }}
        />

        <p className="text-sm text-muted-foreground max-w-2xl">
          Improve discoverability by adding{" "}
          <span className="font-bold">relevant</span> tags to your resource. Use
          letters, numbers, and dashes to create your tags, and separate them
          with commas or spaces. You can use up to 64 characters.
        </p>
      </section>
    </div>
  );
}
