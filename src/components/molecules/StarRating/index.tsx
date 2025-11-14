import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { styles } from "./style";

interface StarRatingProps {
  rating: number;
  onRatingChange: (rating: number) => void;
  error?: string;
}

export const StarRating: React.FC<StarRatingProps> = ({ rating, onRatingChange, error }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>Rating</Text>
      <View style={styles.starsContainer}>
        {Array.from({ length: 5 }).map((_, i) => {
          const starValue = i + 1;
          return (
            <TouchableOpacity
              key={i}
              onPress={() => onRatingChange(starValue)}
              activeOpacity={0.7}
              style={styles.starButton}>
              <Ionicons name={starValue <= rating ? "star" : "star-outline"} size={32} color="#ffb400" />
            </TouchableOpacity>
          );
        })}
      </View>
      {rating > 0 && <Text style={styles.ratingText}>{rating} of 5 stars</Text>}
      {error ? <Text style={styles.errorText}>{error}</Text> : null}
    </View>
  );
};

