"use client";

import { GenreSelector, LangSelector } from '@/components/FirstScreen';
import { Button } from '@/components/ui/button';
import { useLocalStorage } from "@/hooks/localStorage"
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

let setError: any = function(){};

function ErrorDiv(){
  let [error, er] = useState<string>("");
  setError = er;
  return (
    <div className="error text-xl text-white">{error}</div>
  );
}

export default function SetupPage(){
  let { storage, isLoaded } = useLocalStorage();

  let lang_list: [string, string][] = [];
  let genre_list: [string, number][] = [];

  let [current, setCurrent] = useState<number>(0);
  let [genres, setGenreList] = useState<{ id: number, name: string }[]>([]);

  let router = useRouter();

  let len = 1;

  function handleSelectedLang(o: [string, string], insert: boolean){
    if(insert) lang_list.push(o);
    else lang_list = lang_list.filter(e=> e[0] != o[0] );
  }

  function handleSelectedGenre(o: [string, number], insert: boolean){
    if(insert) genre_list.push(o);
    else genre_list = genre_list.filter(e=>e[0]!=o[0]);
  }

  function handleClick(){
    setError("");
    if(current == 0){
      if(lang_list.length < 1){
        setError("Atleast Select One Langauge");
        return;
      }
      storage?.setItem("fav_langs", JSON.stringify(lang_list));
    }else if(current == 1){
      if(genre_list.length < 3){
        setError("Atleast Select 3 Favorite Genre");
      }
      storage?.setItem("fav_genre", JSON.stringify(genre_list));
    }

    if(current < len) setCurrent(++current);
    else{
      storage?.setItem("setup", "true");
      return router.replace("/");
    }
  }

  useEffect(()=>{
    if(isLoaded){
      fetch("/api/get_genres", {
        method: "GET",
      }).then(e=>e.json()).then(e=>{
        setGenreList(e.genres);
        storage?.setItem("genres", JSON.stringify(e.genres));
      });
    }
  }, [storage]);

  return (
    <div className="w-full h-full flex flex-col pt-12 items-center gap-y-8">
      <div className="heading text-4xl text-white font-black px-12">Please Select Your Favorite {["Langauge", "Artist"][current]}</div>
      <ErrorDiv/>
      {
        [<LangSelector onSelect={handleSelectedLang}/>, <GenreSelector list={genres} onSelect={handleSelectedGenre}/>][current]
      }
      <div className="bottom">
        <Button variant={"secondary"} onClick={handleClick}>{current==len?"Save & Continue":"Next"}</Button>
      </div>
    </div>
  );
}