'use client';
import { ScrollFeedProtraitItem } from "@/components/Feed";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { MovieData } from "@/lib/types";
import { Loader2Icon, Search } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { ReactNode, useEffect, useRef, useState } from "react";
import { useSearchParams } from 'next/navigation';

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

export default function Home(){

  let [ isLoading, setLoading ] = useState<boolean | null>(null);
  let [ data, setData ] = useState<MovieData[]>();

  let router = useRouter();
  
  let search_params = useSearchParams();

  let ref = useRef<any>();

  useEffect(()=>{
    handleSearch(search_params.get("q")!);
  }, []);
  
  function handleSearch(query: string){
    fetch("/api/search?q="+query, {
        method: "GET",
      }).then(e=>e.json()).then((e: any) =>{
        e["timeout"] = new Date().getTime() + (24*60*60*1000);
        setData(e.results);
        router.push(`/search?q=${query}`);
        setLoading(false);
      });
  }

  return (
    <div className="md:ml-16">
      <div>
        <form className="flex w-full items-center space-x-2 px-4 py-8" action="" onSubmit={(e)=>{
          e.preventDefault();
          handleSearch(ref.current?.value);
        }}>
          <Input ref={ref} type="text" placeholder="Search Here..... (By Title)"/>
          <Button type="submit" variant={'secondary'} onClick={()=>handleSearch(ref.current?.value)} ><Search className="mr-2 h-4 w-4" /> Search</Button>
        </form>
      </div>
      <ScrollFeedContainer title="Search Result">
        {
          isLoading ? 
          <div className="loading-state flex justify-center items-center">
            <Loader2Icon color="white" size={30}/>
          </div>
          :
          data && data.map((e: MovieData, i: number)=>(
            <ScrollFeedProtraitItem key={i} url={"/movie/"+e.id} image={e.poster_path} />
          )) || ""
        }
      </ScrollFeedContainer>
    </div>
  )
}