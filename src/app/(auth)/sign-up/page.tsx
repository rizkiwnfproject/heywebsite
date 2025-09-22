"use client";

import { Button } from "@/components/ui/button";
import { registerSchema } from "@/lib/schema";
import React from "react";
import { useFormStatus } from "react-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import z from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import Link from "next/link";

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending} className="">
      {pending ? "Loading..." : "Sign In"}
    </Button>
  );
}

const SignUp = () => {
  const form = useForm<z.infer<typeof registerSchema>>({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = async (val: z.infer<typeof registerSchema>) => {
    try {
      console.log(val);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="form-section container max-w-[1130px] w-full mx-auto flex flex-col gap-[30px] p-5">
      <div className="title flex flex-col gap-1">
        <h1 className="font-bold text-[32px] leading-[48px] text-primary">
          Sign Up
        </h1>
        <p className="font-medium text-sm md:text-lg leading-[27px] text-primary/90">
          Join now and explore new spaces
        </p>
      </div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nama</FormLabel>
                <FormControl>
                  <Input placeholder="Masukkan namamu" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Username</FormLabel>
                <FormControl>
                  <Input placeholder="Masukkan usernamemu" {...field} />
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
                  <Input placeholder="Masukkan emailmu" {...field} />
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
                <FormLabel>Nomor Telepon</FormLabel>
                <FormControl>
                  <Input placeholder="Masukkan nomor teleponmu" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit" className="w-full">
            Sign Up
          </Button>
          <div className="text-gray-500 text-sm">
            Already have an account?{" "}
            <Link href={"/sign-in"} className="text-primary font-medium">
              Sign In
            </Link>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default SignUp;
