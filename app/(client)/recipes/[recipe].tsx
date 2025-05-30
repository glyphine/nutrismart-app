import { COLORS } from "@/constants/themes";
import { Ionicons } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useState } from "react";
import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { breakfastArea, dinnerArea, lunchArea, snackArea } from "./data";

export default function RecipeDetailsPage() {
  const [isFavorite, setIsFavorite] = useState(false);
  const { recipe } = useLocalSearchParams();
  const router = useRouter();

  const allRecipes = [
    ...breakfastArea,
    ...lunchArea,
    ...dinnerArea,
    ...snackArea,
  ];

  // Lookup recipe by ID
  const recipeData = allRecipes.find((item) => item.id === recipe);

  if (!recipeData) {
    return (
      <View className="flex-1 justify-center items-center">
        <Text className="text-lg text-gray-600">Recipe not found.</Text>
      </View>
    );
  }

  return (
    <ScrollView className="flex-1 bg-background px-8 pt-6">
      {/* Back Button */}
      <View className="flex-row bg-background mt-8">
        <TouchableOpacity className="p-2" onPress={() => router.back()}>
          <Ionicons name="chevron-back" size={24} color={COLORS.primary} />
        </TouchableOpacity>
        <View className="flex-1 items-center -ml-10">
          <Text className="text-3xl font-lexend-bold text-center text-primary mb-8">
            Recipe
          </Text>
        </View>
      </View>

      {/* Image */}
      <Image
        source={recipeData.image}
        className="w-full h-48 rounded-2xl mb-4"
        resizeMode="cover"
      />

      {/* Title and Heart */}
      <View className="flex-row justify-between items-center mb-2">
        <Text className="text-2xl font-lexend-bold text-primary flex-1">
          {recipeData.title}
        </Text>
        <TouchableOpacity onPress={() => setIsFavorite((prev) => !prev)}>
          <Ionicons
            name={isFavorite ? "heart" : "heart-outline"}
            size={28}
            color={isFavorite ? COLORS.red : COLORS.gray}
          />
        </TouchableOpacity>
      </View>

      {/* Description.. this logic cuts the sentence after 7 letters */}
      <Text className="text-gray-700 font-noto text-sm mb-4">
        {(() => {
          const words = recipeData.description.split(" ");
          const firstLine = words.slice(0, 7).join(" ");
          const secondLine = words.slice(7).join(" ");
          return (
            <>
              {firstLine}
              {"\n"}
              {secondLine}
            </>
          );
        })()}
      </Text>

      {/* Nutrition Facts */}
      <View className="flex-row justify-between mb-8">
        {/* Calories */}
        <View className="flex-1 items-center bg-white rounded-xl px-3 py-4 shadow mr-2">
          <Ionicons
            name="flame"
            size={28}
            color={COLORS.primary}
            className="mb-2"
          />
          <Text className="text-base font-noto text-primary">
            {recipeData.calories} kcal
          </Text>
          <Text className="text-xs font-lexend-bold text-gray-700">
            Calories
          </Text>
        </View>

        {/* Glycemic Index */}
        <View className="flex-1 items-center bg-white rounded-xl px-3 py-4 shadow mr-2">
          <Ionicons
            name="pulse"
            size={28}
            color={COLORS.primary}
            className="mb-2"
          />
          <Text className="text-base font-noto text-primary">
            {recipeData.glycemic}
          </Text>
          <Text className="text-xs font-lexend-bold text-gray-700">
            Glycemic
          </Text>
        </View>

        {/* Sodium */}
        <View className="flex-1 items-center bg-white rounded-xl px-3 py-4 shadow">
          <Ionicons
            name="water"
            size={28}
            color={COLORS.primary}
            className="mb-2"
          />
          <Text className="text-base font-noto text-primary">
            {recipeData.sodium} mg
          </Text>
          <Text className="text-xs font-lexend-bold text-gray-700">Sodium</Text>
        </View>
      </View>

      {/* Ingredients */}
      <Text className="text-xl font-lexend-bold text-red-600 mb-4">
        Ingredients
      </Text>
      <View className="space-y-1 mb-8">
        {recipeData.ingredients.map((item, index) => (
          <View key={index} className="flex-row items-start mb-2">
            <Text className="mr-2 text-primary text-2xl">•</Text>
            <Text className="font-noto text-gray-800 flex-1">{item}</Text>
          </View>
        ))}
      </View>

      {/* Instructions */}
      <Text className="text-xl font-lexend-bold text-red-600 mb-4">
        Instructions
      </Text>
      <View className="space-y-2 mb-16">
        {recipeData.instructions.map((step, index) => (
          <View key={index} className="flex-row items-start">
            <Text className="font-lexend-bold text-primary text-base mr-2 mb-4">
              {index + 1}.
            </Text>
            <Text className="font-noto text-gray-800 flex-1">{step}</Text>
          </View>
        ))}
      </View>
    </ScrollView>
  );
}
