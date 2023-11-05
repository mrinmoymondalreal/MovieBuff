import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button'
import { Children, ReactNode } from 'react';

export function ScrollFeedItem({ image, title }: {image: string, title: string}): ReactNode{
  return (
    <div
      style={{
        backgroundImage: `url('${image}')`,
        backgroundSize: 'cover'
      }} 
      className="movie-slide snap-center shrink-0 aspect-video h-32 md:h-48 bg-gray-700 rounded-md group relative">
      <div className="badge absolute bottom-0 inline-flex text-sm justify-center items-center mb-2 md:mb-4 drop-shadow-lg w-full capitalize">
        <Button className="text-sm" type="button" variant={"secondary"} size={"sm"}>{title.slice(0, 25)}{title.length > 25 ? "..." : ""}</Button>
      </div>
    </div>
  );
}
export function ScrollFeedProtraitItem({trendnumber,badgename, image}: {trendnumber?: Number, badgename?: String, image:string}): ReactNode{
  return (
    <div
      style={{
        backgroundImage: `url('${image}')`,
        backgroundSize: 'cover'
      }} 
      className="movie-slide relative snap-center shrink-0 aspect-[2/3] w-32 md:w-48 bg-gray-700 rounded-md group">
      { trendnumber && (<div className="number absolute bottom-0 -mx-4 md:-mx-6 -my-2 text-7xl md:text-8xl font-black drop-shadow-lg">{trendnumber.toString()}</div>) }
      { badgename && (<div className="badge absolute bottom-0 md:mb-4 inline-flex justify-center items-center mb-2 drop-shadow-lg w-full capitalize"><Badge className="rounded-lg" variant={"secondary"}>{badgename}</Badge></div>) }
      <div 
        
        className="badge absolute bottom-0 inline-flex justify-center items-center mb-2 md:mb-4 drop-shadow-lg w-full capitalize">
        <Button className="translate-y-[150%] scale-0 transition-all group-hover:translate-y-0 group-hover:scale-100" type="button" variant={"secondary"} size={"sm"}>Watch Now</Button>
      </div>
    </div>
  );
}

export function ScrollFeedContainer({ title, children }: { title: string, children: ReactNode }){
  return (
    <div className="movie-slides w-screen md:pr-20 text-white">
      <div className="heading font-bold pt-0 p-4">{title}</div>
      <div className="flex w-full overflow-hidden pl-10 overflow-x-auto space-x-6 md:space-x-8 px-4 snap-x no-scrollbar">
        {children}
      </div>
    </div>
  );
}