import { NextRequest } from "next/server";

export async function GET(request: NextRequest){
  let res: any = await fetch("https://api.themoviedb.org/3/genre/movie/list?language=en", {
    method: "GET",
    headers: {
      authorization: `Bearer ${process.env.TMDB_AUTH_KEY}`,
      accept: "application/json"
    }
  });
  res = await res.json();
  return new Response(JSON.stringify(res));
}