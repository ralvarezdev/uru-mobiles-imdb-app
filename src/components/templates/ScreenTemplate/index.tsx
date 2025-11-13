// src/components/templates/ScreenTemplate/index.tsx
import React from "react";
import { View, ScrollView, KeyboardAvoidingView, Platform } from "react-native";
import { styles } from "./styles";

interface ScreenTemplateProps {
  header: React.ReactNode;
  children: React.ReactNode;
  footer?: React.ReactNode;
}

export const ScreenTemplate: React.FC<ScreenTemplateProps> = ({ header, children, footer }) => (
  <View style={styles.container}>
    {header}
    <KeyboardAvoidingView style={styles.flexOne} behavior={Platform.OS === "ios" ? "padding" : "height"}>
      {/* <ScrollView contentContainerStyle={{ padding: 5 }} showsVerticalScrollIndicator={false}>
        
      </ScrollView> */}
      {/* <ScrollView contentContainerStyle={{ paddingTop: 16, paddingHorizontal: 18 }} showsVerticalScrollIndicator={false}> */}
      {children}
      {footer && footer}
    </KeyboardAvoidingView>
  </View>
);
