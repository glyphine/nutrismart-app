import { Ionicons } from "@expo/vector-icons";
import { CameraType, CameraView, useCameraPermissions } from "expo-camera";
import { router } from "expo-router";
import { useRef, useState } from "react";
import { Dimensions, Text, TouchableOpacity, View } from "react-native";
import { setTempScanData } from "./ingredient/tempScanStore";

export default function ScanIngredients() {
  const [facing, setFacing] = useState<CameraType>("back");
  const [permission, requestPermission] = useCameraPermissions();
  const cameraRef = useRef<CameraView>(null);

  const { width } = Dimensions.get("window");

  if (!permission) return <View />;
  if (!permission.granted) {
    return (
      <View className="flex-1 justify-center items-center bg-background px-8">
        <Text className="text-primary font-lexend-bold mb-4 text-center">
          We need your permission {"\n"} to access the camera.
        </Text>
        <Text
          onPress={requestPermission}
          className="text-red font-bold underline"
        >
          Grant permission
        </Text>
      </View>
    );
  }

  const handleCapture = async () => {
    if (cameraRef.current) {
      const photo = await cameraRef.current.takePictureAsync({ quality: 0.5 });
      setTempScanData({
        name: "Pasta",
        category: "Grain",
        imageUri: photo.uri,
      });
      router.push("/ingredient/scan");
    }
  };

  return (
    <View className="flex-1 bg-black justify-between">
      {/* Header icons */}
      <View className="absolute z-10 top-12 left-6 right-6 flex-row justify-between">
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="close" size={28} color="white" />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => setFacing(facing === "back" ? "front" : "back")}
        >
          <Ionicons name="sync-outline" size={28} color="white" />
        </TouchableOpacity>
      </View>

      {/* Camera */}
      <View className="flex-1 justify-center items-center">
        <CameraView
          ref={cameraRef}
          style={{ width, height: width * 1.8 }}
          facing={facing}
        />

        {/* Frame overlay */}
        <View
          pointerEvents="none"
          className="absolute border-2 border-white w-[80%] aspect-square rounded-xl"
        />

        {/* Hint text */}
        <Text className="absolute bottom-8 text-white font-noto text-sm text-center">
          Scan completely for best results.
        </Text>
      </View>

      {/* Result Card */}
      <View className="bg-white rounded-t-3xl p-6">
        <Text className="text-2xl font-lexend-bold text-primary">
          Bread
        </Text>
        <Text className="text-gray font-noto text-base mb-4">Grain</Text>
        <Text className="absolute top-6 right-6 text-green-600 text-xl font-lexend-bold">
          98%
        </Text>

        <TouchableOpacity
          onPress={handleCapture}
          className="mt-2 bg-primary py-4 rounded-xl items-center mb-8"
        >
          <Text className="text-white font-lexend-bold text-base">
            Continue →
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
