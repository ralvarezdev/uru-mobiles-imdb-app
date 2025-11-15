import React from "react";
import { View, Text } from "react-native";
import ActorChip from "@/components/molecules/ActorChip";
import { styles } from "./style";

interface MovieCastProps {
  cast: string[];
}

export const MovieCast: React.FC<MovieCastProps> = ({ cast }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Main Cast</Text>
      {cast.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>No data available</Text>
        </View>
      ) : (
        <View style={styles.chipsContainer}>
          {cast.map((actor, idx) => (
            <ActorChip key={idx} name={actor} />
          ))}
        </View>
      )}
    </View>
  );
};

