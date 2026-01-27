import { useCategoryMovies } from "@/shared/api/hooks/useCategoryMovies";
import {MovieSection} from "@/entities/movie/ui/MovieSection/MovieSection.tsx";
import {MainHero} from "@/widgets/main-hero/ui/MainHero.tsx";
import {getImageUrl} from "@/entities/movie/lib/imageUrl.ts";


// если у тебя есть skeleton для секции — можно подключить
// import { MoviesSectionSkeleton } from "@/widgets/movies-section/ui/MoviesSectionSkeleton";

export function MainPage() {
  const { data: popularData, isLoading: popularLoading } = useCategoryMovies("popular", { page: 1 });
  const { data: topRatedData, isLoading: topRatedLoading } = useCategoryMovies("top_rated", { page: 1 });
  const { data: nowPlayingData, isLoading: nowPlayingLoading } = useCategoryMovies("now_playing", { page: 1 });
  const { data: upcomingData, isLoading: upcomingLoading } = useCategoryMovies("upcoming", { page: 1 });

  const sections = [
    { title: "Popular Movies", movies: popularData?.results?.slice(0, 6) || [], category: "popular" },
    { title: "Top Rated Movies", movies: topRatedData?.results?.slice(0, 6) || [], category: "top_rated" },
    { title: "Upcoming Movies", movies: upcomingData?.results?.slice(0, 6) || [], category: "upcoming" },
    { title: "Now Playing Movies", movies: nowPlayingData?.results?.slice(0, 6) || [], category: "now_playing" },
  ] as const;

  const isSectionLoading =
    popularLoading ||
    topRatedLoading ||
    nowPlayingLoading ||
    upcomingLoading;


  // 🔹 Берём случайный фильм из popular для фона
  const randomMovie = popularData?.results?.[
    Math.floor(Math.random() * (popularData?.results?.length || 1))
    ];

  const backdropUrl = randomMovie?.backdrop_path
    ? getImageUrl(randomMovie.backdrop_path, "w780")
    : undefined;

  return (
    <>
    <MainHero backdropUrl={backdropUrl} />
    <section>
      {isSectionLoading ? (
        // 🔹 ВАРИАНТ 1 — пока без skeleton, просто пусто
        // <p>Loading...</p>

        // 🔹 ВАРИАНТ 2 — если есть MoviesSectionSkeleton (рекомендую позже)
        sections.map((section) => (
          <div key={section.category} style={{ marginBottom: "32px" }}>
            <p style={{ opacity: 0.5 }}>{section.title}</p>
          </div>
        ))
      ) : (
        sections.map((section) => (
          <MovieSection
            key={section.category}
            title={section.title}
            movies={section.movies}
            category={section.category}
          />
        ))
      )}
    </section>
    </>
  );
}
