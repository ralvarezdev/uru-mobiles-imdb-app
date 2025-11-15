import React from "react";
import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { styles } from "./style";
import { Genre } from "@ralvarezdev/proto-movies-ts";

export interface FiltersChipsProps {
  selected: string | number | null;
  onSelect: (value: string | number | null) => void;
  genres?: Genre[];
}

// Function to get icon based on genre name
const getGenreIcon = (genreName: string): keyof typeof Ionicons.glyphMap => {
  const name = genreName.toLowerCase();
  
  if (name.includes("action") || name.includes("adventure")) return "flash";
  if (name.includes("comedy")) return "happy";
  if (name.includes("drama")) return "film";
  if (name.includes("horror") || name.includes("thriller")) return "skull";
  if (name.includes("sci") || name.includes("science")) return "rocket";
  if (name.includes("romance") || name.includes("romantic")) return "heart";
  if (name.includes("fantasy")) return "sparkles";
  if (name.includes("animation") || name.includes("animated")) return "color-palette";
  if (name.includes("documentary")) return "document-text";
  if (name.includes("crime")) return "lock-closed";
  if (name.includes("mystery")) return "search";
  if (name.includes("war")) return "shield";
  if (name.includes("western")) return "cow";
  if (name.includes("music") || name.includes("musical")) return "musical-notes";
  if (name.includes("family")) return "people";
  if (name.includes("history")) return "book";
  if (name.includes("sport")) return "trophy";
  
  // Default icon
  return "film";
};

export const FiltersChips = ({ selected, onSelect, genres = [] }: FiltersChipsProps) => {
  // Create filters array with "All" option and genres
  const filters = [
    { id: null, label: "All", icon: "grid" as const },
    ...genres.map((genre) => ({
      id: genre.id,
      label: genre.name,
      icon: getGenreIcon(genre.name),
    })),
  ];

  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.row}
      style={styles.scrollContainer}>
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
                flexDirection: "row",
              },
            ]}
            onPress={() => onSelect?.(f.id ?? null)}>
            <Ionicons name={f.icon} size={16} color={isSelected ? "#fff" : "#DF3D36"} style={{ marginRight: 4 }} />
            <Text
              style={{
                color: isSelected ? "#fff" : "#DF3D36",
                fontWeight: "bold",
                fontSize: 14,
              }}>
              {f.label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </ScrollView>
  );
};
