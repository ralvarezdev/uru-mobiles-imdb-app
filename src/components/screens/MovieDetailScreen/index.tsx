import React, { useState, useEffect } from "react";
import { ScrollView, View } from "react-native";
import { useRouter, useLocalSearchParams } from "expo-router";
import {
  AddMovieReviewRequest,
  GetMovieDetailsRequest,
  GetMovieDetailsResponse,
  GetMovieReviewsRequest,
  GetMovieReviewsResponse,
  Genre,
  ProductionCompany,
  ProductionCountry,
  SpokenLanguage,
} from "@ralvarezdev/proto-movies-ts";
import { Timestamp } from "@bufbuild/protobuf/wkt";
import movieService from "@/services/movieService";
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
import { MovieNotFound } from "@/components/organisms/MovieNotFound";

// Mock data for testing - using GetMovieDetailsResponse structure
const releaseDateTimestamp: Timestamp = {
  $typeName: "google.protobuf.Timestamp",
  seconds: BigInt(Math.floor(new Date("2008-07-18").getTime() / 1000)),
  nanos: 0,
};

export const mockMovieDetail: GetMovieDetailsResponse = {
  $typeName: "ralvarezdev.v1.GetMovieDetailsResponse",
  adult: false,
  budget: BigInt(185000000),
  genres: [
    { $typeName: "ralvarezdev.v1.Genre", id: 28, name: "Action" },
    { $typeName: "ralvarezdev.v1.Genre", id: 80, name: "Crime" },
    { $typeName: "ralvarezdev.v1.Genre", id: 18, name: "Drama" },
    { $typeName: "ralvarezdev.v1.Genre", id: 53, name: "Thriller" },
  ] as Genre[],
  originalLanguage: "en",
  homepage: "https://www.warnerbros.com/movies/dark-knight",
  id: 155,
  originalTitle: "The Dark Knight",
  overview:
    "When the menace known as the Joker wreaks havoc and chaos on the people of Gotham, Batman must accept one of the greatest psychological and physical tests of his ability to fight injustice. With the help of allies Lt. Jim Gordon and DA Harvey Dent, Batman has been able to keep a tight lid on crime in Gotham. But when a deranged mastermind criminal known as the Joker suddenly throws the town into chaos, the caped crusader is pushed to the limits of his physical and mental endurance.",
  popularity: 85,
  posterUrl: "https://image.tmdb.org/t/p/w500/qJ2tW6WMUDux911r6m7haRef0WH.jpg",
  productionCompanies: [
    { $typeName: "ralvarezdev.v1.ProductionCompany", id: 923, name: "Legendary Pictures" },
    { $typeName: "ralvarezdev.v1.ProductionCompany", id: 128, name: "DC Comics" },
    { $typeName: "ralvarezdev.v1.ProductionCompany", id: 174, name: "Warner Bros. Pictures" },
  ] as ProductionCompany[],
  productionCountries: [{ $typeName: "ralvarezdev.v1.ProductionCountry", iso31661: "US", name: "United States of America" }] as ProductionCountry[],
  releaseDate: releaseDateTimestamp,
  revenue: BigInt(1004558444),
  runtime: 152,
  spokenLanguages: [{ $typeName: "ralvarezdev.v1.SpokenLanguage", iso6391: "en", name: "English", englishName: "English" }] as SpokenLanguage[],
  status: "Released",
  tagline: "Why So Serious?",
  title: "The Dark Knight",
  ratingAverageCritics: 8.4,
  ratingAverageUsers: 9.2,
  ratingCountCritics: 297,
  ratingCountUsers: 45280,
};

const MovieDetailScreen = () => {
  const { movieId } = useLocalSearchParams();
  const router = useRouter();
  const [movie, setMovie] = useState<GetMovieDetailsResponse | null>(null);
  const [reviews, setReviews] = useState<GetMovieReviewsResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [submittingReview, setSubmittingReview] = useState(false);

  useEffect(() => {
    // Para pruebas, usar mockMovieDetail directamente
    // setMovie(mockMovieDetail);
    // setLoading(false);
    // return;
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
  // En lugar de cargar desde la API, usar el mock:

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
      />

      <View style={{ height: 48 }} />

      <AddReviewModal visible={isModalVisible} onClose={() => setIsModalVisible(false)} onSubmit={handleSubmitReview} submitting={submittingReview} />
    </ScrollView>
  );
};

export default MovieDetailScreen;
