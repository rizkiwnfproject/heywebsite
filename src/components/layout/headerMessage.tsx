"use client";

import { Info } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { FC } from "react";
import { Button } from "../ui/button";
import AddNoteModal from "./addNote";
import { fetcher } from "@/lib/utils";
import useSWR from "swr";
import Link from "next/link";

interface HeaderMessageProps {
  name: string;
  nameNote: string;
  spaceId: string;
}

interface Note {
  id: string;
  title: string;
}

const HeaderMessage: FC<HeaderMessageProps> = ({
  name = "nama space",
  nameNote = "Lesson",
  spaceId,
}) => {
  const router = useRouter();

  const { data: space, mutate } = useSWR(
    `/api/space/${spaceId}/detail/read`,
    fetcher
  );

  console.log(space);

  const { data, error, isLoading } = useSWR<{ notes: Note[] }>(
    `/api/space/${spaceId}/note/read`,
    fetcher,
    { refreshInterval: 2000 }
  );

  if (isLoading)
    return (
      <>
        <div className="h-screen w-full flex justify-center items-center">
          <p className="p-5 text-xl font-semibold">Loading...</p>
        </div>
      </>
    );
  if (error)
    return (
      <>
        <div className="h-screen w-full flex justify-center items-center">
          <p className="p-5 text-xl font-semibold">
            Please.. refresh this page
          </p>
        </div>
      </>
    );
  const notes = data?.notes ?? [];

  return (
    <>
      <div className="">
        <div className="h-15 bg-slate-900 flex items-center p-5 gap-2 cursor-pointer justify-between">
          <p className="font-semibold text-xl text-white">{name}</p>
          <div className="flex gap-2">
            <Link href={`/space/${spaceId}/detail`}>
              <Button>
                <Info />
                Detail
              </Button>
            </Link>
          </div>
        </div>
        <div className="bg-slate-100 flex items-center px-5 py-3 space-x-2 border-b border-b-slate-300 overflow-x-auto">
          {space?.role === "ADMIN" && <AddNoteModal id={spaceId} />}
          {notes.length > 0 ? (
            notes.map((note) => (
              <Link href={`/space/${spaceId}/note/${note.id}`}>
                <Button
                  key={note.id}
                  className="flex items-center gap-2 px-3 py-1  rounded"
                >
                  <p>{note.title} </p>
                </Button>
              </Link>
            ))
          ) : (
            <Button variant={"outline"}>No notes yet</Button>
          )}
        </div>
      </div>
    </>
  );
};

export default HeaderMessage;
