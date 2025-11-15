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
  movieId?: number;
  currentUsername?: string;
  onEditReview?: (reviewId: number, rating: number, reviewText: string) => void;
  onDeleteReview?: (reviewId: number) => void;
}

// Type guard to check if review is a MovieUserReview
const isUserReview = (review: MovieUserReview | MovieCriticReview): review is MovieUserReview => {
  return "username" in review && "review" in review;
};

export const MovieReviews: React.FC<MovieReviewsProps> = ({
  criticsReviews,
  usersReviews,
  reviewCount,
  onAddReview,
  movieId,
  currentUsername,
  onEditReview,
  onDeleteReview,
}) => {
  const [activeFilter, setActiveFilter] = useState("All");

  // Combine both types of reviews
  const allReviews: (MovieUserReview | MovieCriticReview)[] = [...criticsReviews, ...usersReviews];

  // Filter reviews based on active filter
  const filteredReviews =
    activeFilter === "All"
      ? allReviews
      : activeFilter === "Users"
      ? allReviews.filter((r) => isUserReview(r))
      : allReviews.filter((r) => !isUserReview(r));

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Reviews</Text>
        <Text style={styles.count}>({reviewCount.toLocaleString()})</Text>
      </View>

      <AddReviewButton onPress={onAddReview} />

      <ReviewFilters activeFilter={activeFilter} onFilterChange={setActiveFilter} />

      {filteredReviews.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>No data available</Text>
        </View>
      ) : (
        filteredReviews.map((review) => {
          // Generate unique key based on review type
          const key = isUserReview(review) ? `user-${review.reviewId}` : `critic-${review.id}`;
          return (
            <ReviewCard
              key={key}
              review={review}
              movieId={movieId}
              currentUsername={currentUsername}
              onEdit={onEditReview}
              onDelete={onDeleteReview}
            />
          );
        })
      )}
    </View>
  );
};
