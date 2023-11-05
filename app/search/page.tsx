'use client';
import { ScrollFeedProtraitItem } from "@/components/Feed";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import React, { ReactNode, useEffect, useRef, useState } from "react";

function ScrollFeedContainer({ title, children }: { title: string, children: ReactNode }){
  return (
    <div className="movie-slides w-screen md:w-[calc(100vw-7rem)] text-white">
      <div className="heading font-bold pt-0 px-8 pb-4">{title}</div>
      <div className="w-full justify-center flex flex-wrap gap-4 overflow-hidden overflow-x-auto first:ml-8 snap-x no-scrollbar">
        {children}
      </div>
    </div>
  );
}

async function getData(){
  let d = await import("../../lib/dummyData.json");
  return d;
}

interface MovieData {
  title: string;
  overview: string;
  backdrop_path: string;
  poster_path: string;
  original_language: string,
  popularity: number,
}

export default function Home(){
  let [ d, setData ] = useState<MovieData[]>();
  useEffect(()=>{
    async function hh(){
      setData(Array.from(await getData()))
    }
    hh();
  }, []);
  let [ value, setValue ] = useState<string>('');
  
  return (
    <div className="md:ml-16">
      <div className="flex w-full items-center space-x-2 px-4 py-8">
        <Input type="email" placeholder="Search Here..... (By Title)" onChange={e=>setValue(e.target.value)}/>
        <Button type="submit" variant={'secondary'}><Search className="mr-2 h-4 w-4" /> Search</Button>
      </div>
      <ScrollFeedContainer title="Search Result">
        { d && d.filter(e=>e.title.toLowerCase().indexOf(value.toLowerCase()) != -1).slice(0, -1).map((e, i)=>(
          <ScrollFeedProtraitItem key={i} image={`https://image.tmdb.org/t/p/w300/${e.poster_path}`} />
        )) }
      </ScrollFeedContainer>
    </div>
  )
}