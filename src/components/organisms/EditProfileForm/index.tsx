import { InputField } from "@/components/molecules/InputField";
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
    </View>
  );
};
