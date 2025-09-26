"use client";

import { ChevronLeft } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import BlockEditor from "@/components/layout/blockEditor";
import useSWR from "swr";
import { fetcher } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function SpaceNotePage() {
  const router = useRouter();
  const params = useParams<{ id: string; noteId: string }>();
  const id = params.id;
  const noteId = params.noteId;

  const {
    data: note,
    isLoading,
    error,
  } = useSWR(`/api/space/${id}/note/${noteId}/read`, fetcher, {
    refreshInterval: 2000,
  });

  if (isLoading) return <p className="p-5">Loading...</p>;
  if (error) return <p className="">Please.. refresh this page</p>;

  return (
    <div className="max-h-screen h-screen w-full flex flex-col">
      <div
        onClick={() => router.push(`/space/${id}/message`)}
        className="h-15 bg-slate-900 flex items-center px-5 text-white cursor-pointer"
      >
        <ChevronLeft />
        <p>Back</p>
      </div>

      <div className="h-full">
        <div className="p-10 h-full space-y-5">
          <div className="w-full flex justify-between">
            <h1 className="text-xl font-bold">{note.title}</h1>
            {note.role === "ADMIN" && (
              <div className="flex gap-3">
                <Link href={`/space/${id}/note/${noteId}/edit`}>
                  <Button className="rounded">Edit</Button>
                </Link>
                <Button disabled variant={"destructive"} className="rounded">
                  Delete
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
