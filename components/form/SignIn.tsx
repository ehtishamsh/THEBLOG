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
import { useRouter } from "next/navigation";
import { getSession, signIn } from "next-auth/react";

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
    const checkToken = await fetch(
      "http://localhost:3000/api/user/checktoken",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: values.email }),
      }
    );
    if (checkToken.ok) {
      const checkTokenData = await checkToken.json();
      if (signInData?.error === "CredentialsSignin") {
        toast({
          title: "Error",
          description: "Invalid email or password",
          variant: "destructive",
        });
      } else if (signInData?.error === "unverified") {
        if (checkTokenData?.type === "invalid") {
          toast({
            title: "Error",
            description: "Invalid email or password",
            variant: "destructive",
          });
        } else if (checkTokenData?.type === "sentalready") {
          toast({
            title: "Error",
            description: "Email already sent",
            variant: "destructive",
          });
        } else if (checkTokenData?.type === "sent") {
          toast({
            title: "success",
            description:
              "Email verification sent again. Check your spam folder.",
            variant: "success",
          });
        }
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
