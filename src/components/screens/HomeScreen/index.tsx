import React, { useEffect, useState } from "react";
import { ScreenTemplate } from "@/components/templates/ScreenTemplate";
import { HomeHeader } from "@/components/organisms/HomeHeader";
import { SearchBar } from "@/components/molecules/SearchBar";
import { FiltersChips } from "@/components/molecules/FiltersChips";
import { MovieList } from "@/components/organisms/MovieList";
import { GetTopRatedMoviesRequest, SimpleMovie } from "@ralvarezdev/proto-movies-ts";
import { LoadingMessage } from "@/components/molecules/LoadingMessage";
import movieService from "@/services/movieService";
import Toast from "react-native-toast-message";
import { isParsedInternalServerError } from "@/utils/errorHandler";

export const HomeScreen = () => {
  const [filter, setFilter] = useState("Todas");
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const [movies, setMovies] = useState<SimpleMovie[]>([] as SimpleMovie[]);
  useEffect(() => {
    loadMovies();
  }, []);

  const loadMovies = async () => {
    setLoading(true);
    // Clear any previous errors before making the request
    movieService.clearLastError();

    try {
      // const searchMoviesProps: SearchMoviesRequest = {
      //   query: search,
      //   $typeName: "ralvarezdev.v1.SearchMoviesRequest",
      // };
      // const result = await movieService.search(searchMoviesProps);
      // setMovies(result.results);

      const getTopRatedMoviesProps: GetTopRatedMoviesRequest = {
        $typeName: "ralvarezdev.v1.GetTopRatedMoviesRequest",
      };
      const result = await movieService.getTopRatedMovies(getTopRatedMoviesProps);
      if (result && result.$typeName === "ralvarezdev.v1.GetTopRatedMoviesResponse") {
        setMovies(result.results);
      } else {
        // Response is undefined, check for parsed error
        const parsedError = movieService.getLastError();

        if (parsedError) {
          // Check if it's a 502 or other internal server error
          const isInternalError = isParsedInternalServerError(parsedError);

          if (isInternalError) {
            Toast.show({
              type: "error",
              text1: "Error",
              text2: "An internal error occurred while loading movies. Please try again later.",
              position: "bottom",
              visibilityTime: 5000,
            });
          } else {
            Toast.show({
              type: "error",
              text1: "Error",
              text2: parsedError.generalMessage || "Could not load movies. Please try again.",
              position: "bottom",
              visibilityTime: 5000,
            });
          }
        } else {
          // No parsed error available, show generic message
          Toast.show({
            type: "error",
            text1: "Error",
            text2: "Could not load movies. Please try again.",
            position: "bottom",
            visibilityTime: 5000,
          });
        }
        // Set empty array on error
        setMovies([]);
      }
    } catch (error: any) {
      // This catch should rarely be hit now, but keep it as a safety net
      console.error("Unexpected error loading movies:", error);
      Toast.show({
        type: "error",
        text1: "Error",
        text2: "Could not load movies. Please try again.",
        position: "bottom",
        visibilityTime: 5000,
      });
      setMovies([]);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <LoadingMessage message="Cargando peliculas..." />;
  }
  return (
    <ScreenTemplate
      header={
        <>
          <HomeHeader />
          <SearchBar value={search} onChange={setSearch} />
          <FiltersChips selected={filter} onSelect={setFilter} />
        </>
      }
      // footer={<Tag label="Cargando más películas..." color="" textColor="" />}
    >
      <MovieList movies={movies.map((movie) => ({ ...movie, $typeName: "ralvarezdev.v1.SimpleMovie" }))} />
    </ScreenTemplate>
  );
};
