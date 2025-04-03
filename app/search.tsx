import React from "react";
import { Text, View, TextInput, TouchableOpacity } from "react-native";
import {
  Ionicons,
  MaterialIcons,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import { useRouter } from "expo-router";

const searchScreen = () => {
  const router = useRouter();
  return (
    <View className="flex-1 bg-[#202124]">
      <View className="mx-4 mt-12 mb-4">
        <View className="flex-row items-center bg-[#303134] rounded-full py-3 px-4">
          <TouchableOpacity onPress={() => router.back()}>
            <MaterialIcons name="chevron-left" size={30} color="white" />
          </TouchableOpacity>
          <TextInput
            className="flex-1 text-white text-base mx-2"
            placeholder="Search"
            placeholderTextColor="#9aa0a6"
          />
          <TouchableOpacity
            className="mr-4"
            onPress={() => router.push("/voice")}
          >
            <MaterialIcons name="keyboard-voice" size={24} color="#8ab4f8" />
          </TouchableOpacity>
          <TouchableOpacity
            className="mx-4"
            onPress={() => router.push("/camera")}
          >
            <MaterialCommunityIcons
              name="google-lens"
              size={24}
              color="white"
            />
          </TouchableOpacity>
        </View>
      </View>
      <View className="flex-row justify-between mx-4 mb-6">
        <TouchableOpacity>
          <Text className="text-white">Recent Searches</Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Text className="text-white">MANAGE HISTROY</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default searchScreen;
