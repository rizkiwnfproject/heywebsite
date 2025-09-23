import React from "react";

import Image from "next/image";
import { MessageCircleMore, Settings } from "lucide-react";
import { Separator } from "@/components/ui/separator";

import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Button } from "../ui/button";

const Sidebar = ({
  setActivePage,
}: {
  setActivePage: (page: string) => void;
}) => {
  return (
    <>
      <div className="w-15 h-screen bg-sidebar pt-12 px-2 space-y-6 rounded-br-2xl rounded-tr-2xl">
        <div className="space-y-6">
          <div className="" onClick={() => setActivePage("settings")}>
            <Image
              width={50}
              height={50}
              src={"/images/sign/sign.jpg"}
              alt=""
              className="rounded-full"
            />
          </div>
          <Separator />
        </div>
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
      </div>
    </>
  );
};

export default Sidebar;
