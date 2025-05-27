import { COLORS } from "@/constants/themes";
import { Checkbox } from "expo-checkbox";
import { router } from "expo-router";
import React, { useEffect, useRef, useState } from "react";
import {
    Animated,
    Image,
    Keyboard,
    KeyboardEvent,
    Platform,
    Text,
    TextInput,
    TouchableOpacity,
    TouchableWithoutFeedback,
    View,
} from "react-native";

export default function RegisterScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [agree, setAgree] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [agreeError, setAgreeError] = useState(false);
  const [keyboardOffset] = useState(new Animated.Value(0));

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
  },);

  const handleRegister = () => {
    const isValidEmail = !!email.trim();
    const isValidPassword = !!password.trim();


    setEmailError(!isValidEmail);
    setPasswordError(!isValidPassword);
    setAgreeError(!agree);

    if (!isValidEmail || !isValidPassword || !agree) {
      return;
    }

    router.replace("/(client)");
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <Animated.View
        style={{ flex: 1, paddingBottom: keyboardOffset }}
        className="bg-[#122938]"
      >
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

        {/* Form Container */}
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

            <View className="px-2">
              {/* Email */}
              <Text className="text-base font-lexend-bold text-primary mt-4">
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
                  emailError ? "border-red" : "border-primary"
                } bg-blue-100 rounded-lg p-4 text-base text-gray font-noto`}
              />
              {emailError && (
                <Text className="text-xs text-red mt-1 font-noto ml-1">
                  Please enter a valid email.
                </Text>
              )}

              {/* Password */}
              <Text className="text-base font-lexend-bold text-primary mt-4">
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
                  passwordError ? "border-red" : "border-primary"
                } bg-blue-100 rounded-lg p-4 text-base text-gray font-noto`}
              />
              {passwordError && (
                <Text className="text-xs text-red mt-1 font-noto ml-1">
                  Password is required.
                </Text>
              )}

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
                <Text className="text-xs text-red mt-1 font-noto ml-1">
                  You must agree to continue.
                </Text>
              )}

              {/* Sign Up Button */}
              <TouchableOpacity
                className="bg-primary mt-6 py-4 rounded-xl items-center"
                onPress={handleRegister}
              >
                <Text className="text-white font-lexend-bold text-lg">
                  SIGN UP
                </Text>
              </TouchableOpacity>

              {/* Divider */}
              <View className="flex-row items-center mt-4 mb-2">
                <View className="flex-1 h-px bg-gray-300" />
                <Text className="mx-3 text-sm text-gray-400 font-noto">OR</Text>
                <View className="flex-1 h-px bg-gray-300" />
              </View>

              {/* Continue with Google */}
              <TouchableOpacity
                onPress={() => console.log("Google Sign-In")}
                className="flex-row items-center justify-center py-3 px-4 rounded-xl border border-gray-300 bg-white"
              >
                <Image
                  source={require("@/assets/images/google-btn.png")}
                  className="w-8 h-8"
                />
                <Text className="ml-3 text-black font-noto text-base">
                  Continue with Google
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </Animated.View>
      </Animated.View>
    </TouchableWithoutFeedback>
  );
}
