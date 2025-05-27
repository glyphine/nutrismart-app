import SlideButton from "@/components/slidingbutton";
import { Image, Text, View } from "react-native";

export default function OpeningPage() {
  return (
    <View className="flex-1 bg-[#122938] items-center justify-start">
      <View className="flex-1 w-full h-1/2 items-start justify-start">
        <Image
          source={require("@/assets/images/opening.png")}
          width={1080}
          height={1080}
          className="w-full h-[550px]"
        />
      </View>
    <Text className="text-5xl font-lexend-extrabold text-white mb-12 ">Nutri<Text className="text-yellow">Smart</Text></Text>

   
        <SlideButton />
    </View>
  );
}
