import { Text, View } from "react-native";
import { useState } from "react";
import React from "react";
import { Image } from "react-native";

import Animated, { FadeInDown } from "react-native-reanimated";

const News = () => {
  const [imageError, setImageError] = useState(false);
  const newsItems = [
    {
      title:
        "This superstar was Ratan Tata's closest friend, shared same room, went for picnics, listened songs toge...",
      imageUrl:
        "https://images.pexels.com/photos/4417069/pexels-photo-4417069.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    },
    {
      title:
        "This superstar was Ratan Tata's closest friend, shared same room, went for picnics, listened songs toge...",
      imageUrl:
        "https://images.pexels.com/photos/3593923/pexels-photo-3593923.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    },
    {
      title:
        "This superstar was Ratan Tata's closest friend, shared same room, went for picnics, listened songs toge...",
      imageUrl:
        "https://images.pexels.com/photos/2876511/pexels-photo-2876511.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
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
          {imageError ? (
            <View
              style={{
                width: "100%",
                backgroundColor: "gray",
                borderRadius: 8,
              }}
            />
          ) : (
            <Image
              source={{ uri: item.imageUrl }}
              className="w-full h-60 rounded-[24px]"
              resizeMode="cover"
              onError={() => setImageError(true)}
            />
          )}

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
