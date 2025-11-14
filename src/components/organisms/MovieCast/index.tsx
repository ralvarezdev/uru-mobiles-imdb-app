import React from "react";
import { View, Text } from "react-native";
import ActorChip from "@/components/molecules/ActorChip";
import { styles } from "./style";

interface MovieCastProps {
  cast: string[];
}

export const MovieCast: React.FC<MovieCastProps> = ({ cast }) => {
  if (cast.length === 0) {
    return null;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Main Cast</Text>
      <View style={styles.chipsContainer}>
        {cast.map((actor, idx) => (
          <ActorChip key={idx} name={actor} />
        ))}
      </View>
    </View>
  );
};

