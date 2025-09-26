"use client";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { supabaseGetFile } from "@/lib/supabase";
import { fetcher } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import useSWR from "swr";

const ProfilePage = () => {
  const {
    data: profile,
    error,
    isLoading,
    mutate,
  } = useSWR("/api/me/read", fetcher);

  if (isLoading) {
    return (
      <div className="h-screen flex justify-center items-center">
        <p>Loading...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="h-screen flex justify-center items-center">
        <p className="">Please.. refresh this page</p>
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="h-screen flex justify-center items-center">
        <p>No profile data found</p>
      </div>
    );
  }

  const photoUrl = profile.photo
    ? supabaseGetFile(profile.photo, "user")
    : null;


  return (
    <>
      <div className="h-screen flex flex-col justify-center items-center">
        <div className="p-10 h-[500px] w-[500px] border border-mutate rounded space-y-2">
          <div className="w-full flex items-center justify-center mb-5">
            <div className="w-36 h-36 rounded-full bg-slate-700 flex text-white items-center justify-center text-5xl">
              {photoUrl ? (
                <Image
                  src={photoUrl}
                  alt={profile.name}
                  width={160}
                  height={160}
                  className="object-cover w-40 h-40 rounded-full"
                />
              ) : (
                <span>{profile.name.charAt(0)}</span>
              )}
            </div>
          </div>
          <div className="grid grid-cols-2 space-y-3 ">
            <p className="font-semibold">Name</p>
            <p>: {profile.name}</p>
            <p className="font-semibold">Username</p>
            <p>: {profile.username}</p>
            <p className="font-semibold">Email</p>
            <p>: {profile.email}</p>
            <p className="font-semibold">Number Phone</p>
            <p>: {profile.number_phone}</p>
          </div>
          <Separator />
          <div className="grid grid-cols-2 ">
            <p className="font-semibold">Total Space</p>
            <p>: {profile.totalSpaces}</p>
          </div>
          <Separator />
          <Link href="/profile-edit">
            <Button className="w-full mt-5 font-semibold">Edit Profile</Button>
          </Link>{" "}
        </div>
      </div>
    </>
  );
};

export default ProfilePage;
