"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function InvitePage({ params }: { params: { token: string } }) {
  const router = useRouter();

  useEffect(() => {
    const joinSpace = async () => {
      const res = await fetch(`/api/invite/${params.token}/read`);
      const data = await res.json();

      if (res.ok && data.redirect) {
        router.push(data.redirect);
      } else {
        alert(data.error || "Invite tidak valid");
        router.push("/space");
      }
    };

    joinSpace();
  }, [params.token, router]);

  return <p className="p-5">Memproses undangan...</p>;
}
