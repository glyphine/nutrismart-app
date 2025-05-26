import { Slot } from "expo-router";
import { Text, View } from "react-native";
import "../global.css";

export default function Layout() {
  return (
    <View className="flex-1 bg-white">
      <View className="p-4 bg-blue-500">
        <Text className="text-white font-bold text-lg">My Simple App</Text>
      </View>
      <Slot />
    </View>
  );
}
