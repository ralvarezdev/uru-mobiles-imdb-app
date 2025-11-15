import { RootTemplate } from "@/components/templates/RootTemplate";
import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <RootTemplate>
      <Stack screenOptions={{ headerShown: false, contentStyle: { backgroundColor: "#fff" } }}>
        <Stack.Screen name="index" />
      </Stack>
    </RootTemplate>
  );
}
