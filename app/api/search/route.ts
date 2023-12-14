import { NextRequest } from "next/server";

export async function GET(request: NextRequest){
  const searchParams = request.nextUrl.searchParams
  const query = searchParams.get("q");
  let res: any = await fetch("https://api.themoviedb.org/3/search/movie?include_adult=false&language=en-US&page=1&query="+query, {
    method: "GET",
    headers: {
      authorization: `Bearer ${process.env.TMDB_AUTH_KEY}`,
      accept: "application/json"
    }
  });
  res = await res.json();
  return new Response(JSON.stringify(res));
}