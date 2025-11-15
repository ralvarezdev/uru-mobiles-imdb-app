import React, { useState } from "react";
import { View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Button } from "../../atoms/Button";
import { styles } from "./style";
import { Text } from "@/components/atoms/Text";
import { ModalBecomeACritic } from "../ModalBecomeACritic";
import { GetMyProfileResponse } from "@ralvarezdev/proto-user-ts";

interface RequestToBeCriticUserProfileProps {
  user: GetMyProfileResponse | undefined;
  userRoles: string[];
}
export const RequestToBeCriticUserProfile: React.FC<RequestToBeCriticUserProfileProps> = ({ user, userRoles }) => {
  const [isCriticModalVisible, setIsCriticModalVisible] = useState(false);

  // Only show the button if user is NOT already a critic
  const isCritic = userRoles.includes("critic");
  
  return (
    <View style={styles.container}>
      {!isCritic && (
        <View style={styles.criticPromoCard}>
          <View style={styles.criticPromoHeader}>
            <Ionicons name="ticket" size={32} color="#DF3D36" />
            <View style={styles.criticPromoText}>
              <Text variant="subtitle" style={styles.criticPromoTitle}>
                Are you a movie critic?
              </Text>
              <Text variant="body" style={styles.criticPromoSubtitle}>
                Become a verified critic and get a special badge on your profile!
              </Text>
            </View>
          </View>
          <Button
            title={
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <Ionicons name="star" size={16} color="#fff" style={{ marginRight: 6 }} />
                <Text style={{ color: "#fff", fontSize: 16, fontWeight: "600" }}>Request to be a Critic</Text>
              </View>
            }
            onPress={() => setIsCriticModalVisible(true)}
            variant="primary"
          />
        </View>
      )}
      <ModalBecomeACritic visible={isCriticModalVisible} onClose={() => setIsCriticModalVisible(false)} />
    </View>
  );
};
