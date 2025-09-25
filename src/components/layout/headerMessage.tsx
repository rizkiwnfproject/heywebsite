"use client";

import { ChevronRight } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { FC, useEffect, useState } from "react";
import { Button } from "../ui/button";
import AddNoteModal from "./addNote";
import { fetcher } from "@/lib/utils";
import useSWR from "swr";

interface HeaderMessageProps {
  name: string;
  nameNote: string;
  id: string;
}

interface Note {
  id: string;
  title: string;
}

const HeaderMessage: FC<HeaderMessageProps> = ({
  name = "nama space",
  nameNote = "Lesson",
  id,
}) => {
  const router = useRouter();

  const { data, error, isLoading } = useSWR<{ notes: Note[] }>(
    `/api/space/${id}/note/read`,
    fetcher,
    { refreshInterval: 2000 }
  );

  if (isLoading) return <p className="p-5">Loading...</p>;
  if (error) return <p className="p-5 text-red-500">Error loading notes</p>;

  const notes = data?.notes ?? [];

  return (
    <>
      <div className="">
        <div className="h-15 bg-primary flex items-center p-5 gap-2 cursor-pointer justify-between">
          <p className="font-semibold text-xl text-white">{name}</p>
          {/* <EllipsisVertical /> */}
          <div className="flex gap-2">
            <Button variant={"outline"} onClick={() => router.push(`/${id}/detail`)}>Detail</Button>
            <Button className="bg-yellow-400 hover:bg-yellow-500 text-black">Edit</Button>
            <Button variant={"destructive"}>Delete</Button>
          </div>
        </div>
        <div className="bg-slate-100 flex items-center px-5 py-2 space-x-2">
          <AddNoteModal id={id} />
          {notes.map((note) => (
            <Button
              key={note.id}
              onClick={() => router.push(`/${id}/note/${note.id}`)}
              className="flex items-center gap-2 px-3 py-1 bg-blue-700 rounded"
            >
              <p>{note.title} </p>
            </Button>
          ))}
        </div>
      </div>
    </>
  );
};

export default HeaderMessage;
