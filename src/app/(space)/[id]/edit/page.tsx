"use client";

import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { updateSpaceSchema } from "@/lib/schema";
import { fetcher } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { ChevronLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import useSWR from "swr";
import z from "zod";

type Params = {
  id: string;
};

interface SpaceEditProps {
  params: Params;
}

export default function SpaceEditPage({ params }: SpaceEditProps) {
  const router = useRouter();

  const { data: space, isLoading } = useSWR(
    `/api/space/${params.id}/detail/read`,
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
      const res = await fetch(`/api/space/${params.id}/detail/update`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(val),
      });

      if (!res.ok) {
        const err = await res.json();
        return;
      }
      router.push(`/${params.id}/message`);
      router.refresh();
    } catch (error) {
      console.error(error);
    }
  };

  if (isLoading) return <p className="p-5">Loading...</p>;

  return (
    <div className="max-h-screen h-screen w-full flex flex-col">
      <div
        onClick={() => router.push(`/${params.id}/message`)}
        className="h-15 bg-primary flex items-center px-5 text-white cursor-pointer"
      >
        <ChevronLeft />
        <p>Kembali</p>
      </div>

      <div className="p-10 h-full">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-7">
            <div className="grid grid-cols-6 items-center">
              <div className="col-span-2 font-semibold">Nama Space</div>
              <div className="col-span-4">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input
                          className="rounded p-5"
                          placeholder="Tulis Nama Space"
                          {...field}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>
            </div>
            <div className="grid grid-cols-6 items-start">
              <div className="col-span-2 font-semibold">Deskripsi Space</div>
              <div className="col-span-4">
                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Textarea
                          className="min-h-[150px]"
                          placeholder="Tulis deskripsi space"
                          {...field}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>
            </div>
            <div className="grid grid-cols-6 items-center">
              <div className="col-span-2 font-semibold">Permission</div>
              <div className="col-span-4">
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
              </div>
            </div>

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
