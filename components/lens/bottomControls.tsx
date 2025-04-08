import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React from "react";
import { MaterialIcons, SimpleLineIcons } from "@expo/vector-icons";
import Animated, { FadeInDown } from "react-native-reanimated";

const BottomControls = () => {
  return (
    <Animated.View
      className="flex-row justify-evenly pt-8 pb-12 px-4 bg-[#1f2125]"
      entering={FadeInDown.duration(750)}
    >
      <TouchableOpacity className="bg-[#1f2226] rounded-full px-4 py-2 flex-row items-center border-[1.5px] border-[#424449]">
        <MaterialIcons name="translate" size={24} color="#acc7f2" />
        <Text className="text-white ml-2">Translate</Text>
      </TouchableOpacity>

      <TouchableOpacity className="bg-[#394357] rounded-full px-4 py-2 flex-row items-center">
        <MaterialIcons name="search" size={24} color="#acc7f2" />
        <Text className="text-[#acc7f2] ml-2">Search</Text>
      </TouchableOpacity>

      <TouchableOpacity className="bg-[#1f2226] rounded-full px-4 py-2 flex-row items-center border-[1.5px] border-[#424449]">
        <SimpleLineIcons name="graduation" size={24} color="#acc7f2" />
        <Text className="text-white ml-2">Homework</Text>
      </TouchableOpacity>
    </Animated.View>
  );
};

export default BottomControls;

const styles = StyleSheet.create({});
