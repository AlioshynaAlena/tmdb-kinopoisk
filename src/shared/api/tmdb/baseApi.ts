import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";
import {handleErrors} from "@/shared/ui/ErrorState/handleErrors.tsx";


const TMDB_BASE_URL = "https://api.themoviedb.org/3";


export const baseApi = createApi({
  reducerPath: "tmdbApi",
  tagTypes: ["Movies", "Shared", "Search", "Filters", "Genres"],
  keepUnusedDataFor: 5,
  refetchOnFocus: true,
  refetchOnReconnect: true,
  baseQuery: async (args, api, extraOptions) => {
    const result = await fetchBaseQuery({
      baseUrl: TMDB_BASE_URL,
      prepareHeaders: (headers) => {
        if (import.meta.env.VITE_TMDB_AUTH_TOKEN) {
          headers.set("Authorization", `Bearer ${import.meta.env.VITE_TMDB_AUTH_TOKEN}`);
        }
        headers.set("Content-Type", "application/json;charset=utf-8");
        return headers;
      },
    })(args, api, extraOptions)

    if (result.error) {
      handleErrors(result.error);
    }

    return result
  },
  endpoints: () => ({}),
})




// export const tmdbBaseQuery = fetchBaseQuery({
//   baseUrl: TMDB_BASE_URL,
//   prepareHeaders: (headers) => {
//     if (import.meta.env.VITE_TMDB_AUTH_TOKEN) {
//       headers.set("Authorization", `Bearer ${import.meta.env.VITE_TMDB_AUTH_TOKEN}`);
//     }
//     headers.set("Content-Type", "application/json;charset=utf-8");
//     return headers;
//   },
// });
//
// export const tmdbBaseQueryWithErrors: typeof tmdbBaseQuery = async (args, api, extraOptions) => {
//   const result = await tmdbBaseQuery(args, api, extraOptions);
//
//   if ("error" in result && result.error) {
//     const status = (result.error as any).status;
//
//     if (!import.meta.env.TMDB_AUTH_TOKEN) {
//       toast.error("TMDB token missing: add VITE_TMDB_AUTH_TOKEN to .env.local");
//       return result;
//     }
//
//     if (status === "FETCH_ERROR") {
//       toast.error("Network error: check internet connection.");
//       return result;
//     }
//
//     if (status === 401 || status === 403) {
//       toast.error("Auth error: invalid TMDB token.");
//       return result;
//     }
//
//     if (status === 404) {
//       toast.error("404: endpoint not found.");
//       return result;
//     }
//
//     toast.error("Unexpected API error.");
//   }
//
//   return result;
// };
