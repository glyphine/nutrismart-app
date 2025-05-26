import { router } from "expo-router";
import { Pressable, Text, View } from "react-native";

export default function App() {
  return (
    <View className="flex-1 items-center justify-center bg-white">
      <Text className="text-2xl font-lexend-bold text-primary">Oten</Text>
      <Text className="text-xl font-noto text-blue-600">Oten</Text>
      <Text className="text-xl font-bold text-blue-600">Oten</Text>
      <Text className="text-xl font-bold text-blue-600">Oten</Text>
      <Pressable onPress={() => router.push("./(client)")}>
        <Text className="text-xl font-bold text-blue-600">CLICK HERE</Text>

      </Pressable>
    </View>
  );
}
