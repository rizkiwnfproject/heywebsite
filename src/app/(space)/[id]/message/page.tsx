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
import { createMessageSchema } from "@/lib/schema";
import { fetcher } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { EllipsisVertical, Paperclip, SendHorizontal } from "lucide-react";
import Image from "next/image";
import React from "react";
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

  if (isLoading) return <p className="p-5">Loading...</p>;
  if (error) return <p className="p-5 text-red-500">Error load pesan</p>;

  return (
    <>
      <div className="max-h-screen h-screen w-full flex flex-col justify-between">
        {/* header */}
        <HeaderMessage
          name={space?.name ?? "Loading..."}
          nameNote="Lesson"
          id={id}
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
              {msg.User.id !== currentUserId && (
                <Image
                  src={msg.User.photo ?? "/images/sign/sign.jpg"}
                  alt=""
                  width={40}
                  height={40}
                  className="rounded-full"
                />
              )}
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
        </div>
        {/* input */}
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
                        <Input
                          className="bg-white pl-16  h-12 rounded-none focus-visible:border-0 focus-visible:border-t focus-visible:ring-0 border-0 border-t"
                          placeholder="Tulis Pesan"
                          {...field}
                        />
                      </FormControl>
                      {/* <FormMessage /> */}
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="photo"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <div className="absolute top-1 left-3 hover:bg-primary p-2 rounded hover:text-white flex">
                          <Paperclip />

                          <Input
                            type="file"
                            accept=".jpg,.jpeg,.png"
                            className="w-10 absolute top-0 left-0 file:text-transparent bg-transparent border-none"
                          />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button className="absolute top-2 right-3  p-2 rounded">
                  <SendHorizontal />
                </Button>
              </div>
            </form>
          </Form>
          <div className="h-2 bg-blue-600"></div>
        </div>
      </div>
    </>
  );
}
