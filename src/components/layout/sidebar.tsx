import React from "react";

import Image from "next/image";
import { LogOut, MessageCircleMore, Settings, User } from "lucide-react";
import { Separator } from "@/components/ui/separator";

import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";

const Sidebar = ({
  setActivePage,
}: {
  setActivePage: (page: string) => void;
}) => {
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
      <div className="w-15 h-screen bg-primary pt-12 px-2 space-y-6 rounded-br-2xl rounded-tr-2xl">
        <div className="flex flex-col items-center space-y-6 text-white">
          <Tooltip>
            <TooltipTrigger onClick={() => setActivePage("chat")}>
              <MessageCircleMore />
            </TooltipTrigger>
            <TooltipContent>
              <p>Space</p>
            </TooltipContent>
          </Tooltip>
        </div>
        <div className="space-y-6">
          {/* <div className="" onClick={() => setActivePage("settings")}> */}
          <div className="text-white w-full flex justify-center items-center ">
            <User />
          </div>
          <div className="flex flex-col items-center space-y-6 text-white">
            <Tooltip>
              <TooltipTrigger onClick={handleLogout}>
                <LogOut className="text-destructive" />
              </TooltipTrigger>
              <TooltipContent>
                <p>Logout</p>
              </TooltipContent>
            </Tooltip>
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
