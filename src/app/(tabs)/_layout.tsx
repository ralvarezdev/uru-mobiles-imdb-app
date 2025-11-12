import FontAwesome from "@expo/vector-icons/FontAwesome";
import { Tabs } from "expo-router";
import React from "react";

const RootTabBarIcon = (props: { name: React.ComponentProps<typeof FontAwesome>["name"]; color: string }) => {
  return <FontAwesome size={28} style={{ marginBottom: -3 }} {...props} />;
};

const IconMovies = ({ color }: { color: string }) => <RootTabBarIcon name="home" color={color} />;
const IconMyProfile = ({ color }: { color: string }) => <RootTabBarIcon name="user" color={color} />;

export default function RootTabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
      }}>
      <Tabs.Screen
        name="home/index"
        options={{
          title: "Home",
          tabBarIcon: IconMovies,
        }}
      />
      <Tabs.Screen
        name="profile/index"
        options={{
          title: "My Profile",
          tabBarIcon: IconMyProfile,
        }}
      />
    </Tabs>
  );
}
