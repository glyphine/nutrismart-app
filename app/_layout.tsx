import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import "./global.css";

export default function RootLayout() {
  useFonts({
    "Lexend-Bold": require("./../assets/fonts/Lexend-Bold.ttf"),
    "Lexend-ExtraBold": require("./../assets/fonts/Lexend-ExtraBold.ttf"),
    "NotoSans-Bold": require("./../assets/fonts/NotoSans-Bold.ttf"),
    "NotoSans-Regular": require("./../assets/fonts/NotoSans-Regular.ttf"),
  });

  return (
    <Stack initialRouteName="(authentication)">
      <Stack.Screen name="(client)" options={{ headerShown: false }} />
      <Stack.Screen
        name="(authentication)"
        options={{ headerShown: false, animation: "none" }}
      />
    </Stack>
  );
}
