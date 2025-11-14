import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { styles } from "./style";

interface CommentFiltersProps {
  activeFilter: string;
  onFilterChange: (filter: string) => void;
}

export const CommentFilters: React.FC<CommentFiltersProps> = ({ activeFilter, onFilterChange }) => {
  const filters = ["All", "Users", "Critics"];

  return (
    <View style={styles.container}>
      {filters.map((filter) => (
        <TouchableOpacity key={filter} onPress={() => onFilterChange(filter)}>
          <Text style={[styles.filter, activeFilter === filter && styles.filterActive]}>{filter}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

