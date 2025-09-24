"use client"

import CKeditor from "@/components/layout/CKEditor";
import HeaderMessage from "@/components/layout/headerMessage";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { createNoteSchema } from "@/lib/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { FC, use } from "react";
import { useForm } from "react-hook-form";
import z from "zod";

type Params = {
  id: string;
};

interface SpaceNoteProps {
  params: Params;
  id: string;
  title: string;
  content: string | null;
  photo: string | null;
  link: string | null;
}

const SpaceNotePage: FC<SpaceNoteProps> = ({
  params,
  content,
  id,
  link,
  photo,
  title,
}) => {
  const form = useForm<z.infer<typeof createNoteSchema>>({
    resolver: zodResolver(createNoteSchema),
    defaultValues: {
      title: "",
      content: "",
    },
  });

  const onSubmit = async (val: z.infer<typeof createNoteSchema>) => {
    try {
      console.log(val);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <div className="max-h-screen h-screen w-full flex flex-col justify-between">
        {/* header */}
        <HeaderMessage name={"sss"} nameNote="Lesson" id={id} />
        <div className="">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-7">
              <FormField
                control={form.control}
                name="title"
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
            </form>
          </Form>
        </div>
      </div>
    </>
  );
};

export default SpaceNotePage;
