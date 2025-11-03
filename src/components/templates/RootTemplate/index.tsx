// src/components/templates/GlobalLayout.tsx
import { colors } from "@/theme";
import React, { ReactNode } from "react";
import { StatusBar, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { styles } from "./style";

interface Props {
  children: ReactNode;
  backgroundColor?: string;
}

export const RootTemplate: React.FC<Props> = ({ children, backgroundColor }) => {
  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="light-content" backgroundColor={colors.primary} />
      <View style={styles.container}>{children}</View>
    </SafeAreaView>
  );
};
