"use client";

import { Button } from "@/components/ui/button";
import { loginSchema, registerSchema } from "@/lib/schema";
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
import { toast } from "sonner";
import { useRouter } from "next/navigation";

const SignIn = () => {
  const router = useRouter();

  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (val: z.infer<typeof loginSchema>) => {
    try {
      fetch("/api/sign-in", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(val),
        credentials: "include", 
      });
      router.push("/");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="form-section container max-w-[1130px] w-full mx-auto flex flex-col gap-[30px] p-5">
      <div className="title flex flex-col gap-1">
        <h1 className="font-bold text-[32px] leading-[48px]">Sign In</h1>
        <p className="font-medium text-sm md:text-lg leading-[27px]">
          Sign in to reconnect with your space
        </p>
      </div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
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
            Sign In
          </Button>
          <div className="text-gray-500 text-sm">
            Don’t have an account?{" "}
            <Link href={"/sign-up"} className="text-primary font-medium">
              Sign Up
            </Link>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default SignIn;
