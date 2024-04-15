"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useToast } from "@/components/ui/use-toast";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { redirect, useRouter } from "next/navigation";
import { getSession, signIn } from "next-auth/react";
import { db } from "@/lib/db";
import { sendEmail } from "@/lib/mail";
const formSchema = z.object({
  email: z.string().min(1, "Email is required").email("Invalid email"),
  password: z
    .string()
    .min(1, "Password is required")
    .max(8, "Password must be less than 8 characters"),
});

export default function SignIn() {
  const router = useRouter();
  const { toast } = useToast();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    const signInData = await signIn("credentials", {
      email: values.email,
      password: values.password,
      redirect: false,
    });
    const prisma = await db.user.findFirst({ where: { email: values.email } });
    if (prisma?.emailVerified === false) {
      toast({
        title: "Error",
        description: "Please verify your email",
        variant: "destructive",
      });
    }
    if (
      prisma?.emailTokenExpiry &&
      new Date(prisma?.emailTokenExpiry).getTime() < new Date().getTime()
    ) {
      toast({
        title: "Error",
        description: "Old email token expired, check your email for new token.",
        variant: "destructive",
      });
      const updateData = await db.user.update({
        where: {
          id: prisma?.id,
        },
        data: {
          emailToken: crypto.randomUUID(),
          emailTokenExpiry: new Date(Date.now() + 1000 * 60 * 60 * 25),
          emailVerified: false,
        },
      });
      if (updateData) {
        sendEmail({
          body: `<body style="background-color: #f3f4f6; font-family: Arial, sans-serif;">
          <div style="max-width: 600px; margin: 0 auto; padding: 20px;">
              <div style="background-color: #ffffff; padding: 30px; border-radius: 8px; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">
                  <h2 style="font-size: 24px; font-weight: bold; margin-bottom: 20px;">Verify Your Email Address</h2>
                  <p style="margin-bottom: 20px;">Click the button below to verify your email address:</p>
                  <a href="https://theblogs-ecru.vercel.app/verify/${prisma?.emailToken}" style="background-color: #3b82f6; color: #ffffff; font-weight: bold; text-decoration: none; padding: 10px 20px; border-radius: 4px; display: inline-block; transition: background-color 0.3s ease;">Verify Email Address</a>
                  <p style="margin-top: 20px;">If you didn't create an account with us, you can safely ignore this email.</p>
              </div>
          </div>
      </body>`,
          to: prisma?.email,
        });
      }
    }
    if (signInData?.error) {
      toast({
        title: "Error",
        description: "Invalid email or password",
        variant: "destructive",
      });
    } else {
      const userSession = await getSession();
      if (userSession?.user?.role === "admin") {
        router.push("/admin");
        router.refresh();
      } else {
        router.push("/");
        router.refresh();
      }
    }
  };

  return (
    <div className="max-w-7xl mx-auto my-10 px-5 relative">
      <div className=" grid grid-cols-2 max-md:grid-cols-1 border border-border rounded-3xl">
        <div className="relative bg-muted  overflow-hidden rounded-l-3xl border-r max-md:rounded-md max-md:border border-border">
          <img
            src="accountpageimg.png"
            alt=""
            className="bg-cover bg-no-repeat bg-center  max-h-[700px] w-full"
          />
        </div>
        <div className=" mx-auto flex  flex-col items-center justify-center w-full space-y-6 sm:w-[350px] max-md:px-8 max-md:py-5">
          <div className="flex flex-col items-center space-y-2">
            <h1 className="text-2xl font-semibold tracking-tight ">Sign in</h1>
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
                {<p className="text-center text-sm text-muted-foreground"></p>}
              </form>
            </Form>
          </div>
        </div>
      </div>
    </div>
  );
}
