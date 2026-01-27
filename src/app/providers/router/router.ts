export const routes = {
  root: () => "/",
  category: (category: string) => `/category/${category}`, // category: popular | top_rated | upcoming | now_playing
  filtered: () => "/filtered",
  search: () => "/search",
  favorites: () => "/favorites",
  movie: (movieId: string) => `/movie/${movieId}`,
} as const;
