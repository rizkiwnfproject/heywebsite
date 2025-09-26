"use client";

import { Button } from "@/components/ui/button";
import { loginSchema } from "@/lib/schema";
import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import z from "zod";
import {
  Form,
} from "@/components/ui/form";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import TextInputField from "@/components/layout/textInputField";
import AuthTitle from "@/components/layout/authTitle";


const SignIn = () => {
  const router = useRouter();

  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (val: z.infer<typeof loginSchema>) => {
    try {
      const res = await fetch("/api/sign-in", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(val),
        credentials: "include",
      });

      if (!res.ok) {
        toast("Failed to login", {
          description: "Username or email wrong, please check again",
          className: "text-slate-900",
        });
        throw new Error("Login gagal");
      }

      router.push("/");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="form-section container max-w-[1130px] w-full mx-auto flex flex-col gap-[30px] p-5">
      <AuthTitle title="Sign In" subtitle="Sign in to reconnect with your space" />
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
          <TextInputField
            control={form.control}
            name="username"
            label="Username"
            placeholder="Please enter your username"
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
            name="password"
            label="Password"
            type="password"
            placeholder="Please enter your password"
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
