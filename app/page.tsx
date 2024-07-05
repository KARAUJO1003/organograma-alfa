
import Link from "next/link";
import React from "react";

export default function HomePage ()  {
  return (
    <div className="container mx-auto p-4">
      <Link href="/organograma" className="text-2xl font-bold mb-4">
        Organograma
      </Link>
    </div>
  );
};
