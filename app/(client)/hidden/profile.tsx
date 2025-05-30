import { COLORS } from "@/constants/themes";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import React, { useState } from "react";
import {
  Image,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

export default function ProfilePage() {
  const [firstName, setFirstName] = useState("Gwyn Ann");
  const [lastName, setLastName] = useState("Lobaton");
  const [username, setUsername] = useState("glyphine");
  const [email, setEmail] = useState("gaLobaton@mcm.edu.ph");
  const [newPassword, setNewPassword] = useState("doggggy234@");
  const [editable, setEditable] = useState(false);

  const [errors, setErrors] = useState({
    firstName: false,
    lastName: false,
    username: false,
    email: false,
    password: false,
    passwordMsg: "",
  });

  const validate = () => {
    const newErrors = {
      firstName: firstName.trim() === "",
      lastName: lastName.trim() === "",
      username: username.trim() === "",
      email: email.trim() === "",
      password: false,
      passwordMsg: "",
    };

    const passwordRegex = /^(?=.*[0-9])(?=.*[!@#$%^&*]).{8,}$/;

    if (!passwordRegex.test(newPassword)) {
      newErrors.password = true;
      newErrors.passwordMsg =
        "Password must be at least 8 characters and include a number and special character.";
    }

    setErrors(newErrors);
    return !(
      newErrors.firstName ||
      newErrors.lastName ||
      newErrors.username ||
      newErrors.email ||
      newErrors.password
    );
  };

  const toggleEdit = () => {
    if (editable) {
      if (!validate()) return;
    }
    setEditable(!editable);
  };

  return (
    <ScrollView className="flex-1 bg-background px-6 pt-6">
      {/* Profile Header */}
      <View className="bg-yellow rounded-3xl mt-8">
        {/* Back Button */}
        <TouchableOpacity className="p-2" onPress={() => router.back()}>
          <Ionicons name="chevron-back" size={24} color={COLORS.primary} />
        </TouchableOpacity>

        <View className="flex-row items-center mb-8">
          <View className="flex-1 items-start mt-14">
            <Text className="px-4 text-3xl font-lexend-bold text-primary">
              {firstName} {lastName}
            </Text>
            <Text className="px-4 text-lg font-noto text-gray">
              @{username}
            </Text>
          </View>

          {/* Profile Image */}
          <View className="items-end mb-4 m-2 px-2">
            <Image
              source={require("@/assets/images/profile.jpg")}
              className="w-32 h-32 rounded-full"
            />
            <TouchableOpacity
              onPress={() => console.log("Change image pressed")}
              className="absolute bg-primary p-2 ml-2 rounded-full"
            >
              <Ionicons name="pencil" size={16} color={COLORS.background} />
            </TouchableOpacity>
          </View>
        </View>
      </View>

      {/* Form */}
      <View className="space-y-4">
        {/* Name Fields */}
        <View className="py-2 mt-4 mb-2">
          <Text className="text-base font-lexend-bold text-gray-700">
            Fullname
          </Text>
          <View className="flex-row gap-4">
            <TextInput
              value={firstName}
              onChangeText={setFirstName}
              editable={editable}
              placeholder="First Name"
              className={`flex-1 border ${
                errors.firstName ? "border-red" : "border-primary"
              } ${
                editable ? "bg-blue-100 text-black" : "bg-gray-200 text-gray"
              } rounded-lg px-4 py-3 text-base font-noto`}
            />
            <TextInput
              value={lastName}
              onChangeText={setLastName}
              editable={editable}
              placeholder="Last Name"
              className={`flex-1 border ${
                errors.lastName ? "border-red" : "border-primary"
              } ${
                editable ? "bg-blue-100 text-black" : "bg-gray-200 text-gray"
              } rounded-lg px-4 py-3 text-base font-noto`}
            />
          </View>
        </View>

        {/* Username */}
        <View className="py-2 mb-2">
          <Text className="text-base font-lexend-bold text-gray-700">
            Username
          </Text>
          <TextInput
            value={username}
            onChangeText={setUsername}
            editable={editable}
            placeholder="Email"
            className={`mt-2 border ${
              errors.email ? "border-red" : "border-primary"
            } ${
              editable ? "bg-blue-100 text-black" : "bg-gray-200 text-gray"
            } rounded-lg px-4 py-3 text-base`}
          />
        </View>

        {/* Email */}
        <View className="py-2 mb-2">
          <Text className="text-base font-lexend-bold text-gray-700">
            Email
          </Text>
          <TextInput
            value={email}
            onChangeText={setEmail}
            editable={editable}
            placeholder="Email"
            className={`mt-2 border ${
              errors.email ? "border-red" : "border-primary"
            } ${
              editable ? "bg-blue-100 text-black" : "bg-gray-200 text-gray"
            } rounded-lg px-4 py-3 text-base`}
          />
        </View>

        {/* Password */}
        <View className="py-2 mb-4">
          <Text className="text-base font-lexend-bold text-gray-700">
            New Password
          </Text>
          <TextInput
            value={newPassword}
            onChangeText={setNewPassword}
            secureTextEntry
            editable={editable}
            placeholder="Password"
            className={`mt-2 border ${
              errors.password ? "border-red" : "border-primary"
            } ${
              editable ? "bg-blue-100 text-black" : "bg-gray-200 text-gray"
            } rounded-lg px-4 py-3 text-base`}
          />
          {errors.password && editable && (
            <Text className="text-xs text-red mt-1 font-noto">
              {errors.passwordMsg}
            </Text>
          )}
        </View>
      </View>

      {/* Buttons */}
      <View className="mt-2">
        <TouchableOpacity
          onPress={toggleEdit}
          className={`${
            editable ? "bg-green-800" : "bg-primary"
          } py-4 rounded-xl items-center mb-4`}
        >
          <Text className="text-white font-lexend-bold text-lg">
            {editable ? "SAVE" : "EDIT"}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => router.push("/(authentication)/openingtwo")}
          className="bg-white py-4 rounded-xl items-center border border-primary"
        >
          <Text className="text-primary font-lexend-bold text-lg">LOGOUT</Text>
        </TouchableOpacity>
      </View>

      <View className="m-6" />
    </ScrollView>
  );
}
