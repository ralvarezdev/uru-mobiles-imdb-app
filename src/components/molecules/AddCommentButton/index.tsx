import React from "react";
import { TouchableOpacity, Text } from "react-native";
import { styles } from "./style";

interface AddCommentButtonProps {
  onPress: () => void;
}

export const AddCommentButton: React.FC<AddCommentButtonProps> = ({ onPress }) => {
  return (
    <TouchableOpacity style={styles.button} onPress={onPress}>
      <Text style={styles.buttonText}>Add my comment</Text>
    </TouchableOpacity>
  );
};

