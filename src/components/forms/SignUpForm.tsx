// import AuthService from '../utils/auth';

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

const formSchema = z.object({
  username: z.string().min(3, {
    message: "Username must be at least 3 characters.",
  }),
  password: z.string().min(6, {
    message: "Password must be at least 6 characters.",
  }),
  email: z
    .string()
    .min(1, "Email is required")
    .regex(
      new RegExp(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/),
      "Please enter a valid email address."
    ),
});

const SignUpForm = () => {
  const form = useForm({
    resolver: zodResolver(formSchema),
  });

  // const [signUpUser, { loading, error }] = useMutation(ADD_USER);

  const onSubmit = async (formData) => {
    console.log("Login button!");
    // try {
    //   const { data } = await signUpUser({
    //     variables: formData,
    //   });

    //   // console.log(formData);
    //   AuthService.login(data.addUser.token);
    // } catch (error) {
    //   console.error('Sign up error:', error);
    // }
  };

  return (
    <div className="container mx-auto">
      <Card>
        <CardHeader>
          <CardTitle>Create an account</CardTitle>
          <CardDescription>You must create an account to play</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="gap-8 flex flex-col"
            >
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input placeholder="Email" {...field} />
                    </FormControl>
                    <FormDescription>
                      This is your email address.
                    </FormDescription>
                    {form.formState.errors.email && (
                      <FormMessage>
                        {form.formState.errors.email.message}
                      </FormMessage>
                    )}
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="username"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Username</FormLabel>
                    <FormControl>
                      <Input placeholder="Username" {...field} />
                    </FormControl>
                    <FormDescription>
                      This is your public display name.
                    </FormDescription>
                    {form.formState.errors.username && (
                      <FormMessage>
                        {form.formState.errors.username.message}
                      </FormMessage>
                    )}
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input
                        type="password"
                        placeholder="Password"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>This is your password.</FormDescription>
                    {form.formState.errors.password && (
                      <FormMessage>
                        {form.formState.errors.password.message}
                      </FormMessage>
                    )}
                  </FormItem>
                )}
              />
              {/* <div className="flex justify-center">
                <Button className="w-[200px] " type="submit" disabled={loading}>
                  {loading ? "Signing up..." : "Sign up"}
                </Button>
              </div> */}
              {/* {error && <p>Error: {error.message}</p>} */}
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
};

export default SignUpForm;
