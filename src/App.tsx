// import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";

import "./index.css";
import { Outlet } from "react-router-dom";
import Nav from "./components/home/NavBar";
import { ThemeProvider } from "./context/ThemeContext";

// const client = new ApolloClient({
//   uri: "/graphql",
//   cache: new InMemoryCache(),
// });

function App() {
  console.log("Welcome to Tomodachi!");
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <Nav />
      <Outlet />
    </ThemeProvider>
  );
}

export default App;
