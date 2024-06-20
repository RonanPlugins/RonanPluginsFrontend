// import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import "./index.css";
import { Outlet } from "react-router-dom";
import Nav from "./components/main/NavBar";
import { ThemeProvider } from "./context/ThemeContext";
import Footer from "./components/main/Footer";
import UserProvider from "./context/UserContext";
import { Toaster } from "./components/ui/sonner";
import { ResourceProvider } from "./context/ResourceContext";

// const client = new ApolloClient({
//   uri: "/graphql",
//   cache: new InMemoryCache(),
// });

function App() {
  return (
    <ResourceProvider>
      <UserProvider>
        <ThemeProvider defaultTheme="dark" storageKey="theme">
          <Nav />
          <Outlet />
          <Footer />
          <Toaster />
        </ThemeProvider>
      </UserProvider>
    </ResourceProvider>
  );
}

export default App;
