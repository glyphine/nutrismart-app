import { Slot } from "expo-router";
import { View, Text } from "react-native";

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
