import { createContext, useContext, useState } from "react";
import { Command as CommandPrimitive } from "cmdk";

type CreateResourcePropsType = React.ComponentPropsWithoutRef<
  typeof CommandPrimitive
>;

interface CreateResourceProps {
  // Title
  title: string | null;
  set_title: React.Dispatch<React.SetStateAction<string | null>>;
  // Sub-Title
  subtitle: string | null;
  set_subtitle: React.Dispatch<React.SetStateAction<string | null>>;
  // Release File
  file: any;
  set_file: React.Dispatch<React.SetStateAction<any>>;
  // Release Version
  releaseVersion: string | null;
  set_releaseVersion: React.Dispatch<React.SetStateAction<string | null>>;
  // Supported Versions
  supportVersions: string[] | null;
  set_supportVersions: React.Dispatch<React.SetStateAction<string[] | null>>;
  // Category
  categories: string[] | null;
  set_categories: React.Dispatch<React.SetStateAction<string[] | null>>;
  // Description
  description: string | null;
  set_description: React.Dispatch<React.SetStateAction<string | null>>;
  // *** OPTIONAL FIELDS ***
  // Language
  language: string | null;
  set_language: React.Dispatch<React.SetStateAction<string | null>>;
  // Source/Support
  link_source: string | null;
  set_linkSource: React.Dispatch<React.SetStateAction<string | null>>;
  link_support: string | null;
  set_linkSupport: React.Dispatch<React.SetStateAction<string | null>>;
  // Discord
  discord: string | null;
  set_discord: React.Dispatch<React.SetStateAction<string | null>>;
  // Tags
  tags: string | null;
  set_tags: React.Dispatch<React.SetStateAction<string | null>>;
  // Submitting
  getFieldsIncomplete: () => any[];
}

const CreateResourceContext = createContext<CreateResourceProps | null>(null);

export const useCreateResourceContext = () => {
  const context = useContext(CreateResourceContext);
  if (!context) {
    throw new Error(
      "useCreateResourceContext must be used within CreateResourceContext.Provider"
    );
  }
  return context;
};

export const CreateResource_Context = ({
  children,
}: CreateResourcePropsType) => {
  const [title, set_title] = useState<string | null>(null);
  const [subtitle, set_subtitle] = useState<string | null>(null);
  const [file, set_file] = useState<any>();
  const [releaseVersion, set_releaseVersion] = useState<string | null>(null);
  const [supportVersions, set_supportVersions] = useState<string[] | null>(
    null
  );
  const [categories, set_categories] = useState<string[] | null>(null);
  const [description, set_description] = useState<string | null>(null);
  //Optional
  const [language, set_language] = useState<string | null>(null);
  const [link_source, set_linkSource] = useState<string | null>(null);
  const [link_support, set_linkSupport] = useState<string | null>(null);
  const [discord, set_discord] = useState<string | null>(null);
  const [tags, set_tags] = useState<string | null>(null);

  function getFieldsIncomplete() {
    //Return a list of fields that are incomplete

    return [title, subtitle, supportVersions, categories, description].filter(
      (val) => !val
    );
  }

  return (
    <CreateResourceContext.Provider
      value={{
        // Title
        title,
        set_title,
        // Sub-Title
        subtitle,
        set_subtitle,
        // Release File
        file,
        set_file,
        // Release Version
        releaseVersion,
        set_releaseVersion,
        //Support Version
        supportVersions,
        set_supportVersions,
        // Category
        categories,
        set_categories,
        // Description
        description,
        set_description,
        // *** OPTIONAL FIELDS ***
        // Language
        language,
        set_language,
        // Source/Support
        link_source,
        set_linkSource,
        link_support,
        set_linkSupport,
        // Discord
        discord,
        set_discord,
        // Tags
        tags,
        set_tags,
        // Submit
        getFieldsIncomplete,
      }}
    >
      {children}
    </CreateResourceContext.Provider>
  );
};
