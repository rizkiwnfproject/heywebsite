"use client";

import AddSpaceModal from "@/components/layout/addSpace";
import { Separator } from "@/components/ui/separator";
import { supabaseGetFile } from "@/lib/supabase";
import { fetcher } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";

import useSWR from "swr";

interface Space {
  id: string;
  name: string;
  description?: string | null;
  avatar?: string | null;
  createdBy: string;
  createdAt: string;
  Message: { id: string; message: string; createdAt: string }[];
}

const ListSpacePage = () => {
  const {
    data: spaces,
    error,
    isLoading,
    mutate,
  } = useSWR<Space[]>("/api/space/read", fetcher);

  if (isLoading) return <p className="p-5">Loading...</p>;
  if (error) return <p className="p-5 text-red-500">Error loading spaces</p>;

  return (
    <>
      <div className="flex w-[30%]">
        <div className="h-screen w-full p-5 border-r border-border space-y-6">
          <div className="flex justify-between items-center">
            <p className="font-bold text-2xl">Spaces</p>
            <AddSpaceModal onSuccess={() => mutate()} />
          </div>
          <div className="h-[90%] space-y-3 overflow-y-auto">
            {spaces ? (
              spaces.map((space) => {
                const lastMessage =
                  space.Message[0]?.message ?? "Belum ada chat";
                const lastDate = space.Message[0]?.createdAt
                  ? new Date(space.Message[0].createdAt).toLocaleDateString(
                      "id-ID",
                      {
                        day: "2-digit",
                        month: "short",
                        year: "numeric",
                      }
                    )
                  : new Date(space.createdAt).toLocaleDateString("id-ID", {
                      day: "2-digit",
                      month: "short",
                      year: "numeric",
                    });
                const avatarUrl = space.avatar
                  ? supabaseGetFile(space.avatar, "space")
                  : null;

                return (
                  <>
                    <Link key={space.id} href={`/space/${space.id}/message`}>
                      <div className="flex items-center gap-2 p-2 w-full hover:bg-slate-50 rounded">
                        {avatarUrl ? (
                          <Image
                            src={avatarUrl}
                            alt={space.name}
                            width={50}
                            height={40}
                            className="rounded-full object-cover w-13 h-12 "
                            unoptimized 
                          />
                        ) : (
                          <div className="w-13 h-12 bg-slate-700 rounded-full flex items-center justify-center text-white">
                            {space.name.charAt(0)}
                          </div>
                        )}
                        <div className="w-full flex flex-col justify-between">
                          <div className="w-full flex justify-between items-center">
                            <p className="font-medium">{space.name}</p>
                            <p className="text-xs text-slate-400">{lastDate}</p>
                          </div>
                          <p className="text-xs text-slate-600">
                            {lastMessage}
                          </p>
                        </div>
                      </div>
                    </Link>
                    <Separator className="mt-2" />
                  </>
                );
              })
            ) : (
              <div className="">Tidak ada space</div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default ListSpacePage;
