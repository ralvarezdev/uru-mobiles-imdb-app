import React from "react";
import { TouchableOpacity, Text } from "react-native";
import { styles } from "./style";

interface AddReviewButtonProps {
  onPress: () => void;
}

export const AddReviewButton: React.FC<AddReviewButtonProps> = ({ onPress }) => {
  return (
    <TouchableOpacity style={styles.button} onPress={onPress}>
      <Text style={styles.buttonText}>Add my review</Text>
    </TouchableOpacity>
  );
};

