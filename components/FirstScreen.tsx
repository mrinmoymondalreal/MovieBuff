"use client";

import { cn } from "@/lib/utils";
import React, { useState } from "react";

let j = [
  "bg-yellow-500",
  "bg-purple-500",
  "bg-pink-500",
  "bg-green-500",
  "bg-slate-500",
  "bg-red-500",
  "bg-amber-500",
];

function LangCircle({ init, title, color, select, onSelect, iso }: {
  init: string,
  title: string,
  color: string,
  select?: boolean,
  iso: string,
  onSelect: (obj: [string, string], insert: boolean) => void
}){
  let [isSelected, setSelected] = useState<boolean>(select || false);
  let bgColor = `bg-${color}`;
  onSelect([title, iso], isSelected);
  return (
    <button onClick={()=>{
      setSelected(_=>{
        return !_;
      });
    }} className={cn(`cirle drop-shadow-md bg-amber-500 w-40 h-40 rounded-full relative flex flex-col justify-center items-center
    before:w-16 before:h-16 before:rounded-full before:absolute before:bottom-0 before:right-0 before:bg-yellow-300 
    before:content-['✔️'] before:shadow-lg before:justify-center before:items-center before:text-2xl`, bgColor, isSelected ? "before:flex" : "before:hidden")}>
      <div className="init text-6xl font-bold">{init}</div>
      <div className="description text-sm mt-2">{title}</div>
    </button>
  );
}

function GenreRect({ title, select, id, onSelect, color }: {
  title: string,
  select?: boolean,
  id: number,
  color: string,
  onSelect: (title: [string, number], insert: boolean) => void
}){
  let [isSelected, setSelected] = useState<boolean>(select || false);
  onSelect([title, id], isSelected);
  return (
    <button onClick={()=>{
      setSelected(_=>{
        return !_;
      });
    }} className={cn("rect drop-shadow-md bg-slate-400 w-48 rounded-lg relative h-24 flex justify-center items-center", `${color}`)}>
      <div className={cn(`w-12 absolute h-12 bottom-0 right-0 bg-yellow-300
      block justify-center items-center p-2 rounded-full z-50 text-2xl shadow-lg m-2`, isSelected ? "flex" : "hidden")}>✔️</div>
      <div className="w-10 h-10 opacity-30 bg-white absolute top-0 left-0 mt-12 ml-16 rounded-lg blur-md rotate-12"></div>
      <div className="w-10 h-10 opacity-30 bg-white absolute top-0 left-0 m-3 rounded-lg blur-md rotate-45"></div>
      <div className="w-10 h-10 opacity-30 bg-white absolute top-0 right-0 m-4 rounded-lg blur-md rotate-90"></div>
      <div className="description text-xl font-bold z-20 text-black">{title}</div>
    </button>
  );
}

export function LangSelector({ onSelect }: { onSelect: (obj: [string, string], insert: boolean) => void }){
  return (
    <div className="flex flex-wrap justify-center gap-4 px-12 md:px-24">
      <LangCircle init="हि" iso="hi" title="Hindi" color="yellow-500" onSelect={onSelect} />
      <LangCircle init="EN" iso="en" title="English" color="purple-500" onSelect={onSelect} />
      <LangCircle init="తె" iso="te" title="Telugu" color="pink-500" onSelect={onSelect} />
      <LangCircle init="த" iso="te" title="Tamil" color="green-500" onSelect={onSelect} />
      <LangCircle init="ಕ" iso="kn" title="Kannada" color="slate-500" onSelect={onSelect} />
      <LangCircle init="বা" iso="bn" title="Bangla" color="red-500" onSelect={onSelect} />
      <LangCircle init="മ" iso="ml" title="Malayalam" color="amber-500" onSelect={onSelect} />
    </div>
  );
};


export function GenreSelector({ list, onSelect }: { list: { id: number, name: string }[], onSelect: (title: [string, number], insert: boolean) => void }){
  return (
    <div className="flex flex-wrap justify-center w-full gap-4 px-12 md:px-24 ">
      {
        list.map(({ id, name })=>{
          return (<GenreRect key={id} title={name} id={id} onSelect={onSelect} color={j[Math.floor(Math.random() * j.length)]} />);
        })
      } 
    </div>
  );
}