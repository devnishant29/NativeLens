import { View } from "react-native";
import { TouchableOpacity } from "react-native";
import {
  MaterialIcons,
  MaterialCommunityIcons,
  SimpleLineIcons,
} from "@expo/vector-icons";
import React from "react";

import Animated, { FadeIn } from "react-native-reanimated";

const Shortcuts = () => {
  const buttons = [
    {
      bgColor: "#4d4531",
      icon: <MaterialIcons name="image-search" size={24} color="#fed568" />,
      key: "image-search",
    },
    {
      bgColor: "#363f4e",
      icon: <MaterialIcons name="translate" size={24} color="#8db5f6" />,
      key: "translate",
    },
    {
      bgColor: "#33423a",
      icon: <SimpleLineIcons name="graduation" size={24} color="#d1e9d8" />,
      key: "graduation",
    },
    {
      bgColor: "#493034",
      icon: (
        <MaterialCommunityIcons
          name="music-note-outline"
          size={24}
          color="#f18c89"
        />
      ),
      key: "music-note-outline",
    },
  ];
  return (
    <View className="flex-row justify-between px-4 mb-6 border-b-2 border-[#3c4043] pb-6">
      {buttons.map((button, index) => (
        <Animated.View
          key={button.key}
          entering={FadeIn.duration(500).delay(index * 100)}
          className={`flex-1 items-center justify-center h-20 rounded-full ${
            index === 0
              ? "mr-1.5"
              : index === buttons.length - 1
              ? "ml-1.5"
              : "mx-1.5"
          }`}
          style={{ backgroundColor: button.bgColor }}
        >
          <TouchableOpacity className="w-full h-full items-center justify-center">
            {button.icon}
          </TouchableOpacity>
        </Animated.View>
      ))}
    </View>
  );
};

export default Shortcuts;
