import React, { useEffect, useState, useCallback } from "react";
import { ScreenTemplate } from "@/components/templates/ScreenTemplate";
import { HomeHeader } from "@/components/organisms/HomeHeader";
import { SearchBar } from "@/components/molecules/SearchBar";
import { FiltersChips } from "@/components/molecules/FiltersChips";
import { SortSelector } from "@/components/molecules/SortSelector";
import { MovieList } from "@/components/organisms/MovieList";
import { SimpleMovie, Genre, DiscoverMoviesRequest, SearchMoviesRequest, SortBy } from "@ralvarezdev/proto-movies-ts";
import { LoadingMessage } from "@/components/molecules/LoadingMessage";
import movieService from "@/services/movieService";
import Toast from "react-native-toast-message";
import { isParsedInternalServerError } from "@/utils/errorHandler";

export const HomeScreen = () => {
  const [selectedGenre, setSelectedGenre] = useState<number | null>(null);
  const [sortBy, setSortBy] = useState<SortBy | null>(null);
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const [loadingGenres, setLoadingGenres] = useState(false);
  const [movies, setMovies] = useState<SimpleMovie[]>([] as SimpleMovie[]);
  const [genres, setGenres] = useState<Genre[]>([]);

  // Load genres on mount
  useEffect(() => {
    loadGenres();
  }, []);

  // Debounce search input - wait 500ms after user stops typing
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(search);
    }, 500);

    return () => clearTimeout(timer);
  }, [search]);

  // Load movies when debouncedSearch, genre, or sort changes
  useEffect(() => {
    loadMovies();
  }, [debouncedSearch, selectedGenre, sortBy]);

  const loadGenres = async () => {
    setLoadingGenres(true);
    movieService.clearLastError();

    try {
      const request = {
        language: "en-US",
        $typeName: "ralvarezdev.v1.GetMovieGenresRequest" as const,
      };
      const result = await movieService.getMovieGenres(request);
      console.log("getMovieGenres result:", result);
      if (result?.$typeName === "ralvarezdev.v1.GetMovieGenresResponse") {
        setGenres(result.genres ?? []);
      } else {
        const parsedError = movieService.getLastError();
        if (parsedError) {
          const isInternalError = isParsedInternalServerError(parsedError);
          if (!isInternalError) {
            Toast.show({
              type: "error",
              text1: "Error",
              text2: parsedError.generalMessage || "Could not load genres. Please try again.",
              position: "bottom",
              visibilityTime: 5000,
            });
          }
        }
        setGenres([]);
      }
    } catch (error: any) {
      console.error("Unexpected error loading genres:", error);
      setGenres([]);
    } finally {
      setLoadingGenres(false);
    }
  };

  const loadMovies = useCallback(async () => {
    setLoading(true);
    movieService.clearLastError();

    try {
      let result;

      // If there's a search query, use searchMovies
      if (debouncedSearch.trim()) {
        const searchMoviesProps: SearchMoviesRequest = {
          query: debouncedSearch.trim(),
          $typeName: "ralvarezdev.v1.SearchMoviesRequest",
        };
        result = await movieService.search(searchMoviesProps);
        if (result && result.$typeName === "ralvarezdev.v1.SearchMoviesResponse") {
          setMovies(result.results || []);
        } else {
          handleError();
        }
      } else {
        // Use discoverMovies for genre filtering or default discovery
        const discoverMoviesProps: DiscoverMoviesRequest = {
          $typeName: "ralvarezdev.v1.DiscoverMoviesRequest",
          withGenres: selectedGenre === null ? [] : [String(selectedGenre)],
          withCompanies: [],
          withKeywords: [],
          withCast: [],
          withCrew: [],
          withPeople: [],
          withWatchProviders: [],
          withWatchMonetizationTypes: [],
          ...(sortBy !== null && { sortBy }),
        };

        // Commented out: original getTopRatedMovies implementation
        // const getTopRatedMoviesProps: GetTopRatedMoviesRequest = {
        //   $typeName: "ralvarezdev.v1.GetTopRatedMoviesRequest",
        // };
        // const result = await movieService.getTopRatedMovies(getTopRatedMoviesProps);
        // if (result && result.$typeName === "ralvarezdev.v1.GetTopRatedMoviesResponse") {
        //   setMovies(result.results);
        // } else {
        //   handleError();
        // }

        result = await movieService.discoverMovies(discoverMoviesProps);
        if (result?.$typeName === "ralvarezdev.v1.DiscoverMoviesResponse") {
          setMovies(result.results ?? []);
        } else {
          handleError();
        }
      }
    } catch (error: any) {
      console.error("Unexpected error loading movies:", error);
      handleError();
    } finally {
      setLoading(false);
    }
  }, [debouncedSearch, selectedGenre, sortBy]);

  const handleError = () => {
    const parsedError = movieService.getLastError();
    if (parsedError) {
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
      Toast.show({
        type: "error",
        text1: "Error",
        text2: "Could not load movies. Please try again.",
        position: "bottom",
        visibilityTime: 5000,
      });
    }
    setMovies([]);
  };

  // Only show full screen loading on initial load (genres)
  if (loadingGenres) {
    return <LoadingMessage message="Cargando peliculas..." />;
  }

  return (
    <ScreenTemplate
      header={
        <>
          <HomeHeader />
          <SearchBar value={search} onChange={setSearch} />
          <FiltersChips selected={selectedGenre} onSelect={(value) => setSelectedGenre(typeof value === "number" ? value : null)} genres={genres} />
          {!search.trim() && <SortSelector selected={sortBy} onSelect={setSortBy} />}
        </>
      }
      // footer={<Tag label="Cargando más películas..." color="" textColor="" />}
    >
      {loading ? (
        <LoadingMessage message="Buscando películas..." />
      ) : (
        <MovieList movies={movies.map((movie) => ({ ...movie, $typeName: "ralvarezdev.v1.SimpleMovie" }))} />
      )}
    </ScreenTemplate>
  );
};
