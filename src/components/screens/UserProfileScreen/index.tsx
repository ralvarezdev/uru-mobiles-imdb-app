import { UserProfile } from "@/components/organisms/UserProfile";
import { UserProfileHeader } from "@/components/organisms/UserProfileHeader";
import { ScreenTemplate } from "@/components/templates/ScreenTemplate";
import userService from "@/services/userService";
import { GetMyProfileRequest, GetMyProfileResponse } from "@ralvarezdev/proto-user-ts";
import React, { useEffect, useState } from "react";

export const UserProfileScreen: React.FC = () => {
  // const [user, setUser] = useState<GetMyProfileResponse | undefined>();

  // useEffect(() => {
  //   loadUserProfile();
  // }, []);

  // const loadUserProfile = async () => {
  //   const getMyProfileRequest: GetMyProfileRequest = {
  //     $typeName: "ralvarezdev.v1.GetMyProfileRequest",
  //   };
  //   const user = await userService.me(getMyProfileRequest);
  // };

  return (
    <ScreenTemplate header={<UserProfileHeader />}>
      <UserProfile />
    </ScreenTemplate>
  );
};
