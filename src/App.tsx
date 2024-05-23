// import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import "./index.css";
import { Outlet } from "react-router-dom";
import Nav from "./components/home/NavBar";
import { ThemeProvider } from "./context/ThemeContext";
import Footer from "./components/home/Footer";

// const client = new ApolloClient({
//   uri: "/graphql",
//   cache: new InMemoryCache(),
// });

function App() {
  console.log("Welcome to RonanServices! Want to contribute?");
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <Nav />
      <Outlet />
      <Footer />
    </ThemeProvider>
  );
}

export default App;
