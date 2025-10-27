import React from "react";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { StatusBar, StyleSheet } from "react-native";
import { LoginScreen } from "@/components/screens/LoginScreen";
import { styles } from "App.style";

export default function App() {
  return (
    <SafeAreaProvider>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />
      <SafeAreaView style={styles.safeArea} edges={["top", "left", "right", "bottom"]}>
        <LoginScreen />
      </SafeAreaView>
    </SafeAreaProvider>
  );
}
