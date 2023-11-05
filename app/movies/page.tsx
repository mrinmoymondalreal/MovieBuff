'use client';
import { ScrollFeedProtraitItem } from "@/components/Feed";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import React, { ReactNode, useEffect, useRef, useState } from "react";

function ScrollFeedContainer({ title, children }: { title: string, children: ReactNode }){
  return (
    <div className="movie-slides w-screen md:w-[calc(100vw-7rem)] text-white py-8">
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
  let f = Math.random()*(d?.length || 1);
  return (
    <div className="md:ml-16">
      <ScrollFeedContainer title="Movies Sorted For You">
        { d && d.slice(f, f+20).map((e, i)=>(
          <ScrollFeedProtraitItem key={i} image={`https://image.tmdb.org/t/p/w300/${e.poster_path}`} />
        )) }
      </ScrollFeedContainer>
    </div>
  )
}