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
      const res = await fetch("/api/me/update", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(val),
      });
      if (!res.ok) throw new Error("Failed to update profile");
      const updated = await res.json();
      mutate(updated, false);
      router.push("/profile");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="h-screen flex flex-col justify-center items-center">
        <div className="p-10 w-[700px] border border-mutate rounded space-y-2">
          <div className="w-full flex items-center justify-center mb-5">
            <div className="w-36 h-36 rounded-full bg-slate-700 flex" />
          </div>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="username"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Username</FormLabel>
                    <FormControl>
                      <Input
                        disabled={isDisabled}
                        placeholder="Enter your username"
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
                      <Input placeholder="Enter your name" {...field} />
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
                        placeholder="Enter your email"
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
                    <FormLabel>Number Phone</FormLabel>
                    <FormControl>
                      <Input
                        disabled
                        placeholder="Enter your number phone"
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
