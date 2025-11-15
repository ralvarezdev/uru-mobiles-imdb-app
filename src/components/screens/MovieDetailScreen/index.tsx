import React, { useState, useEffect } from "react";
import { ScrollView, View } from "react-native";
import { useRouter, useLocalSearchParams } from "expo-router";
import {
  AddMovieReviewRequest,
  GetMovieDetailsRequest,
  GetMovieDetailsResponse,
  GetMovieReviewsRequest,
  GetMovieReviewsResponse,
  UpdateMovieReviewRequest,
  DeleteMovieReviewRequest,
  Genre,
  ProductionCompany,
  ProductionCountry,
  SpokenLanguage,
} from "@ralvarezdev/proto-movies-ts";
import { Timestamp } from "@bufbuild/protobuf/wkt";
import movieService from "@/services/movieService";
import userService from "@/services/userService";
import { GetMyProfileRequest } from "@ralvarezdev/proto-user-ts";
import { LoadingMessage } from "@/components/molecules/LoadingMessage";
import Toast from "react-native-toast-message";
import { isInternalServerError, isParsedInternalServerError } from "@/utils/errorHandler";

import { styles } from "./style";
import MoviePoster from "@/components/organisms/MoviePoster";
import { MovieRatings } from "@/components/organisms/MovieRatings";
import { MovieSynopsis } from "@/components/organisms/MovieSynopsis";
import { MovieMetaInfo } from "@/components/organisms/MovieMetaInfo";
import { MovieCast } from "@/components/organisms/MovieCast";
import { MovieReviews } from "@/components/organisms/MovieReviews";
import { AddReviewModal } from "@/components/organisms/AddReviewModal";
import { EditReviewModal } from "@/components/organisms/EditReviewModal";
import { MovieNotFound } from "@/components/organisms/MovieNotFound";

const MovieDetailScreen = () => {
  const { movieId } = useLocalSearchParams();
  const router = useRouter();
  const [movie, setMovie] = useState<GetMovieDetailsResponse | null>(null);
  const [reviews, setReviews] = useState<GetMovieReviewsResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);
  const [submittingReview, setSubmittingReview] = useState(false);
  const [currentUsername, setCurrentUsername] = useState<string | undefined>(undefined);
  const [editingReviewId, setEditingReviewId] = useState<number | null>(null);
  const [editingRating, setEditingRating] = useState(0);
  const [editingReviewText, setEditingReviewText] = useState("");

  const loadCurrentUser = async () => {
    try {
      userService.clearLastError();
      const request: GetMyProfileRequest = {
        $typeName: "ralvarezdev.v1.GetMyProfileRequest",
      };
      const user = await userService.me(request);
      if (user?.username) {
        setCurrentUsername(user.username);
      }
    } catch (error) {
      // Silently fail - user might not be logged in
      console.log("Could not load current user:", error);
    }
  };

  useEffect(() => {
    loadCurrentUser();
  }, []);

  useEffect(() => {
    if (movieId) {
      loadMovieDetail();
    } else {
      Toast.show({
        type: "error",
        text1: "Error",
        text2: "Movie ID was not provided",
        position: "bottom",
        visibilityTime: 5000, // 5 seconds
      });
      router.back();
    }
  }, [movieId]);

  const loadMovieDetail = async () => {
    if (!movieId) return;

    setLoading(true);
    // Clear any previous errors before making the request
    movieService.clearLastError();

    try {
      const request: GetMovieDetailsRequest = {
        id: Number.parseInt(movieId as string, 10),
        $typeName: "ralvarezdev.v1.GetMovieDetailsRequest" as const,
      };
      const response = await movieService.getDetail(request);

      if (response && response.$typeName === "ralvarezdev.v1.GetMovieDetailsResponse") {
        setMovie(response);
      } else {
        // Response is undefined, check for parsed error
        const parsedError = movieService.getLastError();

        if (parsedError) {
          // Check if it's a 502 or other internal server error
          const isInternalError = isParsedInternalServerError(parsedError);

          if (isInternalError) {
            Toast.show({
              type: "error",
              text1: "Error",
              text2: "An internal error occurred. Please try again later.",
              position: "bottom",
              visibilityTime: 5000,
            });
            // Don't set notFound for internal errors, just show error and go back
            router.back();
          } else {
            // For other errors (like 404), show not found
            setNotFound(true);
          }
        } else {
          // No parsed error available, show not found
          setNotFound(true);
        }
      }
    } catch (error: any) {
      // This catch should rarely be hit now, but keep it as a safety net
      console.error("Unexpected error loading movie detail:", error);
      const isInternalError = isInternalServerError(error);
      if (isInternalError) {
        Toast.show({
          type: "error",
          text1: "Error",
          text2: "An internal error occurred. Please try again later.",
          position: "bottom",
          visibilityTime: 5000,
        });
        router.back();
      } else {
        setNotFound(true);
      }
    } finally {
      setLoading(false);
    }
  };

  const loadMovieReviews = async () => {
    if (!movie?.id) return;

    // Clear any previous errors before making the request
    movieService.clearLastError();

    try {
      const request: GetMovieReviewsRequest = {
        id: movie.id,
        page: 1,
        $typeName: "ralvarezdev.v1.GetMovieReviewsRequest" as const,
      };
      const response = await movieService.getReviews(request);

      if (response && response.$typeName === "ralvarezdev.v1.GetMovieReviewsResponse") {
        setReviews(response);
      } else {
        // Response is undefined, check for parsed error
        const parsedError = movieService.getLastError();

        if (parsedError) {
          // Check if it's a 502 or other internal server error
          const isInternalError = isParsedInternalServerError(parsedError);

          if (isInternalError) {
            // For internal errors, show a generic message
            Toast.show({
              type: "error",
              text1: "Error",
              text2: "An internal error occurred while loading reviews. Please try again later.",
              position: "bottom",
              visibilityTime: 5000,
            });
          }
          // For other errors, we don't show them to the user since reviews are optional
        }
      }
    } catch (error: any) {
      // This catch should rarely be hit now, but keep it as a safety net
      console.error("Unexpected error loading movie reviews:", error);
      const isInternalError = isInternalServerError(error);
      if (isInternalError) {
        Toast.show({
          type: "error",
          text1: "Error",
          text2: "An internal error occurred while loading reviews. Please try again later.",
          position: "bottom",
          visibilityTime: 5000,
        });
      }
    }
  };

  // Load reviews when movie changes
  useEffect(() => {
    if (movie?.id) {
      loadMovieReviews();
    }
  }, [movie]);

  const handleEditReview = (reviewId: number, rating: number, reviewText: string) => {
    setEditingReviewId(reviewId);
    setEditingRating(rating);
    setEditingReviewText(reviewText);
    setIsEditModalVisible(true);
  };

  const handleUpdateReview = async (rating: number, review: string) => {
    if (!movieId || !editingReviewId) {
      Toast.show({
        type: "error",
        text1: "Error",
        text2: "Movie ID and Review ID are required",
        position: "bottom",
        visibilityTime: 5000,
      });
      return;
    }

    setSubmittingReview(true);
    movieService.clearLastError();
    console.log("movie?.id", movie?.id);
    try {
      const request: UpdateMovieReviewRequest = {
        id: movie?.id || 0,
        // id: Number.parseInt(movieId as string, 10),
        rating: rating,
        review: review.trim() || undefined,
        $typeName: "ralvarezdev.v1.UpdateMovieReviewRequest" as const,
      };

      const response = await movieService.updateMovieReview(request);

      if (response && response.$typeName === "ralvarezdev.v1.UpdateMovieReviewResponse") {
        Toast.show({
          type: "success",
          text1: "Review updated successfully",
          text2: "Your review has been updated",
          position: "bottom",
          visibilityTime: 5000,
        });

        setIsEditModalVisible(false);
        setEditingReviewId(null);
        await loadMovieReviews();
      } else {
        const parsedError = movieService.getLastError();
        if (parsedError) {
          const isInternalError = isParsedInternalServerError(parsedError);
          Toast.show({
            type: "error",
            text1: "Error updating review",
            text2: isInternalError
              ? "An internal error occurred. Please try again later."
              : parsedError.generalMessage || "Could not update your review. Please try again.",
            position: "bottom",
            visibilityTime: 5000,
          });
        } else {
          Toast.show({
            type: "error",
            text1: "Error updating review",
            text2: "Could not update your review. Please try again.",
            position: "bottom",
            visibilityTime: 5000,
          });
        }
      }
    } catch (error: any) {
      console.error("Unexpected error updating review:", error);
      Toast.show({
        type: "error",
        text1: "Error updating review",
        text2: "Could not update your review. Please try again.",
        position: "bottom",
        visibilityTime: 5000,
      });
    } finally {
      setSubmittingReview(false);
    }
  };

  const handleDeleteReview = async (reviewId: number) => {
    if (!movieId) {
      Toast.show({
        type: "error",
        text1: "Error",
        text2: "Movie ID is required",
        position: "bottom",
        visibilityTime: 5000,
      });
      return;
    }

    movieService.clearLastError();

    try {
      const request: DeleteMovieReviewRequest = {
        id: Number.parseInt(movieId as string, 10),
        $typeName: "ralvarezdev.v1.DeleteMovieReviewRequest" as const,
      };

      const response = await movieService.deleteMovieReview(request);

      if (response && response.$typeName === "ralvarezdev.v1.DeleteMovieReviewResponse") {
        Toast.show({
          type: "success",
          text1: "Review deleted successfully",
          text2: "Your review has been deleted",
          position: "bottom",
          visibilityTime: 5000,
        });

        await loadMovieReviews();
      } else {
        const parsedError = movieService.getLastError();
        if (parsedError) {
          const isInternalError = isParsedInternalServerError(parsedError);
          Toast.show({
            type: "error",
            text1: "Error deleting review",
            text2: isInternalError
              ? "An internal error occurred. Please try again later."
              : parsedError.generalMessage || "Could not delete your review. Please try again.",
            position: "bottom",
            visibilityTime: 5000,
          });
        } else {
          Toast.show({
            type: "error",
            text1: "Error deleting review",
            text2: "Could not delete your review. Please try again.",
            position: "bottom",
            visibilityTime: 5000,
          });
        }
      }
    } catch (error: any) {
      console.error("Unexpected error deleting review:", error);
      Toast.show({
        type: "error",
        text1: "Error deleting review",
        text2: "Could not delete your review. Please try again.",
        position: "bottom",
        visibilityTime: 5000,
      });
    }
  };

  const handleSubmitReview = async (rating: number, review: string) => {
    if (!movieId) {
      Toast.show({
        type: "error",
        text1: "Error",
        text2: "Movie ID is required",
        position: "bottom",
        visibilityTime: 5000, // 5 seconds
      });
      return;
    }

    setSubmittingReview(true);
    // Clear any previous errors before making the request
    movieService.clearLastError();

    try {
      const request: AddMovieReviewRequest = {
        id: Number.parseInt(movieId as string, 10),
        rating: rating,
        review: review.trim() || undefined,
        $typeName: "ralvarezdev.v1.AddMovieReviewRequest" as const,
      };

      const response = await movieService.addReview(request);

      if (response && response.$typeName === "ralvarezdev.v1.AddMovieReviewResponse") {
        Toast.show({
          type: "success",
          text1: "Review added successfully",
          text2: "Your review has been posted",
          position: "bottom",
          visibilityTime: 5000, // 5 seconds
        });

        setIsModalVisible(false);

        // Recargar los reviews después de agregar uno nuevo
        await loadMovieReviews();
      } else {
        // Response is undefined, check for parsed error
        const parsedError = movieService.getLastError();

        if (parsedError) {
          // Check if it's a 502 or other internal server error
          const isInternalError = isParsedInternalServerError(parsedError);

          if (isInternalError) {
            Toast.show({
              type: "error",
              text1: "Error adding review",
              text2: "An internal error occurred. Please try again later.",
              position: "bottom",
              visibilityTime: 5000,
            });
          } else {
            // For other errors, show the error message
            Toast.show({
              type: "error",
              text1: "Error adding review",
              text2: parsedError.generalMessage || "Could not add your review. Please try again.",
              position: "bottom",
              visibilityTime: 5000,
            });
          }
        } else {
          // No parsed error available, show generic message
          Toast.show({
            type: "error",
            text1: "Error adding review",
            text2: "Could not add your review. Please try again.",
            position: "bottom",
            visibilityTime: 5000,
          });
        }
      }
    } catch (error: any) {
      // This catch should rarely be hit now, but keep it as a safety net
      console.error("Unexpected error adding review:", error);
      const isInternalError = isInternalServerError(error);
      Toast.show({
        type: "error",
        text1: "Error adding review",
        text2: isInternalError ? "An internal error occurred. Please try again later." : "Could not add your review. Please try again.",
        position: "bottom",
        visibilityTime: 5000,
      });
    } finally {
      setSubmittingReview(false);
    }
  };

  if (loading) {
    return <LoadingMessage message="Loading movie..." />;
  }

  if (notFound || !movie) {
    return <MovieNotFound onBack={() => router.back()} />;
  }

  // Helper functions to format data from GetMovieDetailsResponse
  const releaseDate = movie.releaseDate?.seconds ? new Date(Number(movie.releaseDate.seconds) * 1000) : null;
  const year = releaseDate ? releaseDate.getFullYear() : 0;
  const formattedDate = releaseDate
    ? releaseDate.toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })
    : "Date not available";

  const runtime = movie.runtime || 0;
  const hours = Math.floor(runtime / 60);
  const minutes = runtime % 60;
  const duration = runtime > 0 ? `${hours}h ${minutes}m` : "Duration not available";

  const genres = movie.genres?.map((g) => g.name) || [];

  // Map MovieReview to format expected by MovieReviews component
  // const reviews =
  //   reviews?.movieReviews?.map((review: MovieReview) => {
  //     const createdAt = review.createdAt?.seconds ? new Date(Number(review.createdAt.seconds) * 1000) : null;
  //     let ago = "";
  //     if (createdAt) {
  //       const now = new Date();
  //       const diffInSeconds = Math.floor((now.getTime() - createdAt.getTime()) / 1000);
  //       if (diffInSeconds < 60) {
  //         ago = `${diffInSeconds}s`;
  //       } else if (diffInSeconds < 3600) {
  //         const minutes = Math.floor(diffInSeconds / 60);
  //         ago = `${minutes}m`;
  //       } else if (diffInSeconds < 86400) {
  //         const hours = Math.floor(diffInSeconds / 3600);
  //         ago = `${hours}h`;
  //       } else {
  //         const days = Math.floor(diffInSeconds / 86400);
  //         ago = `${days}d`;
  //       }
  //     }
  //     return {
  //       user: review.username || `User ${review.userId}`,
  //       badge: review.isCritic ? "Critic" : "User",
  //       ago,
  //       rating: Math.round(review.rating),
  //       text: review.review || "",
  //     };
  //   }) || [];

  return (
    <ScrollView
      style={styles.bg}
      contentContainerStyle={styles.contentContainer}
      showsVerticalScrollIndicator={true}
      scrollEnabled={true}
      nestedScrollEnabled={true}
      keyboardShouldPersistTaps="handled"
      bounces={true}>
      <MoviePoster
        poster={movie.posterUrl || ""}
        title={movie.title || ""}
        year={year}
        duration={duration}
        genres={genres}
        onBack={() => router.back()}
      />

      <MovieRatings
        usersRating={{
          value: movie.ratingAverageUsers || 0,
          votes: movie.ratingCountUsers || 0,
        }}
        criticsRating={{
          value: movie.ratingAverageCritics || 0,
          votes: movie.ratingCountCritics || 0,
        }}
      />

      <MovieSynopsis synopsis={movie.overview || ""} />

      <MovieMetaInfo director="Director not available" releaseDate={formattedDate} />

      <MovieCast cast={[]} />

      <MovieReviews
        criticsReviews={reviews?.criticReviews || []}
        usersReviews={reviews?.userReviews || []}
        reviewCount={reviews?.totalResults || 0}
        onAddReview={() => setIsModalVisible(true)}
        movieId={movie?.id ? Number(movie.id) : undefined}
        currentUsername={currentUsername}
        onEditReview={handleEditReview}
        onDeleteReview={handleDeleteReview}
      />

      <View style={{ height: 48 }} />

      <AddReviewModal visible={isModalVisible} onClose={() => setIsModalVisible(false)} onSubmit={handleSubmitReview} submitting={submittingReview} />
      <EditReviewModal
        visible={isEditModalVisible}
        onClose={() => {
          setIsEditModalVisible(false);
          setEditingReviewId(null);
        }}
        onSubmit={handleUpdateReview}
        initialRating={editingRating}
        initialReview={editingReviewText}
        submitting={submittingReview}
      />
    </ScrollView>
  );
};

export default MovieDetailScreen;
