import AddSpaceModal from "@/components/layout/addSpace";
import { MessageCirclePlus } from "lucide-react";
import Image from "next/image";
import React from "react";

const ListChatPage = () => {
  return (
    <>
      <div className="h-screen max-w-80 p-5 border-r border-border space-y-6">
        <div className="flex justify-between items-center">
          <p className="font-bold text-2xl">Spaces</p>
          <AddSpaceModal />
        </div>
        {/* search */}
        <div className="h-[90%] space-y-3 overflow-y-auto">
          <div className="flex items-center gap-2 p-2 w-full hover:bg-slate-50 rounded">
            <Image
              src={"/images/sign/sign.jpg"}
              alt=""
              width={50}
              height={50}
            />
            <div className="w-full flex flex-col justify-between">
              <div className="w-full flex justify-between items-center">
                <p className="font-medium">General Notes</p>
                <p className="text-xs text-slate-300">Yesterday</p>
              </div>
              <p className="text-xs text-slate-600">
                Lorem ipsum dolor sit amet{" "}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2 p-2 w-full hover:bg-slate-50 rounded">
            <Image
              src={"/images/sign/sign.jpg"}
              alt=""
              width={50}
              height={50}
            />
            <div className="w-full flex flex-col justify-between">
              <div className="w-full flex justify-between items-center">
                <p className="font-medium">General Notes</p>
                <p className="text-xs text-slate-300">Yesterday</p>
              </div>
              <p className="text-xs text-slate-600">
                Lorem ipsum dolor sit amet{" "}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2 p-2 w-full hover:bg-slate-50 rounded">
            <Image
              src={"/images/sign/sign.jpg"}
              alt=""
              width={50}
              height={50}
            />
            <div className="w-full flex flex-col justify-between">
              <div className="w-full flex justify-between items-center">
                <p className="font-medium">General Notes</p>
                <p className="text-xs text-slate-300">Yesterday</p>
              </div>
              <p className="text-xs text-slate-600">
                Lorem ipsum dolor sit amet{" "}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2 p-2 w-full hover:bg-slate-50 rounded">
            <Image
              src={"/images/sign/sign.jpg"}
              alt=""
              width={50}
              height={50}
            />
            <div className="w-full flex flex-col justify-between">
              <div className="w-full flex justify-between items-center">
                <p className="font-medium">General Notes</p>
                <p className="text-xs text-slate-300">Yesterday</p>
              </div>
              <p className="text-xs text-slate-600">
                Lorem ipsum dolor sit amet{" "}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2 p-2 w-full hover:bg-slate-50 rounded">
            <Image
              src={"/images/sign/sign.jpg"}
              alt=""
              width={50}
              height={50}
            />
            <div className="w-full flex flex-col justify-between">
              <div className="w-full flex justify-between items-center">
                <p className="font-medium">General Notes</p>
                <p className="text-xs text-slate-300">Yesterday</p>
              </div>
              <p className="text-xs text-slate-600">
                Lorem ipsum dolor sit amet{" "}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2 p-2 w-full hover:bg-slate-50 rounded">
            <Image
              src={"/images/sign/sign.jpg"}
              alt=""
              width={50}
              height={50}
            />
            <div className="w-full flex flex-col justify-between">
              <div className="w-full flex justify-between items-center">
                <p className="font-medium">General Notes</p>
                <p className="text-xs text-slate-300">Yesterday</p>
              </div>
              <p className="text-xs text-slate-600">
                Lorem ipsum dolor sit amet{" "}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2 p-2 w-full hover:bg-slate-50 rounded">
            <Image
              src={"/images/sign/sign.jpg"}
              alt=""
              width={50}
              height={50}
            />
            <div className="w-full flex flex-col justify-between">
              <div className="w-full flex justify-between items-center">
                <p className="font-medium">General Notes</p>
                <p className="text-xs text-slate-300">Yesterday</p>
              </div>
              <p className="text-xs text-slate-600">
                Lorem ipsum dolor sit amet{" "}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2 p-2 w-full hover:bg-slate-50 rounded">
            <Image
              src={"/images/sign/sign.jpg"}
              alt=""
              width={50}
              height={50}
            />
            <div className="w-full flex flex-col justify-between">
              <div className="w-full flex justify-between items-center">
                <p className="font-medium">General Notes</p>
                <p className="text-xs text-slate-300">Yesterday</p>
              </div>
              <p className="text-xs text-slate-600">
                Lorem ipsum dolor sit amet{" "}
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ListChatPage;
