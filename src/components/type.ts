export interface Movie {
  id: number;
  poster_path: string;
  release_date: string;
  vote_average: number;
  overview?: string;
  title?: string;
  original_title?: string; // optional to avoid TS conflicts
}
