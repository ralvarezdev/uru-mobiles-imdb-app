import React from "react";
import { ScrollView } from "react-native";
import { ScreenTemplate } from "@/components/templates/ScreenTemplate";
import { UserRegisterForm } from "@/components/organisms/UserRegisterForm";
import { UserRegisterHeader } from "@/components/organisms/UserRegisterHeader";
import { styles } from "./style";

export const RegisterScreen: React.FC = () => {
  return (
    <ScreenTemplate header={<UserRegisterHeader />}>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollViewContent}
        scrollEnabled={true}
        showsVerticalScrollIndicator={true}
        nestedScrollEnabled={true}
        keyboardShouldPersistTaps="handled">
        <UserRegisterForm />
      </ScrollView>
    </ScreenTemplate>
  );
};
