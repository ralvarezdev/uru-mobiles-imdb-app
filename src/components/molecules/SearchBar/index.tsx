import React from "react";
import { TextInput, View, TouchableOpacity } from "react-native";
import { styles } from "./style";
import { Feather } from "@expo/vector-icons";

interface SearchBarProps {
  value: string;
  onChange: (text: string) => void;
}

export const SearchBar = ({ value, onChange }: SearchBarProps) => (
  <View style={styles.container}>
    <Feather name="search" size={20} color="#999" style={{ marginLeft: 10 }} />
    <TextInput style={styles.input} placeholder="Buscar películas o series..." placeholderTextColor="#bbb" value={value} onChangeText={onChange} />
    {value.length > 0 && (
      <TouchableOpacity onPress={() => onChange("")} activeOpacity={0.7} style={styles.clearButton}>
        <Feather name="x" size={18} color="#999" />
      </TouchableOpacity>
    )}
  </View>
);
