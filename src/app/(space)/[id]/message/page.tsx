import HeaderMessage from "@/components/layout/headerMessage";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  EllipsisVertical,
  Paperclip,
  Plus,
  PlusCircle,
  SendHorizontal,
} from "lucide-react";
import Image from "next/image";
import React from "react";

interface Props {
  params: { id: string };
}

const SpaceMessagePage = async ({ params }: Props) => {
  const { id } = await params;
  console.log(id);

  return (
    <>
      <div className="max-h-screen h-screen w-full flex flex-col justify-between">
        {/* header */}
        <HeaderMessage name="nama space" nameNote="Lesson" id={id}/>
        {/* chat */}
        <div className="flex-1 p-5">
          {/* another user */}
          <div className="w-full flex justify-start">
            <div className="flex gap-2 items-start">
              <Image
                src={"/images/sign/sign.jpg"}
                alt=""
                width={50}
                height={50}
                className="rounded-full"
              />
              <div className="min-w-40 max-w-[40%] bg-slate-50 p-3 rounded space-y-3">
                <div className="flex items-center justify-between">
                  <p className="font-semibold text-sm">Nama Teman</p>
                  <EllipsisVertical className="w-4" />
                </div>
                <p className="break-words text-sm">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Cum
                  odit repudiandae quo velit blanditiis, at distinctio illum
                  provident eos enim dolores delectus quibusdam sit ad! Corrupti
                  cupiditate quas quidem distinctio!
                </p>
              </div>
            </div>
          </div>
          <div className="w-full flex justify-end">
            <div className="min-w-40 max-w-[40%] bg-green-500 p-3 rounded space-y-3">
              <p className="break-words text-sm">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Cum
                odit repudiandae quo velit blanditiis, at distinctio illum
                provident eos enim dolores delectus quibusdam sit ad! Corrupti
                cupiditate quas quidem distinctio!
              </p>
            </div>
          </div>
        </div>
        {/* input */}
        <div className="">
          <div className="relative">
            <Input className="bg-white pl-16  h-12 rounded-none focus-visible:border-0 focus-visible:border-t focus-visible:ring-0 border-0 border-t" />
            <div className="absolute top-1 right-3 hover:bg-primary p-2 rounded hover:text-white">
              <SendHorizontal />
            </div>
            <div className="absolute top-1 left-3 hover:bg-primary p-2 rounded hover:text-white flex">
              <Paperclip />
              <Input
                type="file"
                accept=".jpg,.jpeg,.png"
                className="w-10 absolute top-0 left-0 file:text-transparent bg-transparent border-none"
              />
            </div>
          </div>
          <div className="h-2 bg-blue-600"></div>
        </div>
      </div>
    </>
  );
};

export default SpaceMessagePage;
