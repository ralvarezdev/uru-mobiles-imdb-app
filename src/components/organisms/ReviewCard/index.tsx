import React from "react";
import { View, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { styles } from "./style";
import Badge from "@/components/atoms/Badge";
import { MovieCriticReview, MovieUserReview } from "@ralvarezdev/proto-movies-ts";
import { convert10To5, getFullStars, hasHalfStar, roundToHalf } from "@/utils/ratingConverter";

interface ReviewCardProps {
  review: MovieUserReview | MovieCriticReview;
}

// Type guard to check if review is a MovieUserReview
const isUserReview = (review: MovieUserReview | MovieCriticReview): review is MovieUserReview => {
  return "username" in review && "review" in review;
};

const ReviewCard = ({ review }: ReviewCardProps) => {
  const isCritic = !isUserReview(review);

  // Debug: log specific properties to avoid BigInt serialization issues
  // console.log("ReviewCard - review.rating:", review.rating);
  // console.log("ReviewCard - review.rating type:", typeof review.rating);
  // console.log("ReviewCard - isCritic:", isCritic);
  // console.log("ReviewCard - review keys:", Object.keys(review));

  // Extract common fields based on type
  const name = isCritic ? review.author : review.username;
  const text = isCritic ? review.content : review.review;

  // Try multiple ways to extract rating
  let rating10: number = 0;
  let ratingFound = false;

  // First, try direct access
  if (review.rating !== undefined && review.rating !== null) {
    const parsed = Number(review.rating);
    // console.log("ReviewCard - parsed rating:", parsed);
    if (!Number.isNaN(parsed)) {
      rating10 = parsed;
      ratingFound = true;
    }
  }

  // If that didn't work, try accessing as a property that might be nested
  if (!ratingFound) {
    const ratingValue = (review as any).ratingValue || (review as any).score || (review as any).rating;
    if (ratingValue !== undefined && ratingValue !== null) {
      const parsed = Number(ratingValue);
      if (!Number.isNaN(parsed)) {
        rating10 = parsed;
        ratingFound = true;
      }
    }
  }

  // Validate and clamp rating
  if (Number.isNaN(rating10) || rating10 < 0) rating10 = 0;
  if (rating10 > 10) rating10 = 10;

  // console.log("ReviewCard - Final rating10:", rating10, "ratingFound:", ratingFound);

  // Get initial for avatar
  let initial = "U";
  if (name) {
    initial = name[0].toUpperCase();
  } else if (isCritic) {
    initial = "C";
  }

  // Convert 1-10 scale to 1-5 scale for star display
  const rating5 = convert10To5(rating10);
  const roundedRating5 = roundToHalf(rating5);
  const fullStars = getFullStars(roundedRating5);
  const hasHalf = hasHalfStar(roundedRating5);

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
          {/* Render all 5 stars based on rating */}
          {Array.from({ length: 5 }).map((_, i) => {
            let iconName: "star" | "star-half" | "star-outline" = "star-outline";

            if (i < fullStars) {
              iconName = "star";
            } else if (i === fullStars && hasHalf) {
              iconName = "star-half";
            }

            return <Ionicons key={`star-${rating10}-${i}`} name={iconName} size={16} color="#ffb400" style={{ marginLeft: i === 0 ? 0 : 4 }} />;
          })}
          <Text style={{ marginLeft: 8, fontSize: 12, color: "#666" }}>{rating10 > 0 ? rating10.toFixed(1) : "0.0"}</Text>
        </View>
      </View>

      <Text style={styles.reviewText}>{text || ""}</Text>
    </View>
  );
};

export default ReviewCard;
