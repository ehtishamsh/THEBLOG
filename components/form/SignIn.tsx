"use client";

import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
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
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import Loader from "../skeleton/Loader";
const formSchema = z.object({
  email: z.string().min(1, "Email is required").email("Invalid email"),
  password: z
    .string()
    .min(1, "Password is required")
    .max(8, "Password must be less than 8 characters"),
});

export default function SignIn() {
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setLoading(true);
    const signInData = await signIn("credentials", {
      email: values.email,
      password: values.password,
      redirect: false,
    });
    if (signInData?.error) {
      setLoading(false);
      console.log(signInData.error);
    } else {
      setLoading(false);
      router.push("/");
    }
  }

  return (
    <div className="max-w-7xl mx-auto my-10 px-5 relative">
      {loading ? (
        <Loader />
      ) : (
        <div className=" grid grid-cols-2 max-md:grid-cols-1 border border-border rounded-3xl">
          <div className="relative bg-muted  overflow-hidden rounded-l-3xl border-r border-border">
            <img
              src="accountpageimg.png"
              alt=""
              className="bg-cover bg-no-repeat bg-center "
            />
          </div>
          <div className=" mx-auto flex  flex-col items-center justify-center w-full space-y-6 sm:w-[350px]">
            <div className="flex flex-col items-center space-y-2">
              <h1 className="text-2xl font-semibold tracking-tight ">
                Sign in
              </h1>
              <p className="text-sm text-muted-foreground">
                Enter your details below to sign in
              </p>
            </div>
            <div className="grid gap-6 w-full">
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="space-y-8"
                >
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter your email..." {...field} />
                        </FormControl>
                        <FormMessage />
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
                            placeholder="Enter your password..."
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <Button type="submit" className="w-full">
                    Sign in
                  </Button>
                </form>
              </Form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
