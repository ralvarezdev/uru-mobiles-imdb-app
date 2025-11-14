import { Text } from "@/components/atoms/Text";
import { InputField } from "@/components/molecules/InputField";
import React from "react";
import { View } from "react-native";
import { styles } from "./style";
import { DeleteAccountRequest } from "@ralvarezdev/proto-user-ts";

interface DeleteAccountFormProps {
  data: DeleteAccountRequest;
  onDataChange: (data: DeleteAccountRequest) => void;
  errors?: {
    password?: string;
  };
}

export const DeleteAccountForm: React.FC<DeleteAccountFormProps> = ({ data, onDataChange, errors }) => {
  const handlePasswordChange = (value: string) => {
    onDataChange({ ...data, password: value });
  };

  return (
    <View style={styles.modalContent}>
      {/* Warning Box */}
      <View style={styles.warningBox}>
        <Text style={styles.warningText}>
          <Text style={styles.bold}>⚠️ This action is PERMANENT</Text>
          {"\n\n"}
          You will lose:{"\n"}• All your comments{"\n"}• All your ratings{"\n"}• Your complete history
        </Text>
      </View>

      {/* Password Input */}
      <View style={styles.fieldContainer}>
        <InputField
          label="Confirm your password"
          placeholder="Enter your current password"
          value={data.password || ""}
          onChangeText={handlePasswordChange}
          error={errors?.password}
          secureTextEntry
        />
      </View>
    </View>
  );
};
