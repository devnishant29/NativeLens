import { Text, View } from "react-native";
import React from "react";
import { Image } from "react-native";

import Animated, { FadeInDown } from "react-native-reanimated";

const News = () => {
  const newsItems = [
    {
      title:
        "This superstar was Ratan Tata's closest friend, shared same room, went for picnics, listened songs toge...",
      imageUrl: "https://placehold.co/400x300/jpg",
    },
    {
      title:
        "This superstar was Ratan Tata's closest friend, shared same room, went for picnics, listened songs toge...",
      imageUrl: "https://placehold.co/400x300/jpg",
    },
    {
      title:
        "This superstar was Ratan Tata's closest friend, shared same room, went for picnics, listened songs toge...",
      imageUrl: "https://placehold.co/400x300/jpg",
    },
  ];
  return (
    <View className="pb-16">
      {newsItems.map((item, index) => (
        <Animated.View
          key={index}
          className="mx-4 mb-4 rounded-xl overflow-hidden"
          entering={FadeInDown.duration(500).delay(index * 100)}
        >
          <Image
            source={{ uri: item.imageUrl }}
            className="w-full h-60 rounded-[24px]"
            resizeMode="cover"
          />
          <View className="px-2 pb-6 pt-2">
            <Text className="text-white text-xl font-medium" numberOfLines={3}>
              {item.title}
            </Text>
          </View>
        </Animated.View>
      ))}
    </View>
  );
};

export default News;
