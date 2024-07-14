import { toTitleCase } from "@/utils/formatter";
import { PLUGIN_CATEGORY, PLUGIN_VERSION } from "minecentral-api";
import { DiscordTutorial } from "../common/DiscordTutorial";
import { TextEditor } from "@/components/textEditor/TextEditor";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useCreateResourceContext } from "@/context/CreateResourceContext";
import {
  MultiSelector,
  MultiSelectorContent,
  MultiSelectorInput,
  MultiSelectorItem,
  MultiSelectorList,
  MultiSelectorTrigger,
} from "@/context/MultiSelector";
import { getEnumValue } from "@/utils/enum";

export function ResourceCreateTitle() {
  const { title, set_title } = useCreateResourceContext();
  return (
    <section className="flex flex-col space-y-3">
      <Label>Title</Label>
      <Input
        placeholder="Resource name"
        value={title || ""}
        onChange={(e: any) => {
          set_title(e.target.value);
        }}
      />

      <p className="text-sm text-muted-foreground">
        Name by which your resource will be displayed
      </p>
    </section>
  );
}

export function ResourceCreateSubtitle() {
  const { subtitle, set_subtitle } = useCreateResourceContext();
  return (
    <section className="flex flex-col space-y-3">
      <Label>Subtitle</Label>
      <Input
        placeholder="Resource Subtitle"
        value={subtitle || ""}
        onChange={(e: any) => {
          set_subtitle(e.target.value);
        }}
      />

      <p className="text-sm text-muted-foreground">
        Brief one-line description of your resource
      </p>
    </section>
  );
}
export function ResourceCreateUploadFile() {
  const { set_file } = useCreateResourceContext();
  return (
    <section className="flex flex-col space-y-3">
      <Label>Your Resource</Label>
      <Input
        type="file"
        accept=".zip,.jar"
        className="text-muted-foreground file:mr-3 file:py-1 file:px-3 file:rounded-xl file:text-xs file:font-medium
                    file:bg-secondary file:text-secondary-foreground hover:file:cursor-pointer cursor-pointer hover:file:bg-primary"
        onChange={(e) => {
          set_file(e.target.files?.[0] || null);
        }}
      />

      <p className="text-sm text-muted-foreground">
        File will be uploaded once "Post Resource" is clicked below
      </p>
    </section>
  );
}

export function ResourceCreateReleaseVersion() {
  const { releaseVersion, set_releaseVersion } = useCreateResourceContext();
  return (
    <div className="flex flex-col space-y-3">
      <Label>Resource String Version</Label>
      <Input
        placeholder="Resource String Version"
        value={releaseVersion || ""}
        onChange={(e: any) => {
          set_releaseVersion(e.target.value);
        }}
      />

      <p className="text-sm text-muted-foreground">
        The string of your resource, like 1.3
      </p>
    </div>
  );
}

export function ResourceCreateCategory() {
  const { categories, set_categories } = useCreateResourceContext();

  return (
    <div className="flex flex-col space-y-3">
      <Label>Related Categories</Label>

      <div className="flex flex-row flex-wrap justify-center">
        <MultiSelector
          values={categories || []}
          onValuesChange={set_categories}
        >
          <MultiSelectorTrigger className="border-secondary">
            <MultiSelectorInput placeholder="Choose categories..." />
          </MultiSelectorTrigger>
          <MultiSelectorContent>
            <MultiSelectorList>
              {Object.values(PLUGIN_CATEGORY)
                .reverse()
                .map((filter) => {
                  return (
                    <MultiSelectorItem key={filter} value={filter}>
                      {getEnumValue(PLUGIN_CATEGORY, filter)}
                    </MultiSelectorItem>
                  );
                })}
            </MultiSelectorList>
          </MultiSelectorContent>
        </MultiSelector>
      </div>
    </div>
  );
}

export function ResourceCreateSupportVersions() {
  const { supportVersions, set_supportVersions } = useCreateResourceContext();
  return (
    <div className="flex flex-col space-y-3">
      <Label>Supported Minecraft Versions</Label>
      <div className="flex flex-row flex-wrap justify-center">
        <MultiSelector
          values={supportVersions || []}
          onValuesChange={set_supportVersions}
          maxItems={-1}
        >
          <MultiSelectorTrigger className="border-secondary">
            <MultiSelectorInput placeholder="Choose versions..." />
          </MultiSelectorTrigger>
          <MultiSelectorContent>
            <MultiSelectorList>
              {Object.values(PLUGIN_VERSION)
                .reverse()
                .map((filter) => {
                  return (
                    <MultiSelectorItem key={filter} value={filter}>
                      {toTitleCase(filter)}
                    </MultiSelectorItem>
                  );
                })}
            </MultiSelectorList>
          </MultiSelectorContent>
        </MultiSelector>
      </div>
      <p className="text-sm text-muted-foreground">
        What versions of Minecraft is your resource{" "}
        <span className="font-bold">known</span> to work in
      </p>
    </div>
  );
}

export function ResourceCreateDescription() {
  const { description, set_description } = useCreateResourceContext();
  return (
    <div>
      <Label>Description</Label>
      <div className="my-3"></div>
      <TextEditor content={description} onChange={set_description} />
    </div>
  );
}

export function ResourceCreateOptionals({ className }: { className: string }) {
  const {
    language,
    set_language,
    link_source,
    set_linkSource,
    link_support,
    set_linkSupport,
    discord,
    set_discord,
    tags,
    set_tags,
  } = useCreateResourceContext();
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
          Languages (if any) have your resource been localized in?
        </p>
      </section>
      {/* Source Code */}
      <section className="flex flex-col space-y-3">
        <Label>Source Code Link</Label>
        <Input
          placeholder="Source Code Link"
          value={link_source || ""}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            set_linkSource(e.target.value);
          }}
        />

        <p className="text-sm text-muted-foreground">
          A link to your projects source code or repository
        </p>
      </section>

      {/* Support Link */}
      <section className="flex flex-col space-y-3">
        <Label>Additional Support Link</Label>
        <Input
          placeholder="Support Link"
          value={link_support || ""}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            set_linkSupport(e.target.value);
          }}
        />

        <p className="text-sm text-muted-foreground">
          A link to your projects source code or repository
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
              variant="outline"
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
