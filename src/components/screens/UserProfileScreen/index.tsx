import { UserProfile } from "@/components/organisms/UserProfile";
import { UserProfileHeader } from "@/components/organisms/UserProfileHeader";
import { ScreenTemplate } from "@/components/templates/ScreenTemplate";
import React from "react";

export const UserProfileScreen: React.FC = () => {
  return (
    <ScreenTemplate header={<UserProfileHeader />}>
      <UserProfile />
    </ScreenTemplate>
  );
};
