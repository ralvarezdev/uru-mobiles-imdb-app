import React from "react";
import { View } from "react-native";
import { MovieMetaCard } from "@/components/molecules/MovieMetaCard";
import { styles } from "./style";

interface MovieMetaInfoProps {
  director: string;
  releaseDate: string;
}

export const MovieMetaInfo: React.FC<MovieMetaInfoProps> = ({ director, releaseDate }) => {
  return (
    <View style={styles.container}>
      <MovieMetaCard icon="🎬" label="Director" value={director} />
      <MovieMetaCard icon="📅" label="Release Date" value={releaseDate} />
    </View>
  );
};

