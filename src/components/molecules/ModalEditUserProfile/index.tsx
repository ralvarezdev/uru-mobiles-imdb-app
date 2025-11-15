import React, { useState } from "react";
import { View } from "react-native";
import { Button } from "../../atoms/Button";
import { UpdateUserProfileData, User } from "@/entities/User";
import { EditProfileForm } from "@/components/organisms/EditProfileForm";
import { Modal } from "@/components/atoms/Modal";
import { GetMyProfileResponse, UpdateProfileRequest } from "@ralvarezdev/proto-user-ts";
import userService from "@/services/userService";
import Toast from "react-native-toast-message";
import { LoadingMessage } from "../LoadingMessage";

interface ModalEditUserProfileProps {
  user: GetMyProfileResponse | undefined;
  visible: boolean;
  onClose: () => void;
}

interface FormErrors {
  firstName: string;
  lastName: string;
}

export const ModalEditUserProfile: React.FC<ModalEditUserProfileProps> = ({ user, visible, onClose }) => {
  const [editFormData, setEditFormData] = useState<UpdateProfileRequest>({
    firstName: user?.firstName,
    lastName: user?.lastName,
    birthdate: user?.birthdate,
    $typeName: "ralvarezdev.v1.UpdateProfileRequest",
  });
  const [errors, setErrors] = useState<FormErrors>({
    firstName: "",
    lastName: "",
  });
  const [loading, setLoading] = useState(false);

  const validateForm = (): { isValid: boolean; errorMessage: string } => {
    let isValid = true;
    const newErrors: FormErrors = {
      firstName: "",
      lastName: "",
    };
    let errorMessage = "";

    if (!editFormData.firstName || editFormData.firstName.trim() === "") {
      newErrors.firstName = "First name is required";
      errorMessage = "First name is required";
      isValid = false;
    } else if (editFormData.firstName.trim().length < 3) {
      newErrors.firstName = "First name must be at least 3 characters";
      errorMessage = "First name must be at least 3 characters";
      isValid = false;
    }

    if (!editFormData.lastName || editFormData.lastName.trim() === "") {
      newErrors.lastName = "Last name is required";
      if (!errorMessage) errorMessage = "Last name is required";
      isValid = false;
    } else if (editFormData.lastName.trim().length < 3) {
      newErrors.lastName = "Last name must be at least 3 characters";
      if (!errorMessage) errorMessage = "Last name must be at least 3 characters";
      isValid = false;
    }

    setErrors(newErrors);
    return { isValid, errorMessage };
  };

  const handleUpdateProfile = async () => {
    // Validaciones de campos
    const validation = validateForm();
    if (!validation.isValid) {
      return;
    }

    setLoading(true);
    // Clear any previous errors before making the request
    userService.clearLastError();
    
    try {
      const response = await userService.update(editFormData);

      if (response && response.$typeName === "ralvarezdev.v1.UpdateProfileResponse") {
        console.log("Profile update successful");
        // Close modal first
        onClose();
        
        // Show toast after modal closes (using global Toast instance)
        setTimeout(() => {
          Toast.show({
            type: "success",
            text1: "Profile updated successfully!",
            position: "bottom",
            visibilityTime: 5000, // 5 seconds
          });
        }, 100); // Small delay to ensure modal is closed
      } else {
        // Response is undefined, check for parsed error
        const parsedError = userService.getLastError();
        
        if (parsedError) {
          // Check if it's an internal error that shouldn't be shown to users
          const errorCodeLower = parsedError.errorCode?.toLowerCase() || "";
          const originalMsgLower = parsedError.originalMessage?.toLowerCase() || "";
          const generalMsgLower = parsedError.generalMessage?.toLowerCase() || "";
          
          const isInternalError = 
            errorCodeLower === "internal" ||
            errorCodeLower.includes("internal_error") ||
            originalMsgLower.includes("internal") ||
            generalMsgLower.includes("internal") ||
            originalMsgLower.includes("internal server error") ||
            generalMsgLower.includes("internal server error") ||
            // Check for technical error patterns
            originalMsgLower.includes("rpc error") ||
            generalMsgLower.includes("rpc error") ||
            originalMsgLower.includes("grpc") ||
            generalMsgLower.includes("grpc") ||
            // Check for authentication/authorization errors
            errorCodeLower === "unauthenticated" ||
            originalMsgLower.includes("missing authorization") ||
            generalMsgLower.includes("missing authorization") ||
            originalMsgLower.includes("unauthorized") ||
            generalMsgLower.includes("unauthorized");
          
          // For validation errors, show field-specific messages
          if (parsedError.isValidationError && parsedError.messages.length > 0) {
            // Show first validation error
            const firstError = parsedError.messages[0];
            Toast.show({
              type: "error",
              text1: "Validation error",
              text2: firstError.message || "Please check the form fields.",
              position: "bottom",
              visibilityTime: 5000, // 5 seconds
            });
          } else if (isInternalError) {
            // Don't show internal errors to users - always show generic message
            Toast.show({
              type: "error",
              text1: "Could not update profile",
              text2: "An unexpected error occurred. Please try again later.",
              position: "bottom",
              visibilityTime: 5000, // 5 seconds
            });
          } else {
            // Show user-friendly error message
            Toast.show({
              type: "error",
              text1: "Could not update profile",
              text2: parsedError.generalMessage || "Please try again.",
              position: "bottom",
              visibilityTime: 5000, // 5 seconds
            });
          }
        } else {
          Toast.show({
            type: "error",
            text1: "Could not update profile. Please try again.",
            position: "bottom",
            visibilityTime: 5000, // 5 seconds
          });
        }
      }
    } catch (error: any) {
      // This catch should rarely be hit now, but keep it as a safety net
      console.error("Unexpected update error:", error);
      Toast.show({
        type: "error",
        text1: "Could not update profile. Please try again.",
        position: "bottom",
        visibilityTime: 5000, // 5 seconds
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      visible={visible}
      onClose={onClose}
      title="Edit my profile"
      footer={
        <View style={{ flexDirection: "row", gap: 12, width: "100%" }}>
          <View style={{ flex: 1 }}>
            <Button title="Cancel" variant="secondary" onPress={onClose} disabled={loading} />
          </View>
          <View style={{ flex: 1 }}>
            <Button title="Save Changes" variant="primary" onPress={handleUpdateProfile} disabled={loading} loading={loading} />
          </View>
        </View>
      }>
      {loading ? (
        <LoadingMessage message="Updating profile..." />
      ) : (
        <EditProfileForm initialData={editFormData} onDataChange={setEditFormData} errors={errors} />
      )}
    </Modal>
  );
};
