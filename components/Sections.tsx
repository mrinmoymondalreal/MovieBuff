"use client";

import { RefObject, useEffect, useRef, useState } from "react";
import { ScrollFeedContainer, ScrollFeedProtraitItem } from "./Feed";
import { useLocalStorage } from "@/hooks/localStorage";
import { Loader2Icon, PlayIcon, Star } from "lucide-react";
import { Button } from "./ui/button";
import { MovieData } from "@/lib/types";

export function TrendingSection(){

  let { storage, isLoaded } = useLocalStorage();

  let [ data, setData ] = useState<MovieData[]>([]);
  let [ isLoading, setLoading ] = useState<boolean>(true);

  useEffect(()=>{
    const getTrendingData = function(){

      let urlParams = {
        include_adult: false,
        include_video: false,
        language: "en-US",
        page: "1",
        primary_release_year: new Date().getFullYear(),
        sort_by: "popularity.desc",
        watch_region: "IN",
        with_origin_country: "IN",
      };
    
      let searchparams: string = new URLSearchParams(urlParams as any).toString();

      fetch("api/discover?"+searchparams, {
        method: "GET",
      }).then(e=>e.json()).then((e: any) =>{
        e["timeout"] = new Date().getTime() + (24*60*60*1000);
        storage?.setItem("trending_now", JSON.stringify(e));
        setData(e.results);
        setLoading(false);
      });
    }

    if(isLoaded){

      if(storage?.getItem("trending_now")){
        let trend_data = JSON.parse(storage?.getItem("trending_now")!);
        let time: number = new Date().setTime(trend_data.timeout) - new Date().getTime();
        if(time > 0) setData(trend_data.results);
        else { getTrendingData(); }
        setLoading(false);
        return;
      }else { getTrendingData(); }

    }

  }, [storage]);

  return (
    <ScrollFeedContainer title="Trending">
      {
        isLoading ? 
        <div className="loading-state flex justify-center items-center">
          <Loader2Icon color="white" size={30}/>
        </div>
        :
        data.map((e: MovieData, i: number)=>(
          <ScrollFeedProtraitItem key={i} url={"/movie/"+e.id} image={e.poster_path} trendnumber={i+1} />
        ))
      }
    </ScrollFeedContainer>
  );
}
export function LangSection({ lang, init }: { lang: string; init: string; }){

  let { storage, isLoaded } = useLocalStorage();

  let [ data, setData ] = useState<MovieData[]>([]);
  let [ isLoading, setLoading ] = useState<boolean>(true);

  useEffect(()=>{
    const getLangData = function(){
      let langs: string = init;

      let g: [string, string][] = JSON.parse(storage?.getItem("fav_genres")||"[]");
      let genres: string = g.map((e: [string, string]) => e[0]).join("|");

      let urlParams = {
        include_adult: false,
        include_video: false,
        language: "en-US",
        page: "1",
        primary_release_year: new Date().getFullYear(),
        sort_by: "popularity.desc",
        watch_region: "IN",
        with_genres: genres,
        with_origin_country: "IN",
        with_original_language: langs
      };
    
      let searchparams: string = new URLSearchParams(urlParams as any).toString();

      fetch("api/discover?"+searchparams, {
        method: "GET",
      }).then(e=>e.json()).then((e: any) =>{
        setData(e.results);
        setLoading(false);
      });
    }

    if(isLoaded){
      getLangData();
    }

  }, [storage]);

  return (
    <ScrollFeedContainer title={`Latest ${lang} Movies`}>
      {
        isLoading ? 
        <div className="loading-state flex justify-center items-center">
          <Loader2Icon color="white" size={30}/>
        </div>
        :
        data.map((e: MovieData, i: number)=>(
          <ScrollFeedProtraitItem key={i} url={"/movie/"+e.id} image={e.poster_path} />
        ))
      }
    </ScrollFeedContainer>
  );
}
export function GenreSection({ genre, id }: { genre: string; id: number }){

  let { storage, isLoaded } = useLocalStorage();

  let [ data, setData ] = useState<MovieData[]>([]);
  let [ isLoading, setLoading ] = useState<boolean>(true);

  useEffect(()=>{
    const getLangData = function(){
      let l: [string, string][] = JSON.parse(storage?.getItem("fav_langs")||"[]");
      let langs: string = l.map((e: [string, string]) => e[1]).join("|");

      let urlParams = {
        include_adult: false,
        include_video: false,
        language: "en-US",
        page: "1",
        primary_release_year: new Date().getFullYear(),
        sort_by: "popularity.desc",
        watch_region: "IN",
        with_genres: id,
        with_origin_country: "IN",
        with_original_language: langs
      };
    
      let searchparams: string = new URLSearchParams(urlParams as any).toString();

      fetch("api/discover?"+searchparams, {
        method: "GET",
      }).then(e=>e.json()).then((e: any) =>{
        setData(e.results);
        setLoading(false);
      });
    }

    if(isLoaded){
      getLangData();
    }

  }, [storage]);

  return (
    <ScrollFeedContainer title={`Latest ${genre} Movies`}>
      {
        isLoading ? 
        <div className="loading-state flex justify-center items-center">
          <Loader2Icon color="white" size={30}/>
        </div>
        :
        data.map((e: MovieData, i: number)=>(
          <ScrollFeedProtraitItem key={i} url={"/movie/"+e.id} image={e.poster_path} />
        ))
      }
    </ScrollFeedContainer>
  );
}
export function SimilarSection({ movie_id }: { movie_id: string }){

  let [ data, setData ] = useState<MovieData[]>([]);
  let [ isLoading, setLoading ] = useState<boolean>(true);

  useEffect(()=>{
    const getLangData = function(){
    
      fetch("/api/similar?movie_id="+movie_id, {
        method: "GET",
      }).then(e=>e.json()).then((e: any) =>{
        setData(e.results);
        setLoading(false);
      });
    }

    getLangData();

  }, []);

  return (
    <ScrollFeedContainer title={`Similar Movies`}>
      {
        isLoading ? 
        <div className="loading-state flex justify-center items-center">
          <Loader2Icon color="white" size={30}/>
        </div>
        :
        data.map((e: MovieData, i: number)=>(
          <ScrollFeedProtraitItem key={i} url={"/movie/"+e.id} image={e.poster_path} />
        ))
      }
    </ScrollFeedContainer>
  );
}


export function LangDivison(){
  let { storage, isLoaded } = useLocalStorage();

  let [ langs, setLangs ] = useState<[string, string][]>(); 

  useEffect(()=>{
    if(isLoaded) setLangs(JSON.parse(storage?.getItem("fav_langs")!));
  }, [storage])

  return langs?.map((e: string[], i: number)=>{
    return <LangSection key={i} lang={e[0]} init={e[1]} />
  });

}
export function GenreDivison(){
  let { storage, isLoaded } = useLocalStorage();

  let [ genres, setGenres ] = useState<[string, number][]>(); 

  useEffect(()=>{
    if(isLoaded) setGenres(JSON.parse(storage?.getItem("fav_genre")!)); 
  }, [storage]);

  return genres?.map((e: [string, number] ) => {
    return <GenreSection key={e[1]} genre={e[0]} id={e[1]} />
  });

}

export function Banner(){

  let { storage, isLoaded } = useLocalStorage();

  let [ data, setData ] = useState<MovieData[] | null>(null);
  let [ count, setCount ] = useState<number>(0);
  let [ genres, setGenres ] = useState<{ id: number, name: string }[]>();

  let imgRef: RefObject<HTMLImageElement | null> = useRef(null);

  if(data){
    let img = new Image();
    img.src = "https://image.tmdb.org/t/p/original/"+data[count].backdrop_path;
    let target: HTMLImageElement | null = imgRef?.current;
    img.onload = function(){
      target!.src = `${img.src}`;
      target!.style.filter = `blur(0)`;
    }
  }
  
  useEffect(()=>{
    const fetchStoredData = function(){
      if(isLoaded && data == null){
        setGenres(JSON.parse(storage?.getItem("genres")!));
        if(storage?.getItem("trending_now")) setData(JSON.parse(storage?.getItem("trending_now")!).results); return true;
        return false;
      }
    }
    fetchStoredData();
  }, [storage?.getItem("trending_now")]);

  
  useEffect(()=>{
    if(data){
      setInterval(()=>{
        setCount(e=>{
          return (e+1) % (data!.length - 1);
        });
      }, 10000);
    }
  }, [data]);

  return (
    <div className="banner anim-slide-in w-full relative md:absolute overflow-x-hidden top-0">
      <img ref={imgRef as React.RefObject<HTMLImageElement>} style={{
        filter: "blur(1px)"
      }} src={data && `https://image.tmdb.org/t/p/w200${data[count].backdrop_path}` || ""} className="max-w-full w-full ml-24" />
      <div className="for-bottom absolute w-full h-24 md:h-80 bottom-0
        bg-gradient-to-b from-transparent via-primary/50 to-primary"></div>
      <div className="for-left absolute w-80 h-full bottom-0
        bg-gradient-to-l from-transparent via-primary to-primary"></div>
      <div className="info absolute md:mt-24
        w-full md:w-1/2 lg:w-1/3 p-4 md:p-8 
        h-[80%] text-white md:top-0 md:bottom-auto mb-6 bottom-0 space-y-2 md:space-y-4">
        <div className="heading text-2xl md:text-4xl font-bold w-2/3 md:w-auto anim-slide-in transition-all ml-0">{data && data[count].title}</div>
        <div className="info font-bold text-xs md:text-sm">{data && data[count].original_language.toUpperCase()} <span className="text-muted-foreground">•</span> 2h 45m <span className="text-muted-foreground">•</span> <Star size={15} className='inline -mt-1'/>
        <span className="pl-1">{data && data[count].vote_average + "/10"}</span></div>
        <div className="sub-bio md:text-sm text-xs hidden md:block">
          {data && data[count].overview.trim().slice(0, 267)}
        </div>
        <div className="category font-bold text-xs md:text-sm">
          {
            data && data[count].genre_ids.map(e=> genres?.filter( ({id}) => id == e ).map(e=>e.name) ).join(" | ")
          }
        </div>
        <div className="watch">
          <Button variant={"secondary"} className="md:px-8 md:text-xl"> <PlayIcon className="mr-2 h-4 w-4" /> Watch Now</Button>
        </div>
      </div>
    </div>
  );
}