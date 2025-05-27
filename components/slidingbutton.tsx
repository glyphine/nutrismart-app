import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { useFocusEffect } from "@react-navigation/native";
import { router } from "expo-router";
import { useRef } from "react";
import { Animated, PanResponder, Text, View } from "react-native";

export default function SlideButton() {
  const slideX = useRef(new Animated.Value(0)).current;
  const threshold = 230;

  // Reset slider when screen regains focus
  useFocusEffect(() => {
    slideX.setValue(0);
  });

  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: (_, gesture) => gesture.dx > 5,
      onPanResponderMove: (_, gesture) => {
        const newX = Math.min(Math.max(0, gesture.dx), threshold);
        slideX.setValue(newX);
      },
      onPanResponderRelease: (_, gesture) => {
        if (gesture.dx > threshold * 0.8) {
          Animated.timing(slideX, {
            toValue: threshold,
            duration: 150,
            useNativeDriver: false,
          }).start(() => router.push("/openingtwo"));
        } else {
          Animated.spring(slideX, {
            toValue: 0,
            useNativeDriver: false,
          }).start();
        }
      },
    })
  ).current;

  return (
    <View className="w-full mb-12 px-12">
      <View className="w-full h-16 bg-white rounded-full justify-center overflow-hidden">
        {/* Pink trail */}
        <Animated.View
          style={{
            position: "absolute",
            top: 0,
            bottom: 0,
            left: 0,
            backgroundColor: "#F4E99A",
            borderRadius: 999,
            width: slideX,
          }}
        />

        {/* Centered label */}
        <Text className="absolute self-center text-primary font-lexend-extrabold text-lg">
          GET STARTED
        </Text>

        {/* Sliding button */}
        <Animated.View
          {...panResponder.panHandlers}
          style={[
            {
              transform: [{ translateX: slideX }],
            },
            {
              position: "absolute",
              left: 2,
              top: 2,
              width: 52,
              height: 52,
              borderRadius: 24,
              backgroundColor: "#102338",
              justifyContent: "center",
              alignItems: "center",
            },
          ]}
        >
          <MaterialIcons name="navigate-next" size={32} color="white" />
        </Animated.View>
      </View>
    </View>
  );
}
