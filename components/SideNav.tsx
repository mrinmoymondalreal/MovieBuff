'use client';

import { HomeIcon, SearchIcon, Clapperboard, Tv } from "lucide-react";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { ReactNode } from "react";
import { redirect, usePathname } from "next/navigation";
import { useLocalStorage } from "@/hooks/localStorage";
import { LoadingScreen } from "./Loading";

function SideNavButton({ isActive, title, children, link }: { isActive: boolean, title: string, link: string | Array<string>, children: ReactNode }){
  let pathname = usePathname();
  isActive = pathname == `/${link}` ? true : false;
  return (
    <Link href={`/${link}`} className="flex flex-col space-y-1 md:space-y-0 md:flex-row md:space-x-4 group/button items-center text-white">
      <div className={cn("text-xs group-hover:border-none rounded-md space-x-4 md:p-2", isActive ? "bg-white text-primary p-1 hover:bg-white hover:text-primary" : "")}>
        {children}
      </div>
      <p className="md:hidden md:group-hover:block
        md:group-hover/button:text-xl group-hover/button:font-semibold 
        transition-all text-xs md:text-base">{title}</p>
    </Link>
  );
}

export default function SideNav(){

  let { storage, isLoaded } = useLocalStorage();

  if(isLoaded){
    !storage?.getItem("setup") && redirect("/setup");
  }

  return !isLoaded ? <LoadingScreen/> : (
    <div className="navbar border-0 
      md:w-16 md:h-screen h-16 w-full
      fixed md:left-0 bottom-0 z-50
      bg-primary md:hover:w-48 group md:transition-all">
      <div className="items w-full h-full flex md:flex-col 
        md:justify-center justify-around items-center md:group-hover:items-start px-4
        space-x-4 md:space-y-12 md:space-x-0">
        <SideNavButton isActive={true} title="Home" link="">
          <HomeIcon className="w-6 h-6 md:h-6 md:w-6" />
        </SideNavButton>
        <SideNavButton isActive={false} title="Search" link="search">
          <SearchIcon className="w-6 h-6 md:h-6 md:w-6" />
        </SideNavButton>
        <SideNavButton isActive={false} title="Movies" link="movies">
          <Clapperboard className="w-6 h-6 md:h-6 md:w-6" />
        </SideNavButton>
        <SideNavButton isActive={false} title="Series" link="series">
          <Tv className="w-6 h-6 md:h-6 md:w-6" />
        </SideNavButton>
      </div>
    </div>
  );
}