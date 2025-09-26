"use client";

import FormGridRow from "@/components/layout/FormGridRow";
import ImageUploader from "@/components/layout/imageUploader";
import TextInputField from "@/components/layout/textInputField";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Switch } from "@/components/ui/switch";
import { updateSpaceSchema } from "@/lib/schema";
import {
  supabaseDeleteFile,
  supabaseGetFile,
  supabaseUploadFile,
} from "@/lib/supabase";
import { fetcher } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { ChevronLeft } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import useSWR from "swr";
import z from "zod";

export default function SpaceEditPage() {
  const router = useRouter();
  const { id } = useParams<{ id: string }>();

  const { data: space, isLoading } = useSWR(
    `/api/space/${id}/detail/read`,
    fetcher
  );

  const form = useForm<z.infer<typeof updateSpaceSchema>>({
    resolver: zodResolver(updateSpaceSchema),
    defaultValues: {
      name: "",
      description: "",
      permission: true,
    },
  });

  useEffect(() => {
    if (space) {
      form.reset({
        name: space.name || "",
        description: space.description || "",
        permission: space.permission,
      });
    }
  }, [space, form]);

  const onSubmit = async (val: z.infer<typeof updateSpaceSchema>) => {
    try {
      let avatarFilename = space.avatar;

      if (val.avatar && val.avatar.length > 0) {
        const file = val.avatar[0];
        const { error, filename } = await supabaseUploadFile(file, "space");
        if (error) throw error;
        console.log(space.avatar);

        if (space.avatar) {
          await supabaseDeleteFile(space.avatar, "space");
        }

        avatarFilename = filename;
      }

      const res = await fetch(`/api/space/${id}/detail/update`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: val.name,
          description: val.description,
          permission: val.permission,
          avatar: avatarFilename as string,
        }),
      });

      if (!res.ok) {
        const err = await res.json();
        console.error("Update error:", err);
        return;
      }

      router.push(`/space/${id}/detail`);
      router.refresh();
    } catch (error) {
      console.error(error);
    }
  };

  if (isLoading) return <p className="p-5">Loading...</p>;

  const avatarUrl = space?.avatar
    ? supabaseGetFile(space.avatar, "space")
    : null;

  return (
    <div className="max-h-screen h-screen w-full flex flex-col">
      <div
        onClick={() => router.push(`/space/${id}/message`)}
        className="h-15 bg-slate-900 flex items-center px-5 text-white cursor-pointer"
      >
        <ChevronLeft />
        <p>Back</p>
      </div>

      <div className="p-10 h-full">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-7">
            <FormGridRow label="Photo" align="start">
              <div className="flex items-center gap-4">
                <ImageUploader
                  control={form.control}
                  name="avatar"
                  photoUrl={avatarUrl}
                />
              </div>
            </FormGridRow>
            <FormGridRow label="Space Name">
              <TextInputField
                control={form.control}
                name="name"
                className="p-5"
                placeholder="Please enter your space name"
              />
            </FormGridRow>
            <FormGridRow label="Space Description">
              <TextInputField
                control={form.control}
                name="description"
                className="min-h-[150px]"
                placeholder="Please enter your space description"
                input={false}
              />
            </FormGridRow>
            <FormGridRow label="Permission">
              <div className="flex gap-4 items-center">
                <p>Public</p>
                <FormField
                  control={form.control}
                  name="permission"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Switch
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <p>Private</p>
              </div>
            </FormGridRow>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded w-full"
            >
              Update
            </button>
          </form>
        </Form>
      </div>
    </div>
  );
}
