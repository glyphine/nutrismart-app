import { COLORS } from "@/constants/themes";
import Ionicons from "@expo/vector-icons/Ionicons";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { router } from "expo-router";
import { useEffect, useRef, useState } from "react";
import {
  FlatList,
  Image,
  Pressable,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

const getRecommendedMeals = () => {
  return [
    {
      id: 1,
      title: "Spicy Chicken Sandwich",
      calories: "340 kcal",
      level: "High",
      image: require("@/assets/images/initial/sample1.png"),
    },
    {
      id: 2,
      title: "Salmon Bowl",
      calories: "438 kcal",
      level: "Low",
      image: require("@/assets/images/initial/sample2.png"),
    },
    {
      id: 3,
      title: "Veggie Delight",
      calories: "104 kcal",
      level: "Medium",
      image: require("@/assets/images/initial/sample3.png"),
    },
    {
      id: 4,
      title: "Creamy Pasta",
      calories: "203 kcal",
      level: "Low",
      image: require("@/assets/images/initial/sample4.png"),
    },
    {
      id: 5,
      title: "Stir-fried Vegetables",
      calories: "193 kcal",
      level: "High",
      image: require("@/assets/images/initial/sample5.png"),
    },
  ];
};

export default function HomePage() {
  const [favorites, setFavorites] = useState<{ [key: number]: boolean }>({});
  const [currentIndex, setCurrentIndex] = useState(0);
  const listRef = useRef<FlatList>(null);

  // Auto-scroll every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => {
        const nextIndex = (prev + 1) % getRecommendedMeals().length;
        listRef.current?.scrollToIndex({ index: nextIndex, animated: true });
        return nextIndex;
      });
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good Morning,";
    if (hour < 18) return "Good Afternoon,";
    return "Good Evening,";
  };

  return (
    <ScrollView className="flex-1 bg-background px-6 pt-8">
      {/* Header Section */}
      <View className="mt-4">
        <Image
          source={require("@/assets/images/gradient-bg.png")}
          className="absolute w-96 h-full"
        />
        <View className="flex-row items-center justify-between mb-8 px-1">
          <View className="flex-1">
            <Text className="text-gray-500 text-base font-noto">
              {getGreeting()}
            </Text>
            <Text className="text-primary text-xl font-lexend-bold">
              Gwyn Lobaton
            </Text>
          </View>
          <TouchableOpacity onPress={() => router.push("/hidden/profile")}>
            <Image
              source={require("@/assets/images/profile.jpg")}
              className="w-16 h-16 rounded-full ml-4"
              resizeMode="cover"
            />
          </TouchableOpacity>
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
          <TouchableOpacity className="ml-2">
            <Ionicons name="search" size={24} color={COLORS.primary} />
          </TouchableOpacity>

          <TouchableOpacity onPress={() => router.push("/add")} className="ml-3">
            <MaterialCommunityIcons
              name="scan-helper"
              size={24}
              color={COLORS.primary}
            />
          </TouchableOpacity>
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
            <TouchableOpacity key={index}>
              <Image
                source={item.src}
                className="w-16 h-24 rounded-xl"
                resizeMode="cover"
              />
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* Recommendation Section */}
      <Text className="font-lexend-bold text-primary text-2xl mt-4">
        AI Suggestion
      </Text>
      <View className="mt-6">
        <FlatList
          ref={listRef}
          horizontal
          showsHorizontalScrollIndicator={false}
          data={getRecommendedMeals()}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => {
            const words = item.title.split(" ");
            const titleLine1 = words.slice(0, 2).join(" ");
            const titleLine2 = words.slice(2).join(" ");

            return (
              <View
                key={item.id}
                className="w-[300px] bg-white rounded-2xl mr-4 flex-row items-center overflow-hidden"
              >
                <View className="flex-1 pl-4 py-4 justify-between">
                  <Pressable
                    onPress={() =>
                      setFavorites((prev) => ({
                        ...prev,
                        [item.id]: !prev[item.id],
                      }))
                    }
                    className="w-12 h-12 rounded-full bg-primary items-center justify-center mb-4"
                  >
                    <Ionicons
                      name={favorites[item.id] ? "heart" : "heart-outline"}
                      size={22}
                      color={favorites[item.id] ? COLORS.red : COLORS.white}
                    />
                  </Pressable>
                  <View className="mb-2">
                    <Text className="text-lg font-lexend-bold text-primary leading-tight">
                      {titleLine1}
                    </Text>
                    {titleLine2 ? (
                      <Text className="text-lg font-lexend-bold text-primary leading-tight">
                        {titleLine2}
                      </Text>
                    ) : null}
                  </View>
                  <View className="flex-col gap-1">
                    <View className="flex-row items-center gap-2">
                      <Ionicons name="flame-outline" size={16} color="#444" />
                      <Text className="text-gray-500 text-sm font-noto">
                        {item.calories}
                      </Text>
                    </View>
                    <View className="flex-row items-center gap-2">
                      <Ionicons name="cube-outline" size={16} color="#444" />
                      <Text className="text-gray-500 text-sm font-noto">
                        {item.level}
                      </Text>
                    </View>
                  </View>
                </View>
                <Image
                  source={item.image}
                  resizeMode="cover"
                  className="w-[130px] h-full rounded-tr-2xl rounded-br-2xl"
                />
              </View>
            );
          }}
        />
      </View>
    </ScrollView>
  );
}
