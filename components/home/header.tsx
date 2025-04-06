import { Text, View, TouchableOpacity } from "react-native";
import React from "react";

import {
  AntDesign,
  Octicons,
  MaterialCommunityIcons,
} from "@expo/vector-icons";

const Header: React.FC<{ setModalVisible: (visible: boolean) => void }> = ({
  setModalVisible,
}) => {
  return (
    <View className="flex-row justify-between items-center px-6 pt-12 pb-4">
      <View>
        <Octicons name="beaker" size={30} color="#a8c7fa" />
      </View>

      <View className="flex-row gap-x-6 items-center bg-[#2f3133] pl-3 pr-4 p-3 rounded-3xl ml-6">
        <View className="flex-row gap-x-2 bg-[#1f2123] rounded-2xl px-3 py-3">
          <AntDesign name="google" size={24} color="white" />
          <Text className="text-white text-base font-medium">Search</Text>
        </View>
        <MaterialCommunityIcons
          name="star-four-points"
          size={20}
          color="#8ab4f8"
        />
      </View>

      <TouchableOpacity
        className="h-12 w-12 bg-[#76919f] rounded-full items-center justify-center"
        onPress={() => setModalVisible(true)}
      >
        <Text className="text-white text-xl font-medium">N</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Header;
