import { COLORS } from "@/constants/themes";
import Ionicons from "@expo/vector-icons/Ionicons";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { router } from "expo-router";
import { useState } from "react";
import {
  Image,
  Pressable,
  ScrollView,
  Text,
  TextInput,
  View,
} from "react-native";

const getRecommendedMeals = () => {
  const image = require("@/assets/images/measf.jpg");
  return [
    {
      id: 1,
      title: "Spicy Chicken Sandwich",
      desc: "Baked chicken with broccoli, carrots, and low-fat cheese.",
      image,
    },
    {
      id: 2,
      title: "Spicy Pork Sandwich",
      desc: "Baked pork with bell peppers, carrots, and mozzarella.",
      image,
    },
    {
      id: 3,
      title: "Salmon Bowl",
      desc: "Grilled salmon with brown rice and mixed greens.",
      image,
    },
    {
      id: 4,
      title: "Veggie Delight",
      desc: "Mixed vegetables stir-fried with tofu and soy glaze.",
      image,
    },
    {
      id: 5,
      title: "Creamy Pasta",
      desc: "Whole grain pasta with creamy tomato and spinach sauce.",
      image,
    },
  ];
};

export default function HomePage() {
  const [favorites, setFavorites] = useState<{ [key: number]: boolean }>({});

  return (
    <ScrollView className="flex-1 bg-background px-6 pt-8">
      {/* Header Section */}
      <View className="mt-4">
        <Image
          source={require("@/assets/images/gradient-bg.png")}
          resizeMode="cover"
          className="absolute w-full h-full"
        />
        <View className="flex-row items-center justify-between mb-8 px-1">
          <View className="flex-1">
            <Text className="text-gray-500 text-base font-noto">
              Good Morning,
            </Text>
            <Text className="text-primary text-xl font-lexend-bold">
              Gwyn Lobaton
            </Text>
          </View>
          <Pressable onPress={() => router.push("/add")}>
            <Image
              source={require("@/assets/images/profile.jpg")}
              className="w-16 h-16 rounded-full ml-4"
              resizeMode="cover"
            />
          </Pressable>
        </View>

        {/* Featured Section */}
        <View className="relative overflow-hidden mb-4 px-2">
          <Text className="text-primary text-3xl font-lexend-bold mb-2">
            NutriSmart: {"\n"}Delicious, {"\n"}Nourishing Recipes
          </Text>
        </View>

        {/* Search */}
        <View className="flex-row items-center bg-white px-4 py-2 rounded-3xl">
          <TextInput
            placeholder="Search healthy meals..."
            placeholderTextColor="#666"
            className="flex-1 text-base text-gray-800 font-noto p-2"
          />
          <Pressable className="ml-2">
            <Ionicons name="search" size={24} color={COLORS.primary} />
          </Pressable>
          <Pressable className="ml-3">
            <MaterialCommunityIcons
              name="scan-helper"
              size={24}
              color={COLORS.primary}
            />
          </Pressable>
        </View>

        {/* Categories */}
         <Text className="font-lexend-bold text-primary text-2xl mt-4 mb-2">
        Categories
      </Text>
        <View className="flex-row justify-between px-2 py-2">
          
          {[
            { src: require("@/assets/images/buttons/vegetable-button.png") },
            { src: require("@/assets/images/buttons/fruit-button.png") },
            { src: require("@/assets/images/buttons/grains-button.png") },
            { src: require("@/assets/images/buttons/protein-button.png") },
            { src: require("@/assets/images/buttons/dairy-button.png") },
          ].map((item, index) => (
            <Pressable key={index}>
              <Image
                source={item.src}
                className="w-16 h-24 rounded-xl"
                resizeMode="cover"
              />
            </Pressable>
          ))}
        </View>
      </View>

      {/* Recommendation Section */}
      <Text className="font-lexend-bold text-primary text-2xl mt-4">
        AI Suggestion
      </Text>
      <View className="mt-2">
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {getRecommendedMeals().map((item) => (
            <View key={item.id} className="bg-white rounded-2xl mr-4 p-4 w-64">
              <Image
                source={item.image}
                resizeMode="cover"
                className="w-full h-32 rounded-xl mb-4"
              />
              <View className="flex-1 justify-between">
                <View className="mb-4">
                  <Text
                    className="text-lg font-lexend-bold text-primary mb-4"
                    numberOfLines={1}
                    ellipsizeMode="tail"
                  >
                    {item.title}
                  </Text>
                  <Text className="text-gray-500 text-sm font-noto">
                    {item.desc}
                  </Text>
                </View>
                <View className="flex-row justify-between items-center">
                  <Pressable className="bg-primary px-6 py-3 rounded-2xl">
                    <Text className="text-white font-lexend-bold text-sm">
                      COOK NOW
                    </Text>
                  </Pressable>
                  <Pressable
                    onPress={() =>
                      setFavorites((prev) => ({
                        ...prev,
                        [item.id]: !prev[item.id],
                      }))
                    }
                    className="p-2 bg-gray-100 rounded-full"
                  >
                    <Ionicons
                      name={favorites[item.id] ? "heart" : "heart-outline"}
                      size={26}
                      color={favorites[item.id] ? COLORS.red : COLORS.primary}
                    />
                  </Pressable>
                </View>
              </View>
            </View>
          ))}
        </ScrollView>
      </View>
    </ScrollView>
  );
}
