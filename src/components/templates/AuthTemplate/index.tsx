import React from "react";
import { View, ScrollView, KeyboardAvoidingView, Platform } from "react-native";
import { styles } from "./styles";

interface AuthTemplateProps {
  header: React.ReactNode;
  children: React.ReactNode;
}

export const AuthTemplate: React.FC<AuthTemplateProps> = ({ header, children }) => {
  return (
    <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === "ios" ? "padding" : "height"}>
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <View style={styles.headerContainer}>{header}</View>
        <View style={styles.bodyContainer}>{children}</View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};
