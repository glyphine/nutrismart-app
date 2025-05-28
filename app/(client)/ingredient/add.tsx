import { COLORS } from "@/constants/themes";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useFocusEffect } from "@react-navigation/native";
import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useState } from "react";
import {
  Image,
  Pressable,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { inventoryData } from "./sampledata";

const categories = ["Vegetable", "Fruit", "Grain", "Protein", "Dairy"];

export default function AddIngredientPage() {
  const { id } = useLocalSearchParams();
  const router = useRouter();

  const isEdit = Boolean(id);
  const ingredient = isEdit
    ? inventoryData.find((item) => item.id === Number(id))
    : null;

  const [name, setName] = useState(ingredient?.name || "");
  const [stock, setStock] = useState(ingredient?.stock?.toString() || "");
  const [category, setCategory] = useState(ingredient?.category || "");
  const [description, setDescription] = useState("");

  const [errors, setErrors] = useState({
    name: false,
    stock: false,
    category: false,
  });

  useFocusEffect(
    React.useCallback(() => {
      if (!isEdit) {
        setName("");
        setStock("");
        setCategory("");
        setDescription("");
      }
    }, [id])
  );

  const handleSave = () => {
    const newErrors = {
      name: name.trim() === "",
      stock: stock.trim() === "",
      category: category.trim() === "",
    };

    setErrors(newErrors);

    if (Object.values(newErrors).some(Boolean)) {
      return;
    }

    if (isEdit && ingredient) {
      ingredient.name = name;
      ingredient.category = category;
      ingredient.stock = Number(stock);
    } else {
      inventoryData.push({
        id: Date.now(),
        name,
        category,
        stock: Number(stock),
        description,
        image: require("@/assets/images/measf.jpg"),
      });
    }

    console.log("Inventory Now:", inventoryData);
    router.push("/inventory");
  };

  return (
    <ScrollView className="flex-1 bg-background px-6 pt-6">
      {/* Header */}
      <View className="relative justify-center items-center h-16 mt-4 mb-4">
        <TouchableOpacity
          onPress={() => router.push("/inventory")}
          className="absolute left-0 top-1/2 -translate-y-1/2 p-2"
        >
          <Ionicons name="chevron-back" size={28} color={COLORS.primary} />
        </TouchableOpacity>
        <Text className="text-2xl font-lexend-bold text-primary">
          {isEdit ? "Edit" : "Add"} Ingredient
        </Text>
      </View>

      {/* Image */}
      <View className="relative items-center mb-4">
        <Image
          source={ingredient?.image || require("@/assets/images/measf.jpg")}
          className="w-full h-32 rounded-2xl opacity-60"
          resizeMode="cover"
        />
        <TouchableOpacity className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
          <Ionicons name="image-outline" size={36} color="#fff" />
        </TouchableOpacity>
      </View>

      {/* Form */}
      <View className="space-y-4">
        {/* Name Field */}
        <View className="py-2">
          <Text className="text-base font-lexend-bold text-gray-700">Item</Text>
          <TextInput
            className={`mt-2 border ${
              errors.name ? "border-red bg-rose-50" : "border-primary"
            } bg-blue-100 rounded-lg px-4 py-3 text-base text-gray font-noto`}
            value={name}
            onChangeText={(val) => {
              setName(val);
              setErrors((prev) => ({ ...prev, name: false }));
            }}
            placeholder="Product Name"
          />
        </View>

        {/* Category Field */}
        <View className="py-2">
          <Text className="text-base font-lexend-bold text-gray-700">
            Category
          </Text>
          <View className="flex-row flex-wrap gap-2 mt-2 justify-center">
            {categories.map((cat) => (
              <TouchableOpacity
                key={cat}
                onPress={() => {
                  setCategory(cat);
                  setErrors((prev) => ({ ...prev, category: false }));
                }}
                className={`px-4 py-2 rounded-full border font-lexend-bold text-sm ${
                  category === cat
                    ? "bg-yellow border-primary text-primary"
                    : errors.category
                    ? "border-red bg-white text-gray"
                    : "bg-white border-gray text-gray"
                }`}
              >
                <Text>{cat.toUpperCase()}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Stock Field */}
        <View className="py-2">
          <Text className="text-base font-lexend-bold text-gray-700">
            Quantity
          </Text>
          <TextInput
            className={`mt-2 border ${
              errors.stock ? "border-red bg-rose-50" : "border-primary"
            } bg-blue-100 rounded-lg px-4 py-3 text-base text-gray font-noto`}
            keyboardType="numeric"
            value={stock}
            onChangeText={(val) => {
              setStock(val);
              setErrors((prev) => ({ ...prev, stock: false }));
            }}
            placeholder="Total items"
          />
        </View>

        {/* Description Field (Optional) */}
        <View className="py-2">
          <Text className="text-base font-lexend-bold text-gray-700">
            Description (Optional)
          </Text>
          <TextInput
            className="mt-2 border border-primary bg-blue-100 rounded-lg px-4 py-3 text-base text-gray font-noto"
            placeholder="Tell us about it"
            placeholderTextColor="#999"
            multiline
            value={description}
            onChangeText={setDescription}
          />
        </View>
      </View>

      {/* Save Button */}
      <View className="mt-4">
        <TouchableOpacity
          onPress={handleSave}
          className="bg-primary py-4 rounded-xl items-center"
        >
          <Text className="text-white font-lexend-bold text-lg">SAVE</Text>
        </TouchableOpacity>
      </View>

      <View className="m-6" />
    </ScrollView>
  );
}
