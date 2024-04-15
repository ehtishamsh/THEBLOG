"use client";
import React, { useEffect, useState } from "react";
import { useToast } from "../ui/use-toast";
import { useRouter } from "next/navigation";

function Verfiy({ tokken }: { tokken: string }) {
  const { toast } = useToast();
  const [data, setData] = useState<any>({});
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
    <div className="Max-w-7xl mx-auto flex justify-center items-center">
      <div className="animate-pulse">
        <h1 className="text-3xl font-semibold mb-4">Verifying...</h1>
        <p className="text-2xl font-semibold">
          Please wait while we verify your account
        </p>
      </div>
    </div>
  );
}

export default Verfiy;
