import { createContext, useContext, useState } from "react";
import { Command as CommandPrimitive } from "cmdk";

type CreateServerPropsType = React.ComponentPropsWithoutRef<
  typeof CommandPrimitive
>;

interface CreateServerProps {
  // Title
  title: string | null;
  set_title: React.Dispatch<React.SetStateAction<string | null>>;
  // Sub-Title
  subtitle: string | null;
  set_subtitle: React.Dispatch<React.SetStateAction<string | null>>;
  // Category
  categories: string[] | null;
  set_categories: React.Dispatch<React.SetStateAction<string[] | null>>;
  // Description
  description: string | null;
  set_description: React.Dispatch<React.SetStateAction<string | null>>;
  // Address
  address: string | null;
  port: string | null;
  set_address: React.Dispatch<React.SetStateAction<string | null>>;
  set_port: React.Dispatch<React.SetStateAction<string | null>>;
  // *** OPTIONAL FIELDS ***
  // Votified
  vote_ip: string | null;
  vote_port: string | null;
  vote_token: string | null;
  set_vote_ip: React.Dispatch<React.SetStateAction<string | null>>;
  set_vote_port: React.Dispatch<React.SetStateAction<string | null>>;
  set_vote_token: React.Dispatch<React.SetStateAction<string | null>>;
  // Language
  language: string | null;
  set_language: React.Dispatch<React.SetStateAction<string | null>>;
  // Discord
  discord: string | null;
  set_discord: React.Dispatch<React.SetStateAction<string | null>>;
  // Tags
  tags: string | null;
  set_tags: React.Dispatch<React.SetStateAction<string | null>>;
  // Submitting
  getFieldsIncomplete: () => any[];
}

const CreateServerContext = createContext<CreateServerProps | null>(null);

export const useCreateServerContext = () => {
  const context = useContext(CreateServerContext);
  if (!context) {
    throw new Error(
      "useCreateServerContext must be used within CreateServerContext.Provider"
    );
  }
  return context;
};

export const CreateServer_Context = ({ children }: CreateServerPropsType) => {
  const [title, set_title] = useState<string | null>(null);
  const [subtitle, set_subtitle] = useState<string | null>(null);
  const [categories, set_categories] = useState<string[] | null>(null);
  const [description, set_description] = useState<string | null>(null);
  const [address, set_address] = useState<string | null>(null);
  const [port, set_port] = useState<string | null>(null);
  //Optional
  const [vote_ip, set_vote_ip] = useState<string | null>(null);
  const [vote_port, set_vote_port] = useState<string | null>(null);
  const [vote_token, set_vote_token] = useState<string | null>(null);
  const [language, set_language] = useState<string | null>(null);
  const [discord, set_discord] = useState<string | null>(null);
  const [tags, set_tags] = useState<string | null>(null);

  function getFieldsIncomplete() {
    //Return a list of fields that are incomplete

    return [title, subtitle, categories, description, address].filter(
      (val) => !val
    );
  }

  return (
    <CreateServerContext.Provider
      value={{
        // Title
        title,
        set_title,
        // Sub-Title
        subtitle,
        set_subtitle,
        //Ip Address
        address,
        set_address,
        port,
        set_port,
        // Category
        categories,
        set_categories,
        // Description
        description,
        set_description,
        // *** OPTIONAL FIELDS ***
        // Votified
        vote_ip,
        vote_port,
        vote_token,
        set_vote_ip,
        set_vote_port,
        set_vote_token,
        // Language
        language,
        set_language,
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
    </CreateServerContext.Provider>
  );
};
