import { useEffect, useState } from "react";
import { Button } from "../ui/button";
import api from "@/api";
import { Separator } from "../ui/separator";
import { Link, useNavigate } from "react-router-dom";
import { Card, CardContent } from "../ui/card";
import { Input } from "../ui/input";
import { toast } from "sonner";
import { useUserContext } from "@/context/UserContext";
import usePageTitle from "@/utils/usePageTitle";
import Links from "@/lib/Links";

export default function Login({ isDialog = false }: { isDialog?: boolean }) {
  usePageTitle("Login");
  return (
    <Card className="max-w-xl w-full mx-auto my-3">
      <CardContent>
        <LoginScreen isDialog={isDialog} />
      </CardContent>
    </Card>
  );
}

export function LoginScreen({ isDialog = false }: { isDialog?: boolean }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { refresh } = useUserContext();

  useEffect(() => {
    setError("");
  }, [email, password]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle login logic here
    // console.log("Login with credentials:", { email, password });
    api.loginLocal(email, password).then(async (response) => {
      console.log(response);
      if (response?.status === 200) {
        await refresh();
        navigate("/profile");
      } else {
        console.log(response.data);
        switch (response.data.status) {
          case "email-or-password":
            toast("Invalid email or password", {
              className: "text-white bg-red-500 border-none",
            });
            break;
          case "email-verify":
            toast("Please verify your email", {
              className: "text-white bg-red-500 border-none",
            });
            navigate(`/email-sent/${email}`);
        }
        setError(response?.data?.message || "Invalid Credentials");
      }
    });
  };

  const handleSocialLogin = (provider: string) => {
    // Handle social login logic here
    switch (provider) {
      case "discord":
        return api.loginDiscord();
      case "github":
        return api.loginGithub();
    }
  };

  return (
    <>
      <h2 className="text-4xl font-bold mb-6 mt-2 text-center">Login</h2>
      <form onSubmit={handleLogin} className="space-y-4 px-1">
        <div>
          <label htmlFor="email" className="block text-sm font-medium">
            Email
          </label>
          <Input
            type="email"
            id="email"
            autoComplete="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mt-1 block w-full px-3 py-2 border rounded-xl shadow-sm focus:outline-none sm:text-sm"
            required
          />
        </div>
        <div>
          <label htmlFor="password" className="block text-sm font-medium">
            Password
          </label>
          <Input
            type="password"
            id="password"
            autoComplete="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="mt-1 block w-full px-3 py-2 border rounded-xl shadow-sm focus:outline-non sm:text-sm"
            required
          />
        </div>

        <Button
          type="submit"
          className="w-full bg-accent text-black py-2 px-4 rounded-xl shadow-sm hover:bg-accent-foreground focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Login
        </Button>
        {error && (
          <p className="text-center text-destructive dark:text-red-500 font-bold">
            {error}
          </p>
        )}
      </form>
      <div className="flex flex-row items-center justify-center">
        <p className="mr-1">Don't have an account yet? </p>
        <Link to={`../${Links.Register}`}>
          <Button className="p-0" variant="link">
            Register now
          </Button>
        </Link>
      </div>
      <Separator className="mb-2 border-2" />
      <div className="mt-6">
        <p className="text-center text-muted-foreground">or login with</p>
        <div className="mt-2 flex justify-center space-x-4">
          <Button
            onClick={() => handleSocialLogin("discord")}
            className="text-white py-2 px-4 rounded-xl shadow-sm bg-[#5865F2]"
          >
            <img src="/assets/discord.svg" className="h-5 w-5 mr-2" alt="" />
            Discord
          </Button>
          <Button
            onClick={() => handleSocialLogin("github")}
            className="text-white py-2 px-4 rounded-xl shadow-sm bg-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-700"
          >
            <img src="/assets/github.svg" className="h-5 w-5 mr-2" alt="" />
            GitHub
          </Button>
        </div>
      </div>
      {isDialog && (
        <div className="ml-auto w-fit">
          <Link to="./login">
            <Button className="text-muted-foreground" variant="link">
              Go to login page
            </Button>
          </Link>
        </div>
      )}
    </>
  );
}
