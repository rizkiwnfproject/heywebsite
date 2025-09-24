"use client";

import CKeditor from "@/components/layout/CKEditor";
import HeaderMessage from "@/components/layout/headerMessage";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { createNoteSchema } from "@/lib/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { ChevronLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { FC, use } from "react";
import { useForm } from "react-hook-form";
import z from "zod";

type Params = {
  id: string;
  noteId: string
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
  const router = useRouter();

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
      <div className="max-h-screen h-screen w-full flex flex-col">
        {/* header */}
        <div
          onClick={() => router.push(`/${params.id}/message`)}
          className="h-15 bg-primary flex items-center px-5 text-white cursor-pointer"
        >
          <ChevronLeft />
          <p>kembali</p>
        </div>
        <div className="">
            ss
        </div>
      </div>
    </>
  );
};

export default SpaceNotePage;
