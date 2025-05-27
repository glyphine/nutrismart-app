import { COLORS } from "@/constants/themes";
import Checkbox from "expo-checkbox";
import { router } from "expo-router";
import React, { useEffect, useRef, useState } from "react";
import {
  Animated,
  Dimensions,
  Image,
  Keyboard,
  KeyboardEvent,
  Platform,
  Pressable,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";

const SCREEN_HEIGHT = Dimensions.get("window").height;

export default function RegisterScreen() {
  // States
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [agree, setAgree] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [keyboardOffset] = useState(new Animated.Value(0));

  const [usernameError, setUsernameError] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [agreeError, setAgreeError] = useState(false);

  // Animations
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
  });

  useEffect(() => {
    const keyboardShow = Keyboard.addListener(
      "keyboardDidShow",
      (event: KeyboardEvent) => {
        Animated.timing(keyboardOffset, {
          toValue: Platform.OS === "ios" ? event.endCoordinates.height - 20 : 0,
          duration: 300,
          useNativeDriver: false,
        }).start();
      }
    );

    const keyboardHide = Keyboard.addListener("keyboardDidHide", () => {
      Animated.timing(keyboardOffset, {
        toValue: 0,
        duration: 200,
        useNativeDriver: false,
      }).start();
    });

    return () => {
      keyboardShow.remove();
      keyboardHide.remove();
    };
  }, []);

  const handleRegister = () => {
    const isValidUsername = !!username.trim();
    const isValidEmail = !!email.trim();
    const isValidPassword = !!password.trim();

    setUsernameError(!isValidUsername);
    setEmailError(!isValidEmail);
    setPasswordError(!isValidPassword);
    setAgreeError(!agree);

    if (!isValidUsername || !isValidEmail || !isValidPassword || !agree) {
      setErrorMessage("Please complete all fields and accept the terms.");
      return;
    }

    // Clear all
    setErrorMessage("");
    router.replace("/(client)");
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <Animated.View
        style={{ flex: 1, paddingBottom: keyboardOffset }}
        className="bg-[#122938]"
      >
        {/* Animated Top Image */}
        <Animated.View
          style={{
            opacity: imageFade,
            transform: [{ translateY: imageSlide }],
          }}
          className="items-center "
        >
          <Image
            source={require("@/assets/images/login-art.png")}
            className="w-full h-72"
          />
        </Animated.View>

        {/* Slide-Up Drawer Style Form */}
        <Animated.View
          className="flex-1 bg-[#F5F5F5] rounded-t-3xl px-6 pt-8"
          style={{
            opacity: fadeAnim,
            transform: [{ translateY: slideAnim }],
          }}
        >
          <View className="w-full">
            <Text className="text-center text-3xl font-lexend-bold text-primary mt-2 px-2">
              CREATE ACCOUNT
            </Text>
            <Text className="text-center text-sm font-noto text-black mt-2 px-2 mb-4">
              Create your account to begin your wellness.
            </Text>

            <View className="px-2 mt-2">
              <Text className="text-base font-lexend-bold text-primary">
                Username
              </Text>
              <TextInput
                placeholder="Enter your username"
                value={username}
                onChangeText={(text) => {
                  setUsername(text);
                  setUsernameError(false);
                }}
                className={`mt-2 border ${
                  usernameError ? "border-red-500" : "border-primary"
                } bg-blue-100 rounded-lg p-4 text-base text-gray font-noto`}
              />

              <Text className="text-base font-lexend-bold text-primary mt-6">
                Email
              </Text>
              <TextInput
                placeholder="Enter your email address"
                value={email}
                onChangeText={(text) => {
                  setEmail(text);
                  setEmailError(false);
                }}
                className={`mt-2 border ${
                  emailError ? "border-red-500" : "border-primary"
                } bg-blue-100 rounded-lg p-4 text-base text-gray font-noto`}
              />

              <Text className="text-base font-lexend-bold text-primary mt-6">
                Password
              </Text>
              <TextInput
                placeholder="Enter your password"
                secureTextEntry
                value={password}
                onChangeText={(text) => {
                  setPassword(text);
                  setPasswordError(false);
                }}
                className={`mt-2 border ${
                  passwordError ? "border-red-500" : "border-primary"
                } bg-blue-100 rounded-lg p-4 text-base text-gray font-noto`}
              />

              {/* Checkbox */}
              <View className="flex-row mt-6 items-center gap-2">
                <Checkbox
                  value={agree}
                  onValueChange={setAgree}
                  color={agree ? COLORS.primary : undefined}
                />
                <View className="flex-1">
                  <Text className="text-xs text-gray-700 leading-relaxed font-noto">
                    I accept the{" "}
                    <Text className="font-bold text-red">
                      Terms & Conditions
                    </Text>{" "}
                    and{" "}
                    <Text className="font-bold text-red">Privacy Policy</Text>
                  </Text>
                </View>
              </View>
              {agreeError && (
                <Text className="text-red-500 text-xs mt-1 font-noto">
                  You must agree to continue.
                </Text>
              )}

              {/* Error Message */}
              {errorMessage !== "" && (
                <Text className="text-red-500 text-center mt-4 font-lexend-bold">
                  {errorMessage}
                </Text>
              )}

              {/* Register with Google */}
              <TouchableOpacity className="mt-6 items-center">
                <Image
                  source={require("@/assets/images/google-btn.png")}
                  className="w-[250px] h-12"
                  resizeMode="contain"
                />
              </TouchableOpacity>

              {/* Submit */}
              <Pressable
                className="bg-primary mt-6 py-4 rounded-xl items-center"
                onPress={handleRegister}
              >
                <Text className="text-white font-lexend-bold text-lg">
                  SIGN UP
                </Text>
              </Pressable>

              {/* Switch to Login */}
              <Text className="text-center text-sm mt-4 text-gray-700 font-noto">
                Already have an account?{" "}
                <Text
                  className="text-red font-lexend-bold"
                  onPress={() => router.replace("/(authentication)/login")}
                >
                  Sign In
                </Text>
              </Text>
            </View>
          </View>
        </Animated.View>
      </Animated.View>
    </TouchableWithoutFeedback>
  );
}
