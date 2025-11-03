import React from "react";
import { View, ScrollView, KeyboardAvoidingView, Platform } from "react-native";
import { styles } from "./styles";

interface ScreenTemplateProps {
  header: React.ReactNode;
  children: React.ReactNode;
  footer?: React.ReactNode;
}

export const ScreenTemplate: React.FC<ScreenTemplateProps> = ({ header, children, footer }) => {
  return (
    <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === "ios" ? "padding" : "height"}>
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <View style={styles.headerContainer}>{header}</View>
        <View style={styles.bodyContainer}>{children}</View>
        {footer && <View style={styles.footerContainer}>{footer}</View>}
      </ScrollView>
    </KeyboardAvoidingView>
  );
};
