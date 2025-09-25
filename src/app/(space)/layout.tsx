"use client";

import "../globals.css";
import { Toaster } from "@/components/ui/sonner";
import Sidebar from "@/components/layout/sidebar";
import { useState } from "react";
import ListChatPage from "./space/page";

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
          {/* {activePage === "chat" && (
            <>
              <div className="w-[25%] ">
                <div>
                  <ListChatPage />
                </div>
              </div>
              <div className="flex-1">{children}</div>
            </>
          )}

          {activePage !== "chat" && <div className="w-full">{children}</div>} */}
        </div>
      </main>
      <Toaster />
    </>
  );
}
