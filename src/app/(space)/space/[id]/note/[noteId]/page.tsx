h"use client";

import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { createNoteSchema } from "@/lib/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { ChevronLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import z from "zod";
import BlockEditor from "@/components/layout/blockEditor";
import useSWR from "swr";
import { fetcher } from "@/lib/utils";
import { Button } from "@/components/ui/button";

type Params = {
  id: string;
  noteId: string;
};

interface SpaceNoteProps {
  params: Params;
}

export default function SpaceNotePage({ params }: SpaceNoteProps) {
  const router = useRouter();
  const {
    data: note,
    isLoading,
    error,
  } = useSWR(`/api/space/${params.id}/note/${params.noteId}/read`, fetcher, { refreshInterval: 2000 });

  if (isLoading) return <p className="p-5">Loading...</p>;
  if (error) return <p className="p-5 text-red-500">Error loading note</p>;


  return (
    <div className="max-h-screen h-screen w-full flex flex-col">
      <div
        onClick={() => router.push(`/space/${params.id}/message`)}
        className="h-15 bg-primary flex items-center px-5 text-white cursor-pointer"
      >
        <ChevronLeft />
        <p>Kembali</p>
      </div>

      <div className="h-full">
        <div className="p-10 h-full space-y-5">
          <div className="w-full flex justify-between">
            <h1 className="text-xl font-bold">{note.title}</h1>
            {note.role === "ADMIN" && (
              <div className="flex gap-3">
                <Button
                  className="rounded"
                  onClick={() =>
                    router.push(`/space/${params.id}/note/${params.noteId}/edit`)
                  }
                >
                  Edit
                </Button>
                <Button disabled variant={"destructive"} className="rounded">
                  Hapus
                </Button>
              </div>
            )}
          </div>
          {typeof note.content === "string" && (
            <div
              className="prose max-w-full"
              dangerouslySetInnerHTML={{ __html: note.content }}
            />
          )}

          {typeof note.content === "object" && (
            <BlockEditor initialContent={note.content} readOnly />
          )}
        </div>
      </div>
    </div>
  );
}
