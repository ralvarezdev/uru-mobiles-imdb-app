import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { styles } from "./style";

export interface FiltersChipsProps {
  selected: string;
  onSelect: (value: string) => void;
}

const filters = [
  { label: "Todas", color: "#DF3D36", emoji: "🧩" },
  { label: "Acción", color: "#fff", emoji: "🔥" },
  { label: "Comedia", color: "#fff", emoji: "😂" },
];

export const FiltersChips = ({ selected = "Todas", onSelect }: FiltersChipsProps) => (
  <View style={styles.row}>
    {filters.map((f) => (
      <TouchableOpacity
        key={f.label}
        style={[
          styles.chip,
          {
            backgroundColor: selected === f.label ? "#DF3D36" : "#fff",
            borderWidth: selected === f.label ? 0 : 1,
          },
        ]}
        onPress={() => onSelect?.(f.label)}>
        <Text
          style={{
            color: selected === f.label ? "#fff" : "#DF3D36",
            fontWeight: "bold",
          }}>
          {f.emoji} {f.label}
        </Text>
      </TouchableOpacity>
    ))}
  </View>
);
