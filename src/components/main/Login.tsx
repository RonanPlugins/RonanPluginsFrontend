import { useState } from "react";
import { Button } from "../ui/button";
import api from "@/api";
import { Separator } from "../ui/separator";
import { Link } from "react-router-dom";

export default function Login() {
  return (
    <div className="max-w-xl w-full mx-auto my-3">
      <LoginScreen />
    </div>
  );
}

export function LoginScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle login logic here
    console.log("Login with credentials:", { email, password });
  };

  const handleSocialLogin = (provider: string) => {
    // Handle social login logic here
    console.log(`Login with ${provider}`);
  };

  return (
    <>
      <h2 className="text-4xl font-bold mb-6 text-center">Login</h2>
      <form onSubmit={handleLogin} className="space-y-4">
        <div>
          <label htmlFor="email" className="block text-sm font-medium">
            Email
          </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mt-1 block w-full px-3 py-2 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            required
          />
        </div>
        <div>
          <label htmlFor="password" className="block text-sm font-medium">
            Password
          </label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            required
          />
        </div>
        <Button
          type="submit"
          className="w-full bg-accent text-black py-2 px-4 rounded-md shadow-sm hover:bg-accent-foreground focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Login
        </Button>
      </form>
      <div className="flex flex-row items-center justify-center">
        <p className="mr-1">Don't have an account yet? </p>
        <Link to={"../signup"}>
          <Button className="p-0" variant="link">
            Register now
          </Button>
        </Link>
      </div>
      <Separator className="mb-2 border-2" />
      <div className="mt-6">
        <p className="text-center text-muted-foreground">or sign in with</p>
        <div className="mt-2 flex justify-center space-x-4">
          <Button
            onClick={() => handleSocialLogin("Discord")}
            className="bg-gray-800 text-white py-2 px-4 rounded-md shadow-sm hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-600"
          >
            Discord
          </Button>
          <Button
            onClick={() => handleSocialLogin("GitHub")}
            className="bg-gray-900 text-white py-2 px-4 rounded-md shadow-sm hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-700"
          >
            GitHub
          </Button>
        </div>
      </div>
    </>
  );
}
