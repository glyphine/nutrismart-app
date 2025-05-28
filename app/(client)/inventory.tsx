import { COLORS } from "@/constants/themes";
import Ionicons from "@expo/vector-icons/Ionicons";
import SimpleLineIcons from "@expo/vector-icons/SimpleLineIcons";
import { useRouter } from "expo-router";
import { useState } from "react";
import {
  Image,
  Pressable,
  ScrollView,
  Text,
  TextInput,
  View,
} from "react-native";
import { inventoryData } from "./ingredient/sampledata";

const categories = ["All", "Vegetable", "Fruit", "Grain", "Protein", "Dairy"];

export default function InventoryPage() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const router = useRouter();

  // Combined Filter: Category + Search
  const filteredInventory = inventoryData.filter((item) => {
    const matchesCategory =
      selectedCategory === "All" || item.category === selectedCategory;
    const matchesSearch = item.name
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <ScrollView className="flex-1 bg-background px-6 pt-6">
      {/* Title */}
      <Text className="text-3xl font-lexend-bold text-center text-primary mt-8 mb-8">
        Ingredients
      </Text>

      {/* Search + Add */}
      <View className="flex-row items-center mb-4 space-x-2">
        <View className="flex-row flex-1 items-center bg-white px-2 rounded-2xl">
          <TextInput
            placeholder="Search"
            placeholderTextColor="#666"
            className="flex-1 text-base text-gray-800 font-noto p-3"
            value={searchQuery}
            onChangeText={(text) => setSearchQuery(text)}
          />
          <Ionicons name="search" size={20} color="#000" />
        </View>
        <Pressable
          className="bg-primary p-3 ml-4 rounded-xl"
          onPress={() => router.push(`/ingredient/add`)}
        >
          <Ionicons name="add" size={20} color="#fff" />
        </Pressable>
      </View>

      {/* Category */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        className="mb-6"
        contentContainerStyle={{ gap: 1, paddingHorizontal: 2 }}
      >
        {categories.map((cat, i) => {
          const isActive = selectedCategory === cat;
          return (
            <Pressable
              key={i}
              onPress={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-full border ${
                isActive
                  ? "bg-yellow border-primary"
                  : "bg-white border-gray text-gray"
              }`}
              style={{ marginRight: i === categories.length - 1 ? 0 : 8 }}
            >
              <Text
                className={`font-lexend-bold text-xs ${
                  isActive ? "text-primary" : "text-gray"
                }`}
              >
                {cat.toUpperCase()}
              </Text>
            </Pressable>
          );
        })}
      </ScrollView>

      {/* Inventory List */}
      <View className="space-y-4 pb-12 ">
        {filteredInventory.map((item) => (
          <Pressable
            key={item.id}
            onPress={() =>
              router.push(
                `/(client)/ingredient/${item.id}` as `/(client)/ingredient/${string}`
              )
            }
            className="flex-row items-center bg-white rounded-3xl overflow-hidden mb-4"
          >
            {/* Left image */}
            <Image
              source={item.image}
              className="w-24 h-24"
              resizeMode="cover"
            />

            {/* Middle content */}
            <View className="flex-1 px-4">
              <Text className="font-lexend-bold text-xl text-primary mb-1">
                {item.name}
              </Text>
              <Text className="text-gray font-noto text-sm">
                {item.category}
              </Text>
            </View>

            {/* Right stock */}
            <View className="items-center justify-center gap-1 pr-4">
              <Text className="text-sm font-noto text-primary">
                In stock: {item.stock}
              </Text>
            </View>
          </Pressable>
        ))}

        {filteredInventory.length === 0 && (
          <View className="items-center justify-center mt-36 space-y-4 px-6">
            <SimpleLineIcons
              name="social-dropbox"
              size={96}
              color={COLORS.gray}
            />
            <Text className="text-xl text-gray font-lexend-bold text-center mt-4">
              Your inventory is empty!
            </Text>
            <Text className="text-xs text-gray text-center font-noto leading-relaxed mt-1">
              Add what you have, and we’ll whip up personalized recipes you’ll
              love.
            </Text>
          </View>
        )}
      </View>
    </ScrollView>
  );
}
