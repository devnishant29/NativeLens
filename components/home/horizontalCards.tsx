import { Text, View, ScrollView } from "react-native";
import React from "react";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import Animated, { FadeIn } from "react-native-reanimated";

const HorizontalCards = () => {
  const tiles = [
    {
      key: "weather",
      title: "Ahmedabad",
      value: "34°",
      icon: <Ionicons name="moon" size={32} color="#c8dcfc" />,
      valueTextClass: "text-5xl",
    },
    {
      key: "air-quality",
      title: "Air quality · 170",
      value: "Moderate",
      icon: (
        <View className="bg-[#fdff00] h-10 w-10 rounded-full items-center justify-center">
          <MaterialCommunityIcons name="waves" size={24} color="#1f2125" />
        </View>
      ),
      valueTextClass: "text-2xl",
    },
    {
      key: "wind-speed",
      title: "Wind Speed",
      value: "18 km/h",
      icon: (
        <MaterialCommunityIcons
          name="weather-windy"
          size={28}
          color="#a3e635"
        />
      ),
      valueTextClass: "text-2xl",
    },
  ];
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={{ paddingHorizontal: 16 }}
      className="mb-4"
    >
      {tiles.map((tile, index) => (
        <Animated.View
          key={tile.key}
          entering={FadeIn.duration(500).delay(index * 100)}
          className="w-48 bg-[#1f2125] mr-4 rounded-3xl p-4 border-[1.5px] border-[#47494d]"
        >
          <Text className="text-white text-base font-medium">{tile.title}</Text>
          <View className="flex-row items-center justify-between mt-2">
            <Text className={`text-white ${tile.valueTextClass}`}>
              {tile.value}
            </Text>
            {tile.icon}
          </View>
        </Animated.View>
      ))}
    </ScrollView>
  );
};

export default HorizontalCards;
