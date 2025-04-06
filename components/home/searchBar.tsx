import { Text, View } from "react-native";
import React from "react";
import {
  Ionicons,
  MaterialIcons,
  MaterialCommunityIcons,
} from "@expo/vector-icons";

import { TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";

const SearchBar = () => {
  const router = useRouter();
  return (
    <View className="mx-4 mb-6">
      <View className="flex-row items-center bg-[#2f3133] rounded-full py-6 px-4">
        <Ionicons name="search" size={22} color="#9b9fa3" />
        <TouchableOpacity
          className="flex-1"
          onPress={() => router.push("/search")}
        >
          <Text className="text-[#9b9fa3] text-base mx-2">Search</Text>
        </TouchableOpacity>
        <TouchableOpacity
          className="mr-4 w-8 h-8 items-center justify-center"
          onPress={(e) => {
            e.stopPropagation();
            router.push("/voice");
          }}
        >
          <MaterialIcons name="keyboard-voice" size={24} color="white" />
        </TouchableOpacity>
        <TouchableOpacity
          className="w-8 h-8 items-center justify-center"
          onPress={(e) => {
            e.stopPropagation();
            router.push("/camera");
          }}
        >
          <MaterialCommunityIcons name="google-lens" size={24} color="white" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default SearchBar;
