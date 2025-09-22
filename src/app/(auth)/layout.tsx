import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../globals.css";
import Image from "next/image";



export const metadata: Metadata = {
  title: "Hey Binder",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="">
        <div className=" max-w-9/12 w-full h-screen mx-auto flex justify-center items-center">
          <div className="w-full border border-border rounded grid grid-cols-1 md:grid-cols-5">
            <Image
              src={"/images/sign/sign.jpg"}
              alt="auth picture"
              width="600"
              height="600"
              className="xl:ml-10 hidden md:flex col-span-3 justify-center items-center"
            />
            <div className="col-span-2 h-full flex justify-center items-center">{children}</div>
          </div>
        </div>
      </body>
    </html>
  );
}
