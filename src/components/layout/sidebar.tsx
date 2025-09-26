"use client";

import React from "react";
import { LogOut, MessageCircleMore, User } from "lucide-react";
import { useRouter } from "next/navigation";
import { Button } from "../ui/button";

const Sidebar = () => {
  const router = useRouter();
  const handleLogout = async () => {
    try {
      await fetch("/api/sign-out", { method: "POST" });
      router.push("/sign-in");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="w-[10%] h-screen bg-slate-900 pt-12 px-2 space-y-6 ">
        <div className="flex flex-col items-center space-y-6 text-white">
          <Button variant={"ghost"} onClick={() => router.push("/space")}>
            <div className="flex items-center gap-2">
              <MessageCircleMore />
              Spaces
            </div>
          </Button>
        </div>
        <div className="space-y-6">
          <div className="text-white w-full flex justify-center items-center ">
            <Button variant={"ghost"} onClick={() => router.push("/profile")}>
              <div className="flex items-center gap-2">
                <User />
                Profile
              </div>
            </Button>
          </div>
          <div className="flex flex-col items-center space-y-6 text-white">
            <Button variant={"ghost"} onClick={handleLogout}>
              <div className="flex items-center gap-2">
                <LogOut className="text-destructive" />
                Logout
              </div>
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
