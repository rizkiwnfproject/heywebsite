"use client";

import ImageUploader from "@/components/layout/imageUploader";
import TextInputField from "@/components/layout/textInputField";
import { Button } from "@/components/ui/button";
import {
  Form,
} from "@/components/ui/form";
import { Separator } from "@/components/ui/separator";
import { updateProfileSchema } from "@/lib/schema";
import {
  supabaseDeleteFile,
  supabaseGetFile,
  supabaseUploadFile,
} from "@/lib/supabase";
import { fetcher } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import dayjs from "dayjs";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import useSWR from "swr";
import z from "zod";

export default function ProfileEditPage() {
  const router = useRouter();
  const [isDisabled, setIsDisabled] = useState(false);

  const form = useForm<z.infer<typeof updateProfileSchema>>({
    resolver: zodResolver(updateProfileSchema),
    defaultValues: { username: "", name: "", email: "", number_phone: "" },
  });

  const {
    data: profile,
    error,
    isLoading,
    mutate,
  } = useSWR("/api/me/read", fetcher);

  useEffect(() => {
    if (profile) {
      form.reset(profile);
    }
  }, [profile, form]);

  useEffect(() => {
    if (profile?.lastUsernameChange) {
      const diff = dayjs().diff(dayjs(profile.lastUsernameChange), "day");
      if (diff < 7) {
        setIsDisabled(true);
      }
    }
  }, [profile]);

  const onSubmit = async (val: z.infer<typeof updateProfileSchema>) => {
    try {
      let photoFilename = profile.photo;

      if (val.photo instanceof FileList && val.photo.length > 0) {
        const file = val.photo[0];
        const { error, filename } = await supabaseUploadFile(file, "user");
        if (error) throw error;
        console.log(profile.photo);

        if (profile.photo) {
          await supabaseDeleteFile(profile.photo, "user");
        }

        photoFilename = filename;
      }

      const res = await fetch("/api/me/update", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...val,
          photo: photoFilename as string,
        }),
      });
      if (!res.ok) throw new Error("Failed to update profile");
      const updated = await res.json();
      mutate(updated, false);
      router.push("/profile");
    } catch (error) {
      console.log(error);
    }
  };

  const photoUrl = profile?.photo
    ? supabaseGetFile(profile.photo, "user")
    : null;

  return (
    <>
      <div className="h-screen flex flex-col justify-center items-center">
        <div className="p-10 w-[700px] border border-mutate rounded space-y-2">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <div className="w-full flex items-center justify-center mb-5">
                <div className="w-full space-y-4 flex flex-col items-center justify-center">
                  <ImageUploader
                    control={form.control}
                    name="photo"
                    photoUrl={photoUrl}
                  />
                </div>
              </div>
              <TextInputField
                control={form.control}
                name="username"
                label="Username"
                disabled={isDisabled}
                placeholder="Please enter your username"
                formDescription="username only can be updated once every 7 days"
              />
              <TextInputField
                control={form.control}
                name="name"
                label="Name"
                placeholder="Please enter your name"
              />
              <TextInputField
                control={form.control}
                name="email"
                label="Email"
                type="email"
                placeholder="Please enter your email"
              />
              <TextInputField
                control={form.control}
                name="number_phone"
                label="Phone number"
                disabled={true}
                placeholder="Please enter your phone number"
              />
              <Separator />
              <Button className="w-full mt-2 font-semibold">
                Update Profile
              </Button>
            </form>
          </Form>
        </div>
      </div>
    </>
  );
}
