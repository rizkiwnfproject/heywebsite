"use client";

import HeaderMessage from "@/components/layout/headerMessage";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { createMessageSchema } from "@/lib/schema";
import { supabaseGetFile } from "@/lib/supabase";
import { fetcher } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { EllipsisVertical, Paperclip, SendHorizontal } from "lucide-react";
import Image from "next/image";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import useSWR from "swr";
import z from "zod";

type Params = {
  id: string;
};

interface SpaceMessageProps {
  params: Params;
}

interface messageProps {
  id: string;
  message: string;
  photo?: string | null;
  createdAt: string;
  User: { id: string; name: string; photo?: string | null };
  Space: { id: string; name: string };
}

export default function SpaceMessagePage({ params }: SpaceMessageProps) {
  const { id } = params;

  const { data: space, error: spaceError } = useSWR(
    `/api/space/${id}/detail/read`,
    fetcher
  );

  const { data, error, isLoading, mutate } = useSWR(
    `/api/space/${id}/message/read`,
    fetcher,
    { refreshInterval: 2000 }
  );

  const messages: messageProps[] = data?.messages ?? [];
  const currentUserId: string = data?.currentUserId ?? "";

  const form = useForm<z.infer<typeof createMessageSchema>>({
    resolver: zodResolver(createMessageSchema),
    defaultValues: { message: "", photo: "" },
  });

  const onSubmit = async (val: z.infer<typeof createMessageSchema>) => {
    try {
      await fetch(`/api/space/${id}/message/create`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(val),
      });
      toast("Sukses", {
        description: "Pesan berhasil dikirim",
      });
      form.reset();
      mutate();
    } catch (error) {
      console.log(error);
      toast("Error", {
        description: "Data yang diinputkan salah",
      });
    }
  };

  const bottomRef = React.useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  if (isLoading) return <p className="p-5">Loading...</p>;
  if (error) return <p className="p-5 text-red-500">Error load pesan</p>;

  return (
    <>
      <div className="max-h-screen h-screen w-full flex flex-col justify-between">
        {/* header */}
        <HeaderMessage
          name={space?.name ?? "Loading..."}
          nameNote="Lesson"
          spaceId={id}
        />
        {/* chat */}
        <div className="flex-1 p-5 space-y-2 overflow-y-auto">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`w-full flex ${
                msg.User.id === currentUserId ? "justify-end" : "justify-start"
              }`}
            >
              {msg.User.id !== currentUserId &&
                (msg.User.photo ? (
                  <Image
                    src={supabaseGetFile(msg.User.photo, "user")}
                    alt=""
                    width={40}
                    height={40}
                    className="w-10 h-10 mr-2 rounded-full object-cover"
                  />
                ) : (
                  <div className="w-10 h-10 bg-slate-700 rounded-full flex items-center justify-center text-white mr-2">
                    {msg.User.name.charAt(0)}
                  </div>
                ))}
              <div
                className={`min-w-40 max-w-[40%] p-3 rounded space-y-2 ${
                  msg.User.id === currentUserId
                    ? "bg-green-800 text-white"
                    : "bg-slate-100"
                }`}
              >
                {msg.User.id !== currentUserId && (
                  <div className="flex items-center justify-between">
                    <p className="font-semibold text-sm">{msg.User.name}</p>
                    <EllipsisVertical className="w-4" />
                  </div>
                )}
                {msg.message && (
                  <p className="break-words text-sm">{msg.message}</p>
                )}
                {msg.photo && (
                  <Image
                    src={msg.photo}
                    alt="image"
                    width={200}
                    height={200}
                    className="rounded"
                  />
                )}
              </div>
            </div>
          ))}
          <div ref={bottomRef} />
        </div>
        <div className="">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="">
              <div className="relative">
                <FormField
                  control={form.control}
                  name="message"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Textarea
                          className="bg-white rounded-none focus-visible:ring-0 focus-visible:border-t border-0 border-t resize-none pr-30"
                          placeholder="Tulis Pesan"
                          {...field}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <Button className="absolute -translate-y-1/2 top-1/2 right-5  p-2 rounded">
                  <SendHorizontal />
                </Button>
              </div>
            </form>
          </Form>
          {/* <div className="h-2 bg-slate-900"></div> */}
        </div>
      </div>
    </>
  );
}
