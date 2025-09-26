"use client";

import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { createNoteSchema } from "@/lib/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { ChevronLeft } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import z from "zod";
import BlockEditor from "@/components/layout/blockEditor";

export default function SpaceNotePage() {
  const router = useRouter();
  const params = useParams<{ id: string; noteId: string }>(); 
  const id = params.id;
  const noteId = params.noteId;
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(true);

  const form = useForm<z.infer<typeof createNoteSchema>>({
    resolver: zodResolver(createNoteSchema),
    defaultValues: { title: "", content: "" },
  });

  useEffect(() => {
    const fetchNote = async () => {
      try {
        const res = await fetch(`/api/space/${id}/note/${noteId}/read`);
        if (!res.ok) throw new Error("Failed to fetch note");
        const note = await res.json();

        form.reset({ title: note.title, content: note.content });
        setContent(note.content || "");
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchNote();
  }, [params, form]);

  const onSubmit = async (val: z.infer<typeof createNoteSchema>) => {
    try {
      const res = await fetch(`/api/space/${id}/note/${noteId}/update`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...val, content }),
      });
      if (!res.ok) throw new Error("Failed to update note");

      router.push(`/space/${id}/note/${noteId}`);
    } catch (error) {
      console.error(error);
    }
  };

  if (loading) return <p className="p-5">Loading...</p>;

  return (
    <div className="max-h-screen h-screen w-full flex flex-col">
      {/* header */}
      <div
        onClick={() => router.push(`/space/${id}/message`)}
        className="h-15 bg-slate-900 flex items-center px-5 text-white cursor-pointer"
      >
        <ChevronLeft />
        <p>Back</p>
      </div>

      <div className="p-10 h-full">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-7">
            {/* Title */}
            <div className="grid grid-cols-6 items-center">
              <div className="col-span-2 font-semibold">Note title</div>
              <div className="col-span-4">
                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input
                          className="rounded p-5"
                          placeholder="Please enter note title"
                          {...field}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>
            </div>

            {/* Content */}
            <div className="grid grid-cols-6 items-start">
              <div className="col-span-2 font-semibold">Field note</div>
              <div className="col-span-4">
                <BlockEditor
                  initialContent={content}
                  onChange={(val) => setContent(val)}
                />
              </div>
            </div>

            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded w-full"
            >
              Update
            </button>
          </form>
        </Form>
      </div>
    </div>
  );
}
