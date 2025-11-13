import React from "react";
import { View, Text } from "react-native";
import { Feather } from "@expo/vector-icons";
import { styles } from "./style";

export const HomeHeader = () => (
  <View style={styles.header}>
    <View style={styles.headerRow}>
      <Text style={styles.title}>🎬 Películas</Text>
      <View style={styles.iconsRow}>
        <Feather name="bell" size={22} color="#FFF" style={{ marginRight: 15 }} />
        <Feather name="user" size={22} color="#FFF" />
      </View>
    </View>
  </View>
);
