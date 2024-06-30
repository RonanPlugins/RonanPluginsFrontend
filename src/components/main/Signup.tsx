import { useState } from "react";
import { Button } from "../ui/button";
import api from "@/api";
import { Separator } from "../ui/separator";
import { Card, CardContent } from "../ui/card";
import { Input } from "../ui/input";
import { Link } from "react-router-dom";
import { toast } from "sonner";

export default function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSignup = (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast("Passwords do not match", {
        className: "bg-red-500 text-white border-none",
      });
      return;
    }
    // Handle signup logic here
    console.log("Signup with credentials:", { email, password });
    api.signup(email, password).then((data) => {
      console.log("SIGNUP!", data);
    });
  };

  return (
    <Card className="max-w-xl w-full mx-auto my-3">
      <CardContent>
        <h2 className="text-4xl font-bold mb-6 text-center">Sign Up</h2>
        <form onSubmit={handleSignup} className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-sm font-medium">
              Email
            </label>
            <Input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
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
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
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
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              required
            />
          </div>
          <Button
            type="submit"
            variant="special"
            className="w-full py-2 px-4 rounded-md shadow-sm"
          >
            Sign Up
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
