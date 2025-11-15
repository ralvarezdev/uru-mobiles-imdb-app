import React from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";
import { styles } from "./style";
import { SimpleMovie } from "@ralvarezdev/proto-movies-ts";
import { router } from "expo-router";

export interface MovieCardProps {
  movie: SimpleMovie;
}

export const MovieCard = ({ movie }: MovieCardProps) => {
  const yearText = movie.releaseDate?.seconds ? new Date(Number(movie.releaseDate.seconds) * 1000).getFullYear() : "—";

  // Format ratings to 1 decimal place
  const formatRating = (rating: number | undefined | null): string => {
    if (rating === undefined || rating === null || Number.isNaN(rating)) {
      return "--";
    }
    return Number(rating).toFixed(1);
  };

  const usersRating = formatRating(movie.ratingAverageUsers);
  const criticsRating = formatRating(movie.ratingAverageCritics);

  const onPress = () => {
    router.push({ pathname: `/(tabs)/home/movie/[movieId]`, params: { movieId: movie.id } });
  };
  return (
    <TouchableOpacity style={styles.card} onPress={onPress} activeOpacity={0.8}>
      <View style={styles.posterContainer}>
        {movie.posterUrl ? <Image source={{ uri: movie.posterUrl }} style={styles.posterImage} resizeMode="cover" /> : null}
        <View style={styles.yearBadge}>
          <Text style={styles.yearText}>{yearText}</Text>
        </View>
      </View>
      <View style={styles.infoContainer}>
        <Text style={styles.title}>{movie.title}</Text>
        <Text style={styles.subtitle} numberOfLines={3} ellipsizeMode="tail">
          {movie.overview}
        </Text>
        <View style={styles.scoresRow}>
          <View style={styles.scoreBlock}>
            <Text style={styles.scoreLabel}>Usuarios</Text>
            <Text style={styles.star}>⭐</Text>
            <Text style={styles.scoreValue}>{usersRating}</Text>
          </View>
          <View style={styles.scoreBlock}>
            <Text style={styles.scoreLabel}>Críticos</Text>
            <Text style={styles.star}>⭐</Text>
            <Text style={styles.scoreValue}>{criticsRating}</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};
