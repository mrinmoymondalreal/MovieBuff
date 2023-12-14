import "./globals.css"

import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="w-screen h-screen flex flex-col justify-center items-center text-white space-y-4">
      <h2 className="text-3xl font-black ">Not Found</h2>
      <p>Still Working on it. Until See other pages</p>
      <Link href="/"><Button variant={"secondary"}>Return Home</Button></Link>
    </div>
  );
}