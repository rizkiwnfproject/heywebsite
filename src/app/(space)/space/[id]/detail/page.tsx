"use client";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { supabaseGetFile } from "@/lib/supabase";
import { fetcher } from "@/lib/utils";
import { Check, ChevronLeft, Link, X } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";
import useSWR from "swr";

type Params = {
  id: string;
};

interface SpaceDetailProps {
  params: Params;
}

interface SpaceProps {
  id: string;
  name: string;
  description?: string | null;
  avatar?: string | null;
  createdBy: string;
  createdAt: string;
  permission: boolean;
  role: string;
  SpaceMember: any[];
  User: string;
  creator: { id: string; name: string };
}

const SpaceDetailPage = ({ params }: SpaceDetailProps) => {
  const { id } = params;
  const router = useRouter();

  const {
    data: space,
    error,
    isLoading,
    mutate,
  } = useSWR<SpaceProps>(`/api/space/${id}/detail/read`, fetcher);

  console.log(space);

  if (isLoading) return <p className="p-5">Loading...</p>;
  if (error) return <p className="p-5 text-red-500">Error loading spaces</p>;
  if (!space) return <p className="p-5">Tidak ada data</p>;

  const handleInviteSpace = async () => {
    try {
      const res = await fetch(`/api/space/${id}/invite/create`, {
        method: "POST",
      });

      if (!res.ok) throw new Error("Gagal generate invite");

      const data = await res.json();

      await navigator.clipboard.writeText(data.inviteUrl);

      alert(`Link invite disalin: ${data.inviteUrl}`);
    } catch (err) {
      console.error(err);
      alert("Terjadi error saat generate link invite");
    }
  };

  const handleStatusMember = async (
    memberId: string,
    status: "ACCEPTED" | "REJECTED"
  ) => {
    try {
      await fetch(`/api/space/member/${memberId}/update`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
      });
      router.refresh();
    } catch (error) {
      console.log(error);
    }
  };

  const avatarUrl = space.avatar
    ? supabaseGetFile(space.avatar, "space")
    : null;

  return (
    <>
      <div className="max-h-screen h-screen w-full">
        <div className="h-15 bg-slate-900 px-5 flex items-center justify-between">
          <div
            onClick={() => router.push(`/space/${params.id}/message`)}
            className="flex items-center  text-white cursor-pointer"
          >
            <ChevronLeft />
            <p>Kembali</p>
          </div>
          <div className="space-x-2 flex items-center font-semibold">
            <Button onClick={handleInviteSpace} variant={"outline"}>
              <Link />
              <p className="">Share</p>
            </Button>
            {space.role === "ADMIN" && (
              <>
                <Button
                  onClick={() => router.push(`/space/${id}/edit`)}
                  className="bg-yellow-400 hover:bg-yellow-500 text-black"
                >
                  Edit
                </Button>
                <Button disabled variant={"destructive"}>
                  Delete
                </Button>
              </>
            )}
          </div>
        </div>
        <div className="p-10 space-y-4 ">
          <div className="grid lg:grid-cols-3 gap-3">
            <div className="lg:col-span-2 space-y-4">
              <div className="p-5 border border-border space-y-3 rounded-lg ">
                <p className="text-2xl font-semibold">{space.name}</p>
                <p className="text-slate-400">
                  Dibuat oleh :{" "}
                  <span className="text-black font-medium capitalize">
                    {space.creator.name}
                  </span>
                </p>
                <p className="text-justify text-sm">
                  {space.description
                    ? space.description
                    : "The description is empty"}
                </p>
              </div>
              <div className="p-5 border border-border space-y-3 rounded-lg flex items-center justify-between">
                <p className="font-semibold">Permission</p>
                <p
                  className={`${
                    space.permission ? "bg-primary" : "bg-destructive"
                  } px-4 py-1 rounded font-semibold text-white`}
                >
                  {space.permission ? "True" : "False"}
                </p>
              </div>
            </div>
            <div className="border rounded-lg h-full flex flex-col items-center justify-center p-5 space-y-3">
              <div className="w-40 h-40 bg-slate-700 rounded-full flex items-center justify-center text-5xl text-white overflow-hidden">
                {avatarUrl ? (
                  <Image
                    src={avatarUrl}
                    alt={space.name}
                    width={160}
                    height={160}
                    className="object-cover w-40 h-40 rounded-full"
                  />
                ) : (
                  <span>{space.name.charAt(0)}</span>
                )}
              </div>
            </div>
          </div>
          <Separator />
          <div
            className={`grid  ${
              space.role === "ADMIN" ? "grid-cols-2" : "grid-cols-1"
            } gap-3`}
          >
            <div className="border border-border max-h-[325px] h-full p-5 space-y-3 overflow-y-auto">
              <p className="font-semibold">Member Space</p>
              <div className="space-y-2">
                {space.SpaceMember.filter(
                  (member) => member.status === "ACCEPTED"
                ).map((member) => (
                  <div className="w-full flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 bg-gray-500 rounded-full" />
                      <p className="text-sm">{member.User.name}</p>
                    </div>
                    {member.role === "ADMIN" && (
                      <p className="text-sm bg-primary px-3 py-1 font-medium text-white rounded">
                        Admin
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </div>
            {space.role === "ADMIN" && (
              <div className="border border-border max-h-[325px] h-full p-5 space-y-3 overflow-y-auto">
                <p className="font-semibold">Invite Member Space</p>
                <div className="space-y-2">
                  {space.SpaceMember.filter(
                    (member) => member.status === "PENDING"
                  ).map((member) => (
                    <div
                      key={member.id}
                      className="w-full flex items-center justify-between"
                    >
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 bg-gray-500 rounded-full" />
                        <p className="text-sm">{member.User.name}</p>
                      </div>
                      <div className="space-x-2">
                        <Button
                          onClick={() =>
                            handleStatusMember(member.id, "REJECTED")
                          }
                          variant={"destructive"}
                        >
                          <X />
                        </Button>
                        <Button
                          onClick={() =>
                            handleStatusMember(member.id, "ACCEPTED")
                          }
                          className="bg-green-700 hover:bg-green-800"
                        >
                          <Check />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default SpaceDetailPage;
