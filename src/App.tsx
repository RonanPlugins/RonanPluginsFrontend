// import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import "./index.css";
import { Outlet } from "react-router-dom";
import Nav from "./components/home/NavBar";
import { ThemeProvider } from "./context/ThemeContext";
import Footer from "./components/home/Footer";
import UserProvider from "./context/UserContext";

// const client = new ApolloClient({
//   uri: "/graphql",
//   cache: new InMemoryCache(),
// });

function App() {
  return (
    <UserProvider>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <Nav />
        <Outlet />
        <Footer />
      </ThemeProvider>
    </UserProvider>
  );
}

export default App;
