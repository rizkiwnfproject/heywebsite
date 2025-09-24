"use client";

import {
  ChevronLeft,
  ChevronRight,
  EllipsisVertical,
  Plus,
} from "lucide-react";
import { useRouter } from "next/navigation";
import React, { FC } from "react";
import { Button } from "../ui/button";
import AddNoteModal from "./addNote";

interface HeaderMessageProps {
  name: string;
  nameNote: string;
  id: string;
}

const HeaderMessage: FC<HeaderMessageProps> = ({
  name = "nama space",
  nameNote = "Lesson",
  id,
}) => {
  const router = useRouter();
  console.log("id dari header", id);
  
  return (
    <>
      <div className="">
        <div
          className="h-15 bg-primary flex items-center p-5 gap-2 cursor-pointer"
          onClick={() => router.push(`/${id}/detail`)}
        >
          <p className="font-semibold">{name}</p>
          {/* <EllipsisVertical /> */}
          <ChevronRight className="w-4 pt-1" />
        </div>
        <div className="bg-slate-100 flex items-center px-5 py-2 space-x-2">
          <AddNoteModal id={id} />
          <Button className="flex items-center gap-2 px-3 py-1 bg-blue-700 rounded">
            <p>{nameNote} </p>
          </Button>
        
        </div>
      </div>
    </>
  );
};

export default HeaderMessage;
