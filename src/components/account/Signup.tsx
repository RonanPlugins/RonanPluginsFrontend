import { useEffect, useState } from "react";
import { Button } from "../ui/button";
import api from "@/api";
import { Card, CardContent } from "../ui/card";
import { Input } from "../ui/input";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import Loading from "../common/Loading";
import usePageTitle from "@/utils/usePageTitle";

export default function Signup() {
  usePageTitle("Register");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [signingUp, setSigningUp] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    setError("");
  }, [email]);

  const handleSignup = (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast("Passwords do not match", {
        className: "bg-red-500 text-white border-none",
      });
      return;
    }
    // Handle signup logic here
    //console.log("Signup with credentials:", { email, password });
    setSigningUp(true);
    api
      .register(email, password, username)
      .then((data) => {
        //console.log("SIGNUP EVENT", data);
        switch (data.status) {
          case "email-inuse":
            setError("Email already in use!");
            break;
          case "email-sent":
            navigate(`/email-sent/${email}`);
            break;
          default:
            console.log("Case not handled");
        }
      })
      .finally(() => setSigningUp(false));
  };

  return (
    <Card className="max-w-xl w-full mx-auto my-3">
      <CardContent>
        <h2 className="text-4xl font-bold mb-6 mt-2 text-center">Register</h2>
        <form onSubmit={handleSignup} className="space-y-4 px-1">
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
            <label htmlFor="name" className="block text-sm font-medium">
              Username
            </label>
            <Input
              type="name"
              id="name"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
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
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="new-password"
              className="mt-1 block w-full px-3 py-2 border rounded-xl shadow-sm focus:outline-none sm:text-sm"
              required
            />
          </div>
          <div>
            <label
              htmlFor="confirmPassword"
              className="block text-sm font-medium"
            >
              Confirm Password
            </label>
            <Input
              type="password"
              id="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border rounded-xl shadow-sm focus:outline-none sm:text-sm"
              required
            />
          </div>
          {error && (
            <p className="text-center text-destructive dark:text-red-500 font-bold">
              {error}
            </p>
          )}
          <Button
            type="submit"
            variant="special"
            className="w-full py-2 px-4 rounded-xl shadow-sm"
            disabled={signingUp}
          >
            {signingUp ? <Loading /> : "Create Account"}
          </Button>
        </form>
        <div className="flex flex-row items-center justify-center">
          <p>Already have an account?</p>
          <Link to={"../login"}>
            <Button variant="link" className="p-1">
              Login
            </Button>
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}
