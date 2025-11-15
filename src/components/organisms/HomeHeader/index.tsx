import React from "react";
import { View, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { styles } from "./style";

export const HomeHeader = () => (
  <View style={styles.header}>
    <View style={styles.headerRow}>
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <Ionicons name="film" size={24} color="#fff" style={{ marginRight: 8 }} />
        <Text style={styles.title}>Películas</Text>
      </View>
      {/* <View style={styles.iconsRow}>
        <Feather name="bell" size={22} color="#FFF" style={{ marginRight: 15 }} />
        <Feather name="user" size={22} color="#FFF" />
      </View> */}
    </View>
  </View>
);
