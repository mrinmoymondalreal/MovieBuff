"use client";

import { LoadingScreen } from "@/components/Loading";
import { SimilarSection } from "@/components/Sections";
import { CastData, MovieDataTypes } from "@/lib/types";
import { ArrowUpCircleIcon, Star, User } from "lucide-react";
import { useEffect, useState } from "react";

function CastTray({
  image,
  name,
  departement,
}: {
  image: string;
  name: string;
  departement: string;
}) {
  return (
    <div className="movie-slide transition-all h-fit relative shrink-0 w-32 md:w-44 bg-gray-700 rounded-md group overflow-hidden">
      <div
        style={{
          backgroundImage: `url('${
            "https://image.tmdb.org/t/p/w500/" + image
          }')`,
          backgroundSize: "cover",
        }}
        className="aspect-[2/3] w-full"
      ></div>
      <div className="info w-full bg-white flex flex-col px-4 py-2">
        <div className="name font-bold">{name}</div>
        <div className="known text-sm font-semibold text-muted-foreground">
          {departement}
        </div>
      </div>
    </div>
  );
}

export default function Page({ params }: { params: { movie_id: string } }) {
  let movie_id: string = params.movie_id;

  let [data, setData] = useState<MovieDataTypes>();
  let [isLoading, setLoading] = useState<boolean>(true);

  let [cast, setCast] = useState<CastData>();

  useEffect(() => {
    fetch("/api/movie?movie_id=" + movie_id, {
      method: "GET",
    })
      .then((e) => e.json())
      .then((e: any) => {
        setData(e);
        fetch("/api/credits?movie_id=" + movie_id, {
          method: "GET",
        })
          .then((i) => i.json())
          .then((i) => {
            setCast(i);
            setLoading(false);
          });
      });
  }, []);

  return isLoading ? (
    <LoadingScreen />
  ) : (
    data && (
      <div className="space-y-4">
        <div
          style={{
            backgroundImage: `url('${
              "https://image.tmdb.org/t/p/original" + data?.backdrop_path!
            }')`,
            backgroundSize: "cover",
          }}
          className="w-full relative pt-24 pb-4 md:h-[70vh] px-0 md:px-32 flex justify-start items-center gap-x-8 overflow-hidden"
        >
          <div
            className="for-top absolute h-[50%] w-full left-0 bottom-0
        bg-gradient-to-b from-transparent via-primary to-primary"
          ></div>
          <div
            style={{
              backgroundImage: `url('${
                "https://image.tmdb.org/t/p/original" + data?.poster_path!
              }')`,
              backgroundSize: "cover",
            }}
            className="movie-slide hidden md:block transition-all relative snap-center shrink-0 aspect-[2/3] w-72 bg-gray-700 rounded-md group"
          >
            <div className="badge absolute bottom-0 inline-flex justify-center items-center mb-2 md:mb-4 drop-shadow-lg w-full capitalize"></div>
          </div>
          <div className="z-10 relative">
            <div className="flex flex-col gap-y-2 text-white p-5">
              <div className="div space-y-1">
                <div className="heading text-3xl font-bold">{data?.title!}</div>
                <div className="original_title text-lg font-semibold">
                  {data?.original_title!}
                </div>
                <div className="tagline">{data?.tagline!}</div>
              </div>
              <div className="genre text-md font-semibold">
                {data?.genres!.map((e: any) => e.name).join(" | ")}
              </div>
              <div className="text-md">
                {data?.status!} <span className="text-muted-foreground">•</span>{" "}
                {data?.runtime!}m{" "}
                <span className="text-muted-foreground">•</span>{" "}
                {data?.production_countries![0].name}{" "}
                <span className="text-muted-foreground">•</span>{" "}
                {data?.spoken_languages![0].english_name}
              </div>
              <div className="overview">
                <Star size={15} className="inline -mt-1" />{" "}
                {data?.vote_average!}
                <User size={15} className="inline ml-2 -mt-1" />{" "}
                {data?.vote_count!}
              </div>
              {/* <div className="stream"> */}
              {/* In Future */}
              {/* </div> */}
            </div>
          </div>
        </div>

        <div className="flex flex-col md:flex-row gap-y-4">
          <div className="space-y-4 flex-[2]">
            <div className="overview md:ml-16 px-6 text-white space-y-2">
              <div className="heading text-xl font-bold">Overview</div>
              <div className="details space-y-1 px-2">
                <div className="des">{data?.overview!}</div>
                <div className="budget">
                  <span className="font-semibold">Budget:</span> $
                  {data?.budget!}
                </div>
                <div className="boxoffice">
                  <span className="font-semibold">Box Office:</span> $
                  {data?.revenue!}
                </div>
                <div className="pop">
                  <ArrowUpCircleIcon className="inline -mt-1" />{" "}
                  {data?.popularity!}
                </div>
              </div>
            </div>

            <div className="facts md:ml-16 px-8 text-white flex gap-x-4">
              <div className="flex flex-col">
                <div className="title font-semibold">Status</div>
                <div className="data">{data?.status!}</div>
              </div>
              <div className="flex flex-col">
                <div className="title font-semibold">Release Date</div>
                <div className="data">{data?.release_date!}</div>
              </div>
              <div className="flex flex-col">
                <div className="title font-semibold">Languages</div>
                <div className="data">
                  {data
                    ?.spoken_languages!.map((e: any) => e.english_name)
                    .join(",")}
                </div>
              </div>
            </div>
          </div>

          <div className="overview flex-1 md:ml-16 px-6 text-white space-y-2">
            <div className="heading text-xl font-bold">Production</div>
            <div className="details space-y-1">
              <div className="flex flex-col px-2">
                <div className="font-semibold">Production Companies: </div>
                <div className="">
                  {data?.production_companies!.map((e: any) => {
                    return (
                      <div key={e.name}>
                        {e.name}{" "}
                        {e.origin_country && "from " + e.origin_country}
                      </div>
                    );
                  })}
                </div>
              </div>
              <div className="flex flex-col px-2">
                <div className="font-semibold">Production Companies: </div>
                <div className="">
                  {data
                    ?.production_countries!.map((e: any) => e.name)
                    .join(",")}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="cast px-6 md:ml-16 space-y-4">
          <div className="heading text-xl font-bold text-white">Top Cast</div>
          <div className="artists flex w-full overflow-hidden overflow-x-auto space-x-6 md:space-x-8 px-4 snap-x no-scrollbar">
            {cast &&
              cast.cast.map((e, i) => {
                return (
                  <CastTray
                    key={i}
                    image={e.profile_path}
                    name={e.name}
                    departement={e.character}
                  />
                );
              })}
          </div>
        </div>
        <div className="cast px-6 md:ml-16 space-y-4">
          <div className="heading text-xl font-bold text-white">Top Crew</div>
          <div className="artists flex w-full overflow-hidden overflow-x-auto space-x-6 md:space-x-8 px-4 snap-x no-scrollbar">
            {cast &&
              cast.crew.map((e, i) => {
                return (
                  <CastTray
                    key={i}
                    image={e.profile_path}
                    name={e.name}
                    departement={e.job}
                  />
                );
              })}
          </div>
        </div>
        <div className="md:ml-16">
          <SimilarSection movie_id={movie_id} />
        </div>
      </div>
    )
  );
}
