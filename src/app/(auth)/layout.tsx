import type { Metadata } from "next";
import "../globals.css";
import Image from "next/image";
import { Toaster } from "@/components/ui/sonner";

export const metadata: Metadata = {
  title: "Hey Binder",
};

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <main className="bg-white">
        <div className=" max-w-9/12 w-full h-screen mx-auto flex justify-center items-center">
          {/* <div className="w-full grid grid-cols-1 md:grid-cols-5">
            <Image
              src={"/assets/images/sign/sign.jpg"}
              alt="auth picture"
              width={600}
              height={600}
              className="hidden md:flex col-span-3 justify-center items-center"
              unoptimized 
            />
            
          </div> */}
          <div className="h-full w-[50%] flex justify-center items-center">
            {children}
          </div>
        </div>
      </main>
      <Toaster />
    </>
  );
}
