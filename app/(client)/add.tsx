import { Ionicons } from "@expo/vector-icons";
import { CameraType, CameraView, useCameraPermissions } from "expo-camera";
import { router } from "expo-router";
import { useState } from "react";
import {
  Dimensions,
  Pressable,
  Text,
  TouchableOpacity,
  View
} from "react-native";

export default function ScanIngredients() {
  const [facing, setFacing] = useState<CameraType>("back");
  const [permission, requestPermission] = useCameraPermissions();

  const { width } = Dimensions.get("window");

  if (!permission) return <View />;
  if (!permission.granted) {
    return (
      <View className="flex-1 justify-center items-center bg-background px-6">
        <Text className="text-white mb-4 text-center">
          We need your permission to access the camera.
        </Text>
        <Text
          onPress={requestPermission}
          className="text-pink-500 font-bold underline"
        >
          Grant permission
        </Text>
      </View>
    );
  }

  return (
    <View className="flex-1 bg-black justify-between">
      {/* Header icons */}
      <View className="absolute z-10 top-12 left-6 right-6 flex-row justify-between">
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="close" size={28} color="white" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setFacing(facing === "back" ? "front" : "back")}>
          <Ionicons name="sync-outline" size={28} color="white" />
        </TouchableOpacity>
      </View>

      {/* Camera with overlay */}
      <View className="flex-1 justify-center items-center">
        <CameraView style={{ width, height: width * 1.8 }} facing={facing} />

        {/* Frame overlay */}
        <View
          pointerEvents="none"
          className="absolute border-2 border-white w-[80%] aspect-square rounded-xl"
        />

        {/* Scan hint text */}
        <Text className="absolute bottom-8 text-white font-noto text-sm text-center">
          Scan completely for best results.
        </Text>
      </View>

      {/* Recognition Result Card */}
      <View className="bg-white rounded-t-3xl p-6">
        <Text className="text-2xl font-lexend-bold text-primary mb-1">
          Carrot
        </Text>
        <Text className="text-gray font-noto text-base mb-4">Vegetable</Text>
        <Text className="absolute top-6 right-6 text-green-600 text-xl font-lexend-bold">
          98%
        </Text>

        <Pressable
          onPress={() => router.push("/(client)/hidden/[scan]")}
          className="mt-2 bg-primary py-4 rounded-xl items-center"
        >
          <Text className="text-white font-lexend-bold text-base">
            Continue →
          </Text>
        </Pressable>
      </View>
    </View>
  );
}
