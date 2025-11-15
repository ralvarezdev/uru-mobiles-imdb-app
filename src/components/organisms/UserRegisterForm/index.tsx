import { Text } from "@/components/atoms/Text";
import React, { useState } from "react";
import { View } from "react-native";
import { Loading } from "@/components/atoms/Loading";
import { styles } from "./style";
import { InputField } from "@/components/molecules/InputField";
import { Button } from "@/components/atoms/Button";
import { router } from "expo-router";
import { CreateAccountRequest } from "@ralvarezdev/proto-user-ts";
import { LoadingMessage } from "@/components/molecules/LoadingMessage";
import Toast from "react-native-toast-message";
import userService from "@/services/userService";
import { ConnectError } from "@connectrpc/connect";
import { isParsedInternalServerError, isInternalServerError } from "@/utils/errorHandler";

interface FormErrors {
  firstName: string;
  lastName: string;
  username: string;
  password: string;
  email: string;
}

export const UserRegisterForm: React.FC = () => {
  const [formData, setFormData] = useState<CreateAccountRequest>({
    firstName: "Yegli1",
    lastName: "Montanez1",
    username: "yeglistar1",
    password: "P4$sw0rD#12345678",
    // password: "%hc1£`=2@[g#{m(AqHZL3D9|@-*z(LQ=kwl8!'[ZxETBQX1d2j",
    email: "montanezyeglimar4@gmail.com",
    $typeName: "ralvarezdev.v1.CreateAccountRequest",
  } as CreateAccountRequest);

  const [errors, setErrors] = useState<FormErrors>({
    firstName: "",
    lastName: "",
    username: "",
    password: "",
    email: "",
  });

  const [loading, setLoading] = useState(false);

  const validateForm = (): { isValid: boolean; errorMessage: string } => {
    let isValid = true;
    const newErrors: FormErrors = {
      firstName: "",
      lastName: "",
      username: "",
      password: "",
      email: "",
    };
    let errorMessage = "";

    // Validate name
    if (formData.firstName.trim() === "") {
      newErrors.firstName = "First name is required";
      if (!errorMessage) errorMessage = "First name is required";
      isValid = false;
    } else if (formData.firstName.trim().length < 3) {
      newErrors.firstName = "First name must be at least 3 characters";
      if (!errorMessage) errorMessage = "First name must be at least 3 characters";
      isValid = false;
    }

    // Validate last name
    if (formData.lastName.trim() === "") {
      newErrors.lastName = "Last name is required";
      if (!errorMessage) errorMessage = "Last name is required";
      isValid = false;
    } else if (formData.lastName.trim().length < 3) {
      newErrors.lastName = "Last name must be at least 3 characters";
      if (!errorMessage) errorMessage = "Last name must be at least 3 characters";
      isValid = false;
    }

    // Validate email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (formData.email.trim() === "") {
      newErrors.email = "Email is required";
      if (!errorMessage) errorMessage = "Email is required";
      isValid = false;
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = "Invalid email format";
      if (!errorMessage) errorMessage = "Invalid email format";
      isValid = false;
    }

    // Validate username
    if (formData.username.trim() === "") {
      newErrors.username = "Username is required";
      if (!errorMessage) errorMessage = "Username is required";
      isValid = false;
    } else if (formData.username.trim().length < 4) {
      newErrors.username = "Username must be at least 4 characters";
      if (!errorMessage) errorMessage = "Username must be at least 4 characters";
      isValid = false;
    } else if (!/^[a-zA-Z0-9_]+$/.test(formData.username)) {
      newErrors.username = "Only letters, numbers and underscore allowed";
      if (!errorMessage) errorMessage = "Only letters, numbers and underscore allowed";
      isValid = false;
    }

    // Validate password
    if (formData.password === "") {
      newErrors.password = "Password is required";
      if (!errorMessage) errorMessage = "Password is required";
      isValid = false;
    }
    // else if (formData.password.length < 16) {
    //   newErrors.password = "Password must be at least 16 characters";
    //   if (!errorMessage) errorMessage = "Password must be at least 16 characters";
    //   isValid = false;
    // } else {
    //   // Count uppercase letters, special characters, and numbers
    //   const uppercaseCount = (formData.password.match(/[A-Z]/g) || []).length;
    //   const specialCharCount = (formData.password.match(/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?`~£]/g) || []).length;
    //   const numberCount = (formData.password.match(/[0-9]/g) || []).length;

    //   // Check requirements
    //   if (uppercaseCount < 2) {
    //     newErrors.password = "Password must contain at least 2 uppercase letters";
    //     if (!errorMessage) errorMessage = "Password must contain at least 2 uppercase letters";
    //     isValid = false;
    //   } else if (specialCharCount < 2) {
    //     newErrors.password = "Password must contain at least 2 special characters";
    //     if (!errorMessage) errorMessage = "Password must contain at least 2 special characters";
    //     isValid = false;
    //   } else if (numberCount < 4) {
    //     newErrors.password = "Password must contain at least 4 numbers";
    //     if (!errorMessage) errorMessage = "Password must contain at least 4 numbers";
    //     isValid = false;
    //   }
    // }

    setErrors(newErrors);
    return { isValid, errorMessage };
  };

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleRegister = async () => {
    // Validaciones de campos
    const validation = validateForm();
    if (!validation.isValid) {
      setLoading(false);
      return;
    }

    setLoading(true);
    // Clear any previous errors before making the request
    userService.clearLastError();

    try {
      // const registerInput: CreateAccountRequest = { ...user, password, avatar: "" };
      const userRegisteredResponse = await userService.register(formData);
      console.log("userRegisteredResponse", userRegisteredResponse);
      console.log("userRegisteredResponse type:", typeof userRegisteredResponse);
      console.log("userRegisteredResponse $typeName:", userRegisteredResponse?.$typeName);

      if (userRegisteredResponse && userRegisteredResponse.$typeName === "ralvarezdev.v1.CreateAccountResponse") {
        console.log("Registration successful, showing success toast");
        Toast.show({
          type: "success", // 'success', 'error', 'info'
          text1: "Account created successfully",
          text2: "You will be redirected to login...",
          position: "bottom", // o 'top'
          visibilityTime: 5000, // 5 seconds
        });
        // Add a small delay to ensure toast is shown before navigation
        setTimeout(() => {
          router.replace("/");
        }, 500);
      } else {
        console.log("Registration failed or response is undefined");
        // Response is undefined, check for parsed error
        const parsedError = userService.getLastError();

        if (parsedError) {
          // Use parsed error information
          const { messages, fieldErrors, generalMessage, errorCode } = parsedError;

          // Update form errors with field-specific errors
          if (Object.keys(fieldErrors).length > 0) {
            setErrors((prev) => {
              const newErrors = { ...prev };
              // Map field errors to form errors
              Object.entries(fieldErrors).forEach(([field, errorList]) => {
                // Map common field names
                const formField = field.toLowerCase().replace(/\./g, "");
                if (formField in newErrors && Array.isArray(errorList) && errorList.length > 0) {
                  newErrors[formField as keyof FormErrors] = errorList[0] || "";
                }
              });
              return newErrors;
            });
          }

          // Check for already_exists error
          if (errorCode === "already_exists" || generalMessage.toLowerCase().includes("already")) {
            // Set error on email field if it's an email-related error
            if (fieldErrors.email || generalMessage.toLowerCase().includes("email")) {
              setErrors((prev) => ({
                ...prev,
                email: "This email is already registered. Please use a different email or sign in.",
              }));
            }

            Toast.show({
              type: "error",
              text1: "Email already registered",
              text2: "This email address is already in use. Please use a different email or sign in.",
              position: "bottom",
              visibilityTime: 5000, // 5 seconds
            });
          } else {
            // Check for technical errors (internal, 502, authentication, etc.)
            const isTechnicalError = isParsedInternalServerError(parsedError) ||
              errorCode === "unauthenticated" ||
              generalMessage.toLowerCase().includes("missing authorization") ||
              generalMessage.toLowerCase().includes("unauthorized");

            if (isTechnicalError) {
              // Don't show technical errors to users
              Toast.show({
                type: "error",
                text1: "Registration failed",
                text2: "There was a problem creating your account. Please try again.",
                position: "bottom",
                visibilityTime: 5000, // 5 seconds
              });
            } else {
              // Show general error message
              Toast.show({
                type: "error",
                text1: "Registration failed",
                text2: generalMessage || "There was a problem creating your account. Please try again.",
                position: "bottom",
                visibilityTime: 5000, // 5 seconds
              });
            }
          }
        } else {
          // No parsed error available, show generic message
          Toast.show({
            type: "error",
            text1: "Registration failed",
            text2: "There was a problem creating your account. Please try again.",
            position: "bottom",
            visibilityTime: 5000, // 5 seconds
          });
        }
      }
    } catch (error: any) {
      // This catch should rarely be hit now, but keep it as a safety net
      console.error("Unexpected registration error:", error);
      const isInternalError = isInternalServerError(error);
      Toast.show({
        type: "error",
        text1: "Registration failed",
        text2: isInternalError ? "An internal error occurred. Please try again later." : "Please try again later.",
        position: "bottom",
        visibilityTime: 5000,
      });
    }
    setLoading(false);
  };

  const goToLogin = () => {
    router.push("/");
  };

  if (loading) {
    return <LoadingMessage message="Creating your account..." />;
  }

  return (
    <View style={styles.formCard}>
      <InputField
        label="First Name"
        placeholder="e.g. John"
        value={formData.firstName}
        onChangeText={(value) => handleChange("firstName", value)}
        error={errors.firstName}
        icon="👤"
        //autoCapitalize="words"
        //returnKeyType="next"
      />
      <InputField
        label="Last Name"
        placeholder="e.g. Doe"
        value={formData.lastName}
        onChangeText={(value) => handleChange("lastName", value)}
        error={errors.lastName}
        icon="👤"
        //autoCapitalize="words"
        //returnKeyType="next"
      />
      <InputField
        label="Email Address"
        placeholder="email@example.com"
        value={formData.email}
        onChangeText={(value) => handleChange("email", value)}
        error={errors.email}
        icon="📧"
        //keyboardType="email-address"
        //autoCapitalize="none"
        //returnKeyType="next"
      />
      <InputField
        label="Username"
        placeholder="username123"
        value={formData.username}
        onChangeText={(value) => handleChange("username", value)}
        error={errors.username}
        icon="@"
        //autoCapitalize="none"
        //returnKeyType="next"
      />
      <InputField
        label="Password"
        placeholder="Minimum 8 characters"
        value={formData.password}
        onChangeText={(value) => handleChange("password", value)}
        error={errors.password}
        icon="🔒"
        secureTextEntry
        //returnKeyType="next"
      />
      {/* <InputField
        label="Confirm Password"
        placeholder="Repeat your password"
        value={formData.confirmPassword}
        onChangeText={(value) => handleChange("confirmPassword", value)}
        //  error={errors.confirmPassword}
        icon="🔒"
        secureTextEntry
        //returnKeyType="done"
        onSubmitEditing={handleRegister}
      /> */}
      <Button title="Create Account" onPress={handleRegister} />
      <View style={styles.loginSection}>
        <Text style={styles.loginText}>Already have an account? </Text>
        <Text style={styles.loginLink} onPress={goToLogin}>
          Sign In{" "}
        </Text>
      </View>
    </View>
  );
};
