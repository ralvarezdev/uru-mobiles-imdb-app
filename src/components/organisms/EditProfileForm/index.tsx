import { Text } from "@/components/atoms/Text";
import { InputField } from "@/components/molecules/InputField";
import { UpdateUserProfileData } from "@/entities/User";
import React, { useState } from "react";
import { View } from "react-native";
import { styles } from "./style";
import { UpdateProfileRequest } from "@ralvarezdev/proto-user-ts";

interface EditProfileFormProps {
  initialData: UpdateProfileRequest;
  onDataChange: (data: UpdateProfileRequest) => void;
  errors?: {
    firstName?: string;
    lastName?: string;
  };
}

export const EditProfileForm: React.FC<EditProfileFormProps> = ({ initialData, onDataChange, errors }) => {
  const [formData, setFormData] = useState<UpdateProfileRequest>(initialData);

  const handleChange = (field: keyof UpdateProfileRequest, value: string) => {
    const newData = { ...formData, [field]: value };
    setFormData(newData);
    onDataChange(newData);
  };

  return (
    <View>
      <View style={styles.fieldContainer}>
        <InputField
          label="First name"
          placeholder="Juan Pérez"
          value={formData.firstName || ""}
          onChangeText={(value) => handleChange("firstName", value)}
          error={errors?.firstName}
        />
      </View>
      <View style={styles.fieldContainer}>
        <InputField
          label="Last name"
          placeholder="Juan Pérez"
          value={formData.lastName || ""}
          onChangeText={(value) => handleChange("lastName", value)}
          error={errors?.lastName}
        />
      </View>

      {/* <View style={styles.fieldContainer}>
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
      </View> */}

      {/* Password */}
      {/* <View style={styles.fieldContainer}> */}
      {/* <Text variant="label" style={styles.label}>
          New password (optional)
        </Text>
        <Input
          placeholder="Leave blank to keep current password"
          value={formData.password || ""}
          onChangeText={(value) => handleChange("password", value)}
          secureTextEntry
        />
      </View> */}

      {/* Hi password is hint */}
      {/* {formData.password && formData.password.length > 0 && (
        <View style={styles.hint}>
          <Text variant="body" style={styles.hintText}>
            💡 The password must be at least 8 characters long
          </Text>
        </View>
      )} */}
    </View>
  );
};
