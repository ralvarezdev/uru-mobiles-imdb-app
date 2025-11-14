import React, { useState, useEffect } from "react";
import { ScrollView, View } from "react-native";
import { useRouter, useLocalSearchParams } from "expo-router";
import {
  AddMovieReviewRequest,
  GetMovieDetailsRequest,
  GetMovieDetailsResponse,
  GetMovieReviewsRequest,
  GetMovieReviewsResponse,
  MovieReview,
} from "@ralvarezdev/proto-movies-ts";
import movieService from "@/services/movieService";
import { LoadingMessage } from "@/components/molecules/LoadingMessage";
import Toast from "react-native-toast-message";

import { styles } from "./style";
import MoviePoster from "@/components/organisms/MoviePoster";
import { MovieRatings } from "@/components/organisms/MovieRatings";
import { MovieSynopsis } from "@/components/organisms/MovieSynopsis";
import { MovieMetaInfo } from "@/components/organisms/MovieMetaInfo";
import { MovieCast } from "@/components/organisms/MovieCast";
import { MovieComments } from "@/components/organisms/MovieComments";
import { AddReviewModal } from "@/components/organisms/AddReviewModal";
import { MovieNotFound } from "@/components/organisms/MovieNotFound";

interface MovieComment {
  user: string;
  badge?: string;
  ago: string;
  rating: number;
  text: string;
}

interface MovieDetail {
  poster: string;
  title: string;
  year: number;
  duration: string;
  genres: string[];
  ratings: {
    users: { value: number; label: string; votes: number };
    critics: { value: number; label: string; votes: number };
  };
  synopsis: string;
  director: string;
  releaseDate: string;
  cast: string[];
  commentCount: number;
  comments: MovieComment[];
}

// Mock data for testing
export const mockMovieDetail: MovieDetail = {
  poster: "https://image.tmdb.org/t/p/w500/qJ2tW6WMUDux911r6m7haRef0WH.jpg",
  title: "The Dark Knight",
  year: 2008,
  duration: "2h 32m",
  genres: ["Action", "Crime", "Drama", "Thriller"],
  ratings: {
    users: {
      value: 9.2,
      label: "Users",
      votes: 45280,
    },
    critics: {
      value: 8.4,
      label: "Critics",
      votes: 297,
    },
  },
  synopsis:
    "When the menace known as the Joker wreaks havoc and chaos on the people of Gotham, Batman must accept one of the greatest psychological and physical tests of his ability to fight injustice. With the help of allies Lt. Jim Gordon and DA Harvey Dent, Batman has been able to keep a tight lid on crime in Gotham. But when a deranged mastermind criminal known as the Joker suddenly throws the town into chaos, the caped crusader is pushed to the limits of his physical and mental endurance.",
  director: "Christopher Nolan",
  releaseDate: "July 18, 2008",
  cast: ["Christian Bale", "Heath Ledger", "Aaron Eckhart", "Michael Caine", "Gary Oldman", "Maggie Gyllenhaal", "Morgan Freeman"],
  commentCount: 1247,
  comments: [
    {
      user: "John Smith",
      badge: "User",
      ago: "2h",
      rating: 5,
      text: "An absolute masterpiece! Heath Ledger's performance as the Joker is phenomenal. This is one of the best superhero movies ever made. The cinematography, the score, and the storytelling are all top-notch.",
    },
    {
      user: "Sarah Johnson",
      badge: "Critic",
      ago: "5h",
      rating: 5,
      text: "Christopher Nolan delivers a dark, complex, and emotionally resonant film that transcends the superhero genre. The Dark Knight is not just a great comic book movie—it's a great film period. The moral complexity and character development are exceptional.",
    },
    {
      user: "Mike Davis",
      badge: "User",
      ago: "1d",
      rating: 4,
      text: "Really enjoyed this movie! The action sequences are incredible and the plot keeps you engaged throughout. The only reason I'm not giving it 5 stars is because I found some parts a bit too long, but overall it's fantastic.",
    },
    {
      user: "Emily Chen",
      badge: "User",
      ago: "2d",
      rating: 5,
      text: "This is cinema at its finest. Every scene is crafted with precision. The tension builds perfectly, and the performances are outstanding across the board. A must-watch for any film lover!",
    },
    {
      user: "Robert Williams",
      badge: "Critic",
      ago: "3d",
      rating: 5,
      text: "The Dark Knight redefined what a superhero movie could be. It's a crime epic that happens to feature Batman. The themes of chaos, order, and moral ambiguity are explored with depth and sophistication. Heath Ledger's Joker is one of cinema's greatest villains.",
    },
    {
      user: "Lisa Anderson",
      badge: "User",
      ago: "4d",
      rating: 4,
      text: "Great movie with amazing performances. The Joker is terrifying and fascinating at the same time. The movie does a great job of showing the psychological battle between Batman and the Joker. Highly recommend!",
    },
  ],
};

const MovieDetailScreen = () => {
  const { movieId } = useLocalSearchParams();
  // const movieId = params.movieId ? parseInt(params.movieId as string, 10) : null;
  const router = useRouter();
  const [movie, setMovie] = useState<MovieDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [submittingComment, setSubmittingComment] = useState(false);

  useEffect(() => {
    // Para pruebas, descomenta estas líneas:
    setMovie(mockMovieDetail);
    setLoading(false);
    return;
    if (movieId) {
      loadMovieDetail();
    } else {
      Toast.show({
        type: "error",
        text1: "Error",
        text2: "Movie ID was not provided",
        position: "bottom",
      });
      router.back();
    }
  }, [movieId]);
  // En lugar de cargar desde la API, usar el mock:

  const loadMovieDetail = async () => {
    if (!movieId) return;

    setLoading(true);
    try {
      const request: GetMovieDetailsRequest = {
        id: parseInt(movieId as string, 10),
        $typeName: "ralvarezdev.v1.GetMovieDetailsRequest" as const,
      };
      const response: GetMovieDetailsResponse = await movieService.getDetail(request);

      // Mapear la respuesta a la interfaz MovieDetail
      const releaseDate = response.releaseDate?.seconds ? new Date(Number(response.releaseDate.seconds) * 1000) : null;
      const year = releaseDate ? releaseDate.getFullYear() : 0;
      const formattedDate = releaseDate
        ? releaseDate.toLocaleDateString("es-ES", { year: "numeric", month: "long", day: "numeric" })
        : "Date not available";

      const runtime = response.runtime || 0;
      const hours = Math.floor(runtime / 60);
      const minutes = runtime % 60;
      const duration = runtime > 0 ? `${hours}h ${minutes}m` : "Duration not available";

      const genres = response.genres?.map((g) => g.name) || [];

      const movieDetail: MovieDetail = {
        poster: response.posterUuid || "",
        title: response.title || "",
        year,
        duration,
        genres,
        ratings: {
          users: {
            value: response.ratingAverageUsers || 0,
            label: "Users",
            votes: response.ratingCountUsers || 0,
          },
          critics: {
            value: response.ratingAverageCritics || 0,
            label: "Critics",
            votes: response.ratingCountCritics || 0,
          },
        },
        synopsis: response.overview || "",
        director: "Director not available", // TODO: obtener del endpoint de credits cuando esté disponible
        releaseDate: formattedDate,
        cast: [], // TODO: obtener del endpoint de credits cuando esté disponible
        commentCount: 0, // Se actualiza cuando se cargan las reviews
        comments: [], // Se actualiza cuando se cargan las reviews
      };

      setMovie(movieDetail);

      // Cargar las reviews después de cargar el detalle
      await loadMovieReviews();
    } catch (error: any) {
      console.error("Error loading movie detail:", error);
      setNotFound(true);
    } finally {
      setLoading(false);
    }
  };

  const loadMovieReviews = async () => {
    if (!movieId) return;

    try {
      const request: GetMovieReviewsRequest = {
        id: parseInt(movieId as string, 10),
        page: 1,
        $typeName: "ralvarezdev.v1.GetMovieReviewsRequest" as const,
      };
      const response: GetMovieReviewsResponse = await movieService.getReviews(request);

      // Mapear las reviews a la interfaz MovieComment
      const comments: MovieComment[] =
        response.movieReviews?.map((review: MovieReview) => {
          const createdAt = review.createdAt?.seconds ? new Date(Number(review.createdAt.seconds) * 1000) : null;

          // Calcular tiempo transcurrido
          let ago = "";
          if (createdAt) {
            const now = new Date();
            const diffInSeconds = Math.floor((now.getTime() - createdAt.getTime()) / 1000);

            if (diffInSeconds < 60) {
              ago = `${diffInSeconds}s`;
            } else if (diffInSeconds < 3600) {
              const minutes = Math.floor(diffInSeconds / 60);
              ago = `${minutes}m`;
            } else if (diffInSeconds < 86400) {
              const hours = Math.floor(diffInSeconds / 3600);
              ago = `${hours}h`;
            } else {
              const days = Math.floor(diffInSeconds / 86400);
              ago = `${days}d`;
            }
          }

          return {
            user: `User ${review.userId}`, // TODO: obtener nombre de usuario cuando esté disponible
            badge: review.isCritic ? "Critic" : "User",
            ago,
            rating: Math.round(review.rating),
            text: review.review || "",
          };
        }) || [];

      // Actualizar el estado de la película con los comentarios
      setMovie((prevMovie) => {
        if (!prevMovie) return prevMovie;
        return {
          ...prevMovie,
          commentCount: response.totalResults || 0,
          comments,
        };
      });
    } catch (error: any) {
      console.error("Error loading movie reviews:", error);
      // No mostramos error al usuario, solo logueamos el error
      // Las reviews son opcionales
    }
  };

  const handleSubmitReview = async (rating: number, review: string) => {
    if (!movieId) {
      Toast.show({
        type: "error",
        text1: "Error",
        text2: "Movie ID is required",
        position: "bottom",
      });
      return;
    }

    setSubmittingComment(true);
    try {
      const request: AddMovieReviewRequest = {
        id: parseInt(movieId as string, 10),
        rating: rating,
        review: review.trim() || undefined,
        $typeName: "ralvarezdev.v1.AddMovieReviewRequest" as const,
      };

      await movieService.addReview(request);

      Toast.show({
        type: "success",
        text1: "Review added successfully",
        text2: "Your review has been posted",
        position: "bottom",
      });

      setIsModalVisible(false);

      // Recargar los comentarios después de agregar uno nuevo
      await loadMovieReviews();
    } catch (error: any) {
      console.error("Error adding review:", error);
      Toast.show({
        type: "error",
        text1: "Error adding review",
        text2: error?.message || "Could not add your review. Please try again.",
        position: "bottom",
      });
    } finally {
      setSubmittingComment(false);
    }
  };

  if (loading) {
    return <LoadingMessage message="Loading movie..." />;
  }

  if (notFound || !movie) {
    return <MovieNotFound onBack={() => router.back()} />;
  }

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
        poster={movie.poster}
        title={movie.title}
        year={movie.year}
        duration={movie.duration}
        genres={movie.genres}
        onBack={() => router.back()}
      />

      <MovieRatings usersRating={movie.ratings.users} criticsRating={movie.ratings.critics} />

      <MovieSynopsis synopsis={movie.synopsis} />

      <MovieMetaInfo director={movie.director} releaseDate={movie.releaseDate} />

      <MovieCast cast={movie.cast} />

      <MovieComments comments={movie.comments} commentCount={movie.commentCount} onAddComment={() => setIsModalVisible(true)} />

      <View style={{ height: 48 }} />

      <AddReviewModal
        visible={isModalVisible}
        onClose={() => setIsModalVisible(false)}
        onSubmit={handleSubmitReview}
        submitting={submittingComment}
      />
    </ScrollView>
  );
};

export default MovieDetailScreen;
