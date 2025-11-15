import React, { useState } from "react";
import { View, Text } from "react-native";
import ReviewCard from "@/components/organisms/ReviewCard";
import { AddReviewButton } from "@/components/molecules/AddReviewButton";
import { ReviewFilters } from "@/components/molecules/ReviewFilters";
import { styles } from "./style";
import { GetMovieReviewsResponse, MovieCriticReview, MovieUserReview } from "@ralvarezdev/proto-movies-ts";

interface MovieReviewsProps {
  criticsReviews: MovieCriticReview[];
  usersReviews: MovieUserReview[];
  // reviews: GetMovieReviewsResponse[];
  reviewCount: number;
  onAddReview: () => void;
}

export const MovieReviews: React.FC<MovieReviewsProps> = ({ usersReviews, reviewCount, onAddReview }) => {
  const [activeFilter, setActiveFilter] = useState("All");

  // const filteredReviews =
  //   activeFilter === "All"
  //     ? reviews
  //     : activeFilter === "Users"
  //     ? reviews.filter((c) => c.badge === "User")
  //     : reviews.filter((c) => c.badge === "Critic");

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Reviews</Text>
        <Text style={styles.count}>({reviewCount.toLocaleString()})</Text>
      </View>

      <AddReviewButton onPress={onAddReview} />

      <ReviewFilters activeFilter={activeFilter} onFilterChange={setActiveFilter} />

      {usersReviews.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>No reviews have been added yet.</Text>
        </View>
      ) : (
        usersReviews.map((review, i) => <ReviewCard key={review.reviewId} review={review} />)
      )}
    </View>
  );
};
