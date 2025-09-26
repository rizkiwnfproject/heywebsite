
import "../../../globals.css";
import { Toaster } from "@/components/ui/sonner";
import ListSpacePage from "../page";
import { Metadata } from "next";

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
      <main>
        <div className="w-full max-h-screen flex">
          <ListSpacePage />
          <div className="w-[70%]">{children}</div>
        </div>
      </main>
      <Toaster />
    </>
  );
}
