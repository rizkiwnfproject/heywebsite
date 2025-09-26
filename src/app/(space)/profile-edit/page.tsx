"use client";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
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
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { ChangeEvent, useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import useSWR from "swr";
import z from "zod";

export default function ProfileEditPage() {
  const router = useRouter();
  const [isDisabled, setIsDisabled] = useState(false);

  const [preview, setPreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

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

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setPreview(URL.createObjectURL(file));
    }
  };

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
                  <div
                    className="w-36 h-36 rounded-full bg-slate-700 flex text-white items-center justify-center text-5xl cursor-pointer overflow-hidden"
                    onClick={() => fileInputRef.current?.click()}
                  >
                    {preview ? (
                      <Image
                        src={preview}
                        alt="Preview"
                        width={144}
                        height={144}
                        className="object-cover w-36 h-36 rounded-full"
                      />
                    ) : photoUrl ? (
                      <Image
                        src={photoUrl}
                        alt="Preview"
                        width={144}
                        height={144}
                        className="object-cover w-36 h-36 rounded-full"
                      />
                    ) : (
                      <span>+</span>
                    )}
                  </div>
                  <FormField
                    control={form.control}
                    name="photo"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input
                            type="file"
                            accept="image/*"
                            className=""
                            onChange={(e) => {
                              const files = e.target.files;
                              if (files && files[0]) {
                                field.onChange(files); 
                                setPreview(URL.createObjectURL(files[0]));
                              }
                            }}
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                </div>
              </div>
              <FormField
                control={form.control}
                name="username"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Username</FormLabel>
                    <FormControl>
                      <Input
                        disabled={isDisabled}
                        placeholder="Please enter your username"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>
                      username only can be updated once every 7 days
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Please enter your name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        type="email"
                        placeholder="Please enter your email"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="number_phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Phone Number</FormLabel>
                    <FormControl>
                      <Input
                        disabled
                        placeholder="Please enter your phone number"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Separator />
              <Button className="w-full mt-5 font-semibold">
                Update Profile
              </Button>
            </form>
          </Form>
        </div>
      </div>
    </>
  );
}
