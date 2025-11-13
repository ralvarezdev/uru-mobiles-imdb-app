import React from "react";
import { TextInput, View } from "react-native";
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
    <Feather name="mic" size={18} color="#aaa" style={{ marginRight: 10 }} />
  </View>
);
