import {
  Image,
  Text,
  TouchableOpacity,
  View,
} from "react-native";




export default function OpenningTwo() {
  return (
   <View className="flex-1 bg-primary items-center justify-start gap-12">
        {/* Top View */}
        <View className="flex-1 w-full h-1/2 items-center justify-center">
          <Image
            source={require("@/assets/images/bg-login.png")}
            width={1080}
            height={1080}
            className="w-full h-[360px]"
          />
        </View>

        {/* Bottom View */}
        <View className="flex-1 w-full h-1/2 items-center justify-center">
          <View className="flex-1 w-full h-1/2 items-center justify-start">
            <Text className="text-white text-5xl pt-4 mb-2 px-14 font-lexend-extrabold">
              NutriSmart
            </Text>
            <Text className="text-white text-center mb-6 text-sm font-noto px-14">
              NutriSmart helps diabetics eat healthier by analyzing ingredients
              and suggesting smart meals.
            </Text>
          </View>

          {/* Buttons */}
          <View className="flex-1 w-full h-1/2 items-center justify-start px-14">
            <TouchableOpacity
              className="w-full bg-yellow py-4 rounded-2xl mb-4"
             
            >
              <Text className="text-xl text-center text-primary font-lexend-bold">
                Get Started
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              className="w-full py-4 rounded-2xl"
             
            >
              <Text className="text-xl text-center text-white font-lexend-bold underline">
                LOGIN
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        </View>
  );
}
