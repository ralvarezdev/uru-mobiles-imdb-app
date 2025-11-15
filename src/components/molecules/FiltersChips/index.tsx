import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { styles } from "./style";
import { Genre } from "@ralvarezdev/proto-movies-ts";

export interface FiltersChipsProps {
  selected: string | number | null;
  onSelect: (value: string | number | null) => void;
  genres?: Genre[];
}

export const FiltersChips = ({ selected, onSelect, genres = [] }: FiltersChipsProps) => {
  // Create filters array with "All" option and genres
  const filters = [
    { id: null, label: "All", emoji: "🧩" },
    ...genres.map((genre) => ({
      id: genre.id,
      label: genre.name,
      emoji: "🎬",
    })),
  ];

  return (
    <View style={styles.row}>
      {filters.map((f) => {
        const isSelected = selected === f.id || (selected === null && f.id === null);
        return (
          <TouchableOpacity
            key={f.id ?? "all"}
            style={[
              styles.chip,
              {
                backgroundColor: isSelected ? "#DF3D36" : "#fff",
                borderWidth: isSelected ? 0 : 1,
              },
            ]}
            onPress={() => onSelect?.(f.id ?? null)}>
            <Text
              style={{
                color: isSelected ? "#fff" : "#DF3D36",
                fontWeight: "bold",
              }}>
              {f.emoji} {f.label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};
