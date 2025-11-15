import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { styles } from "./style";
import { SimpleMovie } from "@ralvarezdev/proto-movies-ts";
import { router, useRouter } from "expo-router";

export interface MovieCardProps {
  movie: SimpleMovie;
}

export const MovieCard = ({ movie }: MovieCardProps) => {
  const yearText = movie.releaseDate?.seconds ? new Date(Number(movie.releaseDate.seconds) * 1000).getFullYear() : "—";

  const onPress = () => {
    router.push({ pathname: `/(tabs)/home/movie/[movieId]`, params: { movieId: movie.id } });
  };

  return (
    <TouchableOpacity style={styles.card} onPress={onPress} activeOpacity={0.8}>
      <View style={styles.posterContainer}>
        <View style={styles.yearBadge}>
          <Text style={styles.yearText}>{yearText}</Text>
        </View>
        {/* Si tienes imagen, aquí va el <Image>. Si no, un placeholder */}
        {/* <Text style={styles.posterText}>{movie.posterUrl}</Text> */}
      </View>
      <View style={styles.infoContainer}>
        <Text style={styles.title}>{movie.title}</Text>
        <Text style={styles.subtitle}>{movie.overview}</Text>
        <View style={styles.scoresRow}>
          <View style={styles.scoreBlock}>
            <Text style={styles.scoreLabel}>Usuarios</Text>
            <Text style={styles.star}>⭐</Text>
            <Text style={styles.scoreValue}>{movie.ratingAverageUsers ?? "--"}</Text>
          </View>
          <View style={styles.scoreBlock}>
            <Text style={styles.scoreLabel}>Críticos</Text>
            <Text style={styles.star}>⭐</Text>
            <Text style={styles.scoreValue}>{movie.ratingAverageCritics ?? "--"}</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};
