import { selectFavorites } from "@/features/favorites/model/favoritesSlice";
import {useAppSelector} from "@/shared/lib/hooks/useAppSelector.ts";

export function useFavoritesMovies() {
  return useAppSelector(selectFavorites);
}
