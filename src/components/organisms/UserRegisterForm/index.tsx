import { Text } from "@/components/atoms/Text";
import React, { useState } from "react";
import { Alert, View } from "react-native";
import { Loading } from "@/components/atoms/Loading";
import { styles } from "./style";
import { InputField } from "@/components/molecules/InputField";
import { Button } from "@/components/atoms/Button";
import { router } from "expo-router";
import { CreateAccountRequest } from "@ralvarezdev/proto-user-ts";

interface FormErrors {
  firstName: string;
  lastName: string;
  username: string;
  password: string;
  email: string;
}

export const UserRegisterForm: React.FC = () => {
  const [formData, setFormData] = useState<CreateAccountRequest>({
    firstName: "",
    lastName: "",
    username: "",
    password: "",
    email: "",
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

  const validateForm = (): boolean => {
    let isValid = true;
    const newErrors: FormErrors = {
      firstName: "",
      lastName: "",
      username: "",
      password: "",
      email: "",
    };

    // Validate name
    if (formData.firstName.trim() === "") {
      newErrors.firstName = "First name is required";
      isValid = false;
    } else if (formData.firstName.trim().length < 3) {
      newErrors.firstName = "First name must be at least 3 characters";
      isValid = false;
    }

    // Validate last name
    if (formData.lastName.trim() === "") {
      newErrors.lastName = "Last name is required";
      isValid = false;
    } else if (formData.lastName.trim().length < 3) {
      newErrors.lastName = "Last name must be at least 3 characters";
      isValid = false;
    }

    // Validate email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (formData.email.trim() === "") {
      newErrors.email = "Email is required";
      isValid = false;
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = "Invalid email format";
      isValid = false;
    }

    // Validate username
    if (formData.username.trim() === "") {
      newErrors.username = "Username is required";
      isValid = false;
    } else if (formData.username.trim().length < 4) {
      newErrors.username = "Username must be at least 4 characters";
      isValid = false;
    } else if (!/^[a-zA-Z0-9_]+$/.test(formData.username)) {
      newErrors.username = "Only letters, numbers and underscore allowed";
      isValid = false;
    }

    // Validate password
    if (formData.password === "") {
      newErrors.password = "Password is required";
      isValid = false;
    } else if (formData.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleRegister = async () => {
    if (validateForm()) {
      return;
    }
   setLoading(true);
    const createUser = async (formData: CreateAccountRequest) => {
      try {
        const response = await createUser({
          firstName: formData.firstName.trim(),
          lastName: formData.lastName.trim(),
          email: formData.email.trim().toLowerCase(),
          username: formData.username.trim().toLowerCase(),
          password: formData.password,
          $typeName: "ralvarezdev.v1.CreateAccountRequest",
        });

        // Success
        Alert.alert("Success! 🎉", "Your account has been created successfully", [
          {
            text: "Continue",
            onPress: () => router.push("Login" as never),
          },
        ]);

        // Clear form
        setFormData({
          firstName: "",
          lastName: "",
          email: "",
          username: "",
          password: "",
          $typeName: "ralvarezdev.v1.CreateAccountRequest",
        });
      } catch (error: any) {
        Alert.alert("Registration Failed", error.message || "Could not complete registration. Please try again.");
      } finally {
        setLoading(false);
      }
    };
  };

  const handleChange = (field: keyof CreateAccountRequest, value: string) => {
    setFormData({ ...formData, [field]: value });
    // Clear error when user starts typing
    if (errors[field as keyof FormErrors]) {
      setErrors({ ...errors, [field]: "" });
    }
  };

  const goToLogin = () => {
    router.push("/");
  };

  if (loading) {
    return <Loading text="Creating your account..." />;
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
        <Text style={styles.loginLink} onPress={goToLogin}>Sign In </Text>
      </View>
    </View>
  );
};
