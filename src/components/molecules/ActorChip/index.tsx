import React from "react";
import { View, Text } from "react-native";
import { styles } from "./style";

interface ActorChipProps {
  name: string;
}

const ActorChip = ({ name }: ActorChipProps) => (
  <View style={styles.chip}>
    <Text style={styles.text}>{name}</Text>
  </View>
);

export default ActorChip;
