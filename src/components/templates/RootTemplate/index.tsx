// src/components/templates/GlobalLayout.tsx
import { colors } from "@/theme";
import React, { ReactNode } from "react";
import { View, Platform, StyleSheet } from "react-native";
import { StatusBar } from "expo-status-bar";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { styles } from "./style";
import Toast, { BaseToast } from "react-native-toast-message";

interface Props {
  children: ReactNode;
  backgroundColor?: string;
}

// Custom Toast config to handle long text
const toastConfig = {
  success: (props: any) => (
    <BaseToast
      {...props}
      style={toastStyles.success}
      contentContainerStyle={toastStyles.contentContainer}
      text1Style={toastStyles.text1}
      text2Style={toastStyles.text2}
      text2NumberOfLines={0}
    />
  ),
  error: (props: any) => (
    <BaseToast
      {...props}
      style={toastStyles.error}
      contentContainerStyle={toastStyles.contentContainer}
      text1Style={toastStyles.text1}
      text2Style={toastStyles.text2}
      text2NumberOfLines={0}
    />
  ),
  info: (props: any) => (
    <BaseToast
      {...props}
      style={toastStyles.info}
      contentContainerStyle={toastStyles.contentContainer}
      text1Style={toastStyles.text1}
      text2Style={toastStyles.text2}
      text2NumberOfLines={0}
    />
  ),
};

const toastStyles = StyleSheet.create({
  success: {
    borderLeftColor: "#4CAF50",
    maxWidth: "90%",
  },
  error: {
    borderLeftColor: colors.error,
    maxWidth: "90%",
  },
  info: {
    borderLeftColor: "#2196F3",
    maxWidth: "90%",
  },
  contentContainer: {
    paddingHorizontal: 15,
    flexShrink: 1,
  },
  text1: {
    fontSize: 15,
    fontWeight: "600",
    flexShrink: 1,
  },
  text2: {
    fontSize: 13,
    flexShrink: 1,
    flexWrap: "wrap",
  },
});

export const RootTemplate: React.FC<Props> = ({ children, backgroundColor }) => {
  const insets = useSafeAreaInsets();

  return (
    <>
      <StatusBar style="light" backgroundColor="#DF3D36" />
      <View style={styles.wrapper}>
        <View style={[styles.statusBarBackground, { height: insets.top }]} />
        <View style={styles.container}>{children}</View>
      </View>
      {/* Global Toast instance - single instance for entire app */}
      <View style={styles.toastContainer}>
        <Toast config={toastConfig} />
      </View>
    </>
  );
};
