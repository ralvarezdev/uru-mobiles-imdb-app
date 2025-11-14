import React from "react";
import { View } from "react-native";
import RatingBox from "@/components/molecules/RatingBox";
import { styles } from "./style";

interface MovieRatingsProps {
  usersRating: {
    value: number;
    votes: number;
  };
  criticsRating: {
    value: number;
    votes: number;
  };
}

export const MovieRatings: React.FC<MovieRatingsProps> = ({ usersRating, criticsRating }) => {
  return (
    <View style={styles.container}>
      <RatingBox label="Users" votes={usersRating.votes} value={usersRating.value} />
      <RatingBox label="Critics" votes={criticsRating.votes} value={criticsRating.value} color="#ff7a45" />
    </View>
  );
};

