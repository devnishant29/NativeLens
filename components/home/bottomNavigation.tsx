import React from "react";
import { View } from "react-native";
import { TouchableOpacity } from "react-native";
import {
  Ionicons,
  MaterialIcons,
  FontAwesome6,
} from "@expo/vector-icons";

const BottomNavigation = () => {
  return (
    <View className="absolute bottom-0 left-0 right-0 w-full flex-row justify-around pt-3 pb-6 bg-[#202124] border-t border-[#3c4043]">
      <TouchableOpacity className="items-center bg-[#394357] p-2 px-6 rounded-full">
        <FontAwesome6 name="house-chimney" size={24} color="#8cb6f9" />
      </TouchableOpacity>

      <TouchableOpacity className="items-center p-2 px-6">
        <MaterialIcons name="history" size={24} color="gray" />
      </TouchableOpacity>

      <TouchableOpacity className="items-center p-2 px-6">
        <Ionicons name="notifications-outline" size={24} color="gray" />
      </TouchableOpacity>

      <TouchableOpacity className="items-center p-2 px-6">
        <MaterialIcons name="menu" size={24} color="gray" />
      </TouchableOpacity>
    </View>
  );
};

export default BottomNavigation;
