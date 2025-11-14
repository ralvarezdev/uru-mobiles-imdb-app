import { Modal } from "@/components/atoms/Modal";
import { ActionButtonsUserProfile } from "@/components/molecules/ActionButtonsUserProfile";
import { LoadingMessage } from "@/components/molecules/LoadingMessage";
import { ModalBecomeACritic } from "@/components/molecules/ModalBecomeACritic";
import { ModalEditUserProfile } from "@/components/molecules/ModalEditUserProfile";
import { RequestToBeCriticUserProfile } from "@/components/molecules/RequestToBeCriticUserProfile";
import { SecuritySectionUserProfile } from "@/components/molecules/SecuritySectionUserProfile";
import { UserProfileCard } from "@/components/molecules/UserProfileCard";
import { UserProfileInformation } from "@/components/molecules/UserProfileInformation";
import { User } from "@/entities/User";
import authService from "@/services/authService";
import userService from "@/services/userService";
import { ListUserRolesRequest, ListUserRolesResponse } from "@ralvarezdev/proto-auth-ts";
import { GetMyProfileResponse, GetMyProfileRequest } from "@ralvarezdev/proto-user-ts";
import React, { useEffect, useState } from "react";
import { View, ScrollView } from "react-native";
import type { Timestamp } from "@bufbuild/protobuf/wkt";
import { styles } from "./style";

export const UserProfile: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState<GetMyProfileResponse | undefined>({
    firstName: "Juan",
    lastName: "Pérez",
    birthdate: { seconds: 1699476294n, nanos: 500000000, $typeName: "google.protobuf.Timestamp" } as Timestamp,
    username: "juanperez87",
    email: "juan.perez@example.com",
    emailIsVerified: true,
    phone: "+5491123456789",
    phoneIsVerified: false,
    hasTotpEnabled: true,
    $typeName: "ralvarezdev.v1.GetMyProfileResponse",
  });
  const [userRoles, setUserRoles] = useState<string[]>([]);

  useEffect(() => {
    loadUserProfile();
  }, []);

  const loadUserProfile = async () => {
    setLoading(true);
    const getMyProfileRequest: GetMyProfileRequest = {
      $typeName: "ralvarezdev.v1.GetMyProfileRequest",
    };
    const user = await userService.me(getMyProfileRequest);
    setUser(user);
    setLoading(false);
  };

  useEffect(() => {
    if (user?.username) {
      loadUserRoles();
    }
  }, [user]);

  const loadUserRoles = async () => {
    setLoading(true);
    const getUserRolesRequest: ListUserRolesRequest = {
      username: user!.username,
      $typeName: "ralvarezdev.v1.ListUserRolesRequest",
    };
    const userRoles = await authService.getMyRoles(getUserRolesRequest);
    setUserRoles(userRoles?.roleNames || []);
    setLoading(false);
  };

  // if (loading) {
  //   return <LoadingMessage message="Creating your account..." />;
  // }

  return (
    <View style={styles.container}>
      <UserProfileCard user={user} userRoles={userRoles} />
      <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollViewContent}>
        <UserProfileInformation user={user} />
        <SecuritySectionUserProfile user={user} />
        <ActionButtonsUserProfile user={user} />
        <RequestToBeCriticUserProfile user={user} userRoles={userRoles} />
      </ScrollView>
    </View>
  );
};
