export interface MovieData {
  title: string;
  overview: string;
  backdrop_path: string;
  poster_path: string;
  original_language: string,
  popularity: number,
  genre_ids: number[],
  vote_average: number,
  id: string
}

export interface MovieDataTypes{
  "adult": boolean;
  "backdrop_path": string,
  "belongs_to_collection": string | null,
  "budget": number,
  "genres": {
    "id": number,
    "name": string
  }[],
  "homepage": string,
  "id": number,
  "imdb_id": string,
  "original_language": string,
  "original_title": string,
  "overview": string,
  "popularity": number,
  "poster_path": string,
  "production_companies": {
    "id": number,
    "logo_path": string,
    "name": string,
    "origin_country": string
  }[],
  "production_countries": {
    "iso_3166_1": string,
    "name": string
  }[],
  "release_date": string,
  "revenue": number,
  "runtime": number,
  "spoken_languages": {
    "english_name": string,
    "iso_639_1": string,
    "name": string
  }[],
  "status": string,
  "tagline": string,
  "title": string,
  "video": boolean,
  "vote_average": number,
  "vote_count": number
}

export interface CastData{
  "id": number;
  "cast": {
    "adult": boolean,
    "gender": number,
    "id": number,
    "known_for_department": string,
    "name": string,
    "original_name": string,
    "popularity": number,
    "profile_path": string,
    "cast_id": number,
    "character": string
    "credit_id": string,
    "order": number
  }[];
  "crew": {
    "adult": boolean,
    "gender": number,
    "id": number,
    "known_for_department": string,
    "name": string,
    "original_name": string,
    "popularity": number,
    "profile_path": string,
    "cast_id": number,
    "department": string,
    "job": string
  }[];
}