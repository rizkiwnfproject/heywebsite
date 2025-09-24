"use client";

import { ChevronRight } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { FC, useEffect, useState } from "react";
import { Button } from "../ui/button";
import AddNoteModal from "./addNote";

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
  const [notes, setNotes] = useState<Note[]>([]);

  useEffect(() => {
    const fetchSpaces = async () => {
      try {
        const res = await fetch(`/api/space/${id}/note/read`);
        if (!res.ok) throw new Error("Failed to fetch note");
        const data = await res.json();
        console.log(data);

        setNotes(data.notes);
      } catch (err) {
        console.error(err);
      }
    };
    fetchSpaces();
  }, []);

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
