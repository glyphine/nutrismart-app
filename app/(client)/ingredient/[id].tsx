import { COLORS } from "@/constants/themes";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useState } from "react";
import {
  Image,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { inventoryData } from "./sampledata";

const categories = ["Vegetable", "Fruit", "Grain", "Protein", "Dairy"];

export default function EditIngredientPage() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const ingredient = inventoryData.find((item) => item.id === Number(id));

  const [name, setName] = useState(ingredient?.name || "");
  const [stock, setStock] = useState(String(ingredient?.stock || ""));
  const [category, setCategory] = useState(ingredient?.category || "");
  const [description, setDescription] = useState("");

  const [editable, setEditable] = useState(false);
  const [errors, setErrors] = useState({
    name: false,
    stock: false,
    category: false,
  });

  if (!ingredient) {
    return (
      <View className="flex-1 justify-center items-center">
        <Text className="text-lg text-gray-600">Ingredient not found.</Text>
      </View>
    );
  }

  const handleToggle = () => {
    if (!editable) {
      setEditable(true);
    } else {
      const newErrors = {
        name: name.trim() === "",
        stock: stock.trim() === "",
        category: category.trim() === "",
      };
      setErrors(newErrors);
      if (Object.values(newErrors).some(Boolean)) return;

      console.log("Updated Data:", { id, name, stock, category, description });
      setEditable(false); // stay on form and disable editing
    }
  };

  const handleDelete = () => {
    const index = inventoryData.findIndex((item) => item.id === Number(id));
    if (index !== -1) {
      inventoryData.splice(index, 1);
      console.log("Deleted item:", id);
      router.push("/inventory");
    } else {
      alert("Item not found.");
    }
  };

  return (
    <ScrollView className="flex-1 bg-background px-6 pt-6">
      {/* Header */}
      <View className="relative justify-center items-center h-16 mt-4 mb-4 flex-row">
        <TouchableOpacity
          onPress={() => router.push("/inventory")}
          className="absolute left-0 top-1/2 -translate-y-1/2 p-2"
        >
          <Ionicons name="chevron-back" size={28} color={COLORS.primary} />
        </TouchableOpacity>
        <Text className="text-2xl font-lexend-bold text-primary">Edit</Text>
        <TouchableOpacity
          onPress={handleDelete}
          className="absolute right-0 top-1/2 -translate-y-1/2 p-2"
        >
          <Ionicons name="trash-outline" size={24} color="#DC2626" />
        </TouchableOpacity>
      </View>

      {/* Image */}
      <View className="relative items-center mb-4">
        <Image
          source={ingredient.image}
          className="w-full h-32 rounded-2xl opacity-60"
          resizeMode="cover"
        />
        <View className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
          <Ionicons name="image-outline" size={36} color="#fff" />
        </View>
      </View>

      {/* Form */}
      <View className="space-y-4">
        {/* Name */}
        <View className="py-2">
          <Text className="text-base font-lexend-bold text-gray-700">Item</Text>
          <TextInput
            editable={editable}
            className={`mt-2 border rounded-lg px-4 py-3 text-base font-noto ${
              editable
                ? errors.name
                  ? "border-red bg-rose-50"
                  : "border-primary bg-blue-100"
                : "border-primary bg-white"
            } text-black`}
            value={name}
            onChangeText={(val) => {
              setName(val);
              setErrors((prev) => ({ ...prev, name: false }));
            }}
            placeholder="Product Name"
          />
        </View>

        {/* Category */}
        <View className="py-2">
          <Text className="text-base font-lexend-bold text-gray-700">
            Category
          </Text>
          <View className="flex-row flex-wrap gap-2 mt-2 justify-center">
            {categories.map((cat) => (
              <TouchableOpacity
                key={cat}
                onPress={() => editable && setCategory(cat)}
                className={`px-4 py-2 rounded-full border font-lexend-bold text-sm ${
                  category === cat
                    ? "bg-yellow border-primary text-primary"
                    : errors.category
                    ? "border-red bg-rose-50 text-gray"
                    : "bg-white border-gray text-gray"
                } ${!editable ? "opacity-50" : ""}`}
              >
                <Text>{cat.toUpperCase()}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Stock */}
        <View className="py-2">
          <Text className="text-base font-lexend-bold text-gray-700">
            Quantity
          </Text>
          <TextInput
            editable={editable}
            className={`mt-2 border rounded-lg px-4 py-3 text-base font-noto ${
              editable
                ? errors.stock
                  ? "border-red bg-rose-50"
                  : "border-primary bg-blue-100"
                : "border-primary bg-white"
            } text-black`}
            keyboardType="numeric"
            value={stock}
            onChangeText={(val) => {
              setStock(val);
              setErrors((prev) => ({ ...prev, stock: false }));
            }}
            placeholder="Total items"
          />
        </View>

        {/* Description */}
        <View className="py-2">
          <Text className="text-base font-lexend-bold text-gray-700">
            Description (Optional)
          </Text>
          <TextInput
            editable={editable}
            className={`mt-2 border rounded-lg px-4 py-4 text-base font-noto ${
              editable
                ? "border-primary bg-blue-100"
                : "border-primary bg-white"
            } text-black`}
            placeholder="Enter your description"
            placeholderTextColor="#999"
            multiline
            value={description}
            onChangeText={setDescription}
          />
        </View>
      </View>

      {/* Save/Edit Button */}
      <View className="mt-4">
        <TouchableOpacity
          onPress={handleToggle}
          className={`${
            editable ? "bg-green-700" : "bg-primary"
          } py-4 rounded-xl items-center`}
        >
          <Text className="text-white font-lexend-bold text-lg">
            {editable ? "SAVE" : "EDIT"}
          </Text>
        </TouchableOpacity>
      </View>

      <View className="m-6" />
    </ScrollView>
  );
}
