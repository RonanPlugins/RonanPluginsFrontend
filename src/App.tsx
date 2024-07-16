// import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import "./index.css";
import { Outlet } from "react-router-dom";
import Nav from "./components/main/NavBar";
import { ThemeProvider } from "./context/ThemeContext";
import Footer from "./components/main/Footer";
import UserProvider from "./context/UserContext";
import { Toaster } from "sonner";
import ScrollButton from "./components/common/ScrollButton";

// const client = new ApolloClient({
//   uri: "/graphql",
//   cache: new InMemoryCache(),
// });

function App() {
  return (
    <UserProvider>
      <ThemeProvider defaultTheme="dark" storageKey="theme">
        <Nav />
        <Outlet />
        <Footer />
        <Toaster richColors />
        <ScrollButton />
      </ThemeProvider>
    </UserProvider>
  );
}

export default App;
