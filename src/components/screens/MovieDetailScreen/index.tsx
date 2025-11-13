import React, { useState } from "react";
import { ScrollView, View, Text, TouchableOpacity, TextInput } from "react-native";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

import { styles } from "./style";
import Badge from "@/components/atoms/Badge";
import ActorChip from "@/components/molecules/ActorChip";
import RatingBox from "@/components/molecules/RatingBox";
import CommentCard from "@/components/organisms/CommentCard";
import MoviePoster from "@/components/organisms/MoviePoster";
import { Modal } from "@/components/atoms/Modal";
import { Button } from "@/components/atoms/Button";

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

const movieMock: MovieDetail = {
  poster: "https://image.tmdb.org/t/p/w500/qJ2tW6WMUDux911r6m7haRef0WH.jpg",
  title: "The Dark Knight",
  year: 2010,
  duration: "2h 28m",
  genres: ["Ciencia Ficción"],
  ratings: {
    users: { value: 9.2, label: "Usuarios", votes: 45280 },
    critics: { value: 8.4, label: "Críticos", votes: 297 },
  },
  synopsis:
    "Dom Cobb es un ladrón experto en el arte de la extracción: robar secretos valiosos del subconsciente durante el estado de sueño. Esta habilidad lo ha convertido en un jugador codiciado en el tradicional mundo del espionaje corporativo, pero también lo ha convertido en un fugitivo internacional y le ha costado todo lo que amaba.",
  director: "Christopher Nolan",
  releaseDate: "16 de julio, 2010",
  cast: ["Leonardo DiCaprio", "Marion Cotillard", "Tom Hardy", "Ellen Page", "Joseph Gordon Levitt"],
  commentCount: 2458,
  comments: [
    {
      user: "María García",
      badge: "Usuarios",
      ago: "2h",
      rating: 5,
      text: "Una obra maestra técnica de Christopher Nolan que juega magistralmente con la estructura narrativa en múltiples niveles. La cinematografía de Wally Pfister es impecable, y la banda sonora de Hans Zimmer lleva cada escena.",
    },
  ],
};

const MovieDetailScreen = () => {
  const [movie] = useState<MovieDetail>(movieMock);
  const router = useRouter();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [commentText, setCommentText] = useState("");
  const [rating, setRating] = useState(0);

  const handleOpenModal = () => {
    setIsModalVisible(true);
  };

  const handleCloseModal = () => {
    setIsModalVisible(false);
    setCommentText("");
    setRating(0);
  };

  const handleSubmitComment = () => {
    // Aquí iría la lógica para enviar el comentario
    console.log("Comentario:", commentText);
    console.log("Rating:", rating);
    // Por ahora solo cerramos el modal
    handleCloseModal();
  };

  return (
    <ScrollView style={styles.bg} contentContainerStyle={styles.contentContainer} showsVerticalScrollIndicator={false}>
      <MoviePoster
        poster={movie.poster}
        title={movie.title}
        year={movie.year}
        duration={movie.duration}
        genres={movie.genres}
        onBack={() => router.back()}
      />

      {/* Fila de valoraciones sin contenedor extra */}
      <View style={styles.ratingsRow}>
        <RatingBox label="Usuarios" votes={movie.ratings.users.votes} value={movie.ratings.users.value} />
        <RatingBox label="Críticos" votes={movie.ratings.critics.votes} value={movie.ratings.critics.value} color="#ff7a45" />
      </View>

      {/* Sinopsis */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Sinopsis</Text>
        <Text style={styles.sectionText}>{movie.synopsis}</Text>
      </View>

      {/* Director y Fecha */}
      <View style={styles.metaRow}>
        <View style={styles.metaCard}>
          <Badge bg="#eaf2ff">🎬 Director</Badge>
          <Text style={styles.metaValue}>{movie.director}</Text>
        </View>
        <View style={styles.metaCard}>
          <Badge bg="#eaf2ff">📅 Fecha de Estreno</Badge>
          <Text style={styles.metaValue}>{movie.releaseDate}</Text>
        </View>
      </View>

      {/* Actores */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Actores Principales</Text>
        <View style={styles.chipsRow}>
          {movie.cast.map((actor, idx) => (
            <ActorChip key={idx} name={actor} />
          ))}
        </View>
      </View>

      {/* Comentarios */}
      <View style={styles.commentsRow}>
        <View style={styles.commentHeader}>
          <Text style={styles.sectionTitle}>Comentarios</Text>
          <Text style={styles.commentCount}>({movie.commentCount.toLocaleString()})</Text>
        </View>

        <TouchableOpacity style={styles.commentBtn} onPress={handleOpenModal}>
          <Text style={styles.commentBtnText}>Agregar mi comentario</Text>
        </TouchableOpacity>

        <View style={styles.filterRow}>
          <Text style={styles.commentFilterActive}>Todos</Text>
          <Text style={styles.commentFilter}>Usuarios</Text>
          <Text style={styles.commentFilter}>Críticos</Text>
        </View>

        {movie.comments.map((c, i) => (
          <CommentCard key={i} {...c} />
        ))}
      </View>

      <View style={{ height: 48 }} />

      {/* Modal para agregar comentario */}
      <Modal
        visible={isModalVisible}
        onClose={handleCloseModal}
        title="Agregar Comentario"
        footer={
          <View style={{ flexDirection: "row", gap: 12, width: "100%" }}>
            <View style={{ flex: 1 }}>
              <Button title="Cancelar" variant="secondary" onPress={handleCloseModal} />
            </View>
            <View style={{ flex: 1 }}>
              <Button title="Enviar" variant="primary" onPress={handleSubmitComment} disabled={!commentText.trim() || rating === 0} />
            </View>
          </View>
        }>
        <View style={styles.modalFormContent}>
          {/* Rating Selector */}
          <View style={styles.ratingSelectorContainer}>
            <Text style={styles.modalLabel}>Valoración</Text>
            <View style={styles.starsContainer}>
              {Array.from({ length: 5 }).map((_, i) => {
                const starValue = i + 1;
                return (
                  <TouchableOpacity key={i} onPress={() => setRating(starValue)} activeOpacity={0.7} style={styles.starButton}>
                    <Ionicons name={starValue <= rating ? "star" : "star-outline"} size={32} color="#ffb400" />
                  </TouchableOpacity>
                );
              })}
            </View>
            {rating > 0 && <Text style={styles.ratingText}>{rating} de 5 estrellas</Text>}
          </View>

          {/* Comment Input */}
          <View style={styles.commentInputContainer}>
            <Text style={styles.modalLabel}>Comentario</Text>
            <TextInput
              style={styles.commentTextInput}
              placeholder="Escribe tu comentario aquí..."
              placeholderTextColor="#BDC3C7"
              value={commentText}
              onChangeText={setCommentText}
              multiline
              numberOfLines={6}
              textAlignVertical="top"
            />
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
};

export default MovieDetailScreen;
