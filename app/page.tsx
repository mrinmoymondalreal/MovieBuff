import { ScrollFeedContainer, ScrollFeedItem, ScrollFeedProtraitItem } from '@/components/Feed';
import { Button } from '@/components/ui/button'
import { PlayIcon, Star } from "lucide-react"

async function getData(){
  let d = await import("../lib/dummyData.json");
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

export default async function Home(){
  let d: MovieData[] = Array.from(await getData());
  let f = Math.floor(Math.random()*d.length);
  return (
    <div className="md:ml-16 overflow-x-hidden">
        <div className="banner w-full relative md:absolute overflow-x-hidden top-0">
          <div className="for-bottom absolute w-full h-24 md:h-80 bottom-0
            bg-gradient-to-b from-transparent via-primary/50 to-primary"></div>
          <div className="for-left absolute w-80 h-full bottom-0
            bg-gradient-to-l from-transparent via-primary to-primary"></div>
          <img src={`https://image.tmdb.org/t/p/original/${d[f].backdrop_path}`} className="max-w-full w-full ml-24" />
          <div className="info absolute bottom-0 
            w-full md:w-1/2 lg:w-1/3 p-4 md:p-8
            h-[80%] text-white top space-y-2 md:space-y-4">
            <div className="heading text-3xl md:text-4xl font-bold">{d[f].title}</div>
            <div className="info font-bold text-xs md:text-sm">{d[f].original_language.toUpperCase()} <span className="text-muted-foreground">•</span> 2h 45m <span className="text-muted-foreground">•</span> <Star size={15} className='inline -mt-1'/>
            <span className="pl-1">{Math.floor(d[f].popularity)}</span></div>
            <div className="sub-bio md:text-sm text-xs hidden md:block">
              {d[f].overview}
            </div>
            <div className="category font-bold text-xs md:text-sm">Mythology <span className="font-normal">|</span> Drama</div>
            <div className="watch">
              <Button variant={"secondary"} className="md:px-8 md:text-xl"> <PlayIcon className="mr-2 h-4 w-4" /> Watch Now</Button>
            </div>
          </div>
        </div>
        <div className="downside md:relative md:mt-[100vh] md:-top-52 h-fit md:block space-y-8">
          <ScrollFeedContainer title="Movie in Trending Now">
            { d.slice(0, 9).map((e, i)=>(
              <ScrollFeedProtraitItem key={i} image={`https://image.tmdb.org/t/p/w300/${e.poster_path}`} trendnumber={i+1}  />
            )) }
          </ScrollFeedContainer>
          <ScrollFeedContainer title="Movie in Action">
            {
              d.slice(21, 30).map((e, i)=>(
                <ScrollFeedItem key={i} image={`https://image.tmdb.org/t/p/w300/${e.backdrop_path}`} title={e.title}/>
              ))
            }
          </ScrollFeedContainer>
          <ScrollFeedContainer title="Movie Free Now">
            { d.slice(10, 20).map((e, i)=>(
              <ScrollFeedProtraitItem key={i} image={`https://image.tmdb.org/t/p/w300/${e.poster_path}`} badgename="new free" />
            )) }
          </ScrollFeedContainer>
          <ScrollFeedContainer title="Movies for You">
            { d.slice(31, 40).map((e, i)=>(
              <ScrollFeedProtraitItem key={i} image={`https://image.tmdb.org/t/p/w300/${e.poster_path}`} />
            )) }
          </ScrollFeedContainer>
          <ScrollFeedContainer title="Movie in Action">
            {
              d.slice(41, 50).map((e, i)=>(
                <ScrollFeedItem key={i} image={`https://image.tmdb.org/t/p/w300/${e.backdrop_path}`} title={e.title}/>
              ))
            }
          </ScrollFeedContainer>
          <ScrollFeedContainer title="Movie Free Now">
            { d.slice(51, 60).map((e, i)=>(
              <ScrollFeedProtraitItem key={i} image={`https://image.tmdb.org/t/p/w300/${e.poster_path}`} />
            )) }
          </ScrollFeedContainer>
        </div>
    </div>
  )
}