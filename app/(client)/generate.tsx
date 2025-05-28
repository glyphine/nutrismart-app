import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { router } from "expo-router";
import React, { useState } from "react";
import {
  Image,
  Pressable,
  ScrollView,
  Text,
  TextInput,
  View,
} from "react-native";

export default function RecipePage() {
  const [recipeName, setRecipeName] = useState("");

  const handleGenerateRecipe = () => {
    // Add logic to generate the recipe here
    console.log("Generating recipe for: ", recipeName);
  };

  return (
    <ScrollView className="flex-1 bg-background px-6 pt-8">
      {/* Title */}

      <View className="bg-white p-6 rounded-3xl shadow-lg">
        {/* Title */}
        <Text className="text-2xl font-lexend-bold text-center text-primary mb-4">
          Are you craving for something?
        </Text>

        {/* Subtitle */}
        <Text className="text-base font-lexend-bold text-slate-700 text-center mb-6">
          I will make a healthy version of that dish.
        </Text>

        {/* Recipe Input Field */}
        <TextInput
          placeholder="Enter Recipe Name"
          value={recipeName}
          onChangeText={setRecipeName}
          className="bg-gray-100 text-lg text-gray-800 p-4 rounded-xl border border-gray-300 mb-8"
        />

        {/* Generate Recipe Button */}
        <Pressable
          onPress={handleGenerateRecipe}
          className="bg-primary py-4 rounded-xl items-center"
        >
          <Text className="text-white font-lexend-bold text-lg">
            Generate Recipe
          </Text>
        </Pressable>
      </View>

      <Text className="font-lexend-bold text-primary text-3xl py-6">
        Categories
      </Text>

      <View className="flex-col justify-between pb-6 py-2">
        {/* Breakfast */}
        <Pressable className="pb-4" onPress={() => router.push("/recipes/breakfast")}>
          <Image
            source={require("@/assets/images/generate/breakfast.png")}
            className="w-full h-56 rounded-t-xl"
            resizeMode="cover"
          />

          <View className="bg-primary flex-row items-center justify-center p-2 rounded-b-xl">
            <Text className="font-lexend-bold text-white text-xl mr-2">
              BREAKFAST
            </Text>
            <MaterialIcons name="navigate-next" size={24} color="white" />
          </View>
        </Pressable>

        {/* Lunch */}
        <Pressable
          className="pb-4" onPress={() => router.push("/recipes/lunch")}
        >
          <Image
            source={require("@/assets/images/generate/lunch.png")}
            className="w-full h-56 rounded-t-xl"
            resizeMode="cover"
          />

          <View className="bg-primary flex-row items-center justify-center p-2 rounded-b-xl">
            <Text className="font-lexend-bold text-white text-xl mr-2">
              LUNCH
            </Text>
            <MaterialIcons name="navigate-next" size={24} color="white" />
          </View>
        </Pressable>

        {/* Dinner */}
        <Pressable
          className="pb-4" onPress={() => router.push("/recipes/dinner")}
        >
          <Image
            source={require("@/assets/images/generate/dinner.png")}
            className="w-full h-56 rounded-t-xl"
            resizeMode="cover"
          />
          <View className="bg-primary flex-row items-center justify-center p-2 rounded-b-xl">
            <Text className="font-lexend-bold text-white text-xl mr-2">
              DINNER
            </Text>
            <MaterialIcons name="navigate-next" size={24} color="white" />
          </View>
        </Pressable>

        {/* Snack */}
        <Pressable
          className="pb-12" onPress={() => router.push("/recipes/snack")}
        >
          <Image
            source={require("@/assets/images/generate/snacks.png")}
            className="w-full h-56 rounded-t-xl"
            resizeMode="cover"
          />
          <View className="bg-primary flex-row items-center justify-center p-2 rounded-b-xl">
            <Text className="font-lexend-bold text-white text-xl mr-2">
              SNACK
            </Text>
            <MaterialIcons name="navigate-next" size={24} color="white" />
          </View>
        </Pressable>
      </View>
    </ScrollView>
  );
}
