import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { router } from "expo-router";
import React from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";

export default function OpenningTwo() {
  return (
    <View className="flex-1 bg-[#122938] items-center justify-start gap-12">
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
         <TouchableOpacity onPress={() => router.push("/(client)")}>
          <Text className="font-lexend-extrabold text-red mb-2">
            TEMPORARY BUTTON
          </Text>
        </TouchableOpacity>
          <Text className="text-5xl font-lexend-extrabold text-white ">
            Nutri<Text className="text-yellow">Smart</Text>
          </Text>
          <Text className="text-white text-sm font-notosans-regular mt-2 text-center px-12">
            Your companion in making smarter, healthier choices.
          </Text>
        </View>

        <View className=" justify-center items-center w-full h-[52%] inset-shadow bg-backgroundtwo rounded-tl-[200px] rounded-br-[200px] px-14 py-10 ">
          {/* Two buttons side-by-side */}
          <View className="flex-row mb-32">
            <TouchableOpacity
              onPress={() => router.push("/login")}
              className="bg-white w-36 h-36 justify-center items-center shadow rounded-t-3xl rounded-bl-3xl"
            >
              <MaterialIcons name="login" size={40} color="#102338" />
              <Text className="text-black text-center mt-2 font-NotoSans-Bold">
                Login
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => router.push("/register")}
              className="bg-yellow p-6 w-36 h-36 justify-center items-center shadow rounded-b-3xl rounded-tr-3xl mt-6"
            >
              <MaterialIcons
                name="person-add-alt-1"
                size={40}
                color="#102338"
              />
              <Text className="text-black text-center mt-3 font-NotoSans-Bold">
                Create{"\n"}Account
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
}
