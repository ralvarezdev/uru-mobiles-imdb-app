import React, { useState } from "react";
import { View, Text, ImageBackground, TouchableOpacity, ImageSourcePropType } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { styles } from "./style";

interface MoviePosterProps {
  poster: string;
  title: string;
  year: number;
  duration: string;
  genres?: string[];
  onBack: () => void;
  fallback?: ImageSourcePropType;
}

const MoviePoster = ({ poster, title, year, duration, genres = [], onBack, fallback }: MoviePosterProps) => {
  const [useFallback, setUseFallback] = useState(false);

  const source = useFallback
    ? fallback ?? { uri: "https://via.placeholder.com/900x1300?text=Poster" }
    : { uri: poster ?? "https://via.placeholder.com/900x1300?text=Poster" };

  return (
    <View style={styles.container}>
      <ImageBackground source={source} style={styles.bg} imageStyle={{ resizeMode: "cover" }} onError={() => setUseFallback(true)}>
        <TouchableOpacity style={styles.backBtn} onPress={onBack} activeOpacity={0.8}>
          <Ionicons name="arrow-back" size={20} color="#fff" />
        </TouchableOpacity>

        <View style={styles.info}>
          <Text style={styles.title}>{title}</Text>
          <View style={styles.metaRow}>
            <Text style={styles.metaText}>{year}</Text>
            <Text style={styles.metaDot}>•</Text>
            <Text style={styles.metaText}>{duration}</Text>
            {genres.length > 0 && (
              <>
                <Text style={styles.metaDot}>•</Text>
                <Text style={styles.metaText}>{genres.join(", ")}</Text>
              </>
            )}
          </View>
        </View>
      </ImageBackground>
    </View>
  );
};

export default MoviePoster;
