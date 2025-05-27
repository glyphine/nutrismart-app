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


export default function RegisterStepOneScreen() {
  const [username, setUsername] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  const [usernameError, setUsernameError] = useState(false);
  const [firstNameError, setFirstNameError] = useState(false);
  const [lastNameError, setLastNameError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
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
  }, );

  const handleNext = () => {
    const isValidUsername = !!username.trim();
    const isValidFirst = !!firstName.trim();
    const isValidLast = !!lastName.trim();

    setUsernameError(!isValidUsername);
    setFirstNameError(!isValidFirst);
    setLastNameError(!isValidLast);

    if (!isValidUsername || !isValidFirst || !isValidLast) {
      setErrorMessage("Please fill in all fields.");
      return;
    }

    setErrorMessage("");

    // Move to step 2, pass data via router params or context
    router.replace("/(authentication)/register2");
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <Animated.View
        style={{ flex: 1, paddingBottom: keyboardOffset }}
        className="bg-[#122938]"
      >
        {/* Top Illustration */}
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

        {/* Registration Form */}
        <Animated.View
          className="flex-1 bg-[#F5F5F5] rounded-t-3xl px-6 pt-8 mt-12"
          style={{ opacity: fadeAnim, transform: [{ translateY: slideAnim }] }}
        >
          <View className="w-full">
            <Text className="text-center text-3xl font-lexend-bold text-primary mt-2 px-2">
              CREATE ACCOUNT
            </Text>
            <Text className="text-center text-sm font-noto text-black mt-2 px-2 mb-4">
              Let’s start by getting to know you.
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
                  usernameError ? "border-red" : "border-primary"
                } bg-blue-50 rounded-lg p-4 text-base text-gray font-noto`}
              />
              
              <Text className="text-base font-lexend-bold text-primary mt-6">
                Full Name
              </Text>
              <View className="flex-row gap-2 mt-2">
                <View className="flex-1">
                  <TextInput
                    placeholder="First"
                    value={firstName}
                    onChangeText={(text) => {
                      setFirstName(text);
                      setFirstNameError(false);
                    }}
                    className={`border ${
                      firstNameError ? "border-red" : "border-primary"
                    } bg-blue-50 rounded-lg p-4 text-base text-gray font-noto`}
                  />
                 
                </View>

                <View className="flex-1">
                  <TextInput
                    placeholder="Last"
                    value={lastName}
                    onChangeText={(text) => {
                      setLastName(text);
                      setLastNameError(false);
                    }}
                    className={`border ${
                      lastNameError ? "border-red" : "border-primary"
                    } bg-blue-50 rounded-lg p-4 text-base text-gray font-noto`}
                  />
                </View>
              </View>

              {errorMessage !== "" && (
                <Text className="text-red text-center mt-8 font-lexend-bold">
                  {errorMessage}
                </Text>
              )}

              <TouchableOpacity
                className="bg-primary mt-8 py-4 rounded-xl items-center"
                onPress={handleNext}
              >
                <Text className="text-white font-lexend-bold text-lg">
                  NEXT
                </Text>
              </TouchableOpacity>

              <Text className="text-center text-sm mt-4 text-gray-700 font-noto">
                Already have an account?{" "}
                <Text
                  className="text-primary font-lexend-bold"
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
