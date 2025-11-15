import React from "react";
import { View, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { styles } from "./style";
import Badge from "@/components/atoms/Badge";
import { MovieCriticReview, MovieUserReview } from "@ralvarezdev/proto-movies-ts";

interface ReviewCardProps {
  review: MovieUserReview | MovieCriticReview;
}

// Type guard to check if review is a MovieUserReview
const isUserReview = (review: MovieUserReview | MovieCriticReview): review is MovieUserReview => {
  return "username" in review && "review" in review;
};

const ReviewCard = ({ review }: ReviewCardProps) => {
  const isCritic = !isUserReview(review);

  // Extract common fields based on type
  const name = isCritic ? review.author : review.username;
  const text = isCritic ? review.content : review.review;
  const rating = review.rating;
  const initial = name ? name[0].toUpperCase() : isCritic ? "C" : "U";
  const key = isCritic ? review.id : review.reviewId.toString();

  return (
    <View style={styles.container}>
      <View style={styles.headerRow}>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>{initial}</Text>
          </View>
          <View style={{ marginLeft: 10 }}>
            <Text style={styles.userText}>{name}</Text>
            <Badge bg={isCritic ? "#fff3e0" : "#f0f7ff"}>{isCritic ? "Critic" : "User"}</Badge>
          </View>
        </View>

        <View style={{ flexDirection: "row", alignItems: "center" }}>
          {Array.from({ length: 5 }).map((_, i) => (
            <Ionicons key={i} name={i < rating ? "star" : "star-outline"} size={16} color="#ffb400" style={{ marginLeft: i === 0 ? 0 : 6 }} />
          ))}
        </View>
      </View>

      <Text style={styles.reviewText}>{text || ""}</Text>
    </View>
  );
};

export default ReviewCard;
