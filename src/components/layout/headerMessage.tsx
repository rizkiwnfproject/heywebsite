"use client"

import {
  ChevronLeft,
  ChevronRight,
  EllipsisVertical,
  Plus,
} from "lucide-react";
import { useRouter } from "next/navigation";
import React, { FC } from "react";

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
  return (
    <>
      <div className="">
        <div className="h-15 bg-primary flex items-center p-5 gap-2 cursor-pointer" onClick={() => router.push(`/${id}/detail`)}>
          <p className="font-semibold">{name}</p>
          {/* <EllipsisVertical /> */}
          <ChevronRight className="w-4 pt-1" />
        </div>
        <div className="h-10 bg-slate-100 flex items-center p-5 space-x-2">
          <div className="flex items-center gap-2 px-3 py-1 bg-blue-700 rounded">
            <p>{nameNote}</p>
          </div>
          <div className="flex items-center gap-2 px-3 py-1 bg-blue-700 rounded">
            <p>add </p>
            <Plus className="w-4" />
          </div>
        </div>
      </div>
    </>
  );
};

export default HeaderMessage;
