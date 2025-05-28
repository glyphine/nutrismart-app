// app/(client)/ingredient/[id].tsx
import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Image,
  Pressable,
  ScrollView,
} from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { inventoryData } from "./sampledata";
import Ionicons from "@expo/vector-icons/Ionicons";
import { COLORS } from "@/constants/themes";

const categories = ["Vegetable", "Fruit", "Grain", "Protein", "Dairy"];

export default function EditIngredientPage() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const ingredient = inventoryData.find((item) => item.id === Number(id));

  const [name, setName] = useState(ingredient?.name || "");
  const [stock, setStock] = useState(String(ingredient?.stock || ""));
  const [category, setCategory] = useState(ingredient?.category || "");
  const [description, setDescription] = useState("");

  if (!ingredient) {
    return (
      <View className="flex-1 justify-center items-center">
        <Text className="text-lg text-gray-600">Ingredient not found.</Text>
      </View>
    );
  }

  const handleSave = () => {
    console.log("Updated Data:", { id, name, stock, category, description });
    router.back();
  };

  const handleDelete = () => {
    const index = inventoryData.findIndex((item) => item.id === Number(id));
    if (index !== -1) {
      inventoryData.splice(index, 1); // removes item from array
      console.log("Deleted item:", id);
      router.push("/inventory");
    } else {
      alert("Item not found.");
    }
  };

  return (
    <ScrollView className="flex-1 bg-background px-6 pt-6">
      {/* Header */}
      <View className="relative justify-center items-center h-16 mt-4 mb-4">
        <Pressable
          onPress={() => router.push("/inventory")}
          className="absolute left-0 top-1/2 -translate-y-1/2 p-2"
        >
          <Ionicons name="chevron-back" size={28} color={COLORS.primary} />
        </Pressable>
        <Text className="text-2xl font-lexend-bold text-primary">Edit</Text>
      </View>

      {/* Image */}
      <View className="relative items-center mb-4">
        <Image
          source={ingredient.image}
          className="w-full h-48 rounded-2xl opacity-60"
          resizeMode="cover"
        />
        <View className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
          <Ionicons name="image-outline" size={36} color="#fff" />
        </View>
      </View>

      {/* Form */}
      <View className="space-y-4">
        <View className="py-2 mt-2">
          <Text className="text-base font-lexend-bold text-gray-700">Item</Text>
          <TextInput
            className="mt-2 border border-primary bg-blue-100 rounded-lg px-4 py-3 text-lg text-gray font-noto"
            value={name}
            onChangeText={setName}
          />
        </View>

        <View className="py-2">
          <Text className="text-base font-lexend-bold text-gray-700">
            Category
          </Text>
          <View className="flex-row flex-wrap gap-2 mt-2 ">
            {categories.map((cat) => (
              <Pressable
                key={cat}
                onPress={() => setCategory(cat)}
                className={`px-6 py-2 rounded-xl border font-lexend-bold text-xs ${
                  category === cat
                    ? "bg-yellow border-primary text-primary font-lexend-bold"
                    : "bg-white border-gray text-gray font-lexend-bold"
                }`}
              >
                <Text>{cat.toUpperCase()}</Text>
              </Pressable>
            ))}
          </View>
        </View>

        <View className="py-2">
          <Text className="text-base font-lexend-bold text-gray-700">
            Quantity
          </Text>
          <TextInput
            className="mt-2 border border-primary bg-blue-100 rounded-lg px-4 py-3 text-base text-gray font-noto"
            keyboardType="numeric"
            value={stock}
            onChangeText={setStock}
          />
        </View>

        <View className="py-2">
          <Text className="text-base font-lexend-bold text-gray-700">
            Description (Optional)
          </Text>
          <TextInput
            className="mt-2 border border-primary bg-blue-100 rounded-lg px-4 py-4 text-base text-gray font-noto"
            placeholder="Enter your description"
            placeholderTextColor="#999"
            multiline
            value={description}
            onChangeText={setDescription}
          />
        </View>
      </View>

      {/* Save Button */}
      <View className="mt-8">
        <Pressable
          onPress={handleSave}
          className="bg-primary py-4 rounded-xl items-center"
        >
          <Text className="text-white font-lexend-bold text-lg">SAVE</Text>
        </Pressable>
      </View>
      <View className="mt-4">
        <Pressable
          onPress={() => handleDelete()}
          className="bg-red-100 py-4 rounded-xl items-center border border-red-600"
        >
          <Text className="text-red-600 font-lexend-bold text-lg">DELETE</Text>
        </Pressable>
      </View>
      <View className="m-6" />
    </ScrollView>
  );
}
