import { COLORS } from "@/constants/themes";
import Ionicons from "@expo/vector-icons/Ionicons";
import SimpleLineIcons from "@expo/vector-icons/SimpleLineIcons";
import React, { useState } from "react";
import {
  Dimensions,
  FlatList,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

// Initial Favorites Data
const initialFavorites = [
  {
    id: "1",
    title: "Chicken & Broccoli Cheese Bake",
    description: "Baked chicken with broccoli, carrots, and low-fat cheese.",
  },
  {
    id: "2",
    title: "Cheesy Chicken Veggie Soup",
    description: "Light soup with chicken, carrots, broccoli, and cheese.",
  },
  {
    id: "3",
    title: "Grilled Chicken Salad",
    description: "Grilled chicken, roasted veggies, and cheese on greens.",
  },
  {
    id: "4",
    title: "Low-Carb Chicken Stir-Fry",
    description:
      "Stir-fried chicken, broccoli, and carrots topped with cheese.",
  },
  {
    id: "5",
    title: "Stuffed Bell Peppers",
    description: "Bell peppers filled with chicken, veggies, and cheese.",
  },
];

export default function FavoritesPage() {
  const [favoritesList, setFavoritesList] = useState(initialFavorites);
  const [isGridView, setIsGridView] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const screenWidth = Dimensions.get("window").width;
  const spacing = 16;
  const cardWidth = isGridView
    ? (screenWidth - spacing * 3) / 2
    : screenWidth - spacing * 2;

  const filteredFavorites = favoritesList.filter((item) =>
    item.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const removeFavorite = (id: string) => {
    setFavoritesList((prev) => prev.filter((item) => item.id !== id));
  };

  return (
    <View className="flex-1 bg-background pt-6">
      {/* Header Title */}
      <Text className="text-3xl font-lexend-bold text-center text-primary mb-8 mt-8">
        Favorites
      </Text>

      {/* Search + Grid Toggle */}
      <View className="flex-row items-center mb-4 px-6">
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
        <TouchableOpacity
          className="bg-primary p-3 ml-2 rounded-xl"
          onPress={() => setIsGridView(!isGridView)}
        >
          <Ionicons
            name={isGridView ? "list-outline" : "grid-outline"}
            size={20}
            color={COLORS.white}
          />
        </TouchableOpacity>
      </View>

      {/* Favorites List */}
      {filteredFavorites.length > 0 ? (
        <FlatList
          data={filteredFavorites}
          key={isGridView ? "g" : "l"}
          numColumns={isGridView ? 2 : 1}
          columnWrapperStyle={
            isGridView
              ? { justifyContent: "space-between", marginBottom: 4 }
              : undefined
          }
          contentContainerStyle={{
            paddingBottom: 100,
            justifyContent: "center",
            alignItems: "center",
          }}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <TouchableOpacity 
              className="bg-white p-6 rounded-3xl shadow-sm mb-4 ml-2"
              style={{
                width: cardWidth,
                height: isGridView ? 150 : undefined,
                justifyContent: "space-between",
                alignItems: "flex-start",
              }}
            >
              <View className="flex-row justify-between items-start mb-2">
                <Text
                  className="text-lg font-lexend-bold text-primary flex-1 pr-2"
                  numberOfLines={2}
                >
                  {item.title}
                </Text>
                <TouchableOpacity onPress={() => removeFavorite(item.id)}>
                  <Ionicons name="heart" size={24} color="red" />
                </TouchableOpacity>
              </View>
              <Text
                className="text-base text-gray mt-1"
                numberOfLines={isGridView ? 2 : undefined}
              >
                {item.description}
              </Text>
            </TouchableOpacity >
          )}
        />
      ) : (
        <View className="items-center justify-center mt-36 space-y-4 px-6">
          <SimpleLineIcons
            name="social-dropbox"
            size={96}
            color={COLORS.gray}
          />
          <Text className="text-xl text-gray font-lexend-bold text-center mt-4">
            Your favorite list is empty!
          </Text>
          <Text className="text-xs text-gray text-center font-noto leading-relaxed mt-1">
            Check out our smart, AI-powered recipes to begin your journey!
          </Text>
        </View>
      )}
    </View>
  );
}
