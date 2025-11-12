import React from "react";
import { FlatList, View } from "react-native";
import { MovieCard } from "@/components/organisms/MovieCard";
import { SimpleMovie } from "@ralvarezdev/proto-movies-ts";

export interface MovieListProps {
  movies: SimpleMovie[];
}

export const MovieList = ({ movies }: MovieListProps) => (
  <FlatList
    data={movies}
    keyExtractor={(item) => String(item.id)}
    numColumns={2}
    renderItem={({ item }) => <MovieCard movie={item} />}
    // contentContainerStyle={{ paddingHorizontal: 12, paddingTop: 10 }}
    // columnWrapperStyle={{ justifyContent: "space-between", marginBottom: 8 }}
  />
);
