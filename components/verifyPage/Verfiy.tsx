"use client";
import React, { useEffect, useState } from "react";
import { useToast } from "../ui/use-toast";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";

interface DATA {
  message: string;
  user?: {
    id: string;
    email: string;
    username: string;
    password: string;
    role: string;
    image: string;
    createdAt: Date;
    updatedAt: Date;
    emailVerified: boolean;
    emailToken: string | null;
    emailTokenExpiry: Date | null;
  } | null;
  type: string;
  redirect: string;
}
function Verfiy({ tokken }: { tokken: string }) {
  const { toast } = useToast();
  const [data, setData] = useState<DATA>();
  const router = useRouter();
  useEffect(() => {
    const verify = async () => {
      const res = await fetch(
        `https://theblogs-ecru.vercel.app/api/user/verify/${tokken}`,
        {
          method: "GET",
        }
      );
      const getRes = await res.json();
      setTimeout(() => {
        setData(getRes);
      }, 3000);
    };
    verify();
    return () => {};
  }, [tokken]);
  useEffect(() => {
    setTimeout(async () => {
      if (data?.type === "valid") {
        toast({
          title: "Account Verified",
          description: "Your account has been verified",
          variant: "success",
        });
        setTimeout(() => {
          router.push("/sign-in");
        }, 2000);
      }
      if (data?.type === "invalid") {
        toast({
          title: "Invalid Token",
          description: "Your token is invalid",
          variant: "destructive",
        });
        setTimeout(() => {
          router.push("/sign-in");
        }, 2000);
      }
      if (data?.type === "expired") {
        toast({
          title: "Expired Token",
          description: "Your token has expired",
          variant: "destructive",
        });
        setTimeout(() => {
          router.push("/sign-in");
        }, 2000);
      }
    }, 4000);
  }, [data]);
  return (
    <div className="Max-w-7xl mx-auto h-[70vh] flex justify-center items-center">
      <div className="animate-pulse">
        <h1 className="text-3xl font-semibold mb-4">Account Verification</h1>
        <p className="text-2xl font-semibold">
          {data?.type === "valid" ? (
            <span className="text-green-500">
              Your account has been verified
            </span>
          ) : data?.type === "invalid" ? (
            "Your token is invalid please try again"
          ) : data?.type === "expired" ? (
            "Expired Token"
          ) : (
            <span className="flex justify-center items-center  mt-5 animate-pulse">
              <Loader2 className="animate-spin h-14 w-14 " />
            </span>
          )}
        </p>
      </div>
    </div>
  );
}

export default Verfiy;
