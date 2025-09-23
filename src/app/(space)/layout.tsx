"use client";

import "../globals.css";
import { Toaster } from "@/components/ui/sonner";
import Sidebar from "@/components/layout/sidebar";
import { useState } from "react";
import ListChatPage from "./list-chat/page";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [activePage, setActivePage] = useState("chat"); // default "chat"

  return (
    <html lang="en">
      <body className="">
        <main>
          <div className="w-full max-h-screen flex">
            <Sidebar setActivePage={setActivePage} />
            <div className="flex-1 px-4">
              {activePage === "chat" && <div><ListChatPage /></div>}
              {activePage === "settings" && <div>⚙️ Settings Page</div>}
            </div>
          </div>
        </main>
        <Toaster />
      </body>
    </html>
  );
}
