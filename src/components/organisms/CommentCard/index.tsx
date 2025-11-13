import React from "react";
import { View, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { styles } from "./style";
import Badge from "@/components/atoms/Badge";

interface CommentCardProps {
  user: string;
  badge?: string;
  ago?: string;
  rating: number;
  text: string;
}

const CommentCard = ({ user, badge = "Usuarios", ago = "", rating, text }: CommentCardProps) => {
  const initial = user ? user[0].toUpperCase() : "U";

  return (
    <View style={styles.container}>
      <View style={styles.headerRow}>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>{initial}</Text>
          </View>
          <View style={{ marginLeft: 10 }}>
            <Text style={styles.userText}>{user}</Text>
            <Badge bg="#f0f7ff">{badge}</Badge>
          </View>
        </View>

        <View style={{ flexDirection: "row", alignItems: "center" }}>
          {Array.from({ length: 5 }).map((_, i) => (
            <Ionicons key={i} name={i < rating ? "star" : "star-outline"} size={16} color="#ffb400" style={{ marginLeft: i === 0 ? 0 : 6 }} />
          ))}
        </View>
      </View>

      <Text style={styles.commentText}>{text}</Text>
    </View>
  );
};

export default CommentCard;
