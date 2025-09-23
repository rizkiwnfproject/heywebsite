"use client";

import AddSpaceModal from "@/components/layout/addSpace";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import SpaceMessagePage from "../[id]/message/page";

interface Space {
  id: string;
  name: string;
  description?: string | null;
  avatar?: string | null;
  createdBy: string;
}

const ListChatPage = () => {
  const [spaces, setSpaces] = useState<Space[]>([]);
  const [openChat, setOpenChat] = useState<boolean>(false);

  useEffect(() => {
    const fetchSpaces = async () => {
      try {
        const res = await fetch("/api/space/read");
        if (!res.ok) throw new Error("Failed to fetch spaces");
        const data = await res.json();
        setSpaces(data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchSpaces();
  }, []);

  return (
    <>
      <div className="flex ">
        <div className="h-screen w-full p-5 border-r border-border space-y-6">
          <div className="flex justify-between items-center">
            <p className="font-bold text-2xl">Spaces</p>
            <AddSpaceModal />
          </div>
          {/* search */}
          <div className="h-[90%] space-y-3 overflow-y-auto">
            {spaces.map((space) => (
              <Link href={`/${space.id}/message`}>
                <div
                  key={space.id}
                  className="flex items-center gap-2 p-2 w-full hover:bg-slate-50 rounded"
                >
                  <Image
                    src={space.avatar ?? "/images/sign/sign.jpg"}
                    alt=""
                    width={50}
                    height={50}
                  />
                  <div className="w-full flex flex-col justify-between">
                    <div className="w-full flex justify-between items-center">
                      <p className="font-medium">{space.name}</p>
                      <p className="text-xs text-slate-300">Yesterday</p>
                    </div>
                    <p className="text-xs text-slate-600">
                      {space.description ?? "No description"}
                    </p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default ListChatPage;
