import "../globals.css";
import { Toaster } from "@/components/ui/sonner";
import Sidebar from "@/components/layout/sidebar";
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
          <Sidebar />
          <div className="w-full">{children}</div>
        </div>
      </main>
      <Toaster />
    </>
  );
}
