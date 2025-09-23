"use client";
import AddSpaceModal from "@/components/layout/addSpace";
import Image from "next/image";
import React, { useEffect, useState } from "react";

interface Space {
  id: string;
  name: string;
  description?: string | null;
  avatar?: string | null;
  createdBy: string;
}

const ListChatPage = () => {
  const [spaces, setSpaces] = useState<Space[]>([]);

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
      <div className="h-screen max-w-80 p-5 border-r border-border space-y-6">
        <div className="flex justify-between items-center">
          <p className="font-bold text-2xl">Spaces</p>
          <AddSpaceModal />
        </div>
        {/* search */}
        <div className="h-[90%] space-y-3 overflow-y-auto">
          {spaces.map((space) => (
            <div key={space.id} className="flex items-center gap-2 p-2 w-full hover:bg-slate-50 rounded">
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
          ))}
        </div>
      </div>
    </>
  );
};

export default ListChatPage;
