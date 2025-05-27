import { COLORS } from "@/constants/themes";
import { router } from "expo-router";
import React, { useEffect, useRef, useState } from "react";
import {
  Animated,
  Image,
  Keyboard,
  KeyboardAvoidingView,
  KeyboardEvent,
  Platform,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";

export default function LoginScreen() {
  const [keyboardOffset] = useState(new Animated.Value(0));
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);

  useEffect(() => {
    const keyboardShow = Keyboard.addListener(
      "keyboardDidShow",
      (event: KeyboardEvent) => {
        Animated.timing(keyboardOffset, {
          toValue: Platform.OS === "ios" ? event.endCoordinates.height - 20 : 0,
          duration: 500,
          useNativeDriver: false,
        }).start();
      }
    );

    const keyboardHide = Keyboard.addListener("keyboardDidHide", () => {
      Animated.timing(keyboardOffset, {
        toValue: 0,
        duration: 300,
        useNativeDriver: false,
      }).start();
    });

    return () => {
      keyboardShow.remove();
      keyboardHide.remove();
    };
  }, );

  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(20)).current;
  const imageFade = useRef(new Animated.Value(0)).current;
  const imageSlide = useRef(new Animated.Value(-20)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(imageFade, {
        toValue: 1,
        duration: 700,
        useNativeDriver: true,
      }),
      Animated.timing(imageSlide, {
        toValue: 0,
        duration: 700,
        useNativeDriver: true,
      }),
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 700,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 700,
        useNativeDriver: true,
      }),
    ]).start();
  }, );

  const handleLogin = () => {
    const emailValid = !!email.trim();
    const passwordValid = !!password.trim();

    setEmailError(!emailValid);
    setPasswordError(!passwordValid);

    if (!emailValid || !passwordValid) {
      setErrorMessage("Email and password are required.");
      return;
    }

    if (email !== "test@example.com" || password !== "password") {
      setErrorMessage("Invalid email or password.");
      return;
    }

    setErrorMessage("");
    setEmailError(false);
    setPasswordError(false);
    router.replace("/(client)");
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <Animated.View style={{ flex: 1, paddingBottom: keyboardOffset }}>
        <View className="flex-1 bg-[#122938]">
          {/* Top Image */}
          <Animated.View
            style={{
              opacity: imageFade,
              transform: [{ translateY: imageSlide }],
            }}
            className="items-center"
          >
            <Image
              source={require("@/assets/images/login-art.png")}
              className="w-full h-72"
            />
          </Animated.View>

          {/* Login Card */}
          <Animated.View
            className="flex-1 bg-[#F5F5F5] rounded-t-3xl px-6 pt-8 mt-16"
            style={{
              opacity: fadeAnim,
              transform: [{ translateY: slideAnim }],
            }}
          >
            <View className="w-full">
              <Text className="text-center text-3xl font-lexend-bold text-primary mt-2 px-2">
                LOGIN
              </Text>
              <Text className="text-center text-sm font-noto text-black px-2">
                Log in to access your wellness.
              </Text>

              {/* Form */}
              <KeyboardAvoidingView behavior="padding">
                <View className="mt-12 px-2">
                  <TextInput
                    placeholder="Email"
                    placeholderTextColor={COLORS.gray}
                    value={email}
                    onChangeText={(text) => {
                      setEmail(text);
                      if (text) setEmailError(false);
                    }}
                    className={`mt-2 border ${
                      emailError ? "border-red" : "border-primary"
                    } bg-blue-50 rounded-lg p-4 text-base text-gray font-noto`}
                  />
                  <TextInput
                    placeholder="Password"
                    placeholderTextColor={COLORS.gray}
                    secureTextEntry
                    value={password}
                    onChangeText={(text) => {
                      setPassword(text);
                      if (text) setPasswordError(false);
                    }}
                    className={`mt-4 border ${
                      passwordError ? "border-red" : "border-primary"
                    } bg-blue-50 rounded-lg p-4 text-base text-gray font-noto`}
                  />
                  <TouchableOpacity>
                    <Text className="text-right text-xs mt-4 text-primary font-lexend-bold">
                      Forgot Password?
                    </Text>
                  </TouchableOpacity>
                </View>
              </KeyboardAvoidingView>

              {/* Error Message */}
              {errorMessage ? (
                <Text className="text-red text-center mt-6 font-lexend-bold">
                  {errorMessage}
                </Text>
              ) : null}

              {/* Buttons */}
              <View className="px-2">
                <TouchableOpacity
                  className="bg-primary mt-6 py-4 rounded-xl items-center"
                  onPress={handleLogin}
                >
                  <Text className="text-white font-lexend-bold text-lg">
                    LOGIN
                  </Text>
                </TouchableOpacity>

                <Text className="text-center text-sm mt-4 text-gray-700 font-noto">
                  Don’t have an account?{" "}
                  <Text
                    className="text-primary font-bold"
                    onPress={() => router.replace("/register")}
                  >
                    Create one
                  </Text>
                </Text>
              </View>
            </View>
          </Animated.View>
        </View>
      </Animated.View>
    </TouchableWithoutFeedback>
  );
}
