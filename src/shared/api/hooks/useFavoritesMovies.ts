import { selectFavorites } from "@/features/favorites/model/favoritesSlice";
import {useAppSelector} from "@/shared/api/hooks/useAppSelector.ts";

export function useFavoritesMovies() {
  return useAppSelector(selectFavorites);
}
