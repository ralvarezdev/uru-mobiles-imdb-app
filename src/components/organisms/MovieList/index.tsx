import React from "react";
import { FlatList, View, Text } from "react-native";
import { MovieCard } from "@/components/organisms/MovieCard";
import { SimpleMovie } from "@ralvarezdev/proto-movies-ts";
import { styles } from "./style";

export interface MovieListProps {
  movies: SimpleMovie[];
}

const emptyListComponent = () => (
  <View style={styles.emptyContainer}>
    <Text style={styles.emptyText}>No data available</Text>
  </View>
);

export const MovieList = ({ movies }: MovieListProps) => (
  <FlatList
    data={movies}
    keyExtractor={(item) => String(item.id)}
    numColumns={2}
    renderItem={({ item }) => <MovieCard movie={item} />}
    ListEmptyComponent={emptyListComponent}
    // contentContainerStyle={{ paddingHorizontal: 12, paddingTop: 10 }}
    // columnWrapperStyle={{ justifyContent: "space-between", marginBottom: 8 }}
  />
);
