import React, { useState } from "react";
import { View } from "react-native";
import { Text } from "@/components/atoms/Text";
import { styles } from "./style";
import { Input } from "@/components/atoms/Input";
import { UpdateUserProfileData } from "@/components/types/User";

interface EditProfileFormProps {
  initialData: UpdateUserProfileData;
  onDataChange: (data: UpdateUserProfileData) => void;
}

export const EditProfileForm: React.FC<EditProfileFormProps> = ({ initialData, onDataChange }) => {
  const [formData, setFormData] = useState<UpdateUserProfileData>(initialData);

  const handleChange = (field: keyof UpdateUserProfileData, value: string) => {
    const newData = { ...formData, [field]: value };
    setFormData(newData);
    onDataChange(newData);
  };

  return (
    <View>
      <View style={styles.fieldContainer}>
        <Text variant="label" style={styles.label}>
          Full name
        </Text>
        <Input placeholder="Juan Pérez" value={formData.name} onChangeText={(value) => handleChange("name", value)} />
      </View>

      <View style={styles.fieldContainer}>
        <Text variant="label" style={styles.label}>
          Email
        </Text>
        <Input
          placeholder="juan.perez@email.com"
          value={formData.email}
          onChangeText={(value) => handleChange("email", value)}
          keyboardType="email-address"
          autoCapitalize="none"
        />
      </View>

      <View style={styles.fieldContainer}>
        <Text variant="label" style={styles.label}>
          Username
        </Text>
        <Input placeholder="juanperez" value={formData.username} onChangeText={(value) => handleChange("username", value)} autoCapitalize="none" />
      </View>

      {/* Password */}
      <View style={styles.fieldContainer}>
        <Text variant="label" style={styles.label}>
          New password (optional)
        </Text>
        <Input
          placeholder="Leave blank to keep current password"
          value={formData.password || ""}
          onChangeText={(value) => handleChange("password", value)}
          secureTextEntry
        />
      </View>

      {/* Hi password is hint */}
      {formData.password && formData.password.length > 0 && (
        <View style={styles.hint}>
          <Text variant="body" style={styles.hintText}>
            💡 The password must be at least 8 characters long
          </Text>
        </View>
      )}
    </View>
  );
};
