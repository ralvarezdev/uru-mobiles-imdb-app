import React from "react";
import { View, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { styles } from "./style";
import Badge from "@/components/atoms/Badge";
import { MovieCriticReview, MovieUserReview } from "@ralvarezdev/proto-movies-ts";

interface ReviewCardProps {
  review: MovieUserReview;
  // review: MovieUserReview | MovieCriticReview;
}

const ReviewCard = ({ review }: ReviewCardProps) => {
  const initial = review.username ? review.username[0].toUpperCase() : "U";

  return (
    <View style={styles.container}>
      <View style={styles.headerRow}>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>{initial}</Text>
          </View>
          <View style={{ marginLeft: 10 }}>
            <Text style={styles.userText}>{review.username}</Text>
            <Badge bg="#f0f7ff">Usuarios</Badge>
          </View>
        </View>

        <View style={{ flexDirection: "row", alignItems: "center" }}>
          {Array.from({ length: 5 }).map((_, i) => (
            <Ionicons key={i} name={i < review.rating ? "star" : "star-outline"} size={16} color="#ffb400" style={{ marginLeft: i === 0 ? 0 : 6 }} />
          ))}
        </View>
      </View>

      <Text style={styles.reviewText}>{review.review || ""}</Text>
      {/* <Text style={styles.reviewText}>{(review as MovieCriticReview).content || (review as MovieUserReview).review || ""}</Text> */}
    </View>
  );
};

export default ReviewCard;
