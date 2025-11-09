import { Text } from "@/components/atoms/Text";
import React, { useState } from "react";
import { Alert, TouchableOpacity, View } from "react-native";
import { Loading } from "@/components/atoms/Loading";
import { styles } from "./style";
import { InputField } from "@/components/molecules/InputField";
import { Button } from "@/components/atoms/Button";
import { router, useNavigation } from "expo-router";

//export const UserProfileHeader: React.FC = () => {
interface FormData {
  name: string;
  email: string;
  username: string;
  password: string;
  confirmPassword: string;
}

interface FormErrors {
  name: string;
  email: string;
  username: string;
  password: string;
  confirmPassword: string;
}

export const UserRegisterForm: React.FC = () => {
  const navigation = useNavigation();

  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    username: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState<FormErrors>({
    name: "",
    email: "",
    username: "",
    password: "",
    confirmPassword: "",
  });

  const [loading, setLoading] = useState(false);

  const validateForm = (): boolean => {
    let isValid = true;
    const newErrors: FormErrors = {
      name: "",
      email: "",
      username: "",
      password: "",
      confirmPassword: "",
    };

    // Validate name
    if (formData.name.trim() === "") {
      newErrors.name = "Name is required";
      isValid = false;
    } else if (formData.name.trim().length < 3) {
      newErrors.name = "Name must be at least 3 characters";
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

    // Validate confirm password
    if (formData.confirmPassword === "") {
      newErrors.confirmPassword = "Please confirm your password";
      isValid = false;
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleRegister = async () => {
    if (!validateForm()) {
      return;
    }

    setLoading(true);

    try {
     // const response = await registerUser({
      //   name: formData.name.trim(),
      //   email: formData.email.trim().toLowerCase(),
      //   username: formData.username.trim().toLowerCase(),
      //   password: formData.password,
      // });

      // Success
      Alert.alert("Success! 🎉", "Your account has been created successfully", [
        {
          text: "Continue",
          onPress: () => navigation.navigate("Login" as never),
        },
      ]);

      // Clear form
      setFormData({
        name: "",
        email: "",
        username: "",
        password: "",
        confirmPassword: "",
      });
    } catch (error: any) {
      Alert.alert("Registration Failed", error.message || "Could not complete registration. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (field: keyof FormData, value: string) => {
    setFormData({ ...formData, [field]: value });
    // Clear error when user starts typing
    if (errors[field]) {
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
        label="Full Name"
        placeholder="e.g. John Doe"
        value={formData.name}
        onChangeText={(value) => handleChange("name", value)}
        error={errors.name}
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
          Sign In
        </Text>
      </View>
    </View>
  );
};
