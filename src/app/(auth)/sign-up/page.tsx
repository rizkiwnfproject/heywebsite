"use client";

import { Button } from "@/components/ui/button";
import { registerSchema } from "@/lib/schema";
import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import z from "zod";
import {
  Form,
} from "@/components/ui/form";
import Link from "next/link";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import TextInputField from "@/components/layout/textInputField";
import AuthTitle from "@/components/layout/authTitle";

const SignUp = () => {
  const router = useRouter();

  const form = useForm<z.infer<typeof registerSchema>>({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = async (val: z.infer<typeof registerSchema>) => {
    try {
      await fetch("/api/sign-up", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(val),
      });
      toast("Sukses", {
        description: "Pembuatan akun berhasil",
      });
      router.push("/sign-in");
    } catch (error) {
      console.log(error);
      toast("Error", {
        description: "Data yang diinputkan salah",
      });
    }
  };
  return (
    <div className="form-section container max-w-[1130px] w-full mx-auto flex flex-col gap-[30px] p-5">
      <AuthTitle title="Sign Up" subtitle="Join now and explore new spaces" />
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
          <TextInputField
            control={form.control}
            name="name"
            label="Name"
            placeholder="Please enter your name"
          />
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
            name="number_phone"
            label="Phone Number"
            placeholder="Please enter your phone number"
          />
          <TextInputField
            control={form.control}
            name="password"
            label="Password"
            type="password"
            placeholder="Please enter your password"
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
