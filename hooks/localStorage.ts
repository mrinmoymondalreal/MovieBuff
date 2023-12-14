"use client";

import { useEffect, useState } from "react";

export function useLocalStorage(){
  let [storage, setStorage] = useState<Storage | null>(null);
  let [ isLoaded, setLoaded ] = useState<boolean>(false);

  useEffect(function(){
    if(!storage){
      setLoaded(true);
      setStorage(localStorage);
    }
  },[]);

  return {
    storage,
    isLoaded
  };
}