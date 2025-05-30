import { COLORS } from "@/constants/themes";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  Image,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { getTempScanData } from "./tempScanStore";

const categories = ["Vegetable", "Fruit", "Grain", "Protein", "Dairy"];

export default function EditIngredientFromScanPage() {
  const router = useRouter();
  const scanData = getTempScanData();

  const [imageUri, setImageUri] = useState<string | null>(null);
  const [name, setName] = useState("");
  const [stock, setStock] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [editable, setEditable] = useState(true);
  const [errors, setErrors] = useState({
    name: false,
    stock: false,
    category: false,
  });

  useEffect(() => {
    if (scanData) {
      setImageUri(scanData.imageUri);
      setName(scanData.name);
      setCategory(scanData.category);
    }
  }, []);

  const handleSave = () => {
    const newErrors = {
      name: name.trim() === "",
      stock: stock.trim() === "",
      category: category.trim() === "",
    };
    setErrors(newErrors);
    if (Object.values(newErrors).some(Boolean)) return;

    const newIngredient = {
      id: Date.now(),
      name,
      category,
      stock: Number(stock),
      description,
      image: imageUri || require("@/assets/images/measf.jpg"),
    };

    console.log("Saved Ingredient:", newIngredient);
    router.push("/inventory");
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
        <Text className="text-2xl font-lexend-bold text-primary">Confirm</Text>
      </View>

      {/* Image */}
      <View className="relative items-center mb-4">
        {imageUri ? (
          <Image
            source={{ uri: imageUri }}
            className="w-full h-44 rounded-2xl opacity-40"
            resizeMode="cover"
          />
        ) : (
          <Image
            source={require("@/assets/images/measf.jpg")}
            className="w-full h-32 rounded-2xl opacity-60"
            resizeMode="cover"
          />
        )}

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
              errors.name
                ? "border-red bg-rose-50"
                : "border-primary bg-blue-100"
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
          placeholder="Total items"
            editable={editable}
            className={`mt-2 border rounded-lg px-4 py-3 text-base font-noto ${
              errors.stock
                ? "border-red bg-rose-50"
                : "border-primary bg-blue-100"
            } text-black`}
            keyboardType="numeric"
            value={stock}
            onChangeText={(val) => {
              setStock(val);
              setErrors((prev) => ({ ...prev, stock: false }));
            }}
            
          />
        </View>

        {/* Description */}
        <View className="py-2">
          <Text className="text-base font-lexend-bold text-gray-700">
            Description (Optional)
          </Text>
          <TextInput
            editable={editable}
            className="mt-2 border border-primary bg-blue-100 rounded-lg px-4 py-4 text-base text-black font-noto"
            placeholder="Enter your description"
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
