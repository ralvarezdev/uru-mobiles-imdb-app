// src/components/templates/GlobalLayout.tsx
import { colors } from "@/theme";
import React, { ReactNode } from "react";
import { View, Platform } from "react-native";
import { StatusBar } from "expo-status-bar";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { styles } from "./style";

interface Props {
  children: ReactNode;
  backgroundColor?: string;
}

export const RootTemplate: React.FC<Props> = ({ children, backgroundColor }) => {
  const insets = useSafeAreaInsets();

  return (
    <>
      <StatusBar style="light" backgroundColor="#DF3D36" />
      <View style={styles.wrapper}>
        <View style={[styles.statusBarBackground, { height: insets.top }]} />
        <View style={styles.container}>{children}</View>
      </View>
    </>
  );
};
