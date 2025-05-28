import { COLORS } from "@/constants/themes";
import Ionicons from "@expo/vector-icons/Ionicons";
import { router } from "expo-router";
import { useState } from "react";
import { Pressable, ScrollView, Text, TextInput, View } from "react-native";
import { snackArea } from "./data";

export default function SnackPage() {
  const [searchQuery, setSearchQuery] = useState("");

  const getCaloriesColor = (calories: number) => {
    if (calories <= 400 && calories > 201) {
      return "bg-amber-100 text-amber-700 border-amber-700";
    }
    if (calories <= 200 && calories > 0) {
      return "bg-green-100 text-green-700 border-green-700";
    }
    return "bg-rose-100 text-rose-700 border-rose-700";
  };

  const getSodiumColor = (sodium: number) => {
    if (sodium > 400) {
      return "bg-rose-100 text-rose-700 border-rose-700";
    }
    if (sodium > 140 && sodium <= 400) {
      return "bg-amber-100 text-amber-700 border-amber-700";
    }
    return "bg-green-100 text-green-700 border-green-700";
  };

  const getGlycemicColor = (glycemic: string) => {
    const value = glycemic.toLowerCase();

    switch (value) {
      case "low":
        return "bg-green-100 text-green-700 border-green-700";
      case "medium":
      case "mid":
        return "bg-amber-100 text-amber-700 border-amber-700";
      case "high":
      default:
        return "bg-rose-100 text-rose-700 border-rose-700";
    }
  };

  // Initialize all items as not favorited
  const [favoriteItems, setFavoriteItems] = useState<Record<string, boolean>>(
    snackArea.reduce((acc, item) => {
      acc[item.id] = false;
      return acc;
    }, {} as Record<string, boolean>)
  );

  const toggleFavorite = (id: string) => {
    setFavoriteItems((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  // Optional: filter based on search
  const filteredItems = snackArea.filter((item) =>
    item.title.toLowerCase().includes(searchQuery.toLowerCase())
  );
  return (
    <ScrollView className="flex-1 bg-background px-6 pt-6">
      <View className="flex-row bg-background  mt-8">
        <Pressable className="p-2" onPress={() => router.push("/generate")}>
          <Ionicons name="chevron-back" size={24} color={COLORS.primary} />
        </Pressable>
        <View className="flex-1 items-center -ml-10">
          <Text className="text-3xl font-lexend-bold text-center text-primary mb-8">
            Snack
          </Text>
        </View>
      </View>

      {/* Search Input */}
      <View className="flex-row items-center mb-4 space-x-2">
        <View className="flex-row flex-1 items-center bg-white px-2 rounded-2xl">
          <TextInput
            placeholder="Search"
            placeholderTextColor="#666"
            className="flex-1 text-base text-gray-800 font-noto p-3 "
            value={searchQuery}
            onChangeText={(text) => setSearchQuery(text)}
          />
          <Ionicons name="search" size={20} color="#000" />
        </View>
      </View>

      {/* List */}
      <View className="space-y-4 mb-12">
        {filteredItems.map((item) => (
          <View
            key={item.id}
            className="bg-white p-4 rounded-2xl shadow-sm my-2"
          >
            <View className="flex-row items-start justify-between mb-4">
              <Text
                numberOfLines={2}
                className="flex-1 text-xl font-lexend-bold text-primary pr-4 leading-tight"
              >
                {item.title}
              </Text>
              <Pressable
                onPress={() => toggleFavorite(item.id)}
                className="pl-2"
              >
                <Ionicons
                  name={favoriteItems[item.id] ? "heart" : "heart-outline"}
                  size={24}
                  color={favoriteItems[item.id] ? "red" : "gray"}
                />
              </Pressable>
            </View>

            <Text className="font-noto text-base text-gray-700 mb-4">
              {item.description}
            </Text>

            <View className="flex-row justify-between gap-1 flex-wrap">
              <Text
                // className={clsx('font-noto text-xs border p-2 rounded-xl border-primary', getCaloriesColor(item.calories))}
                className={`font-noto text-xs border p-2 rounded-xl ${getCaloriesColor(
                  item.calories
                )}`}
              >
                Calories: {item.calories}
              </Text>
              <Text
                className={`font-noto text-xs border p-2 rounded-xl ${getGlycemicColor(
                  item.glycemic
                )}`}
              >
                Glycemic: {item.glycemic}
              </Text>
              <Text
                className={`font-noto text-xs border p-2 rounded-xl ${getSodiumColor(
                  item.sodium
                )}`}
              >
                Sodium: {item.sodium} mg
              </Text>
            </View>
          </View>
        ))}
      </View>
    </ScrollView>
  );
}
