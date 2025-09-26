import { MessageCirclePlus, Plus } from "lucide-react";
import React, { FC } from "react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import z from "zod";
import { createNoteSchema } from "@/lib/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";

interface AddNoteModalProps {
  id: string;
}

const AddNoteModal: FC<AddNoteModalProps> = ({ id }) => {

  const form = useForm<z.infer<typeof createNoteSchema>>({
    resolver: zodResolver(createNoteSchema),
  });

  const onSubmit = async (val: z.infer<typeof createNoteSchema>) => {
    try {
      await fetch(`/api/space/${id}/note/create`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(val),
      });
      toast("Sukses", {
        description: "Note berhasil dibuat",
      });
    } catch (error) {
      toast("Error", {
        description: "Error Add / Edit Note, please try again",
        className: "text-slate-700",
      });
      console.log(error);
    }
  };
  return (
    <>
      <Dialog>
        <DialogTrigger asChild>
          <Button variant={"outline"}
            className="flex items-center gap-2 px-3 py-1"
          >
            <Plus className="w-4" />
            <p>Add Note </p>
          </Button>
        </DialogTrigger>

        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Buat Note</DialogTitle>
            <DialogDescription>
              Anyone who has this link will be able to view this.
            </DialogDescription>
          </DialogHeader>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Judul</FormLabel>
                    <FormControl>
                      <Input placeholder="Kelompok 1" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button variant="default" className="w-full">
                Tambahkan Note
              </Button>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default AddNoteModal;
