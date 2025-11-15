import React, { useEffect, useState } from "react";
import { ScreenTemplate } from "@/components/templates/ScreenTemplate";
import { HomeHeader } from "@/components/organisms/HomeHeader";
import { SearchBar } from "@/components/molecules/SearchBar";
import { FiltersChips } from "@/components/molecules/FiltersChips";
import { MovieList } from "@/components/organisms/MovieList";
import { SearchMoviesRequest, SimpleMovie } from "@ralvarezdev/proto-movies-ts";
import type { Timestamp } from "@bufbuild/protobuf/wkt";
import { LoadingMessage } from "@/components/molecules/LoadingMessage";
import movieService from "@/services/movieService";

export const moviesTest = [
  {
    adult: false,
    genreIds: [28, 12],
    id: 101,
    originalLanguage: "en",
    originalTitle: "Sky Raiders",
    overview: "A daring pilot embarks on a mission to save a stranded crew.",
    popularity: 87.2,
    posterUuid: "poster-uuid-001",
    releaseDate: { seconds: 1699476294n, nanos: 500000000, $typeName: "google.protobuf.Timestamp" } as Timestamp,
    title: "Sky Raiders",
    ratingAverageUsers: 7.5,
    ratingCountUsers: 1240,
    ratingAverageCritics: 7.0,
    ratingCountCritics: 220,
  },
  {
    adult: false,
    genreIds: [18],
    id: 102,
    originalLanguage: "es",
    originalTitle: "El Camino del Viento",
    overview: "Un joven descubre su destino en un remoto pueblo costero.",
    popularity: 65.3,
    posterUuid: "poster-uuid-002",
    releaseDate: { seconds: 1699476294n, nanos: 500000000, $typeName: "google.protobuf.Timestamp" } as Timestamp,
    title: "El Camino del Viento",
    ratingAverageUsers: 6.8,
    ratingCountUsers: 321,
    ratingAverageCritics: 6.5,
    ratingCountCritics: 100,
  },
  {
    adult: true,
    genreIds: [53, 80],
    id: 103,
    originalLanguage: "en",
    originalTitle: "Dark Streets",
    overview: "A detective gets involved in a conspiracy while investigating a murder.",
    posterUuid: "poster-uuid-003",
    title: "Dark Streets",
    ratingAverageUsers: 6.2,
    ratingCountUsers: 85,
    ratingAverageCritics: 6.0,
    ratingCountCritics: 10,
    releaseDate: { seconds: 1699476294n, nanos: 500000000, $typeName: "google.protobuf.Timestamp" } as Timestamp,
  },
  {
    adult: false,
    genreIds: [16, 10751],
    id: 104,
    originalLanguage: "fr",
    originalTitle: "Le Petit Renard",
    overview: "Un zorro emprende una aventura para encontrar su familia.",
    popularity: 42.9,
    posterUuid: "poster-uuid-004",
    releaseDate: { seconds: 1699476294n, nanos: 500000000, $typeName: "google.protobuf.Timestamp" } as Timestamp,
    title: "The Little Fox",
    ratingAverageUsers: 8.2,
    ratingCountUsers: 980,
    ratingAverageCritics: 7.9,
    ratingCountCritics: 150,
  },
  {
    adult: false,
    genreIds: [35],
    id: 105,
    originalLanguage: "en",
    originalTitle: "Office Madness",
    overview: "A group of coworkers gets trapped in their office overnight.",
    popularity: 53.1,
    posterUuid: "poster-uuid-005",
    title: "Office Madness",
    ratingAverageUsers: 6.7,
    ratingCountUsers: 410,
    ratingAverageCritics: 6.9,
    ratingCountCritics: 31,
    releaseDate: { seconds: 1699476294n, nanos: 500000000, $typeName: "google.protobuf.Timestamp" } as Timestamp,
  },
  {
    adult: false,
    genreIds: [14, 12],
    id: 106,
    originalLanguage: "en",
    originalTitle: "The Enchanted Forest",
    overview: "A lost traveler discovers a magical world hidden among ancient trees.",
    popularity: 91.4,
    posterUuid: "poster-uuid-006",
    releaseDate: { seconds: 1699476294n, nanos: 500000000, $typeName: "google.protobuf.Timestamp" } as Timestamp,
    title: "The Enchanted Forest",
    ratingAverageUsers: 7.9,
    ratingCountUsers: 1544,
    ratingAverageCritics: 7.8,
    ratingCountCritics: 890,
  },
  {
    adult: false,
    genreIds: [878, 28],
    id: 107,
    originalLanguage: "ja",
    originalTitle: "新世界の門",
    overview: "A mech pilot fights to save Earth from an alternate dimension invasion.",
    popularity: 110.6,
    posterUuid: "poster-uuid-007",
    releaseDate: { seconds: 1699476294n, nanos: 500000000, $typeName: "google.protobuf.Timestamp" } as Timestamp,
    title: "Gate of the New World",
    ratingAverageUsers: 8.7,
    ratingCountUsers: 2877,
    ratingAverageCritics: 8.9,
    ratingCountCritics: 1050,
  },
  {
    adult: false,
    genreIds: [27],
    id: 108,
    originalLanguage: "en",
    originalTitle: "Whispers in the Dark",
    overview: "A family moves into a haunted house with a grim past.",
    // posterUuid: "poster-uuid-008",
    title: "Whispers in the Dark",
    ratingAverageUsers: 5.8,
    ratingCountUsers: 125,
    ratingAverageCritics: 6.1,
    ratingCountCritics: 75,
    releaseDate: { seconds: 1699476294n, nanos: 500000000, $typeName: "google.protobuf.Timestamp" } as Timestamp,
  },
  {
    adult: false,
    genreIds: [36, 18],
    id: 109,
    originalLanguage: "en",
    originalTitle: "Empire Rising",
    overview: "The rise and fall of a historic empire told through the eyes of its soldiers.",
    popularity: 72.5,
    posterUuid: "poster-uuid-009",
    releaseDate: { seconds: 1699476294n, nanos: 500000000, $typeName: "google.protobuf.Timestamp" } as Timestamp,
    title: "Empire Rising",
    ratingAverageUsers: 7.1,
    ratingCountUsers: 670,
    ratingAverageCritics: 7.0,
    ratingCountCritics: 340,
  },
  {
    adult: false,
    genreIds: [10749, 35],
    id: 110,
    originalLanguage: "pt",
    originalTitle: "Amor na Praia",
    overview: "Dois estranhos se conhecem em uma pequena ilha tropical.",
    popularity: 58.8,
    posterUuid: "poster-uuid-010",
    releaseDate: { seconds: 1699476294n, nanos: 500000000, $typeName: "google.protobuf.Timestamp" } as Timestamp,
    title: "Love on the Beach",
    ratingAverageUsers: 6.5,
    ratingCountUsers: 305,
    ratingAverageCritics: 6.2,
    ratingCountCritics: 120,
  },
] as SimpleMovie[];

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
    // const searchMoviesProps: SearchMoviesRequest = {
    //   query: "",
    //   $typeName: "ralvarezdev.v1.SearchMoviesRequest",
    // };
    // //TODO: descomentar lo de abajo
    // const result = await movieService.search(searchMoviesProps);
    // setMovies(result.results);
    setMovies(moviesTest);
    setLoading(false);
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

// import React, { useEffect, useState } from "react";
// import { ScreenTemplate } from "@/components/templates/ScreenTemplate";
// import { Tag } from "@/components/atoms/Tag";
// import { MovieList } from "@/components/organisms/MovieList";
// import { SearchBar } from "@/components/molecules/SearchBar";
// import { SearchMoviesRequest, SimpleMovie } from "@ralvarezdev/proto-movies-ts";
// import { LoadingMessage } from "@/components/molecules/LoadingMessage";
// import movieService from "@/services/movieService";

// const exampleMovies = [
//   {
//     adult: false,
//     genreIds: [28, 12],
//     id: 101,
//     originalLanguage: "en",
//     originalTitle: "Sky Raiders",
//     overview: "A daring pilot embarks on a mission to save a stranded crew.",
//     popularity: 87.2,
//     posterUuid: "poster-uuid-001",
//     releaseDate: { seconds: 1699476294n, nanos: 500000000 },
//     title: "Sky Raiders",
//     voteAverage: 7.5,
//     voteCount: 1240,
//   },
//   {
//     adult: false,
//     genreIds: [18],
//     id: 102,
//     originalLanguage: "es",
//     originalTitle: "El Camino del Viento",
//     overview: "Un joven descubre su destino en un remoto pueblo costero.",
//     popularity: 65.3,
//     posterUuid: "poster-uuid-002",
//     releaseDate: { seconds: 1681230000n, nanos: 0 },
//     title: "El Camino del Viento",
//     voteAverage: 6.8,
//     voteCount: 321,
//   },
//   {
//     adult: true,
//     genreIds: [53, 80],
//     id: 103,
//     originalLanguage: "en",
//     originalTitle: "Dark Streets",
//     overview: "A detective gets involved in a conspiracy while investigating a murder.",
//     posterUuid: "poster-uuid-003",
//     title: "Dark Streets",
//   },
//   {
//     adult: false,
//     genreIds: [16, 10751],
//     id: 104,
//     originalLanguage: "fr",
//     originalTitle: "Le Petit Renard",
//     overview: "Un zorro emprende una aventura para encontrar su familia.",
//     popularity: 42.9,
//     posterUuid: "poster-uuid-004",
//     releaseDate: { seconds: 1627776000n, nanos: 0 },
//     title: "The Little Fox",
//     voteAverage: 8.2,
//     voteCount: 980,
//   },
//   {
//     adult: false,
//     genreIds: [35],
//     id: 105,
//     originalLanguage: "en",
//     originalTitle: "Office Madness",
//     overview: "A group of coworkers gets trapped in their office overnight.",
//     popularity: 53.1,
//     posterUuid: "poster-uuid-005",
//     title: "Office Madness",
//   },
//   {
//     adult: false,
//     genreIds: [14, 12],
//     id: 106,
//     originalLanguage: "en",
//     originalTitle: "The Enchanted Forest",
//     overview: "A lost traveler discovers a magical world hidden among ancient trees.",
//     popularity: 91.4,
//     posterUuid: "poster-uuid-006",
//     releaseDate: { seconds: 1704067200n, nanos: 250000000 },
//     title: "The Enchanted Forest",
//     voteAverage: 7.9,
//     voteCount: 1544,
//   },
//   {
//     adult: false,
//     genreIds: [878, 28],
//     id: 107,
//     originalLanguage: "ja",
//     originalTitle: "新世界の門",
//     overview: "A mech pilot fights to save Earth from an alternate dimension invasion.",
//     popularity: 110.6,
//     posterUuid: "poster-uuid-007",
//     releaseDate: { seconds: 1672531200n, nanos: 0 },
//     title: "Gate of the New World",
//     voteAverage: 8.7,
//     voteCount: 2877,
//   },
//   {
//     adult: false,
//     genreIds: [27],
//     id: 108,
//     originalLanguage: "en",
//     originalTitle: "Whispers in the Dark",
//     overview: "A family moves into a haunted house with a grim past.",
//     posterUuid: "poster-uuid-008",
//     title: "Whispers in the Dark",
//   },
//   {
//     adult: false,
//     genreIds: [36, 18],
//     id: 109,
//     originalLanguage: "en",
//     originalTitle: "Empire Rising",
//     overview: "The rise and fall of a historic empire told through the eyes of its soldiers.",
//     popularity: 72.5,
//     posterUuid: "poster-uuid-009",
//     releaseDate: { seconds: 1609459200n, nanos: 75000000 },
//     title: "Empire Rising",
//     voteAverage: 7.1,
//     voteCount: 670,
//   },
//   {
//     adult: false,
//     genreIds: [10749, 35],
//     id: 110,
//     originalLanguage: "pt",
//     originalTitle: "Amor na Praia",
//     overview: "Dois estranhos se conhecem em uma pequena ilha tropical.",
//     popularity: 58.8,
//     posterUuid: "poster-uuid-010",
//     releaseDate: { seconds: 1654041600n, nanos: 0 },
//     title: "Love on the Beach",
//     voteAverage: 6.5,
//     voteCount: 305,
//   },
// ];

// const HomeScreen = () => {
//   const [loading, setLoading] = useState(false);
//   const [movies, setMovies] = useState<SimpleMovie[]>(exampleMovies);
//   useEffect(() => {
//     // loadMovies();
//   }, []);

//   const loadMovies = async () => {
//     setLoading(true);
//     const searchMoviesProps: SearchMoviesRequest = {
//       query: "",
//       $typeName: "ralvarezdev.v1.SearchMoviesRequest",
//     };
//     const result = await movieService.search(searchMoviesProps);
//     setMovies(result.results);
//     setLoading(false);
//   };

//   if (loading) {
//     return <LoadingMessage message="Cargando peliculas..." />;
//   }

//   return (
//     <ScreenTemplate header={<SearchBar value="" onChange={() => {}} />} footer={<Tag label="Cargando más películas..." />}>
//       <Tag label="Todas" />
//       <MovieList movies={movies} />
//     </ScreenTemplate>
//   );
// };

// export default HomeScreen;
