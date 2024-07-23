import serverAPI from "@/api/server";
import { createContext, useContext, useEffect, useState } from "react";

interface ServerInitState {
  loading: boolean;
  status: ServerStatus;
}

interface ServerStatus {
  online: boolean;
  icon: string | null;
  motd: string | null;
  players: {
    online: number;
    max: number;
  } | null;
  version: string | null;
}

const initialState: ServerInitState = {
  loading: true,
  status: {
    online: false,
    icon: null,
    motd: null,
    players: null,
    version: null,
  },
};

const ServerContext = createContext<ServerInitState>(initialState);

export const useServerDataContext = () => {
  return useContext(ServerContext);
};

export default function ServerDataProvider({
  children,
  server,
}: {
  children: any;
  server: any;
}) {
  const [loading, setLoading] = useState(true);
  const [status, setServerStatus] = useState<ServerStatus>(initialState.status);
  useEffect(() => {
    // console.log("Server Loaded", server);
    if (!server.address) return;
    serverAPI
      .getStatus(`${server.address}${server.port ? ":" + server.port : ""}`)
      .then((data) => {
        // console.log("Data", data);
        setServerStatus(data);
      })
      .finally(() => {
        setLoading(false);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <ServerContext.Provider
      value={{
        loading,
        status,
      }}
    >
      {children}
    </ServerContext.Provider>
  );
}
